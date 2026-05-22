import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/schemes")({
  head: () => ({
    meta: [
      { title: "Government Schemes — AgriAI Assist" },
      { name: "description", content: "Discover government schemes, subsidies, insurance and loans available to Indian farmers." },
      { property: "og:title", content: "Government Schemes — AgriAI Assist" },
      { property: "og:description", content: "Government schemes, subsidies and insurance for farmers." },
    ],
  }),
  component: SchemesPage,
});

type Scheme = {
  tag: string; tone: "primary" | "sky" | "amber";
  title: string; body: string;
  eligibility: string; benefits: string; cta: string;
};

const SCHEMES: Scheme[] = [
  {
    tag: "Direct Benefit", tone: "primary", title: "PM-KISAN Nidhi",
    body: "Income support of ₹6,000 per year for all landholding farmers' families, paid in three equal installments.",
    eligibility: "All landholding farmer families (with valid land records).",
    benefits: "₹2,000 every 4 months directly to bank account.", cta: "Check Eligibility",
  },
  {
    tag: "Crop Insurance", tone: "sky", title: "Pradhan Mantri Fasal Bima Yojana",
    body: "Comprehensive crop insurance against natural calamities, pests and diseases.",
    eligibility: "All farmers growing notified crops in notified areas.",
    benefits: "Low premium (1.5%–5%), full sum insured on loss.", cta: "Apply Now",
  },
  {
    tag: "Credit", tone: "amber", title: "Kisan Credit Card (KCC)",
    body: "Short-term credit at subsidized interest rates for cultivation, post-harvest and consumption needs.",
    eligibility: "All farmers, tenants, sharecroppers and SHGs.",
    benefits: "Loans up to ₹3 lakh at 4% effective interest.", cta: "View Details",
  },
  {
    tag: "Modernization", tone: "primary", title: "Sub-Mission on Agricultural Mechanization",
    body: "Subsidies on tractors, harvesters, and modern farm machinery for individual farmers and FPOs.",
    eligibility: "Individual farmers and Farmer Producer Organisations.",
    benefits: "40%–80% subsidy on eligible equipment.", cta: "Apply Now",
  },
  {
    tag: "Irrigation", tone: "sky", title: "PM Krishi Sinchayee Yojana",
    body: "Micro-irrigation and water-conservation infrastructure to ensure 'Har Khet Ko Pani'.",
    eligibility: "All farmers with usable land.",
    benefits: "Up to 55% subsidy for small/marginal farmers.", cta: "Check Eligibility",
  },
  {
    tag: "Aerial", tone: "amber", title: "Drone Subsidy Scheme",
    body: "Financial assistance for purchase of agri-drones for spraying and crop monitoring.",
    eligibility: "FPOs, custom hiring centres, agri-graduates.",
    benefits: "Up to 75% subsidy (max ₹10 lakh).", cta: "View Details",
  },
];

const TONE = {
  primary: { border: "border-l-primary", text: "text-primary", bg: "bg-primary/10" },
  sky: { border: "border-l-[color:var(--sky-brand)]", text: "text-[color:var(--sky-brand)]", bg: "bg-[color:var(--sky-brand)]/10" },
  amber: { border: "border-l-[color:var(--amber-brand)]", text: "text-[color:var(--amber-brand)]", bg: "bg-[color:var(--amber-brand)]/15" },
};

function SchemesPage() {
  return (
    <>
      <Nav />
      <main className="max-w-7xl mx-auto px-4 md:px-6 pt-10 pb-16">
        <div className="text-center mb-8 animate-fade-up">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter">Government Support</h1>
          <p className="text-foreground/60 mt-2">Schemes, subsidies and insurance designed for Indian farmers.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SCHEMES.map((s) => {
            const t = TONE[s.tone];
            return (
              <div key={s.title} className={`glass-panel rounded-[2rem] p-7 border-l-4 ${t.border} flex flex-col`}>
                <p className={`text-[10px] font-bold uppercase tracking-widest mb-2 ${t.text}`}>{s.tag}</p>
                <h3 className="text-xl font-bold mb-3">{s.title}</h3>
                <p className="text-sm text-foreground/60 mb-4">{s.body}</p>
                <dl className="text-xs space-y-2 mb-6 flex-grow">
                  <div><dt className="font-bold text-foreground/70">Eligibility</dt><dd className="text-foreground/60">{s.eligibility}</dd></div>
                  <div><dt className="font-bold text-foreground/70">Benefits</dt><dd className="text-foreground/60">{s.benefits}</dd></div>
                </dl>
                <button className={`w-full py-3 rounded-xl text-xs font-bold border border-foreground/5 ${t.bg} ${t.text}`}>{s.cta}</button>
              </div>
            );
          })}
        </div>
      </main>
      <Footer />
    </>
  );
}
