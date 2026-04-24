import { useState, useEffect, useRef } from "react";

const NAV_LINKS = [
  { label: "Home",     href: "/"         },
  { label: "Services", href: "http://localhost:5173/services" },
  { label: "About Us", href: "/about"    },
  { label: "Contact",  href: "/contact"  },
];

const TENETS = [
  { label: "Zero-Trust Native", desc: "No implicit perimeter" },
  { label: "PQC Ready", desc: "Quantum-safe cryptographic layers" },
  { label: "Immutable Core", desc: "Blockchain-anchored auditability" },
  { label: "AI-Augmented", desc: "Sub-millisecond anomaly detection" }
];

const VALUES = [
  { icon: "◈", title: "Radical Transparency", body: "We document every architectural decision, every trade-off, every known risk. Our clients don't inherit black boxes, they inherit fully mapped systems.", accent: "#00FFC6", accentRgb: "0,255,198" },
  { icon: "◉", title: "Decade Thinking", body: "We optimize for the threat model of 2035. Short-term patches aren't solutions — they're technical debt with a fuse. We engineer for the long game.", accent: "#8B5CF6", accentRgb: "139,92,246" },
  { icon: "⬡", title: "Integrated Delivery", body: "Security, AI, blockchain, infrastructure, and frontend are not silos. They are one continuous fabric. We ship integrated systems, or we don't ship at all.", accent: "#A78BFA", accentRgb: "167,139,250" },
  { icon: "✦", title: "Frontier Research", body: "We build at the edge of the possible, tracking NIST drafts and protocol RFCs the week they drop. Research isn't a department here — it's our baseline.", accent: "#6C2BD9", accentRgb: "108,43,217" },
];

const METHODOLOGY = [
  { phase: "01", title: "Adversarial Threat Modeling", desc: "Before a single line of code is written, we construct the system conceptually and attempt to break it. We assume the perimeter is already compromised." },
  { phase: "02", title: "Cryptographic Agility", desc: "Systems are designed with modular cryptographic primitives, allowing seamless hot-swapping to post-quantum algorithms without architectural rebuilds." },
  { phase: "03", title: "Autonomous Operations", desc: "Human latency is a vulnerability. We integrate localized, fine-tuned LLMs and deterministic rule engines to automate threat response and infrastructure scaling." },
];

function AuroraCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf, t = 0;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);
    const orbs = [
      { bx: 0.15, by: 0.2,  r: 420, col: "108,43,217", sp: 0.18, a: 0.09 },
      { bx: 0.85, by: 0.75, r: 500, col: "0,255,198",  sp: 0.13, a: 0.06 },
      { bx: 0.5,  by: 0.5,  r: 350, col: "139,92,246", sp: 0.25, a: 0.07 },
      { bx: 0.75, by: 0.1,  r: 280, col: "167,139,250",sp: 0.2,  a: 0.05 },
      { bx: 0.05, by: 0.85, r: 300, col: "0,255,198",  sp: 0.16, a: 0.04 },
    ];
    const draw = () => {
      const { width: W, height: H } = canvas;
      ctx.clearRect(0, 0, W, H);
      t += 0.002;
      const step = 48;
      for (let x = 0; x < W; x += step) {
        for (let y = 0; y < H; y += step) {
          const d = Math.hypot(x - W / 2, y - H / 2);
          const wave = (Math.sin(d * 0.009 - t * 0.8) + 1) / 2;
          const alpha = wave * 0.06 + 0.012;
          ctx.fillStyle = `rgba(139,92,246,${alpha})`;
          ctx.beginPath(); ctx.arc(x, y, wave > 0.6 ? 1.2 : 0.7, 0, Math.PI * 2); ctx.fill();
        }
      }
      orbs.forEach(({ bx, by, r, col, sp, a }) => {
        const cx = bx * W + Math.sin(t * sp) * 70;
        const cy = by * H + Math.cos(t * sp * 0.7) * 50;
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        g.addColorStop(0, `rgba(${col},${a})`);
        g.addColorStop(0.4, `rgba(${col},${a * 0.5})`);
        g.addColorStop(1, `rgba(${col},0)`);
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} />;
}

function WhiteParticles() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    const COUNT = 110;
    const particles = Array.from({ length: COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.4 + 0.3,
      vx: (Math.random() - 0.5) * 0.18,
      vy: -(Math.random() * 0.22 + 0.06),
      alpha: Math.random() * 0.45 + 0.08,
      flicker: Math.random() * Math.PI * 2,
    }));
    const draw = () => {
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      const now = performance.now() * 0.001;
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < -2) p.x = W + 2;
        if (p.x > W + 2) p.x = -2;
        if (p.y < -2) { p.y = H + 2; p.x = Math.random() * W; }
        const twinkle = (Math.sin(now * 1.1 + p.flicker) + 1) / 2;
        const a = p.alpha * (0.55 + twinkle * 0.45);
        ctx.globalAlpha = a;
        ctx.fillStyle = "#ffffff";
        ctx.shadowBlur = p.r > 1.1 ? 4 : 0;
        ctx.shadowColor = "rgba(255,255,255,0.6)";
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      });
      ctx.globalAlpha = 1; ctx.shadowBlur = 0;
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} style={{ position: "fixed", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }} />;
}

function ValueCard({ v, index }) {
  const [hov, setHov] = useState(false);
  const [vis, setVis] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); io.disconnect(); } }, { threshold: 0.08 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ position: "relative", padding: "32px 26px 28px", borderRadius: 14, background: hov ? `linear-gradient(145deg, rgba(${v.accentRgb},0.1) 0%, rgba(12,8,28,0.6) 100%)` : "linear-gradient(145deg, rgba(255,255,255,0.03) 0%, rgba(8,5,20,0.5) 100%)", backdropFilter: "blur(20px) saturate(160%)", WebkitBackdropFilter: "blur(20px) saturate(160%)", boxShadow: hov ? `0 24px 60px rgba(${v.accentRgb},0.14), 0 4px 20px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.12)` : `0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)`, transform: hov ? "translateY(-8px)" : "translateY(0)", transition: "all 0.5s cubic-bezier(0.34,1.2,0.64,1)", opacity: vis ? 1 : 0, animation: vis ? `cardReveal 0.7s ease ${index * 0.1}s both` : "none", overflow: "hidden", cursor: "default", border: "1px solid transparent" }}
    >
      <div style={{ position: "absolute", inset: 0, borderRadius: 14, zIndex: 0, background: hov ? `linear-gradient(145deg, rgba(${v.accentRgb},0.5) 0%, transparent 45%, rgba(${v.accentRgb},0.15) 100%)` : "linear-gradient(145deg, rgba(255,255,255,0.1) 0%, transparent 60%, rgba(108,43,217,0.12) 100%)", padding: 1, WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", WebkitMaskComposite: "xor", maskComposite: "exclude", transition: "background 0.5s", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: 0, left: "15%", right: "15%", height: 1, background: hov ? `linear-gradient(90deg, transparent, rgba(${v.accentRgb},0.9) 50%, transparent)` : "linear-gradient(90deg, transparent, rgba(255,255,255,0.12) 50%, transparent)", transition: "background 0.4s", zIndex: 3 }} />
      <div style={{ position: "relative", zIndex: 2 }}>
        <div style={{ fontSize: 28, lineHeight: 1, color: hov ? v.accent : "rgba(139,92,246,0.35)", marginBottom: 18, filter: hov ? `drop-shadow(0 0 12px rgba(${v.accentRgb},0.7))` : "none", transition: "color 0.35s, filter 0.35s", fontFamily: "monospace" }}>{v.icon}</div>
        <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 13, fontWeight: 700, color: hov ? v.accent : "#C4BFEA", letterSpacing: "0.06em", marginBottom: 12, lineHeight: 1.3, transition: "color 0.35s" }}>{v.title}</div>
        <p style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 13.5, lineHeight: 1.7, color: hov ? "rgba(200,195,240,0.85)" : "rgba(161,161,194,0.6)", transition: "color 0.35s" }}>{v.body}</p>
        <div style={{ marginTop: 22, height: 1, background: hov ? `linear-gradient(90deg, rgba(${v.accentRgb},0.6), transparent)` : "linear-gradient(90deg, rgba(255,255,255,0.07), transparent)", transition: "background 0.4s" }} />
      </div>
    </div>
  );
}

function TenetPill({ t }) {
  return (
    <div style={{ padding: "16px 20px", borderRadius: 10, background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(108,43,217,0.06) 100%)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08), 0 4px 16px rgba(0,0,0,0.3)", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <div style={{ position: "absolute", top: 0, left: "20%", right: "20%", height: 1, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)" }} />
      <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "14px", fontWeight: 700, color: "#00FFC6", marginBottom: 4, letterSpacing: "0.02em" }}>{t.label}</div>
      <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "11px", fontWeight: 500, color: "rgba(161,161,194,0.7)", letterSpacing: "0.05em" }}>{t.desc}</div>
    </div>
  );
}

function MethodologyCard({ m, index }) {
  const [vis, setVis] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); io.disconnect(); } }, { threshold: 0.1 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ display: "flex", gap: 24, alignItems: "flex-start", opacity: vis ? 1 : 0, animation: vis ? `fadeUp 0.6s ease ${index * 0.15}s both` : "none", padding: "20px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
      <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 24, fontWeight: 900, color: "rgba(108,43,217,0.4)", textShadow: "0 0 12px rgba(108,43,217,0.2)" }}>
        {m.phase}
      </div>
      <div>
        <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 15, fontWeight: 700, color: "#D4D0F5", letterSpacing: "0.04em", marginBottom: 8 }}>{m.title}</div>
        <p style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 14, lineHeight: 1.7, color: "rgba(161,161,194,0.7)", maxWidth: 500 }}>{m.desc}</p>
      </div>
    </div>
  );
}

export default function About() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --bg-deep: #05030D;
          --text-primary: #E9E6FF;
          --text-secondary: #A1A1C2;
          --accent-green: #00FFC6;
          --purple: #6C2BD9;
        }
        html { scroll-behavior: smooth; }
        body { background: var(--bg-deep); }

        @keyframes fadeUp { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes cardReveal { from{opacity:0;transform:translateY(30px) scale(0.96)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes blip { 0%,100%{opacity:0.5;transform:scale(0.9)} 50%{opacity:1;transform:scale(1.2)} }
        @keyframes rotateSlow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes scanH { 0%{transform:translateX(-100%)} 100%{transform:translateX(700%)} }
        @keyframes barPulse { 0%,100%{opacity:0.3;transform:scaleY(0.85)} 50%{opacity:1;transform:scaleY(1)} }
        @keyframes pulseRing { 0%{transform:scale(1);opacity:0.6} 100%{transform:scale(1.8);opacity:0} }
        @keyframes gradientShift { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }

        .nav-link {
          position:relative; font-family:'Rajdhani',sans-serif;
          font-size:12.5px; font-weight:600; letter-spacing:0.1em;
          text-transform:uppercase; color:rgba(161,161,194,0.75);
          text-decoration:none; padding:6px 0; transition:color 0.25s;
        }
        .nav-link.active { color:#00FFC6; }
        .nav-link::after { content:''; position:absolute; bottom:-1px; left:0; width:0; height:1px; background:linear-gradient(90deg,#00FFC6,#8B5CF6); transition:width 0.35s cubic-bezier(0.34,1.4,0.64,1); }
        .nav-link:hover { color:#E9E6FF; }
        .nav-link:hover::after, .nav-link.active::after { width:100%; }

        .values-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:18px; }
        .stats-row { display:grid; grid-template-columns:repeat(2,1fr); gap:14px; }

        @media (max-width: 1100px) {
          .values-grid { grid-template-columns:repeat(2,1fr) !important; }
        }
        @media (max-width: 900px) {
          .hero-split { flex-direction:column !important; gap:32px !important; }
          .mission-panel { width:100% !important; }
          .methodology-split { flex-direction:column !important; gap:40px !important; }
          .cta-panel { width:100% !important; position:static !important; }
        }
        @media (max-width: 660px) {
          .values-grid, .stats-row { grid-template-columns:1fr !important; }
          .desktop-nav { display:none !important; }
          #hamburger { display:flex !important; }
          .hero-split { padding-top: 90px !important; }
        }

        ::-webkit-scrollbar { width:3px; }
        ::-webkit-scrollbar-track { background:var(--bg-deep); }
        ::-webkit-scrollbar-thumb { background:rgba(108,43,217,0.55); border-radius:2px; }
      `}</style>

      <div style={{ width: "100%", minHeight: "100vh", background: "#05030D", position: "relative", overflowX: "hidden" }}>

        <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
          <AuroraCanvas />
        </div>

        <WhiteParticles />

        <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", opacity: 0.025, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`, backgroundRepeat: "repeat", backgroundSize: "128px 128px" }} />

        <div style={{ position: "fixed", top: "35%", left: 0, right: 0, height: 1, zIndex: 1, pointerEvents: "none", overflow: "hidden" }}>
          <div style={{ width: "16%", height: "100%", background: "linear-gradient(90deg,transparent,rgba(0,255,198,0.08),transparent)", animation: "scanH 13s linear infinite" }} />
        </div>

        <nav style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 5%", height: 62,
          background: scrolled ? "rgba(5,3,13,0.88)" : "rgba(5,3,13,0.5)",
          backdropFilter: "blur(20px) saturate(180%)", WebkitBackdropFilter: "blur(20px) saturate(180%)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          transition: "background 0.4s",
          boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.4)" : "none",
        }}>
          <a href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 9 }}>
            <div style={{ width: 30, height: 30, background: "linear-gradient(135deg, rgba(108,43,217,0.3), rgba(0,255,198,0.15))", border: "1px solid rgba(108,43,217,0.4)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(8px)" }}>
              <svg width="16" height="16" viewBox="0 0 32 32" fill="none">
                <polygon points="16,2 29,9 29,23 16,30 3,23 3,9" fill="none" stroke="#6C2BD9" strokeWidth="1.8"/>
                <circle cx="16" cy="16" r="3.5" fill="#00FFC6"/>
              </svg>
            </div>
            <span style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 15, fontWeight: 900, letterSpacing: "0.05em", color: "#E9E6FF" }}>Q<span style={{ color: "#00FFC6" }}>RYP</span>TEX</span>
          </a>

          <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: 32 }}>
            {NAV_LINKS.map((l) => (
              <a key={l.label} href={l.href} className={`nav-link${l.href === "/about" ? " active" : ""}`}>{l.label}</a>
            ))}
          </div>

          <button id="hamburger" onClick={() => setMenuOpen(!menuOpen)} style={{ display: "none", background: "none", border: "none", cursor: "pointer", color: "#E9E6FF" }}>
            <svg width="20" height="20" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.8">
              {menuOpen ? <><line x1="3" y1="3" x2="19" y2="19"/><line x1="19" y1="3" x2="3" y2="19"/></> : <><line x1="2" y1="6" x2="20" y2="6"/><line x1="2" y1="11" x2="20" y2="11"/><line x1="2" y1="16" x2="20" y2="16"/></>}
            </svg>
          </button>
        </nav>

        {menuOpen && (
          <div style={{ position: "fixed", top: 62, left: 0, right: 0, zIndex: 99, background: "rgba(5,3,13,0.96)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(108,43,217,0.18)", padding: "20px 6%", display: "flex", flexDirection: "column", gap: 18, animation: "fadeUp 0.2s ease both" }}>
            {NAV_LINKS.map((l) => (
              <a key={l.label} href={l.href} className="nav-link" onClick={() => setMenuOpen(false)}>{l.label}</a>
            ))}
          </div>
        )}

        <div style={{ position: "relative", zIndex: 2 }}>

          <div style={{ position: "relative", overflow: "hidden", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
            <div style={{ position: "absolute", right: "4%", top: "50%", transform: "translateY(-50%)", width: 360, height: 360, opacity: 0.055, pointerEvents: "none", animation: "rotateSlow 40s linear infinite" }}>
              <svg viewBox="0 0 360 360" fill="none">
                <circle cx="180" cy="180" r="170" stroke="#6C2BD9" strokeWidth="0.8" strokeDasharray="6 6"/>
                <circle cx="180" cy="180" r="132" stroke="#00FFC6" strokeWidth="0.5" strokeDasharray="3 9"/>
                <circle cx="180" cy="180" r="96"  stroke="#8B5CF6" strokeWidth="0.8" strokeDasharray="2 7"/>
                <circle cx="180" cy="180" r="58"  stroke="#00FFC6" strokeWidth="0.4" strokeDasharray="4 10"/>
              </svg>
            </div>

            <div className="hero-split" style={{ maxWidth: 1160, margin: "0 auto", padding: "108px 5% 80px", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 60, position: "relative", zIndex: 2 }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 9, padding: "6px 16px", borderRadius: 6, background: "linear-gradient(135deg, rgba(0,255,198,0.07), rgba(0,255,198,0.02))", border: "1px solid rgba(0,255,198,0.2)", backdropFilter: "blur(10px)", marginBottom: 28, animation: "fadeIn 0.5s ease both", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.07)" }}>
                  <span style={{ position: "relative" }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#00FFC6", display: "block", boxShadow: "0 0 8px #00FFC6", animation: "blip 2.2s infinite" }} />
                    <span style={{ position: "absolute", top: 0, left: 0, width: 6, height: 6, borderRadius: "50%", background: "rgba(0,255,198,0.4)", animation: "pulseRing 2.2s infinite" }} />
                  </span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: "0.18em", color: "rgba(0,255,198,0.85)" }}>THE GENESIS · QRYPTEX</span>
                </div>

                <h1 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(32px, 5vw, 72px)", fontWeight: 900, lineHeight: 0.95, color: "#E9E6FF", letterSpacing: "-0.02em", marginBottom: 8, animation: "fadeUp 0.65s ease 0.08s both" }}>ENGINEERING</h1>
                <h1 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(32px, 5vw, 72px)", fontWeight: 900, lineHeight: 0.95, letterSpacing: "-0.02em", marginBottom: 32, background: "linear-gradient(100deg, #6C2BD9 0%, #A78BFA 40%, #00FFC6 80%, #A78BFA 100%)", backgroundSize: "200% 200%", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "fadeUp 0.7s ease 0.15s both, gradientShift 5s ease infinite" }}>THE FRONTIER.</h1>
                <p style={{ maxWidth: 520, fontSize: "clamp(13px, 1.5vw, 15.5px)", lineHeight: 1.8, color: "rgba(161,161,194,0.8)", fontFamily: "'Rajdhani', sans-serif", marginBottom: 44, animation: "fadeUp 0.7s ease 0.22s both" }}>
                  QRYPTEX was forged from a singular observation: legacy infrastructure cannot withstand tomorrow's adversaries. We are a collective of engineers, researchers, and security architects building the uncompromisable baseline for the next era of digital operations.
                </p>

                <div className="stats-row" style={{ animation: "fadeIn 0.9s ease 0.35s both" }}>
                  {TENETS.map((t, i) => (
                    <TenetPill key={t.label} t={t} />
                  ))}
                </div>
              </div>

              <div className="mission-panel" style={{ width: 330, flexShrink: 0, display: "flex", flexDirection: "column", gap: 16, animation: "fadeUp 0.75s ease 0.3s both" }}>
                {[
                  { label: "// MISSION", labelColor: "rgba(108,43,217,0.55)", topLine: "#6C2BD9", text: "To make quantum-resistant, AI-augmented, blockchain-anchored infrastructure the default standard for enterprises operating at the frontier of technology." },
                  { label: "// VISION", labelColor: "rgba(0,255,198,0.45)", topLine: "#00FFC6", text: "A paradigm where the most critical digital systems are provably secure, inherently trustworthy, and resilient by architectural design—not by reactive patching." },
                ].map((panel) => (
                  <div key={panel.label} style={{ padding: "26px 24px", borderRadius: 14, background: "linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(8,5,20,0.6) 100%)", backdropFilter: "blur(22px) saturate(160%)", WebkitBackdropFilter: "blur(22px) saturate(160%)", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.09), 0 8px 32px rgba(0,0,0,0.35)", position: "relative", overflow: "hidden" }}>
                    <div style={{ position: "absolute", top: 0, left: "10%", right: "10%", height: 1, background: `linear-gradient(90deg, transparent, ${panel.topLine} 50%, transparent)`, opacity: 0.7 }} />
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: "0.22em", color: panel.labelColor, marginBottom: 14 }}>{panel.label}</div>
                    <p style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 14, lineHeight: 1.75, color: "rgba(185,180,220,0.8)" }}>{panel.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(0,255,198,0.2), rgba(108,43,217,0.3), transparent)" }} />

          <div style={{ maxWidth: 1160, margin: "0 auto", padding: "80px 5% 80px" }}>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "6px 18px", borderRadius: 6, background: "linear-gradient(135deg, rgba(108,43,217,0.1), rgba(108,43,217,0.03))", border: "1px solid rgba(108,43,217,0.22)", backdropFilter: "blur(10px)", marginBottom: 20, boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)" }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: "0.18em", color: "rgba(139,92,246,0.7)" }}>PRINCIPLES · THE QRYPTEX STANDARD</span>
              </div>
              <h2 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(18px, 3vw, 38px)", fontWeight: 900, color: "#D4D0F5", letterSpacing: "0.04em", lineHeight: 1.15 }}>
                HOW WE <span style={{ background: "linear-gradient(90deg, #8B5CF6, #00FFC6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>BUILD IT.</span>
              </h2>
            </div>
            <div className="values-grid">
              {VALUES.map((v, i) => <ValueCard key={i} v={v} index={i} />)}
            </div>
          </div>

          <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(108,43,217,0.28), rgba(0,255,198,0.18), transparent)" }} />

          <div style={{ background: "linear-gradient(180deg, rgba(8,5,22,0.6) 0%, rgba(5,3,13,0.4) 100%)", backdropFilter: "blur(10px)", borderTop: "1px solid rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
            <div style={{ maxWidth: 1160, margin: "0 auto", padding: "88px 5% 96px" }}>

              <div className="methodology-split" style={{ display: "flex", gap: 70, alignItems: "flex-start" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 9, padding: "6px 16px", borderRadius: 6, background: "linear-gradient(135deg, rgba(0,255,198,0.06), rgba(0,255,198,0.01))", border: "1px solid rgba(0,255,198,0.18)", backdropFilter: "blur(10px)", marginBottom: 30 }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: "0.18em", color: "rgba(0,255,198,0.75)" }}>EXECUTION · OUR METHODOLOGY</span>
                  </div>
                  <h3 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 900, color: "#E9E6FF", letterSpacing: "0.02em", lineHeight: 1.2, marginBottom: 40 }}>
                    ENGINEERING BEYOND <br/><span style={{ color: "rgba(139,92,246,0.8)" }}>THE PERIMETER.</span>
                  </h3>
                  
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    {METHODOLOGY.map((m, i) => (
                      <MethodologyCard key={i} m={m} index={i} />
                    ))}
                  </div>
                </div>

                <div className="cta-panel" style={{ width: 340, flexShrink: 0, position: "sticky", top: 90 }}>
                  <div style={{ padding: "40px 32px", borderRadius: 18, background: "linear-gradient(155deg, rgba(255,255,255,0.06) 0%, rgba(12,8,28,0.7) 50%, rgba(5,3,13,0.8) 100%)", backdropFilter: "blur(28px) saturate(200%)", WebkitBackdropFilter: "blur(28px) saturate(200%)", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 24px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1), inset 0 -1px 0 rgba(108,43,217,0.08)", position: "relative", overflow: "hidden" }}>
                    <div style={{ position: "absolute", top: 0, left: "8%", right: "8%", height: 1, background: "linear-gradient(90deg, transparent, rgba(167,139,250,0.8) 40%, rgba(0,255,198,0.5) 70%, transparent)" }} />
                    <div style={{ position: "absolute", top: "0", left: "50%", transform: "translateX(-50%)", width: "80%", height: "40%", borderRadius: "50%", background: "radial-gradient(ellipse, rgba(108,43,217,0.1), transparent 70%)", filter: "blur(20px)", pointerEvents: "none" }} />
                    <div style={{ position: "relative", zIndex: 2 }}>
                      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: "0.22em", color: "rgba(167,139,250,0.5)", marginBottom: 22 }}>// INITIATE PROTOCOL</div>
                      <h3 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 20, fontWeight: 900, color: "#E9E6FF", letterSpacing: "0.04em", lineHeight: 1.25, marginBottom: 16 }}>
                        SECURE YOUR <span style={{ background: "linear-gradient(90deg, #A78BFA, #00FFC6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>ARCHITECTURE.</span>
                      </h3>
                      <p style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 14, lineHeight: 1.7, color: "rgba(161,161,194,0.75)", marginBottom: 32 }}>Stop patching legacy systems. Let's design a threat model that makes adversaries irrelevant. Start the conversation with our engineering team.</p>
                      
                      <button onClick={() => window.location.href = "/contact"} style={{ width: "100%", padding: "16px 0", borderRadius: 10, marginBottom: 12, cursor: "pointer", background: "linear-gradient(135deg, #6C2BD9 0%, #4C1BA0 100%)", border: "1px solid rgba(139,92,246,0.5)", color: "#fff", fontFamily: "'Rajdhani', sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", boxShadow: "0 8px 24px rgba(108,43,217,0.35), inset 0 1px 0 rgba(255,255,255,0.15)", transition: "all 0.3s ease" }}
                        onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 12px 36px rgba(108,43,217,0.55), inset 0 1px 0 rgba(255,255,255,0.2)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                        onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 8px 24px rgba(108,43,217,0.35), inset 0 1px 0 rgba(255,255,255,0.15)"; e.currentTarget.style.transform = "translateY(0)"; }}>
                        Request Architecture Review
                      </button>
                      {/* Updated the button below to link to localhost */}
                      <button onClick={() => window.location.href = "http://localhost:5173/services"} style={{ width: "100%", padding: "15px 0", borderRadius: 10, cursor: "pointer", background: "linear-gradient(135deg, rgba(0,255,198,0.06), rgba(0,255,198,0.02))", border: "1px solid rgba(0,255,198,0.2)", color: "#00FFC6", fontFamily: "'Rajdhani', sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", backdropFilter: "blur(8px)", boxShadow: "inset 0 1px 0 rgba(0,255,198,0.1)", transition: "all 0.3s ease" }}
                        onMouseEnter={e => { e.currentTarget.style.background = "linear-gradient(135deg, rgba(0,255,198,0.1), rgba(0,255,198,0.04))"; e.currentTarget.style.borderColor = "rgba(0,255,198,0.4)"; }}
                        onMouseLeave={e => { e.currentTarget.style.background = "linear-gradient(135deg, rgba(0,255,198,0.06), rgba(0,255,198,0.02))"; e.currentTarget.style.borderColor = "rgba(0,255,198,0.2)"; }}>
                        Explore Services
                      </button>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div style={{ padding: "22px 5%", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, borderTop: "1px solid rgba(255,255,255,0.04)" }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "rgba(161,161,194,0.2)", letterSpacing: "0.1em" }}>© 2026 QRYPTEX — ALL SYSTEMS OPERATIONAL</span>
            <div style={{ display: "flex", gap: 4, alignItems: "flex-end" }}>
              {[7, 11, 15, 9, 5].map((h, i) => (
                <div key={i} style={{ width: 3, height: h, borderRadius: 1, background: `rgba(108,43,217,${0.28 + i * 0.1})`, animation: `barPulse ${1.2 + i * 0.28}s ease-in-out infinite`, animationDelay: `${i * 0.13}s` }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}