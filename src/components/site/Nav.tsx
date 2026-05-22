import { Link } from "@tanstack/react-router";
import { Leaf } from "lucide-react";

const LANGS = ["EN", "HI", "TA", "TE", "ML"] as const;

export function Nav() {
  return (
    <nav className="sticky top-0 z-50 glass-panel-strong rounded-2xl mx-3 md:mx-6 mt-3 md:mt-4 px-4 md:px-6 py-3 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2 group">
        <span className="size-9 rounded-xl bg-primary text-primary-foreground grid place-items-center shadow-[var(--shadow-glow-primary)] group-hover:scale-105 transition-transform">
          <Leaf className="size-4" />
        </span>
        <span className="font-extrabold tracking-tight text-lg md:text-xl text-primary">AgriAI</span>
      </Link>

      <div className="hidden md:flex items-center gap-7 text-sm font-medium text-foreground/80">
        <Link to="/assistant" className="hover:text-primary transition-colors" activeProps={{ className: "text-primary" }}>AI Assistant</Link>
        <Link to="/weather" className="hover:text-primary transition-colors" activeProps={{ className: "text-primary" }}>Weather</Link>
        <Link to="/disease" className="hover:text-primary transition-colors" activeProps={{ className: "text-primary" }}>Disease</Link>
        <Link to="/market" className="hover:text-primary transition-colors" activeProps={{ className: "text-primary" }}>Market</Link>
        <Link to="/schemes" className="hover:text-primary transition-colors" activeProps={{ className: "text-primary" }}>Schemes</Link>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-1.5 glass-panel rounded-full px-3 py-1.5 text-[11px] font-semibold">
          {LANGS.map((l, i) => (
            <span key={l} className="flex items-center gap-1.5">
              <button className={i === 0 ? "text-primary" : "opacity-50 hover:opacity-100 transition"}>{l}</button>
              {i < LANGS.length - 1 ? <span className="text-foreground/20">·</span> : null}
            </span>
          ))}
        </div>
        <Link
          to="/assistant"
          className="bg-primary text-primary-foreground px-4 md:px-5 py-2 rounded-full text-sm font-bold shadow-[var(--shadow-glow-primary)] hover:scale-[1.03] transition-transform"
        >
          Sign In
        </Link>
      </div>
    </nav>
  );
}
