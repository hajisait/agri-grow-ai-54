import { createServerFn } from "@tanstack/react-start";

type GeoResult = {
  name: string;
  country: string;
  admin1?: string;
  latitude: number;
  longitude: number;
};

export type WeatherData = {
  current: {
    temperature_2m: number;
    relative_humidity_2m: number;
    wind_speed_10m: number;
    weather_code: number;
    apparent_temperature: number;
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_probability_max: number[];
    weather_code: number[];
  };
};

export const geocodePlace = createServerFn({ method: "GET" })
  .inputValidator((data: { query: string }) => {
    const q = String(data?.query ?? "").trim().slice(0, 80);
    if (!q) throw new Error("Empty query");
    return { query: q };
  })
  .handler(async ({ data }) => {
    const r = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(data.query)}&count=1&language=en&format=json`,
    );
    if (!r.ok) return { place: null };
    const j = (await r.json()) as { results?: GeoResult[] };
    return { place: j.results?.[0] ?? null };
  });

export const reverseGeocode = createServerFn({ method: "GET" })
  .inputValidator((data: { latitude: number; longitude: number }) => ({
    latitude: Number(data.latitude),
    longitude: Number(data.longitude),
  }))
  .handler(async ({ data }) => {
    const r = await fetch(
      `https://geocoding-api.open-meteo.com/v1/reverse?latitude=${data.latitude}&longitude=${data.longitude}&language=en&format=json`,
    ).catch(() => null);
    if (r && !r.ok) return { place: null };
    const j = r ? ((await r.json()) as { results?: GeoResult[] }) : { results: [] };
    return { place: j.results?.[0] ?? null };
  });

export const getWeather = createServerFn({ method: "GET" })
  .inputValidator((data: { latitude: number; longitude: number }) => {
    const lat = Number(data.latitude);
    const lon = Number(data.longitude);
    if (!Number.isFinite(lat) || !Number.isFinite(lon)) throw new Error("Bad coords");
    if (lat < -90 || lat > 90 || lon < -180 || lon > 180) throw new Error("Out of range");
    return { latitude: lat, longitude: lon };
  })
  .handler(async ({ data }) => {
    const r = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${data.latitude}&longitude=${data.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto&forecast_days=7`,
    );
    if (!r.ok) throw new Error("Weather provider error");
    return (await r.json()) as WeatherData;
  });
