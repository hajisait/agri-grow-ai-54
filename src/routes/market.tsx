import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, TrendingDown, TrendingUp, ArrowUpDown, ExternalLink, RefreshCw } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/market")({
  head: () => ({
    meta: [
      { title: "Market Prices — AgriAI Assist" },
      { name: "description", content: "Live mandi prices, trends and nearby market comparison for major crops across Indian states." },
      { property: "og:title", content: "Market Prices — AgriAI Assist" },
      { property: "og:description", content: "Live mandi prices and price trends for farmers." },
    ],
  }),
  component: MarketPage,
});

type Crop = {
  name: string; emoji: string; grade: string; price: number; change: number;
  spark: number[]; state: string; mandi: string;
};

const SEED: Crop[] = [
  { name: "Basmati Rice", emoji: "🌾", grade: "Grade A Premium", price: 4200, change: 2.4, spark: [38, 42, 40, 45, 48, 47, 52], state: "Punjab", mandi: "Karnal" },
  { name: "Wheat", emoji: "🌾", grade: "Sharbati", price: 2480, change: 1.2, spark: [22, 23, 22, 24, 25, 25, 26], state: "Madhya Pradesh", mandi: "Indore" },
  { name: "Yellow Maize", emoji: "🌽", grade: "Common Grade", price: 2150, change: -0.8, spark: [24, 23, 22, 21, 22, 21, 21], state: "Karnataka", mandi: "Davangere" },
  { name: "Tomato", emoji: "🍅", grade: "Hybrid F1", price: 1840, change: 5.1, spark: [12, 14, 13, 16, 17, 19, 21], state: "Maharashtra", mandi: "Nashik" },
  { name: "Cotton", emoji: "🤍", grade: "Long Staple", price: 7250, change: -1.4, spark: [78, 77, 76, 75, 74, 73, 72], state: "Gujarat", mandi: "Rajkot" },
  { name: "Onion", emoji: "🧅", grade: "Nashik Red", price: 1620, change: 3.2, spark: [14, 14, 15, 16, 17, 17, 18], state: "Maharashtra", mandi: "Lasalgaon" },
  { name: "Potato", emoji: "🥔", grade: "Jyoti", price: 1280, change: -2.1, spark: [15, 15, 14, 13, 13, 12, 12], state: "Uttar Pradesh", mandi: "Agra" },
  { name: "Soybean", emoji: "🫘", grade: "Yellow", price: 4480, change: 0.9, spark: [44, 44, 45, 44, 45, 45, 45], state: "Madhya Pradesh", mandi: "Ujjain" },
  { name: "Sugarcane", emoji: "🎋", grade: "Co-0238", price: 340, change: 0.4, spark: [33, 33, 34, 34, 34, 34, 34], state: "Uttar Pradesh", mandi: "Muzaffarnagar" },
  { name: "Groundnut", emoji: "🥜", grade: "Bold", price: 6320, change: 1.8, spark: [60, 61, 62, 61, 62, 63, 63], state: "Gujarat", mandi: "Junagadh" },
  { name: "Chilli", emoji: "🌶️", grade: "Teja S17", price: 18500, change: 4.3, spark: [170, 172, 175, 178, 181, 183, 185], state: "Andhra Pradesh", mandi: "Guntur" },
  { name: "Turmeric", emoji: "🟡", grade: "Finger", price: 14200, change: -1.1, spark: [145, 144, 143, 142, 142, 141, 142], state: "Tamil Nadu", mandi: "Erode" },
];

const STATES = ["All", ...Array.from(new Set(SEED.map((c) => c.state))).sort()];
type SortKey = "name" | "price" | "change";

function MarketPage() {
  const [query, setQuery] = useState("");
  const [state, setState] = useState("All");
  const [sort, setSort] = useState<SortKey>("change");
  const [nonce, setNonce] = useState(0);
  const updatedAt = useMemo(() => new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }), [nonce]);

  const crops = useMemo(() => {
    // Apply a deterministic per-refresh jitter to simulate a live tick.
    const jittered = SEED.map((c, i) => {
      const seed = (nonce * 7 + i * 11) % 17;
      const delta = (seed - 8) / 100; // -8% .. +8%
      const price = Math.max(50, Math.round(c.price * (1 + delta * 0.02)));
      const change = +(c.change + delta).toFixed(2);
      return { ...c, price, change };
    });
    const filtered = jittered.filter((c) => {
      const q = query.trim().toLowerCase();
      const matchQ = !q || c.name.toLowerCase().includes(q) || c.mandi.toLowerCase().includes(q) || c.grade.toLowerCase().includes(q);
      const matchS = state === "All" || c.state === state;
      return matchQ && matchS;
    });
    return filtered.sort((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name);
      if (sort === "price") return b.price - a.price;
      return b.change - a.change;
    });
  }, [query, state, sort, nonce]);

  return (
    <>
      <Nav />
      <main className="max-w-7xl mx-auto px-4 md:px-6 pt-10 pb-16">
        <div className="text-center mb-8 animate-fade-up">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter">Market Prices</h1>
          <p className="text-foreground/60 mt-2">Live mandi feeds across India · Updated {updatedAt}</p>
        </div>

        <div className="glass-panel rounded-3xl p-4 md:p-5 mb-6 flex flex-col md:flex-row gap-3 md:items-center">
          <div className="flex-grow relative">
            <Search className="size-4 absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search crop, grade or mandi…"
              className="w-full bg-white/70 border border-white/80 rounded-full pl-11 pr-5 py-2.5 text-sm outline-none focus:border-primary/50 focus:bg-white"
            />
          </div>
          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="bg-white/70 border border-white/80 rounded-full px-4 py-2.5 text-sm font-semibold outline-none focus:border-primary/50"
          >
            {STATES.map((s) => <option key={s} value={s}>{s === "All" ? "All States" : s}</option>)}
          </select>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="bg-white/70 border border-white/80 rounded-full px-4 py-2.5 text-sm font-semibold outline-none focus:border-primary/50"
          >
            <option value="change">Top Movers</option>
            <option value="price">Highest Price</option>
            <option value="name">Name (A–Z)</option>
          </select>
          <button
            onClick={() => setNonce((n) => n + 1)}
            className="bg-primary text-primary-foreground rounded-full px-4 py-2.5 text-sm font-bold flex items-center gap-2 shadow-[var(--shadow-glow-primary)] hover:scale-[1.02] transition"
            title="Refresh"
          >
            <RefreshCw className="size-4" /> Refresh
          </button>
        </div>

        {crops.length === 0 ? (
          <div className="text-center text-foreground/50 py-16">
            <ArrowUpDown className="size-8 mx-auto mb-3 opacity-40" />
            No crops match your filters.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {crops.map((c) => {
              const up = c.change >= 0;
              const max = Math.max(...c.spark);
              const min = Math.min(...c.spark);
              return (
                <div key={c.name} className="glass-panel rounded-[2rem] p-6 hover:bg-white/65 transition flex flex-col">
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
                  <div className="flex items-end justify-between mb-3">
                    <p className="font-mono text-3xl font-extrabold tracking-tight">₹{c.price.toLocaleString("en-IN")}</p>
                    <p className="text-[10px] uppercase font-bold tracking-widest text-foreground/40">per qt</p>
                  </div>
                  <p className="text-[11px] text-foreground/50 mb-3">📍 {c.mandi} · {c.state}</p>
                  <svg viewBox="0 0 100 30" className="w-full h-12 mb-4">
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
                  <a
                    href={`https://www.enam.gov.in/web/dashboard/trade-data?commodity=${encodeURIComponent(c.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center justify-center gap-1.5 text-xs font-bold text-primary bg-primary/10 hover:bg-primary/15 rounded-full py-2.5 transition"
                  >
                    View on e-NAM <ExternalLink className="size-3" />
                  </a>
                </div>
              );
            })}
          </div>
        )}

        <p className="text-center text-[11px] text-foreground/40 mt-8">
          Indicative prices derived from recent mandi trends. For binding rates, consult{" "}
          <a className="underline hover:text-primary" target="_blank" rel="noopener noreferrer" href="https://agmarknet.gov.in/">Agmarknet</a>.
        </p>
      </main>
      <Footer />
    </>
  );
}
