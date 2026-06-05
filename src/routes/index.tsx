import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { WeatherWidget } from "@/components/site/WeatherWidget";
import { useI18n } from "@/lib/i18n";
import { CloudSun, Mic, Sparkles, Camera, Wheat, TrendingDown, TrendingUp } from "lucide-react";
import heroField from "@/assets/hero-field.jpg";
import cropLeaf from "@/assets/crop-leaf.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AgriAI Assist — Smart AI Farming Assistant" },
      {
        name: "description",
        content:
          "AI-powered farming advisor: live weather, crop disease detection, market prices, government schemes & multilingual voice assistant.",
      },
      { property: "og:title", content: "AgriAI Assist — Smart AI Farming Assistant" },
      { property: "og:description", content: "AI-powered farming advisor for modern Indian agriculture." },
      { property: "og:image", content: heroField },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: heroField },
    ],
  }),
  component: Landing,
});

function Landing() {
  const { t } = useI18n();
  return (
    <>
      <Nav />
      <main>
        {/* Hero */}
        <section className="relative px-4 md:px-6 pt-12 md:pt-20 pb-20 max-w-7xl mx-auto overflow-hidden">
          <div className="absolute -top-48 -right-48 size-[600px] bg-[color:var(--sky-brand)]/25 blur-[120px] rounded-full animate-sun-glow pointer-events-none" />
          <div className="absolute top-24 -left-48 size-[400px] bg-primary/15 blur-[100px] rounded-full pointer-events-none" />

          <div className="relative z-10 text-center space-y-6 animate-fade-up">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/70 border border-white/80 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
              Intelligent Agriculture 2.0
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter text-balance leading-[0.92]">
              Smart AI Farming{" "}
              <span className="text-[color:var(--sky-brand)]">Assistant</span>
            </h1>
            <p className="max-w-xl mx-auto text-base md:text-lg text-foreground/70 text-pretty font-medium">
              Optimize yields, diagnose diseases, and track real-time weather with your pocket-sized agronomist.
            </p>

            <div className="grid md:grid-cols-3 gap-4 pt-10 max-w-4xl mx-auto text-left">
              <CTACard
                to="/assistant"
                icon={<Sparkles className="size-5" />}
                tint="bg-primary/10 text-primary"
                title="Ask AgriAI"
                body="Get instant answers about fertilizers, pests, and soil health."
              />
              <CTACard
                to="/disease"
                icon={<Camera className="size-5" />}
                tint="bg-[color:var(--sky-brand)]/10 text-[color:var(--sky-brand)]"
                title="Upload Crop"
                body="Snap a photo to detect diseases with AI-powered accuracy."
              />
              <CTACard
                to="/weather"
                icon={<CloudSun className="size-5" />}
                tint="bg-[color:var(--amber-brand)]/15 text-[color:var(--amber-brand)]"
                title="Check Weather"
                body="Local village-level forecasting with precision rain alerts."
              />
            </div>
          </div>

          {/* Hero image strip */}
          <div className="relative mt-16 rounded-[2.5rem] overflow-hidden border border-white/60 shadow-[var(--shadow-glass)]">
            <img
              src={heroField}
              alt="Sunrise over terraced rice paddies"
              width={1920}
              height={1080}
              className="w-full h-[280px] md:h-[420px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 flex flex-wrap gap-3">
              {[
                ["20M+", "Farmers reached"],
                ["12", "Languages"],
                ["98.4%", "Detection accuracy"],
                ["500+", "Mandi feeds"],
              ].map(([n, l]) => (
                <div key={l} className="glass-panel-strong rounded-2xl px-4 py-2.5">
                  <div className="text-xl font-extrabold tracking-tight">{n}</div>
                  <div className="text-[10px] uppercase font-bold tracking-widest text-foreground/60">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bento dashboard */}
        <section id="dashboard" className="px-4 md:px-6 py-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            {/* AI Assistant preview */}
            <div className="md:col-span-8 glass-panel p-6 md:p-8 rounded-[2rem] relative overflow-hidden min-h-[400px]">
              <div className="absolute -top-20 -right-20 size-64 bg-primary/15 rounded-full blur-3xl" />
              <div className="relative h-full flex flex-col">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold tracking-tight">AI Assistant Preview</h2>
                  <span className="flex items-center gap-2 text-[11px] font-mono bg-white/80 px-3 py-1 rounded-full border border-foreground/5 text-primary">
                    <span className="size-1.5 bg-primary rounded-full animate-pulse" /> LIVE QUERY
                  </span>
                </div>
                <div className="space-y-4 flex-grow">
                  <div className="flex gap-3">
                    <div className="size-8 rounded-full bg-primary/20 shrink-0" />
                    <div className="bg-white/80 p-4 rounded-2xl rounded-tl-none max-w-sm text-sm border border-foreground/5">
                      How can I increase my rice yield this season?
                    </div>
                  </div>
                  <div className="flex gap-3 flex-row-reverse">
                    <div className="size-8 rounded-full bg-[color:var(--sky-brand)]/30 shrink-0" />
                    <div className="bg-primary text-primary-foreground p-4 rounded-2xl rounded-tr-none max-w-md text-sm shadow-[var(--shadow-glow-primary)]">
                      Based on your region's soil report, add a potassium-rich fertilizer and adjust irrigation by 15% — higher temperatures are forecast next week.
                    </div>
                  </div>
                </div>
                <Link to="/assistant" className="mt-8 flex gap-2 group">
                  <div className="flex-grow bg-white/40 border border-white/70 rounded-full px-6 py-3 text-sm text-foreground/40 italic group-hover:text-foreground/70 transition">
                    Speak or type your question…
                  </div>
                  <div className="size-12 bg-white rounded-full grid place-items-center shadow-sm text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                    <Mic className="size-5" />
                  </div>
                </Link>
              </div>
            </div>

            {/* Weather widget */}
            <div className="md:col-span-4 glass-panel p-6 md:p-8 rounded-[2rem] flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-bold tracking-tight mb-1">Weather Dash</h2>
                <p className="text-sm text-foreground/60 mb-6">Punjab Region · Sector 4</p>
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-6xl font-extrabold tracking-tighter">28°</span>
                  <CloudSun className="size-12 text-[color:var(--sky-brand)]" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Stat label="Humidity" value="64%" />
                  <Stat label="Wind" value="12 km/h" icon={<Wind className="size-3" />} />
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-foreground/5">
                <p className="text-sm font-semibold text-[color:var(--sky-brand)] flex items-center gap-2">
                  <span className="size-2 bg-[color:var(--sky-brand)] rounded-full" />
                  No rain forecast for 48 hours
                </p>
              </div>
            </div>

            {/* Disease */}
            <Link to="/disease" className="md:col-span-4 glass-panel p-5 rounded-[2rem] hover:bg-white/65 transition-all group">
              <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden mb-4 relative">
                <img src={cropLeaf} alt="Macro of rice leaves" width={800} height={600} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 left-3 glass-panel-strong rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary">Scanner</div>
              </div>
              <h3 className="text-xl font-bold mb-1">Disease Detection</h3>
              <p className="text-sm text-foreground/60">Upload crop leaf photos for instant analysis and treatment plans.</p>
            </Link>

            {/* Market */}
            <div className="md:col-span-8 glass-panel p-6 md:p-8 rounded-[2rem]">
              <div className="flex justify-between items-end mb-6">
                <div>
                  <h3 className="text-2xl font-bold tracking-tight">Market Prices</h3>
                  <p className="text-sm text-foreground/60">Daily updates from local Mandis</p>
                </div>
                <Link to="/market" className="text-sm font-bold text-primary px-4 py-2 bg-white/80 rounded-full border border-foreground/5 hover:bg-white">
                  View All Crops
                </Link>
              </div>
              <div className="space-y-3">
                <PriceRow icon={<Wheat className="size-5 text-amber-700" />} name="Basmati Rice" grade="Grade A Premium" price="₹4,200" change="+2.4%" up />
                <PriceRow icon="🌽" name="Yellow Maize" grade="Common Grade" price="₹2,150" change="-0.8%" />
                <PriceRow icon="🍅" name="Tomato" grade="Hybrid F1" price="₹1,840" change="+5.1%" up />
              </div>
            </div>
          </div>
        </section>

        {/* Government Schemes */}
        <section className="px-4 md:px-6 py-16">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8 text-center">Government Support</h2>
            <div className="grid md:grid-cols-3 gap-5">
              <SchemeCard tone="primary" tag="Direct Benefit" title="PM-KISAN Nidhi" body="Income support of ₹6,000 per year for all landholding farmers' families." cta="Check Eligibility" />
              <SchemeCard tone="sky" tag="Crop Insurance" title="Fasal Bima Yojana" body="Comprehensive insurance coverage against non-preventable natural risks." cta="Apply Now" />
              <SchemeCard tone="amber" tag="Modernization" title="Drone Subsidy" body="Up to 75% subsidy for purchasing agri-drones for pesticide spraying." cta="View Details" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function CTACard({
  to, icon, tint, title, body,
}: { to: string; icon: React.ReactNode; tint: string; title: string; body: string }) {
  return (
    <Link to={to} className="group glass-panel p-6 rounded-[2rem] hover:bg-white/65 transition-all cursor-pointer ring-1 ring-foreground/5">
      <div className={`size-12 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${tint}`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-sm text-foreground/60 leading-relaxed">{body}</p>
    </Link>
  );
}

function Stat({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) {
  return (
    <div className="p-3.5 bg-white/50 rounded-2xl">
      <p className="text-[10px] uppercase font-bold tracking-widest opacity-50 mb-1 flex items-center gap-1">{icon}{label}</p>
      <p className="font-mono font-bold">{value}</p>
    </div>
  );
}

function PriceRow({
  icon, name, grade, price, change, up,
}: { icon: React.ReactNode; name: string; grade: string; price: string; change: string; up?: boolean }) {
  return (
    <div className="flex items-center justify-between p-4 bg-white/45 rounded-2xl border border-white/60 hover:border-primary/30 transition-colors">
      <div className="flex items-center gap-4">
        <div className="size-10 bg-white rounded-full grid place-items-center text-xl">{icon}</div>
        <div>
          <p className="font-bold">{name}</p>
          <p className="text-xs text-foreground/50">{grade}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-mono font-bold">{price}<span className="text-[10px] font-normal text-foreground/40"> /qt</span></p>
        <p className={`text-xs font-bold flex items-center gap-1 justify-end ${up ? "text-emerald-600" : "text-red-500"}`}>
          {up ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />} {change}
        </p>
      </div>
    </div>
  );
}

function SchemeCard({
  tone, tag, title, body, cta,
}: { tone: "primary" | "sky" | "amber"; tag: string; title: string; body: string; cta: string }) {
  const toneMap = {
    primary: { border: "border-l-primary", text: "text-primary", bg: "bg-primary/10" },
    sky: { border: "border-l-[color:var(--sky-brand)]", text: "text-[color:var(--sky-brand)]", bg: "bg-[color:var(--sky-brand)]/10" },
    amber: { border: "border-l-[color:var(--amber-brand)]", text: "text-[color:var(--amber-brand)]", bg: "bg-[color:var(--amber-brand)]/10" },
  }[tone];
  return (
    <div className={`glass-panel p-7 rounded-[2rem] border-l-4 ${toneMap.border}`}>
      <p className={`text-[10px] font-bold uppercase tracking-widest mb-2 ${toneMap.text}`}>{tag}</p>
      <h4 className="text-xl font-bold mb-3">{title}</h4>
      <p className="text-sm text-foreground/60 mb-6">{body}</p>
      <button className={`w-full py-3 rounded-xl text-xs font-bold border border-foreground/5 ${toneMap.bg} ${toneMap.text}`}>{cta}</button>
    </div>
  );
}
