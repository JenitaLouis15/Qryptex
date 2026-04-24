import { Suspense, lazy, useState, useEffect, useRef } from "react";

const Scene = lazy(() => import("../three/Scene"));

const NAV_LINKS = [
  { label: "Home",     href: "/"         },
  { label: "Services", href: "/services" },
  { label: "About Us", href: "/about"    },
  { label: "Contact",  href: "/contact"  },
];

// Custom Premium SVGs
const IconShield = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" style={{ color: "var(--accent-green)" }}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconNetwork = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" style={{ color: "var(--purple-accent)" }}>
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" strokeLinecap="round" strokeLinejoin="round"/>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="12" y1="22.08" x2="12" y2="12" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconCore = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" style={{ color: "var(--text-primary)" }}>
    <rect x="4" y="4" width="16" height="16" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="9" y="9" width="6" height="6" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="9" y1="1" x2="9" y2="4" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="15" y1="1" x2="15" y2="4" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="9" y1="20" x2="9" y2="23" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="15" y1="20" x2="15" y2="23" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="20" y1="9" x2="23" y2="9" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="20" y1="14" x2="23" y2="14" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="1" y1="9" x2="4" y2="9" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="1" y1="14" x2="4" y2="14" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const PILLS = [
  { icon: <IconShield />,  text: "Quantum-Safe Architecture" },
  { icon: <IconNetwork />, text: "Zero-Trust Ledgers"        },
  { icon: <IconCore />,    text: "Cognitive Threat AI"       },
];

const CARDS = [
  { 
    icon: <IconShield />, 
    title: "Post-Quantum Core", 
    desc: "Future-proof encryption algorithms guarding against next-gen quantum decryption attacks." 
  },
  { 
    icon: <IconNetwork />, 
    title: "Zero-Trust Network", 
    desc: "Immutable, decentralized architecture demanding continuous verification at every node." 
  },
  { 
    icon: <IconCore />, 
    title: "Autonomous Defense", 
    desc: "Predictive cognitive AI systems that hunt and neutralize anomalies in real-time." 
  },
];

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
    const COUNT = window.innerWidth < 768 ? 35 : 75; // Responsive count
    const particles = Array.from({ length: COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.2 + 0.2,
      vx: (Math.random() - 0.5) * 0.1,
      vy: -(Math.random() * 0.15 + 0.05),
      alpha: Math.random() * 0.3 + 0.05,
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
        const a = p.alpha * (0.6 + twinkle * 0.4);
        ctx.globalAlpha = a;
        ctx.fillStyle = "#ffffff";
        ctx.shadowBlur = p.r > 1 ? 4 : 0;
        ctx.shadowColor = "rgba(255,255,255,0.5)";
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

export default function Hero() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [isLoaded,  setIsLoaded]  = useState(false);

  useEffect(() => {
    // Premium cinematic stagger entry
    const timer = setTimeout(() => setIsLoaded(true), 100); 
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    
    // Lock body scroll when mobile menu is open
    if (menuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';

    return () => { 
      clearTimeout(timer); 
      window.removeEventListener("scroll", onScroll); 
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);

  // Premium easing function for physics-like snap
  const cinematicEase = "cubic-bezier(0.16, 1, 0.3, 1)";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@400;500;600;700&family=JetBrains+Mono:wght@400;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        
        :root {
          --purple-primary:   #6C2BD9;
          --purple-secondary: #8B5CF6;
          --purple-accent:    #A78BFA;
          --bg-deep:          #05030D;
          --text-primary:     #F8F7FF;
          --text-secondary:   #D4D4E8;
          --accent-green:     #00FFC6;
          --glass-border:     rgba(108, 43, 217, 0.2);
        }

        html { background-color: var(--bg-deep); scroll-behavior: smooth; }
        body { background-color: var(--bg-deep); color: var(--text-primary); overflow-x: hidden; width: 100%; -webkit-font-smoothing: antialiased; }

        /* MICRO ANIMATIONS */
        @keyframes pulseDot {
          0%, 100% { opacity: 0.5; transform: scale(0.85); box-shadow: 0 0 0px var(--accent-green); }
          50%      { opacity: 1;   transform: scale(1);   box-shadow: 0 0 12px var(--accent-green); }
        }
        @keyframes shimmerText {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes floatSubtle {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-4px); }
        }
        @keyframes dropLine {
          0%   { transform: scaleY(0); opacity: 0; }
          100% { transform: scaleY(1); opacity: 1; }
        }

        /* BUTTONS */
        .cta-primary {
          position: relative; overflow: hidden;
          padding: 16px 42px; border-radius: 4px;
          border: 1px solid rgba(108,43,217,0.6);
          background: linear-gradient(135deg, rgba(108,43,217,0.9), rgba(76,27,160,0.95));
          color: #fff; font-family: 'Rajdhani', sans-serif; font-size: 15px; font-weight: 700;
          letter-spacing: 0.15em; text-transform: uppercase;
          cursor: pointer; transition: all 0.5s ${cinematicEase};
          white-space: nowrap; z-index: 1; backdrop-filter: blur(10px);
          box-shadow: 0 4px 15px rgba(0,0,0,0.4);
        }
        .cta-primary::after {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
          transform: translateX(-100%) skewX(-15deg);
          transition: transform 0.8s ease; z-index: -1;
        }
        .cta-primary:hover::after { transform: translateX(100%) skewX(-15deg); }
        .cta-primary:hover {
          transform: translateY(-3px) scale(1.02); border-color: var(--accent-green);
          box-shadow: 0 12px 30px rgba(108,43,217,0.4), 0 0 20px rgba(0,255,198,0.2) inset;
        }

        /* PILLS */
        .service-pill {
          display: flex; alignItems: center; gap: 10px;
          padding: 10px 20px; border-radius: 100px; 
          border: 1px solid var(--glass-border);
          background: rgba(15, 10, 28, 0.6); backdrop-filter: blur(12px);
          font-family: 'Rajdhani', sans-serif; font-size: 14px; font-weight: 600;
          letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-secondary);
          white-space: nowrap; transition: all 0.4s ease;
          box-shadow: 0 4px 10px rgba(0,0,0,0.3);
        }
        .service-pill:hover { 
          background: rgba(108,43,217,0.2); color: var(--text-primary);
          border-color: rgba(108,43,217,0.5); transform: translateY(-3px) scale(1.02); 
          box-shadow: 0 10px 25px rgba(0,0,0,0.4);
        }

        /* CARDS */
        .feature-card {
          display: flex; flex-direction: column; gap: 12px;
          padding: 30px 24px; border-radius: 6px; 
          border: 1px solid var(--glass-border);
          background: linear-gradient(145deg, rgba(15,10,28,0.8), rgba(5,3,13,0.95));
          backdrop-filter: blur(16px);
          transition: all 0.5s ${cinematicEase}; flex: 1; text-align: left;
          position: relative; overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }
        .feature-card::before {
          content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 2px;
          background: linear-gradient(90deg, transparent, var(--accent-green), transparent);
          opacity: 0; transition: opacity 0.5s ease;
        }
        .feature-card:hover {
          transform: translateY(-8px); border-color: rgba(108,43,217,0.5);
          box-shadow: 0 25px 50px rgba(0,0,0,0.6), 0 0 30px rgba(108,43,217,0.15);
        }
        .feature-card:hover::before { opacity: 1; }
        
        .card-icon-wrapper {
          display: flex; align-items: center; justify-content: center;
          width: 44px; height: 44px; border-radius: 6px;
          background: rgba(108,43,217,0.15); border: 1px solid rgba(108,43,217,0.3);
          margin-bottom: 8px;
        }
        .card-title { 
          font-family: 'Orbitron', sans-serif; font-size: 15px; font-weight: 700; 
          color: var(--text-primary); letter-spacing: 0.08em; text-transform: uppercase; 
        }
        .card-desc { 
          font-family: 'Rajdhani', sans-serif; font-size: 14px; color: var(--text-secondary); 
          line-height: 1.6; font-weight: 500;
        }

        /* NAV */
        .nav-link {
          color: var(--text-secondary); text-decoration: none; 
          font-family: 'Rajdhani', sans-serif; font-size: 16px; font-weight: 600; 
          letter-spacing: 0.08em; text-transform: uppercase;
          transition: color 0.3s ease; position: relative;
        }
        .nav-link:hover { color: var(--text-primary); }
        .nav-link::after {
          content: ''; position: absolute; bottom: -4px; left: 0; width: 0; height: 1px;
          background: var(--accent-green); transition: width 0.3s ease;
        }
        .nav-link:hover::after { width: 100%; }

        /* LAYOUT & RESPONSIVENESS */
        .hero-split {
          display: flex; width: 100%; min-height: 100vh; align-items: center;
        }
        
        .hero-left {
          position: relative; z-index: 2; width: 55%; 
          padding: 80px 4% 80px 6%;
          display: flex; flex-direction: column; justify-content: center;
        }

        .content-wrapper {
          max-width: 650px; width: 100%;
          display: flex; flex-direction: column;
          align-items: flex-start; /* Ensures pristine left-alignment on desktop */
        }

        .text-shadow-hard { text-shadow: 0 2px 10px rgba(0,0,0,0.9); }
        .mobile-menu-btn { display: none; }
        
        /* 📱 STRICT MOBILE FIXES */
        @media (max-width: 1024px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { 
            display: flex; align-items: center; justify-content: center;
            background: rgba(255,255,255,0.05); border: 1px solid var(--glass-border); 
            color: var(--text-primary); cursor: pointer; border-radius: 4px;
            width: 44px; height: 44px; backdrop-filter: blur(8px);
          }
          
          .hero-split { flex-direction: column !important; align-items: stretch; }
          
          .hero-left { 
            width: 100% !important; 
            padding: 180px 5% 80px 5% !important; 
            align-items: center !important; 
            text-align: center;
            background: linear-gradient(180deg, transparent 0%, rgba(5,3,13,0.6) 20%, rgba(5,3,13,0.95) 45%, rgba(5,3,13,1) 100%);
          }
          
          /* Force strict center alignment across all child elements */
          .content-wrapper {
            align-items: center !important;
            text-align: center !important;
          }

          /* Force pills to center and space perfectly */
          .pills-row { 
            justify-content: center !important; 
            align-items: center !important;
            flex-wrap: wrap !important;
          }

          .hero-right { display: none !important; }
          .hero-divider { display: none !important; }
          
          .cards-container { flex-direction: column !important; width: 100%; gap: 16px !important; }
          .feature-card { align-items: center; text-align: center; padding: 32px 24px; }
        }
      `}</style>

      {/* Screen Load Overlay (Smooth fade in) */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 999, background: 'var(--bg-deep)',
        opacity: isLoaded ? 0 : 1, pointerEvents: 'none', transition: 'opacity 1.2s ease-out'
      }} />

      <div style={{ width: "100%", minHeight: "100vh", background: "var(--bg-deep)", position: "relative", overflowX: "hidden" }}>

        {/* 3D Scene Layer */}
        <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: `linear-gradient(rgba(108,43,217,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(108,43,217,0.05) 1px, transparent 1px)`,
            backgroundSize: "60px 60px", opacity: isLoaded ? 1 : 0, transition: "opacity 2s ease"
          }} />
          <Suspense fallback={null}><Scene /></Suspense>
          <WhiteParticles />
        </div>

        {/* Navbar */}
        <nav style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 5%", height: 75,
          background: scrolled || menuOpen ? "rgba(5,3,13,0.9)" : "transparent",
          backdropFilter: scrolled || menuOpen ? "blur(24px)" : "none",
          borderBottom: scrolled || menuOpen ? "1px solid rgba(108,43,217,0.25)" : "1px solid transparent",
          opacity: isLoaded ? 1 : 0, transform: isLoaded ? "translateY(0)" : "translateY(-20px)",
          transition: `all 0.8s ${cinematicEase}`,
        }}>
          <a href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
            <svg width="30" height="30" viewBox="0 0 32 32" fill="none">
              <polygon points="16,2 29,9 29,23 16,30 3,23 3,9" fill="none" stroke="url(#logo-grad)" strokeWidth="2.5"/>
              <circle cx="16" cy="16" r="3.5" fill="var(--accent-green)"/>
              <defs>
                <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--accent-green)" />
                  <stop offset="100%" stopColor="var(--purple-primary)" />
                </linearGradient>
              </defs>
            </svg>
            <span style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 20, fontWeight: 900, letterSpacing: "0.1em", color: "var(--text-primary)" }}>
              Q<span style={{ color: "var(--accent-green)" }}>RYP</span>TEX
            </span>
          </a>
          
          <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: 40 }}>
            {NAV_LINKS.map((l) => <a key={l.label} href={l.href} className="nav-link">{l.label}</a>)}
          </div>

          <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d={menuOpen ? "M18 6L6 18M6 6l12 12" : "M4 7h16M4 12h16M4 17h16"} strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </nav>

        {/* Mobile Dropdown Menu (Premium In/Out) */}
        <div style={{
            position: 'fixed', top: 75, left: 0, width: '100%', height: 'calc(100vh - 75px)',
            background: 'rgba(5,3,13,0.98)', backdropFilter: 'blur(25px)',
            zIndex: 99, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 35,
            transform: menuOpen ? 'translateY(0) scale(1)' : 'translateY(-20px) scale(0.98)',
            opacity: menuOpen ? 1 : 0, visibility: menuOpen ? 'visible' : 'hidden',
            transition: `all 0.5s ${cinematicEase}`, pointerEvents: menuOpen ? 'auto' : 'none'
        }}>
          {NAV_LINKS.map((l, i) => (
            <a key={l.label} href={l.href} onClick={() => setMenuOpen(false)} style={{
                color: 'var(--text-primary)', textDecoration: 'none', 
                fontFamily: "'Orbitron', sans-serif", fontSize: '22px', fontWeight: 700, letterSpacing: '0.15em',
                textTransform: 'uppercase',
                opacity: menuOpen ? 1 : 0, transform: menuOpen ? 'translateY(0)' : 'translateY(-20px)',
                transition: `all 0.4s ${cinematicEase} ${i * 0.1}s`
            }}>{l.label}</a>
          ))}
        </div>

        {/* Hero Content */}
        <div className="hero-split">
          <div className="hero-left">
            <div className="content-wrapper">
              
              {/* 1. Pre-Kicker - Removed inline alignSelf to allow CSS class to control alignment */}
              <div className="text-shadow-hard" style={{ 
                marginBottom: 20, display: "inline-flex", alignItems: "center", gap: 12, padding: "8px 18px", 
                borderRadius: 100, border: "1px solid rgba(0,255,198,0.25)", background: "rgba(0,255,198,0.08)", 
                opacity: isLoaded ? 1 : 0, transform: isLoaded ? "translateY(0) scale(1)" : "translateY(25px) scale(0.95)",
                transition: `all 1s ${cinematicEase} 0.2s`
              }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent-green)", animation: "pulseDot 2s infinite" }} />
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", color: "var(--accent-green)" }}>NEXT-GEN THREAT ISOLATION</span>
              </div>

              {/* 2. Brand Name */}
              <div style={{ marginBottom: 12, overflow: "hidden", paddingBottom: "10px", alignSelf: "flex-start", width: "100%" }}>
                <h1 style={{ 
                  margin: 0, fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(48px, 6.5vw, 90px)", fontWeight: 900, lineHeight: 1.0, letterSpacing: "0.02em",
                  background: "linear-gradient(110deg, #FFFFFF 0%, #E9E6FF 40%, #A1A1C2 60%, #FFFFFF 100%)",
                  backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", 
                  filter: "drop-shadow(0px 8px 20px rgba(0,0,0,0.8)) drop-shadow(0px 0px 30px rgba(108,43,217,0.5))",
                  transform: isLoaded ? "translateY(0) scale(1)" : "translateY(100%) scale(0.95)", opacity: isLoaded ? 1 : 0,
                  transition: `transform 1.2s ${cinematicEase} 0.3s, opacity 0.8s ease 0.3s`,
                  animation: isLoaded ? "shimmerText 8s linear infinite forwards" : "none",
                  textAlign: "inherit"
                }}>
                  Q<span style={{ background: "linear-gradient(90deg, var(--accent-green), #00A383)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>RYP</span>TEX
                </h1>
              </div>

              {/* 3. Sub-Kicker */}
              <div style={{ marginBottom: 30, overflow: "hidden", alignSelf: "flex-start", width: "100%" }}>
                <div style={{ 
                  fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(13px, 1.4vw, 17px)", letterSpacing: "0.25em", textShadow: "0 2px 10px rgba(0,0,0,0.9)",
                  transform: isLoaded ? "translateY(0)" : "translateY(100%)", opacity: isLoaded ? 1 : 0,
                  transition: `transform 1.2s ${cinematicEase} 0.4s, opacity 0.8s ease 0.4s`,
                  textAlign: "inherit"
                }}>
                  <span style={{ color: "var(--text-primary)", fontWeight: 700, textTransform: "uppercase" }}>
                    Absolute Security. <span style={{ color: "var(--accent-green)" }}>Infinite Scale.</span>
                  </span>
                </div>
              </div>

              {/* 4. Paragraph */}
              <p className="text-shadow-hard" style={{ 
                margin: "0 0 40px 0", fontSize: "clamp(15px, 1.2vw, 17px)", lineHeight: 1.7, color: "var(--text-secondary)", fontFamily: "'Rajdhani', sans-serif", fontWeight: 500,
                opacity: isLoaded ? 1 : 0, transform: isLoaded ? "translateY(0)" : "translateY(25px)",
                transition: `all 1.2s ${cinematicEase} 0.5s`, alignSelf: "flex-start", textAlign: "inherit"
              }}>
                We architect the bedrock of digital sovereignty. Fusing post-quantum cryptography, immutable decentralized ledgers, and autonomous threat-hunting AI into a single, impenetrable fortress for enterprise infrastructure.
              </p>

              {/* 5. Buttons - Removed inline alignSelf */}
              <div style={{ 
                display: "flex", gap: 16, marginBottom: 50,
                opacity: isLoaded ? 1 : 0, transform: isLoaded ? "translateY(0)" : "translateY(25px)",
                transition: `all 1.2s ${cinematicEase} 0.6s`
              }}>
                <button className="cta-primary" onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}>
                  Deploy Infrastructure
                </button>
              </div>

              {/* 6. Pills */}
              <div className="pills-row" style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 45, alignSelf: "flex-start", width: "100%" }}>
                {PILLS.map((p, i) => (
                  <div key={i} className="service-pill" style={{ 
                    opacity: isLoaded ? 1 : 0, transform: isLoaded ? "translateY(0) scale(1)" : "translateY(30px) scale(0.9)",
                    transition: `all 1s ${cinematicEase} ${0.7 + (i * 0.1)}s`,
                    animation: isLoaded ? `floatSubtle 5s ease-in-out infinite ${i * 0.3}s` : "none"
                  }}>
                    {p.icon} <span>{p.text}</span>
                  </div>
                ))}
              </div>

              {/* 7. Cards */}
              <div className="cards-container" style={{ display: "flex", gap: 20, width: "100%" }}>
                {CARDS.map((card, i) => (
                  <div key={i} className="feature-card" style={{ 
                    opacity: isLoaded ? 1 : 0, transform: isLoaded ? "translateY(0) scale(1)" : "translateY(40px) scale(0.95)",
                    transition: `all 1.2s ${cinematicEase} ${0.9 + (i * 0.15)}s`
                  }}>
                    <div className="card-icon-wrapper">{card.icon}</div>
                    <div className="card-title">{card.title}</div>
                    <div className="card-desc">{card.desc}</div>
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* Desktop Center Line */}
          <div className="hero-divider" style={{ 
            position: "absolute", left: "55%", top: "20%", bottom: "20%", width: 1, 
            background: "linear-gradient(to bottom, transparent, rgba(108,43,217,0.5), transparent)", 
            transformOrigin: "top", zIndex: 1,
            animation: isLoaded ? "dropLine 1.5s cubic-bezier(0.22, 1, 0.36, 1) 1s both" : "none"
          }} />
          
          <div className="hero-right" style={{ width: "45%", pointerEvents: "none", zIndex: 1 }} />
        </div>
      </div>
    </>
  );
}