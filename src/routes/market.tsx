import { createFileRoute } from "@tanstack/react-router";
import { TrendingDown, TrendingUp } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/market")({
  head: () => ({
    meta: [
      { title: "Market Prices — AgriAI Assist" },
      { name: "description", content: "Live mandi prices, trends and nearby market comparison for major crops." },
      { property: "og:title", content: "Market Prices — AgriAI Assist" },
      { property: "og:description", content: "Live mandi prices and price trends for farmers." },
    ],
  }),
  component: MarketPage,
});

type Crop = { name: string; emoji: string; grade: string; price: number; change: number; spark: number[] };

const CROPS: Crop[] = [
  { name: "Basmati Rice", emoji: "🌾", grade: "Grade A Premium", price: 4200, change: 2.4, spark: [38, 42, 40, 45, 48, 47, 52] },
  { name: "Wheat", emoji: "🌾", grade: "Sharbati", price: 2480, change: 1.2, spark: [22, 23, 22, 24, 25, 25, 26] },
  { name: "Yellow Maize", emoji: "🌽", grade: "Common Grade", price: 2150, change: -0.8, spark: [24, 23, 22, 21, 22, 21, 21] },
  { name: "Tomato", emoji: "🍅", grade: "Hybrid F1", price: 1840, change: 5.1, spark: [12, 14, 13, 16, 17, 19, 21] },
  { name: "Cotton", emoji: "🤍", grade: "Long Staple", price: 7250, change: -1.4, spark: [78, 77, 76, 75, 74, 73, 72] },
  { name: "Onion", emoji: "🧅", grade: "Nashik Red", price: 1620, change: 3.2, spark: [14, 14, 15, 16, 17, 17, 18] },
];

function MarketPage() {
  return (
    <>
      <Nav />
      <main className="max-w-7xl mx-auto px-4 md:px-6 pt-10 pb-16">
        <div className="text-center mb-8 animate-fade-up">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter">Market Prices</h1>
          <p className="text-foreground/60 mt-2">Live mandi feeds across India · Updated hourly</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CROPS.map((c) => {
            const up = c.change >= 0;
            const max = Math.max(...c.spark);
            const min = Math.min(...c.spark);
            return (
              <div key={c.name} className="glass-panel rounded-[2rem] p-6 hover:bg-white/65 transition">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="size-12 rounded-2xl bg-white grid place-items-center text-2xl">{c.emoji}</div>
                    <div>
                      <p className="font-bold">{c.name}</p>
                      <p className="text-xs text-foreground/50">{c.grade}</p>
                    </div>
                  </div>
                  <span className={`text-xs font-bold flex items-center gap-1 ${up ? "text-emerald-600" : "text-red-500"}`}>
                    {up ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />} {up ? "+" : ""}{c.change}%
                  </span>
                </div>
                <div className="flex items-end justify-between mb-4">
                  <p className="font-mono text-3xl font-extrabold tracking-tight">₹{c.price.toLocaleString("en-IN")}</p>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-foreground/40">per qt</p>
                </div>
                <svg viewBox="0 0 100 30" className="w-full h-12">
                  <polyline
                    fill="none"
                    stroke={up ? "oklch(0.55 0.15 145)" : "oklch(0.60 0.21 25)"}
                    strokeWidth="1.5"
                    points={c.spark.map((v, i) => {
                      const x = (i / (c.spark.length - 1)) * 100;
                      const y = 28 - ((v - min) / Math.max(1, max - min)) * 24;
                      return `${x},${y}`;
                    }).join(" ")}
                  />
                </svg>
              </div>
            );
          })}
        </div>
      </main>
      <Footer />
    </>
  );
}
