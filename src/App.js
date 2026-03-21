import { useState, useEffect, useRef } from "react";

// ─── Utility: useInView hook ──────────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

// ─── Icons (inline SVGs, no deps) ─────────────────────────────────────────────
const Icon = {
  Sparkles: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"/>
      <path d="M18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z"/>
    </svg>
  ),
  BarChart: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <path d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"/>
    </svg>
  ),
  DollarSign: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <path d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
    </svg>
  ),
  Layers: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <path d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3"/>
    </svg>
  ),
  Check: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <path d="M4.5 12.75l6 6 9-13.5"/>
    </svg>
  ),
  ArrowRight: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <path d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"/>
    </svg>
  ),
  X: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <path d="M6 18L18 6M6 6l12 12"/>
    </svg>
  ),
  Zap: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <path d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/>
    </svg>
  ),
};

// ─── Spinner ──────────────────────────────────────────────────────────────────
function Spinner() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ animation: "spin 0.75s linear infinite" }}>
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
    </svg>
  );
}

// ─── Styles injected into <head> ──────────────────────────────────────────────
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,300;1,9..144,400&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --bg: #0e0d0c;
      --bg2: #141310;
      --bg3: #1a1816;
      --border: rgba(255,255,255,0.07);
      --gold: #c9a84c;
      --gold-light: #e8c97a;
      --gold-dim: rgba(201,168,76,0.15);
      --cream: #f5f0e8;
      --muted: rgba(245,240,232,0.45);
      --subtle: rgba(245,240,232,0.2);
      --red-dim: rgba(220,80,80,0.15);
      --red: #e05555;
    }

    html { scroll-behavior: smooth; }

    body {
      background: var(--bg);
      color: var(--cream);
      font-family: 'DM Sans', sans-serif;
      font-size: 16px;
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
      overflow-x: hidden;
    }

    .display { font-family: 'Fraunces', Georgia, serif; }

    /* Noise texture overlay */
    body::before {
      content: '';
      position: fixed;
      inset: 0;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
      pointer-events: none;
      z-index: 9999;
      opacity: 0.4;
    }

    .fade-up { opacity: 0; transform: translateY(28px); transition: opacity 0.7s ease, transform 0.7s ease; }
    .fade-up.visible { opacity: 1; transform: translateY(0); }
    .fade-up-d1 { transition-delay: 0.1s; }
    .fade-up-d2 { transition-delay: 0.2s; }
    .fade-up-d3 { transition-delay: 0.3s; }
    .fade-up-d4 { transition-delay: 0.4s; }

    .btn-primary {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: var(--gold);
      color: #0e0d0c;
      font-family: 'DM Sans', sans-serif;
      font-weight: 500;
      font-size: 0.9rem;
      letter-spacing: 0.02em;
      padding: 13px 28px;
      border-radius: 6px;
      border: none;
      cursor: pointer;
      transition: background 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease;
      box-shadow: 0 0 0 0 rgba(201,168,76,0);
      text-decoration: none;
    }
    .btn-primary:hover {
      background: var(--gold-light);
      transform: translateY(-1px);
      box-shadow: 0 8px 30px rgba(201,168,76,0.3);
    }
    .btn-primary:active { transform: translateY(0); }

    .btn-ghost {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: transparent;
      color: var(--cream);
      font-family: 'DM Sans', sans-serif;
      font-weight: 400;
      font-size: 0.85rem;
      padding: 11px 22px;
      border-radius: 6px;
      border: 1px solid var(--border);
      cursor: pointer;
      transition: border-color 0.2s, background 0.2s;
      text-decoration: none;
    }
    .btn-ghost:hover { border-color: rgba(255,255,255,0.2); background: rgba(255,255,255,0.04); }

    .card {
      background: var(--bg2);
      border: 1px solid var(--border);
      border-radius: 12px;
      transition: border-color 0.25s, transform 0.25s, box-shadow 0.25s;
    }
    .card:hover {
      border-color: rgba(201,168,76,0.25);
      transform: translateY(-3px);
      box-shadow: 0 20px 60px rgba(0,0,0,0.4);
    }

    .gold-tag {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 0.72rem;
      font-weight: 500;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--gold);
      background: var(--gold-dim);
      border: 1px solid rgba(201,168,76,0.2);
      border-radius: 100px;
      padding: 5px 14px;
    }

    input, select, textarea {
      width: 100%;
      background: var(--bg3);
      border: 1px solid var(--border);
      border-radius: 8px;
      color: var(--cream);
      font-family: 'DM Sans', sans-serif;
      font-size: 0.9rem;
      padding: 13px 16px;
      outline: none;
      transition: border-color 0.2s;
    }
    input::placeholder, textarea::placeholder { color: var(--subtle); }
    input:focus, select:focus, textarea:focus { border-color: var(--gold); }
    input.err, select.err, textarea.err { border-color: var(--red); }

    select option { background: #1a1816; }

    .checkbox-wrap {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      cursor: pointer;
      user-select: none;
    }
    .checkbox-custom {
      width: 18px; height: 18px; flex-shrink: 0;
      background: var(--bg3);
      border: 1px solid var(--border);
      border-radius: 4px;
      display: flex; align-items: center; justify-content: center;
      margin-top: 2px;
      transition: background 0.2s, border-color 0.2s;
    }
    .checkbox-custom.checked { background: var(--gold); border-color: var(--gold); color: #0e0d0c; }

    .divider { width: 100%; height: 1px; background: var(--border); }

    .glow-orb {
      position: absolute;
      border-radius: 50%;
      filter: blur(90px);
      pointer-events: none;
    }

    @media (max-width: 768px) {
      .hide-mobile { display: none !important; }

      /* Navbar */
      .nav-cta { font-size: 0.75rem !important; padding: 8px 14px !important; }

      /* Sections */
      .section-pad { padding: 64px 20px !important; }

      /* Hero */
      .hero-stats { gap: 20px !important; flex-wrap: wrap; justify-content: center; }
      .hero-stats > div { min-width: 80px; }

      /* Grids → single column on mobile */
      .grid-features  { grid-template-columns: 1fr !important; }
      .grid-stages    { grid-template-columns: 1fr !important; }
      .grid-beta      { grid-template-columns: 1fr 1fr !important; }
      .grid-budget    { grid-template-columns: 1fr 1fr !important; }

      /* Problem cards */
      .problem-card-text { font-size: 0.85rem !important; }

      /* Form card */
      .form-card { padding: 24px 20px !important; }

      /* Final CTA */
      .final-cta-btn { width: 100% !important; justify-content: center !important; }

      /* Footer */
      .footer-inner { flex-direction: column !important; align-items: center !important; text-align: center; gap: 10px !important; }
    }

    /* Tablet */
    @media (min-width: 769px) and (max-width: 1024px) {
      .hide-desktop { display: none !important; }
      .grid-features { grid-template-columns: 1fr 1fr !important; }
      .grid-stages   { grid-template-columns: 1fr 1fr 1fr !important; }
      .grid-beta     { grid-template-columns: 1fr 1fr !important; }
      .section-pad   { padding: 80px 40px !important; }
    }

    @media (min-width: 1025px) {
      .hide-desktop { display: none !important; }
    }

    @keyframes spin { to { transform: rotate(360deg); } }
  `}</style>
);

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar({ onCTAClick }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: "0 24px",
      height: 64,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: scrolled ? "rgba(14,13,12,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
      transition: "all 0.3s ease",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{
          width: 28, height: 28, borderRadius: 7,
          background: "linear-gradient(135deg, var(--gold), #8b5e1a)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 13, fontWeight: 700, color: "#0e0d0c",
        }}>C</div>
        <span style={{ fontFamily: "Fraunces, serif", fontWeight: 500, fontSize: "1rem", color: "var(--cream)", letterSpacing: "-0.01em" }}>
          CreatorMate<span style={{ color: "var(--gold)" }}>.ai</span>
        </span>
      </div>

      <div className="hide-mobile" style={{ display: "flex", alignItems: "center", gap: 32 }}>
        {["Features", "For Creators", "Beta"].map(label => (
          <a key={label} href={`#${label.toLowerCase().replace(/ /g, "-")}`}
            style={{ color: "var(--muted)", fontSize: "0.85rem", textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={e => e.target.style.color = "var(--cream)"}
            onMouseLeave={e => e.target.style.color = "var(--muted)"}
          >{label}</a>
        ))}
      </div>

      <button className="btn-primary nav-cta" style={{ fontSize: "0.82rem", padding: "10px 20px" }} onClick={onCTAClick}>
        Get Early Access
      </button>
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero({ onCTAClick }) {
  return (
    <section style={{
      position: "relative", overflow: "hidden",
      minHeight: "100vh",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      padding: "120px 24px 80px",
      textAlign: "center",
    }}>
      {/* Background orbs */}
      <div className="glow-orb" style={{ width: 600, height: 600, background: "rgba(201,168,76,0.07)", top: "10%", left: "50%", transform: "translateX(-50%)" }} />
      <div className="glow-orb" style={{ width: 300, height: 300, background: "rgba(201,168,76,0.05)", bottom: "15%", right: "10%" }} />

      {/* Grid lines */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
        backgroundSize: "80px 80px",
        maskImage: "radial-gradient(ellipse 70% 70% at 50% 30%, black, transparent)",
      }} />

      <div style={{ position: "relative", maxWidth: 780, zIndex: 1 }}>
        <div className="fade-up" style={{ marginBottom: 28 }}>
          <span className="gold-tag">
            <Icon.Zap /> Beta Access — Limited Spots
          </span>
        </div>

        <h1 className="display fade-up fade-up-d1" style={{
          fontSize: "clamp(2.6rem, 7vw, 5.2rem)",
          fontWeight: 600,
          lineHeight: 1.08,
          letterSpacing: "-0.03em",
          color: "var(--cream)",
          marginBottom: 20,
        }}>
          By signing up, you're<br />
          <em style={{ fontStyle: "italic", color: "var(--gold)" }}>already in the top 10%.</em>
        </h1>

        <p className="fade-up fade-up-d2" style={{
          fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
          color: "var(--muted)",
          fontWeight: 300,
          letterSpacing: "0.02em",
          marginBottom: 12,
        }}>
          Most creators wait. The best ones don't.
        </p>

        <p className="fade-up fade-up-d2" style={{
          fontSize: "clamp(0.9rem, 2vw, 1.05rem)",
          color: "var(--subtle)",
          maxWidth: 560,
          margin: "0 auto 44px",
          lineHeight: 1.7,
        }}>
          Your AI co-pilot for creator growth. Plan content, grow faster,<br className="hide-mobile" />
          and monetize smarter — all in one place.
        </p>

        <div className="fade-up fade-up-d3" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
          <button className="btn-primary" style={{ fontSize: "0.95rem", padding: "15px 36px" }} onClick={onCTAClick}>
            Get Early Access <Icon.ArrowRight />
          </button>
          <p style={{ fontSize: "0.78rem", color: "var(--subtle)", letterSpacing: "0.04em" }}>
            Join early creators testing CreatorMate — Free for 30 days
          </p>
        </div>

        {/* Social proof strip */}
        <div className="fade-up fade-up-d4 hero-stats" style={{
          marginTop: 64,
          display: "flex", alignItems: "center", justifyContent: "center", gap: 24,
          flexWrap: "wrap",
        }}>
          {[
            { n: "500+", label: "Beta Signups" },
            { n: "4 Platforms", label: "Supported" },
            { n: "30 Days", label: "Free Trial" },
          ].map(({ n, label }) => (
            <div key={n} style={{ textAlign: "center" }}>
              <div className="display" style={{ fontSize: "1.5rem", fontWeight: 600, color: "var(--cream)" }}>{n}</div>
              <div style={{ fontSize: "0.72rem", color: "var(--subtle)", letterSpacing: "0.08em", textTransform: "uppercase" }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Problem Section ──────────────────────────────────────────────────────────
const problems = [
  { icon: "😶‍🌫️", text: "Struggling to stay consistent" },
  { icon: "🪫", text: "Running out of content ideas" },
  { icon: "📉", text: "Not knowing how to grow" },
  { icon: "💸", text: "Difficulty monetizing your audience" },
  { icon: "😮‍💨", text: "Doing everything alone, burning out" },
];

function Problem() {
  const [ref, visible] = useInView();
  return (
    <section id="for-creators" ref={ref} style={{ padding: "100px 24px", maxWidth: 900, margin: "0 auto" }} className="section-pad">
      <div className={`fade-up ${visible ? "visible" : ""}`} style={{ textAlign: "center", marginBottom: 60 }}>
        <span className="gold-tag" style={{ marginBottom: 20, display: "inline-flex" }}>The Problem</span>
        <h2 className="display" style={{ fontSize: "clamp(2rem, 5vw, 3.4rem)", fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.15, color: "var(--cream)", marginTop: 16 }}>
          The creator life is harder<br />
          <em style={{ fontStyle: "italic", color: "var(--gold)" }}>than it looks.</em>
        </h2>
      </div>

      <div style={{ display: "grid", gap: 12, maxWidth: 680, margin: "0 auto 48px" }}>
        {problems.map(({ icon, text }, i) => (
          <div key={i} className={`card fade-up fade-up-d${Math.min(i + 1, 4)} ${visible ? "visible" : ""}`}
            style={{ padding: "18px 24px", display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ fontSize: "1.3rem", flexShrink: 0 }}>{icon}</div>
            <div style={{
              width: 6, height: 6, borderRadius: "50%",
              background: "var(--red)", flexShrink: 0,
            }} />
            <span className="problem-card-text" style={{ color: "var(--muted)", fontSize: "0.92rem" }}>{text}</span>
            <div style={{ marginLeft: "auto", flexShrink: 0 }}><Icon.X /></div>
          </div>
        ))}
      </div>

      <div className={`fade-up ${visible ? "visible" : ""}`} style={{ textAlign: "center" }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 12,
          background: "var(--gold-dim)", border: "1px solid rgba(201,168,76,0.25)",
          borderRadius: 10, padding: "18px 32px",
        }}>
          <span style={{ fontSize: "1.4rem" }}>✦</span>
          <span className="display" style={{ fontSize: "1.3rem", color: "var(--gold)", fontWeight: 500, letterSpacing: "-0.01em" }}>
            CreatorMate fixes this.
          </span>
        </div>
      </div>
    </section>
  );
}

// ─── Features ─────────────────────────────────────────────────────────────────
const features = [
  {
    icon: <Icon.Sparkles />,
    title: "AI Content Engine",
    tag: "Create",
    items: ["Viral content ideas tailored to your niche", "Full scripts & caption generation", "Hook suggestions that stop the scroll"],
  },
  {
    icon: <Icon.BarChart />,
    title: "Growth Analytics",
    tag: "Analyze",
    items: ["Track performance across all platforms", "Identify exactly what content works", "Actionable weekly growth insights"],
  },
  {
    icon: <Icon.DollarSign />,
    title: "Monetization Assistant",
    tag: "Earn",
    items: ["Discover relevant brand deals for your niche", "Pricing guidance based on your metrics", "Automated outreach sequences"],
  },
  {
    icon: <Icon.Layers />,
    title: "Creator Workflow Hub",
    tag: "Organize",
    items: ["Full pipeline: Plan → Create → Post → Analyze", "Replace 6 tools with one dashboard", "Content calendar & deadline tracking"],
  },
];

function Features() {
  const [ref, visible] = useInView();
  return (
    <section id="features" ref={ref} style={{ padding: "100px 24px", background: "var(--bg2)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }} className="section-pad">
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div className={`fade-up ${visible ? "visible" : ""}`} style={{ textAlign: "center", marginBottom: 64 }}>
          <span className="gold-tag" style={{ marginBottom: 20, display: "inline-flex" }}>What You Get</span>
          <h2 className="display" style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.15, color: "var(--cream)", marginTop: 16 }}>
            Everything a creator needs.<br />
            <em style={{ fontStyle: "italic", color: "var(--gold)" }}>Nothing they don't.</em>
          </h2>
        </div>

        <div className="grid-features" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
          {features.map(({ icon, title, tag, items }, i) => (
            <div key={i} className={`card fade-up fade-up-d${i + 1} ${visible ? "visible" : ""}`}
              style={{ padding: "28px" }}>
              <div style={{ marginBottom: 20, display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 10,
                  background: "var(--gold-dim)", color: "var(--gold)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>{icon}</div>
                <span style={{
                  fontSize: "0.68rem", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase",
                  color: "var(--gold)", background: "var(--gold-dim)", border: "1px solid rgba(201,168,76,0.15)",
                  borderRadius: 100, padding: "3px 10px",
                }}>{tag}</span>
              </div>
              <h3 style={{ fontFamily: "Fraunces, serif", fontSize: "1.25rem", fontWeight: 500, color: "var(--cream)", marginBottom: 14, letterSpacing: "-0.01em" }}>{title}</h3>
              <ul style={{ listStyle: "none" }}>
                {items.map((item, j) => (
                  <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 10, color: "var(--muted)", fontSize: "0.85rem" }}>
                    <span style={{ color: "var(--gold)", marginTop: 3, flexShrink: 0 }}><Icon.Check /></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── For Every Creator ─────────────────────────────────────────────────────────
const stages = [
  {
    level: "Beginner",
    sub: "0 – 10k followers",
    emoji: "🌱",
    color: "rgba(100, 200, 120, 0.12)",
    colorBorder: "rgba(100, 200, 120, 0.2)",
    colorText: "#7dba8c",
    items: ["Discover exactly what to post", "Build consistency with AI scheduling", "Grow your first 1,000 followers"],
  },
  {
    level: "Growing",
    sub: "10k – 100k followers",
    emoji: "🚀",
    color: "rgba(201,168,76,0.1)",
    colorBorder: "rgba(201,168,76,0.2)",
    colorText: "var(--gold)",
    items: ["Scale content output without burnout", "Optimize for the algorithm", "Start landing your first brand deals"],
  },
  {
    level: "Advanced",
    sub: "100k+ followers",
    emoji: "💎",
    color: "rgba(160, 120, 220, 0.1)",
    colorBorder: "rgba(160, 120, 220, 0.2)",
    colorText: "#b48fe0",
    items: ["Maximize monetization per post", "Manage & negotiate brand deals", "Save 10+ hours a week on operations"],
  },
];

function ForCreators() {
  const [ref, visible] = useInView();
  return (
    <section id="for-creators" ref={ref} style={{ padding: "100px 24px", maxWidth: 1100, margin: "0 auto" }} className="section-pad">
      <div className={`fade-up ${visible ? "visible" : ""}`} style={{ textAlign: "center", marginBottom: 64 }}>
        <span className="gold-tag" style={{ marginBottom: 20, display: "inline-flex" }}>For Every Stage</span>
        <h2 className="display" style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.15, color: "var(--cream)", marginTop: 16 }}>
          Wherever you are, we meet<br />
          <em style={{ fontStyle: "italic", color: "var(--gold)" }}>you there.</em>
        </h2>
      </div>

      <div className="grid-stages" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
        {stages.map(({ level, sub, emoji, color, colorBorder, colorText, items }, i) => (
          <div key={i} className={`card fade-up fade-up-d${i + 1} ${visible ? "visible" : ""}`}
            style={{ padding: "32px", background: color, borderColor: colorBorder }}>
            <div style={{ fontSize: "2rem", marginBottom: 16 }}>{emoji}</div>
            <div style={{ marginBottom: 4 }}>
              <span style={{ fontFamily: "Fraunces, serif", fontSize: "1.4rem", fontWeight: 600, color: colorText }}>{level}</span>
            </div>
            <div style={{ fontSize: "0.75rem", color: "var(--subtle)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 24 }}>{sub}</div>
            <ul style={{ listStyle: "none" }}>
              {items.map((item, j) => (
                <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 12, color: "var(--muted)", fontSize: "0.88rem" }}>
                  <span style={{ color: colorText, marginTop: 3, flexShrink: 0 }}><Icon.Check /></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Beta Offer ───────────────────────────────────────────────────────────────
function BetaOffer({ onCTAClick }) {
  const [ref, visible] = useInView();
  const points = [
    { icon: "🎁", text: "Completely free for 30 days" },
    { icon: "🔒", text: "Limited early user spots" },
    { icon: "🛠️", text: "Help shape the product roadmap" },
    { icon: "⚡", text: "Founding member pricing after beta" },
  ];

  return (
    <section id="beta" ref={ref} style={{ padding: "100px 24px", background: "var(--bg2)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }} className="section-pad">
      <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
        <div className={`fade-up ${visible ? "visible" : ""}`}>
          <span className="gold-tag" style={{ marginBottom: 24, display: "inline-flex" }}>Beta Program</span>
          <h2 className="display" style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.15, color: "var(--cream)", marginTop: 16, marginBottom: 48 }}>
            Join the<br />
            <em style={{ fontStyle: "italic", color: "var(--gold)" }}>CreatorMate Beta</em>
          </h2>
        </div>

        <div className="grid-beta" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 48 }}>
          {points.map(({ icon, text }, i) => (
            <div key={i} className={`card fade-up fade-up-d${i + 1} ${visible ? "visible" : ""}`}
              style={{ padding: "22px", textAlign: "center" }}>
              <div style={{ fontSize: "1.8rem", marginBottom: 10 }}>{icon}</div>
              <div style={{ color: "var(--muted)", fontSize: "0.85rem", lineHeight: 1.5 }}>{text}</div>
            </div>
          ))}
        </div>

        <div className={`fade-up ${visible ? "visible" : ""}`}>
          <button className="btn-primary" style={{ fontSize: "1rem", padding: "16px 40px" }} onClick={onCTAClick}>
            Get Early Access <Icon.ArrowRight />
          </button>
          <p style={{ marginTop: 12, fontSize: "0.78rem", color: "var(--subtle)" }}>No credit card required.</p>
        </div>
      </div>
    </section>
  );
}

// ─── Signup Form ──────────────────────────────────────────────────────────────
function SignupForm({ formRef }) {
  const [ref, visible] = useInView();
  const [fields, setFields] = useState({ name: "", email: "", handle: "", struggle: "", willing: false, budget: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const budgetOptions = [
    { value: "under_999",  label: "< ₹999",          sublabel: "/ month", desc: "Starter" },
    { value: "999_4999",   label: "₹999 – 4,999",    sublabel: "/ month", desc: "Growth" },
    { value: "4999_9999",  label: "₹4,999 – 9,999",  sublabel: "/ month", desc: "Pro" },
    { value: "above_9999", label: "> ₹9,999",         sublabel: "/ month", desc: "Power" },
  ];

  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // ✅ Paste your Apps Script Web App URL here after setup
  const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyrSZwxXWiJUraVLev0BFyPrQkmeNkqDpgQABwS8-qCMXDchYGLgQPnklcOW8mslOfN/exec";

  const set = (k, v) => {
    setFields(f => ({ ...f, [k]: v }));
    setErrors(e => ({ ...e, [k]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!fields.name.trim()) e.name = "Name is required";
    if (!fields.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) e.email = "Invalid email";
    if (!fields.handle.trim()) e.handle = "Handle is required";
    return e;
  };

  const submit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }

    setLoading(true);
    setSubmitError("");

    const payload = {
      name:      fields.name.trim(),
      email:     fields.email.trim(),
      handle:    fields.handle.trim(),
      struggle:  fields.struggle.trim() || "—",
      willing:   fields.willing ? "Yes" : "No",
      budget:    fields.willing && fields.budget
                   ? budgetOptions.find(b => b.value === fields.budget)?.label || fields.budget
                   : "—",
      timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
    };

    // Apps Script with no-cors requires form-encoded data, not JSON
    const formData = new FormData();
    Object.entries(payload).forEach(([k, v]) => formData.append(k, v));

    try {
      await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        body: formData,
      });
      setSubmitted(true);
    } catch (err) {
      setSubmitError("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) return (
    <section id="signup" ref={formRef} style={{ padding: "100px 24px", maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
      <div style={{ fontSize: "3rem", marginBottom: 24 }}>🎉</div>
      <h2 className="display" style={{ fontSize: "2.4rem", fontWeight: 600, color: "var(--cream)", letterSpacing: "-0.02em", marginBottom: 16 }}>
        You're in the top 10%.
      </h2>
      <p style={{ color: "var(--muted)", fontSize: "1rem" }}>
        We'll reach out soon with your beta access. Get ready to grow.
      </p>
    </section>
  );

  return (
    <section id="signup" ref={formRef} style={{ padding: "100px 24px" }}>
      <div ref={ref} style={{ maxWidth: 600, margin: "0 auto" }}>
        <div className={`fade-up ${visible ? "visible" : ""}`} style={{ textAlign: "center", marginBottom: 48 }}>
          <span className="gold-tag" style={{ marginBottom: 20, display: "inline-flex" }}>Get Access</span>
          <h2 className="display" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.15, color: "var(--cream)", marginTop: 16 }}>
            Claim your spot.
          </h2>
          <p style={{ color: "var(--muted)", fontSize: "0.9rem", marginTop: 12 }}>Beta is invite-only. Fill in your details below.</p>
        </div>

        <div className={`card form-card fade-up fade-up-d1 ${visible ? "visible" : ""}`} style={{ padding: "36px" }}>
          <div style={{ display: "grid", gap: 20 }}>
            <div>
              <label style={{ display: "block", fontSize: "0.78rem", letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--subtle)", marginBottom: 8 }}>Full Name *</label>
              <input className={errors.name ? "err" : ""} placeholder="Your name" value={fields.name} onChange={e => set("name", e.target.value)} />
              {errors.name && <p style={{ color: "var(--red)", fontSize: "0.75rem", marginTop: 6 }}>{errors.name}</p>}
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.78rem", letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--subtle)", marginBottom: 8 }}>Email Address *</label>
              <input type="email" className={errors.email ? "err" : ""} placeholder="you@example.com" value={fields.email} onChange={e => set("email", e.target.value)} />
              {errors.email && <p style={{ color: "var(--red)", fontSize: "0.75rem", marginTop: 6 }}>{errors.email}</p>}
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.78rem", letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--subtle)", marginBottom: 8 }}>Instagram or YouTube Handle *</label>
              <input className={errors.handle ? "err" : ""} placeholder="@yourhandle" value={fields.handle} onChange={e => set("handle", e.target.value)} />
              {errors.handle && <p style={{ color: "var(--red)", fontSize: "0.75rem", marginTop: 6 }}>{errors.handle}</p>}
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.78rem", letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--subtle)", marginBottom: 8 }}>Biggest Struggle as a Creator? <span style={{ opacity: 0.5 }}>(optional)</span></label>
              <textarea rows={3} placeholder="e.g. I run out of ideas every week..." value={fields.struggle} onChange={e => set("struggle", e.target.value)} style={{ resize: "none" }} />
            </div>

            <div>
              <label className="checkbox-wrap" onClick={() => { set("willing", !fields.willing); if (fields.willing) set("budget", ""); }}>
                <div className={`checkbox-custom ${fields.willing ? "checked" : ""}`}>
                  {fields.willing && <Icon.Check />}
                </div>
                <span style={{ color: "var(--muted)", fontSize: "0.85rem", lineHeight: 1.5 }}>
                  I'd be willing to pay if CreatorMate delivers real results for my growth
                </span>
              </label>

              <div style={{
                maxHeight: fields.willing ? 200 : 0,
                opacity: fields.willing ? 1 : 0,
                overflow: "hidden",
                transition: "max-height 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease",
                marginTop: fields.willing ? 16 : 0,
              }}>
                <p style={{ fontSize: "0.75rem", letterSpacing: "0.07em", textTransform: "uppercase", color: "var(--subtle)", marginBottom: 10 }}>
                  What would you be comfortable paying?
                </p>
                <div className="grid-budget" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  {budgetOptions.map(({ value, label, sublabel, desc }) => {
                    const selected = fields.budget === value;
                    return (
                      <button key={value} type="button"
                        onClick={() => set("budget", value)}
                        style={{
                          background: selected ? "var(--gold-dim)" : "var(--bg3)",
                          border: `1px solid ${selected ? "rgba(201,168,76,0.45)" : "var(--border)"}`,
                          borderRadius: 8,
                          padding: "12px 14px",
                          cursor: "pointer",
                          textAlign: "left",
                          transition: "all 0.18s ease",
                          transform: selected ? "translateY(-1px)" : "none",
                          boxShadow: selected ? "0 4px 16px rgba(201,168,76,0.15)" : "none",
                        }}
                      >
                        <div style={{
                          display: "flex", alignItems: "baseline", gap: 4,
                          fontFamily: "Fraunces, serif",
                          fontSize: "0.95rem", fontWeight: 600,
                          color: selected ? "var(--gold)" : "var(--cream)",
                          marginBottom: 3,
                        }}>
                          {label}
                          <span style={{ fontFamily: "DM Sans, sans-serif", fontSize: "0.65rem", fontWeight: 400, color: "var(--subtle)" }}>{sublabel}</span>
                        </div>
                        <div style={{ fontSize: "0.68rem", letterSpacing: "0.07em", textTransform: "uppercase", color: selected ? "var(--gold)" : "var(--subtle)" }}>
                          {desc}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <button
              className="btn-primary"
              style={{ width: "100%", justifyContent: "center", fontSize: "0.95rem", padding: "15px", opacity: loading ? 0.7 : 1, cursor: loading ? "not-allowed" : "pointer" }}
              onClick={submit}
              disabled={loading}
            >
              {loading
                ? <><Spinner /> Submitting…</>
                : <> Claim My Early Access <Icon.ArrowRight /></>
              }
            </button>

            {submitError && (
              <p style={{ textAlign: "center", fontSize: "0.78rem", color: "var(--red)", background: "var(--red-dim)", border: "1px solid rgba(220,80,80,0.2)", borderRadius: 6, padding: "10px 14px" }}>
                {submitError}
              </p>
            )}

            <p style={{ textAlign: "center", fontSize: "0.75rem", color: "var(--subtle)" }}>
              Free for 30 days. No credit card required. Cancel anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Final CTA ────────────────────────────────────────────────────────────────
function FinalCTA({ onCTAClick }) {
  const [ref, visible] = useInView();
  return (
    <section ref={ref} style={{
      padding: "120px 24px",
      background: "var(--bg2)",
      borderTop: "1px solid var(--border)",
      position: "relative", overflow: "hidden",
      textAlign: "center",
    }}>
      <div className="glow-orb" style={{ width: 500, height: 500, background: "rgba(201,168,76,0.07)", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} />
      <div style={{ position: "relative", maxWidth: 680, margin: "0 auto" }}>
        <div className={`fade-up ${visible ? "visible" : ""}`}>
          <h2 className="display" style={{ fontSize: "clamp(2.4rem, 7vw, 5rem)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.05, color: "var(--cream)", marginBottom: 24 }}>
            Stop guessing.<br />
            <em style={{ fontStyle: "italic", color: "var(--gold)" }}>Start growing.</em>
          </h2>
          <p style={{ color: "var(--muted)", fontSize: "1rem", marginBottom: 44 }}>
            The top creators don't work harder — they work smarter.<br />CreatorMate is how.
          </p>
          <button className="btn-primary final-cta-btn" style={{ fontSize: "1rem", padding: "16px 44px" }} onClick={onCTAClick}>
            Join Beta Now <Icon.ArrowRight />
          </button>
          <p style={{ marginTop: 16, fontSize: "0.78rem", color: "var(--subtle)" }}>Limited spots. No credit card. Free for 30 days.</p>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--border)", padding: "32px 24px" }}>
      <div className="footer-inner" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
      <span style={{ fontFamily: "Fraunces, serif", fontSize: "0.95rem", color: "var(--subtle)" }}>
        CreatorMate<span style={{ color: "var(--gold)" }}>.ai</span>
      </span>
      <span style={{ fontSize: "0.78rem", color: "var(--subtle)" }}>© 2025 CreatorMate. All rights reserved.</span>
      <div style={{ display: "flex", gap: 24 }}>
        {["Privacy", "Terms"].map(l => (
          <button key={l} onClick={() => {}} style={{ fontSize: "0.78rem", color: "var(--subtle)", textDecoration: "none", background: "none", border: "none", cursor: "pointer", padding: 0 }}>{l}</button>
        ))}
      </div>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const formRef = useRef(null);

  // Trigger fade-up animations after mount
  useEffect(() => {
    // Manually trigger first 6 hero items on load
    setTimeout(() => {
      document.querySelectorAll("section .fade-up").forEach((el, i) => {
        if (i < 6) setTimeout(() => el.classList.add("visible"), i * 80);
      });
    }, 100);
  }, []);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <GlobalStyles />
      {/* SEO Meta rendered via portal if available; inline fallback */}
      <Navbar onCTAClick={scrollToForm} />
      <main>
        <Hero onCTAClick={scrollToForm} />
        <div className="divider" />
        <Problem />
        <Features />
        <ForCreators />
        <BetaOffer onCTAClick={scrollToForm} />
        <SignupForm formRef={formRef} />
        <FinalCTA onCTAClick={scrollToForm} />
      </main>
      <Footer />
    </>
  );
}