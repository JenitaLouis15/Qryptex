import { Suspense, lazy, useState, useEffect, useRef } from "react";

const Scene = lazy(() => import("../three/Scene"));

const NAV_LINKS = [
  { label: "Home",     href: "/"         },
  { label: "Services", href: "/services" },
  { label: "About Us", href: "/about"    },
  { label: "Contact",  href: "/contact"  },
];

const PILLS = [
  { icon: "🛡️", text: "Quantum-Safe Architecture" },
  { icon: "⛓️", text: "Zero-Trust Ledgers"        },
  { icon: "🧠", text: "Cognitive Threat AI"       },
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
  const [isLoaded,  setIsLoaded]  = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 150);
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => { clearTimeout(timer); window.removeEventListener("scroll", onScroll); };
  }, []);

  const cinematicEase = "cubic-bezier(0.16, 1, 0.3, 1)";
  const maskEase = "cubic-bezier(0.22, 1, 0.36, 1)";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        
        :root {
          --purple-primary:   #6C2BD9;
          --purple-secondary: #8B5CF6;
          --purple-accent:    #A78BFA;
          --bg-deep:          #05030D;
          --text-primary:     #E9E6FF;
          --text-secondary:   #A1A1C2;
          --accent-green:     #00FFC6;
        }

        html { background-color: var(--bg-deep); scroll-behavior: smooth; }
        body { background-color: var(--bg-deep); color: var(--text-primary); overflow-x: hidden; width: 100%; }

        /* POST-LOAD CONTINUOUS ANIMATIONS */
        @keyframes pulseBar {
          0%, 100% { opacity: 0.3; transform: scaleY(0.8); }
          50%       { opacity: 1;    transform: scaleY(1);   }
        }
        @keyframes bracketScan {
          0%, 100% { opacity: 0.4; filter: drop-shadow(0 0 2px transparent); }
          50%       { opacity: 1; filter: drop-shadow(0 0 8px rgba(108,43,217,0.6)); }
        }
        @keyframes shimmerText {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes floatSubtle {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-3px); }
        }
        @keyframes lineDrop {
          0%   { transform: scaleY(0); transform-origin: top; opacity: 0; }
          100% { transform: scaleY(1); transform-origin: top; opacity: 1; }
        }
        @keyframes dividerPulse {
          0%, 100% { opacity: 0.2; }
          50%       { opacity: 0.6; }
        }

        /* BUTTON STYLES WITH GLARE SWEEP */
        .cta-primary {
          position: relative;
          overflow: hidden;
          padding: 14px 36px;
          border-radius: 2px;
          border: 1px solid rgba(108,43,217,0.6);
          background: linear-gradient(135deg, #6C2BD9, #4C1BA0);
          color: #fff;
          font-family: 'Rajdhani', sans-serif;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          cursor: pointer;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease;
          white-space: nowrap;
          z-index: 1;
        }
        .cta-primary::before {
          content: '';
          position: absolute;
          top: 0; left: -100%; width: 50%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent);
          transform: skewX(-20deg);
          transition: left 0.7s ease;
          z-index: -1;
        }
        .cta-primary:hover::before { left: 150%; }
        .cta-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(108,43,217,0.4), 0 0 0 1px rgba(0,255,198,0.3);
        }

        .cta-secondary {
          padding: 14px 36px;
          border-radius: 2px;
          border: 1px solid rgba(0,255,198,0.25);
          background: rgba(0,255,198,0.03);
          color: var(--accent-green);
          font-family: 'Rajdhani', sans-serif;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          backdrop-filter: blur(8px);
          white-space: nowrap;
        }
        .cta-secondary:hover {
          background: rgba(0,255,198,0.08);
          border-color: rgba(0,255,198,0.5);
          box-shadow: 0 0 20px rgba(0,255,198,0.15);
          transform: translateY(-2px);
        }

        /* PILLS & STATS */
        .service-pill {
          display: flex; alignItems: center; gap: 6px;
          padding: 6px 14px; border-radius: 2px;
          border: 1px solid rgba(108,43,217,0.25);
          background: rgba(108,43,217,0.06);
          backdrop-filter: blur(6px);
          font-family: 'Rajdhani', sans-serif; font-size: 10.5px; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: var(--text-primary);
          white-space: nowrap;
          transition: background 0.4s, transform 0.4s;
        }
        .service-pill:hover { background: rgba(108,43,217,0.18); transform: translateY(-2px); }

        .stat-card {
          display: flex; flex-direction: column; gap: 4px;
          padding: 14px 20px; border-left: 2px solid var(--purple-primary);
          background: linear-gradient(90deg, rgba(108,43,217,0.08), transparent);
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s;
        }
        .stat-card:hover { transform: translateX(5px) translateY(-2px); border-color: var(--accent-green); }

        /* MASK WRAPPERS */
        .mask-wrap { overflow: hidden; display: inline-block; padding-bottom: 4px; }
      `}</style>

      <div style={{ width: "100%", minHeight: "100vh", background: "var(--bg-deep)", position: "relative", overflowX: "hidden" }}>

        {/* Sync Background */}
        <div style={{ opacity: isLoaded ? 1 : 0, transition: `opacity 2s ${cinematicEase}` }}>
          <div style={{
            position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
            backgroundImage: `linear-gradient(rgba(108,43,217,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(108,43,217,0.04) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }} />
          <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
            <Suspense fallback={null}><Scene /></Suspense>
          </div>
          <WhiteParticles />
        </div>

        {/* Navbar */}
        <nav style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 5%", height: 60,
          background: scrolled ? "rgba(5,3,13,0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(108,43,217,0.15)" : "1px solid transparent",
          opacity: isLoaded ? 1 : 0,
          transform: isLoaded ? "translateY(0)" : "translateY(-10px)",
          transition: `all 0.8s ${cinematicEase} 0.1s`,
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
              <a key={l.label} href={l.href} className={`nav-link ${l.label === "Home" ? "active-link" : ""}`}>{l.label}</a>
            ))}
          </div>
        </nav>

        {/* Hero Content */}
        <div className="hero-split" style={{ position: "relative", zIndex: 1, display: "flex", width: "100%", minHeight: "100vh" }}>
          <div className="hero-left" style={{ width: "50%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "80px 5% 60px 6%" }}>
            
            {/* 1. Pre-Kicker */}
            <div style={{ 
              marginBottom: 20, display: "flex", alignItems: "center", gap: 10, padding: "6px 14px", 
              borderRadius: 2, border: "1px solid rgba(0,255,198,0.25)", background: "rgba(0,255,198,0.04)", 
              alignSelf: "flex-start",
              opacity: isLoaded ? 1 : 0, transform: isLoaded ? "translateX(0)" : "translateX(-20px)",
              transition: `all 1.2s ${maskEase} 0.2s`
            }}>
              <span style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--accent-green)", boxShadow: "0 0 8px var(--accent-green)", animation: "pulseBar 2s infinite" }} />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9.5, fontWeight: 700, letterSpacing: "0.18em", color: "var(--accent-green)" }}>AUTONOMOUS AI · ZERO-TRUST · POST-QUANTUM</span>
            </div>

            {/* 2. ULTIMATE MASKED BRAND NAME */}
            <div style={{ position: "relative", display: "inline-block", alignSelf: "flex-start", margin: "10px 0 24px 16px" }}>
              
              {/* Left Bracket */}
              <div style={{
                position: "absolute", left: "-26px", top: "-10px",
                opacity: isLoaded ? 0.8 : 0, transform: isLoaded ? "translateX(0)" : "translateX(20px)",
                transition: `all 1.2s ${maskEase} 0.4s`
              }}>
                <svg width="26" height="26" viewBox="0 0 24 24" style={{ animation: isLoaded ? "bracketScan 4s infinite ease-in-out" : "none" }}>
                  <path d="M24 1H1v23" fill="none" stroke="var(--purple-primary)" strokeWidth="2.5" />
                </svg>
              </div>
              
              {/* Text Mask Reveal */}
              <div className="mask-wrap" style={{ padding: "0 10px 10px 0" }}>
                <h1 style={{ 
                  margin: 0, fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(42px, 6vw, 84px)", fontWeight: 900, lineHeight: 1.0, letterSpacing: "0.02em",
                  background: "linear-gradient(110deg, #FFFFFF 0%, #E9E6FF 40%, #A1A1C2 60%, #FFFFFF 100%)",
                  backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", filter: "drop-shadow(0px 12px 30px rgba(108,43,217,0.35))",
                  position: "relative", zIndex: 2,
                  transform: isLoaded ? "translateY(0)" : "translateY(110%)", // Slides up from bottom of mask
                  opacity: isLoaded ? 1 : 0,
                  transition: `transform 1.2s ${maskEase} 0.3s, opacity 0.8s ease 0.3s`,
                  animation: isLoaded ? "shimmerText 6s linear infinite forwards" : "none"
                }}>
                  Q<span style={{ background: "linear-gradient(90deg, #00FFC6, #00A383)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", position: "relative", display: "inline-block" }}>
                    RYP
                    <span style={{ position: "absolute", inset: 0, background: "inherit", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", filter: "blur(14px)", opacity: 0.8, zIndex: -1 }}>RYP</span>
                  </span>TEX
                </h1>
              </div>

              {/* Right Bracket */}
              <div style={{
                position: "absolute", right: "-26px", bottom: "-6px",
                opacity: isLoaded ? 0.8 : 0, transform: isLoaded ? "translateX(0)" : "translateX(-20px)",
                transition: `all 1.2s ${maskEase} 0.5s`
              }}>
                <svg width="26" height="26" viewBox="0 0 24 24" style={{ animation: isLoaded ? "bracketScan 4s infinite ease-in-out 2s" : "none" }}>
                  <path d="M0 23h23V0" fill="none" stroke="var(--accent-green)" strokeWidth="2.5" />
                </svg>
              </div>
            </div>

            {/* 3. Sub-Kicker Mask Reveal */}
            <div className="mask-wrap" style={{ marginBottom: 28 }}>
              <div style={{ 
                fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(10px, 1.2vw, 15px)", letterSpacing: "0.25em",
                transform: isLoaded ? "translateY(0)" : "translateY(100%)", opacity: isLoaded ? 1 : 0,
                transition: `transform 1.2s ${maskEase} 0.4s, opacity 0.8s ease 0.4s`
              }}>
                <span style={{ background: "linear-gradient(90deg, #A78BFA, #00FFC6)", backgroundSize: "200% auto", animation: isLoaded ? "shimmerText 8s linear infinite reverse" : "none", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontWeight: 700 }}>
                  ABSOLUTE SECURITY. INFINITE SCALE. COGNITIVE DEFENSE.
                </span>
              </div>
            </div>

            {/* 4. Premium Paragraph Fade/Slide */}
            <p style={{ 
              maxWidth: 480, margin: "0 0 36px", fontSize: "clamp(14px, 1.4vw, 15.5px)", lineHeight: 1.75, color: "var(--text-secondary)", fontFamily: "'Rajdhani', sans-serif",
              opacity: isLoaded ? 1 : 0, transform: isLoaded ? "translateY(0)" : "translateY(15px)",
              transition: `all 1.2s ${cinematicEase} 0.5s`
            }}>
              We architect the bedrock of digital sovereignty. QRYPTEX fuses post-quantum cryptography, immutable decentralized ledgers, and autonomous threat-hunting AI into a single, impenetrable fortress for enterprise infrastructure.
            </p>

            {/* 5. Buttons */}
            <div className="cta-row" style={{ 
              display: "flex", gap: 12, marginBottom: 40,
              opacity: isLoaded ? 1 : 0, transform: isLoaded ? "translateY(0)" : "translateY(15px)",
              transition: `all 1.2s ${cinematicEase} 0.6s`
            }}>
<button 
  className="cta-primary" 
  onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
>
  Explore Services
</button>
              <button className="cta-secondary">Deploy AI Stack</button>
            </div>

            {/* 6. Pills (Staggered continuous float) */}
            <div className="pills-row" style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 40 }}>
              {PILLS.map((p, i) => (
                <div key={i} className="service-pill" style={{ 
                  opacity: isLoaded ? 1 : 0, transform: isLoaded ? "translateY(0) scale(1)" : "translateY(15px) scale(0.95)",
                  transition: `all 1s ${maskEase} ${0.7 + (i * 0.1)}s`,
                  animation: isLoaded ? `floatSubtle 4s ease-in-out infinite ${i * 0.5}s` : "none"
                }}>
                  <span style={{ fontSize: "14px" }}>{p.icon}</span> {p.text}
                </div>
              ))}
            </div>

            {/* 7. Stats (Staggered horizontal slide) */}
            <div className="stats-row" style={{ display: "flex", gap: 4 }}>
              {STATS.map((s, i) => (
                <div key={i} className="stat-card" style={{ 
                  opacity: isLoaded ? 1 : 0, transform: isLoaded ? "translateX(0)" : "translateX(-20px)",
                  transition: `all 1s ${maskEase} ${0.9 + (i * 0.1)}s`
                }}>
                  <span style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(15px, 1.8vw, 20px)", fontWeight: 900, color: "var(--accent-green)" }}>{s.value}</span>
                  <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 10, fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Center Divider Drop Animation */}
          <div className="hero-divider" style={{ 
            position: "absolute", left: "50%", top: "15%", bottom: "15%", width: 1, 
            background: "linear-gradient(to bottom, transparent, rgba(108,43,217,0.35), transparent)", 
            animation: isLoaded ? "lineDrop 1.5s cubic-bezier(0.16, 1, 0.3, 1) 1s both, dividerPulse 4s infinite 2.5s" : "none"
          }} />
          
          <div className="hero-right" style={{ width: "50%", pointerEvents: "none" }} />
        </div>
      </div>
    </>
  );
}