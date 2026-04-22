import { Suspense, lazy, useState, useEffect, useRef } from "react";

const Scene = lazy(() => import("../three/Scene"));

const NAV_LINKS = [
  { label: "Home",     href: "/"         },
  { label: "Services", href: "/services" },
  { label: "About Us", href: "/about"    },
  { label: "Contact",  href: "/contact"  },
];

const PILLS = [
  { icon: "🛡️", text: "Post-Quantum Encryption" },
  { icon: "⛓️", text: "Blockchain Infrastructure" },
  { icon: "🤖", text: "AI-Powered Solutions"      },
];

const STATS = [
  { value: "256-bit", label: "Quantum-Safe Keys"  },
  { value: "99.99%",  label: "Uptime SLA"          },
  { value: "3-in-1",  label: "Full Stack Coverage" },
];

// ── White floating particles layer ──────────────────────────────────────────
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
// ─────────────────────────────────────────────────────────────────────────────

export default function Hero() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        
        :root {
          --purple-primary:   #6C2BD9;
          --purple-secondary: #8B5CF6;
          --purple-accent:    #A78BFA;
          --bg-dark:          #0F0A1F;
          --bg-deep:          #05030D;
          --text-primary:     #E9E6FF;
          --text-secondary:   #A1A1C2;
          --accent-green:     #00FFC6;
        }

        html { background-color: var(--bg-deep); scroll-behavior: smooth; }
        body { 
          background-color: var(--bg-deep); 
          color: var(--text-primary);
          overflow-x: hidden;
          width: 100%;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes fadeIn {
          from { opacity: 0; } to { opacity: 1; }
        }
        @keyframes pulseBar {
          0%, 100% { opacity: 0.3; transform: scaleY(0.8); }
          50%       { opacity: 1;    transform: scaleY(1);   }
        }
        @keyframes borderGlow {
          0%, 100% { box-shadow: 0 0 4px rgba(108,43,217,0.3); }
          50%       { box-shadow: 0 0 12px rgba(0,255,198,0.3); }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0);     }
        }
        @keyframes dividerPulse {
          0%, 100% { opacity: 0.1; }
          50%       { opacity: 0.3; }
        }

        .nav-link {
          position: relative;
          font-family: 'Rajdhani', sans-serif;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-secondary);
          text-decoration: none;
          padding: 6px 0;
          transition: color 0.25s;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 0; height: 1px;
          background: var(--accent-green);
          transition: width 0.3s ease;
        }
        .nav-link:hover { color: var(--text-primary); }
        .nav-link:hover::after { width: 100%; }

        .active-link { color: var(--text-primary) !important; }
        .active-link::after { width: 100% !important; }

        .cta-primary {
          position: relative;
          overflow: hidden;
          padding: 12px 32px;
          border-radius: 2px;
          border: 1px solid rgba(108,43,217,0.6);
          background: linear-gradient(135deg, #6C2BD9, #4C1BA0);
          color: #fff;
          font-family: 'Rajdhani', sans-serif;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
          white-space: nowrap;
        }
        .cta-primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 20px rgba(108,43,217,0.4);
        }

        .cta-secondary {
          padding: 12px 32px;
          border-radius: 2px;
          border: 1px solid rgba(0,255,198,0.25);
          background: rgba(0,255,198,0.03);
          color: var(--accent-green);
          font-family: 'Rajdhani', sans-serif;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 0.25s, box-shadow 0.25s, transform 0.2s;
          backdrop-filter: blur(8px);
          white-space: nowrap;
        }
        .cta-secondary:hover {
          background: rgba(0,255,198,0.08);
          box-shadow: 0 0 15px rgba(0,255,198,0.15);
          transform: translateY(-1px);
        }

        .service-pill {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: 2px;
          border: 1px solid rgba(108,43,217,0.25);
          background: rgba(108,43,217,0.06);
          backdrop-filter: blur(6px);
          font-family: 'Rajdhani', sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--purple-accent);
          animation: borderGlow 4s ease-in-out infinite;
          white-space: nowrap;
        }

        .stat-card {
          display: flex;
          flex-direction: column;
          gap: 2px;
          padding: 12px 18px;
          border-left: 1px solid var(--purple-primary);
          background: rgba(108,43,217,0.04);
        }

        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: var(--bg-deep); }
        ::-webkit-scrollbar-thumb { background: rgba(108,43,217,0.5); border-radius: 2px; }

        @media (max-width: 900px) {
          .hero-split { flex-direction: column !important; }
          .hero-left  {
            width: 100% !important;
            padding: 90px 5% 40px !important;
            align-items: flex-start !important;
            text-align: left !important;
          }
          .hero-right { display: none !important; }
          .desktop-nav { display: none !important; }
          .nav-cta-full { display: none !important; }
          #hamburger { display: flex !important; }
          .stats-row { flex-wrap: wrap !important; gap: 8px !important; }
          .pills-row { flex-wrap: wrap !important; }
          .cta-row { flex-wrap: wrap !important; }
          .stat-card { padding: 10px 14px !important; min-width: 120px; }
          .hero-divider { display: none !important; }
        }

        @media (max-width: 480px) {
          .cta-primary, .cta-secondary { padding: 11px 20px !important; font-size: 12px !important; }
          .service-pill { font-size: 9px !important; padding: 5px 10px !important; }
          .stat-card { min-width: calc(50% - 4px); }
        }
      `}</style>

      <div style={{
        width: "100%",
        minHeight: "100vh",
        background: "var(--bg-deep)",
        position: "relative",
        overflowX: "hidden",
      }}>

        {/* Subtle grid */}
        <div style={{
          position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
          backgroundImage: `
            linear-gradient(rgba(108,43,217,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(108,43,217,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }} />

        {/* 3D Scene */}
        <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </div>

        {/* ── White particles layer ── */}
        <WhiteParticles />

        {/* Navbar */}
        <nav style={{
          position: "fixed", top: 0, left: 0, right: 0,
          zIndex: 100,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 5%",
          height: 60,
          background: scrolled ? "rgba(5,3,13,0.93)" : "transparent",
          backdropFilter: scrolled ? "blur(14px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(108,43,217,0.15)" : "1px solid transparent",
          transition: "background 0.3s, backdrop-filter 0.3s, border-bottom 0.3s",
        }}>
          <a href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
            <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
              <polygon points="16,2 29,9 29,23 16,30 3,23 3,9" fill="none" stroke="#6C2BD9" strokeWidth="1.5"/>
              <circle cx="16" cy="16" r="3" fill="#00FFC6"/>
            </svg>
            <span style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 15, fontWeight: 900, letterSpacing: "0.05em", color: "var(--text-primary)" }}>
              Q<span style={{ color: "var(--accent-green)" }}>RYP</span>TEX
            </span>
          </a>

          <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: 28 }}>
            {NAV_LINKS.map((l) => (
              <a key={l.label} href={l.href} className={`nav-link ${l.label === "Home" ? "active-link" : ""}`}>
                {l.label}
              </a>
            ))}
          </div>

          <button id="hamburger" onClick={() => setMenuOpen(!menuOpen)} style={{ display: "none", background: "none", border: "none", cursor: "pointer", color: "var(--text-primary)" }}>
            <svg width="20" height="20" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.8">
              {menuOpen ? <><line x1="3" y1="3" x2="19" y2="19"/><line x1="19" y1="3" x2="3" y2="19"/></> : <><line x1="2" y1="6" x2="20" y2="6"/><line x1="2" y1="11" x2="20" y2="11"/><line x1="2" y1="16" x2="20" y2="16"/></>}
            </svg>
          </button>
        </nav>

        {menuOpen && (
          <div style={{ position: "fixed", top: 60, left: 0, right: 0, zIndex: 99, background: "rgba(5,3,13,0.97)", borderBottom: "1px solid rgba(108,43,217,0.2)", backdropFilter: "blur(16px)", padding: "20px 6%", display: "flex", flexDirection: "column", gap: 16, animation: "fadeUp 0.2s ease both" }}>
            {NAV_LINKS.map((l) => (
              <a key={l.label} href={l.href} className="nav-link" onClick={() => setMenuOpen(false)}>{l.label}</a>
            ))}
          </div>
        )}

        {/* Hero Content */}
        <div className="hero-split" style={{ position: "relative", zIndex: 1, display: "flex", width: "100%", minHeight: "100vh" }}>
          <div className="hero-left" style={{ width: "50%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "80px 5% 60px 6%" }}>
            
            <div style={{ marginBottom: 16, display: "flex", alignItems: "center", gap: 8, padding: "5px 12px", borderRadius: 2, border: "1px solid rgba(0,255,198,0.2)", background: "rgba(0,255,198,0.03)", animation: "fadeIn 0.6s ease both", alignSelf: "flex-start" }}>
              <span style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--accent-green)", boxShadow: "0 0 5px var(--accent-green)", animation: "pulseBar 2s infinite" }} />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: "0.15em", color: "var(--accent-green)" }}>AI · BLOCKCHAIN · POST-QUANTUM</span>
            </div>

            <h1 style={{ margin: "0 0 6px", fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(28px, 4.5vw, 64px)", fontWeight: 900, lineHeight: 1.1, color: "var(--text-primary)", animation: "fadeUp 0.6s ease both" }}>QRYPTEX</h1>

            <div style={{ marginBottom: 18, fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(9px, 1.2vw, 14px)", letterSpacing: "0.25em", animation: "fadeUp 0.7s ease both", animationDelay: "0.1s" }}>
              <span style={{ background: "linear-gradient(90deg, #6C2BD9, #00FFC6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>SECURE · SCALABLE · INTELLIGENT</span>
            </div>

            <p style={{ maxWidth: 440, margin: "0 0 28px", fontSize: "clamp(13px, 1.4vw, 14px)", lineHeight: 1.7, color: "var(--text-secondary)", fontFamily: "'Rajdhani', sans-serif", animation: "fadeUp 0.8s ease both", animationDelay: "0.2s" }}>
              We engineer the next generation of digital defense — combining AI intelligence, immutable blockchain, and post-quantum layers.
            </p>

            <div className="cta-row" style={{ display: "flex", gap: 10, marginBottom: 32, animation: "fadeUp 0.8s ease both", animationDelay: "0.3s" }}>
              <button className="cta-primary" onClick={() => window.location.href = '/services'}>Services</button>
              <button className="cta-secondary">AI Stack</button>
            </div>

            <div className="pills-row" style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 32, animation: "fadeUp 0.9s ease both", animationDelay: "0.4s" }}>
              {PILLS.map((p, i) => (
                <div key={i} className="service-pill" style={{ animationDelay: `${0.5 + i * 0.1}s` }}>
                  <span>{p.icon}</span> {p.text}
                </div>
              ))}
            </div>

            <div className="stats-row" style={{ display: "flex", gap: 2, animation: "fadeIn 1s ease both", animationDelay: "0.6s" }}>
              {STATS.map((s, i) => (
                <div key={i} className="stat-card">
                  <span style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(14px, 1.8vw, 18px)", fontWeight: 700, color: "var(--accent-green)" }}>{s.value}</span>
                  <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 9, fontWeight: 600, color: "var(--text-secondary)", textTransform: "uppercase" }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-divider" style={{ position: "absolute", left: "50%", top: "15%", bottom: "15%", width: 1, background: "linear-gradient(to bottom, transparent, rgba(108,43,217,0.3), transparent)", animation: "dividerPulse 4s infinite" }} />
          <div className="hero-right" style={{ width: "50%", pointerEvents: "none" }} />
        </div>
      </div>
    </>
  );
}