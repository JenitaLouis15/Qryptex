import { useState, useEffect, useRef } from "react";

const NAV_LINKS = [
  { label: "Home",     href: "/"         },
  { label: "Services", href: "/services" },
  { label: "About Us", href: "/about"    },
  { label: "Contact",  href: "/contact"  },
];

const CONTACT_CHANNELS = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    label: "Secure Email", value: "ops@qryptex.io", sub: "PGP encrypted channel available", accent: "#00FFC6", accentRgb: "0,255,198",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.38 2 2 0 0 1 3.6 1.2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9.4a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
    label: "Direct Line", value: "+1 (888) 0-QRYPTEX", sub: "Mon–Fri, 09:00–18:00 EST", accent: "#8B5CF6", accentRgb: "139,92,246",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    label: "Headquarters", value: "New York, NY", sub: "475 Lexington Ave, Suite 2600", accent: "#A78BFA", accentRgb: "167,139,250",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    label: "Response SLA", value: "< 4 Hours", sub: "For enterprise inquiries", accent: "#00FFC6", accentRgb: "0,255,198",
  },
];

const INQUIRY_TYPES = [
  "Post-Quantum Migration", "Zero-Trust Architecture", "Blockchain / DeFi Audit",
  "AI & LLM Integration", "Full-Stack Development", "Security Assessment", "General Inquiry",
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
      { bx: 0.1,  by: 0.15, r: 400, col: "108,43,217", sp: 0.17, a: 0.09 },
      { bx: 0.9,  by: 0.8,  r: 480, col: "0,255,198",  sp: 0.12, a: 0.06 },
      { bx: 0.55, by: 0.45, r: 340, col: "139,92,246", sp: 0.24, a: 0.07 },
      { bx: 0.7,  by: 0.05, r: 260, col: "167,139,250",sp: 0.19, a: 0.05 },
      { bx: 0.02, by: 0.9,  r: 310, col: "0,255,198",  sp: 0.15, a: 0.04 },
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

function ChannelCard({ ch, index }) {
  const [hov, setHov] = useState(false);
  const [vis, setVis] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); io.disconnect(); } }, { threshold: 0.1 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        position: "relative", padding: "24px 22px", borderRadius: 14,
        background: hov ? `linear-gradient(145deg, rgba(${ch.accentRgb},0.1) 0%, rgba(12,8,28,0.65) 100%)` : "linear-gradient(145deg, rgba(255,255,255,0.03) 0%, rgba(8,5,20,0.55) 100%)",
        backdropFilter: "blur(20px) saturate(160%)", WebkitBackdropFilter: "blur(20px) saturate(160%)",
        boxShadow: hov ? `0 20px 50px rgba(${ch.accentRgb},0.14), 0 4px 20px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.12)` : `0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)`,
        transform: hov ? "translateY(-6px)" : "translateY(0)",
        transition: "all 0.5s cubic-bezier(0.34,1.2,0.64,1)",
        opacity: vis ? 1 : 0,
        animation: vis ? `cardReveal 0.7s ease ${index * 0.1}s both` : "none",
        overflow: "hidden", cursor: "default", border: "1px solid transparent",
      }}
    >
      <div style={{ position: "absolute", inset: 0, borderRadius: 14, zIndex: 0, background: hov ? `linear-gradient(145deg, rgba(${ch.accentRgb},0.45) 0%, transparent 45%, rgba(${ch.accentRgb},0.15) 100%)` : "linear-gradient(145deg, rgba(255,255,255,0.1) 0%, transparent 60%, rgba(108,43,217,0.12) 100%)", padding: 1, WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", WebkitMaskComposite: "xor", maskComposite: "exclude", transition: "background 0.5s", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: 0, left: "15%", right: "15%", height: 1, background: hov ? `linear-gradient(90deg, transparent, rgba(${ch.accentRgb},0.9) 50%, transparent)` : "linear-gradient(90deg, transparent, rgba(255,255,255,0.1) 50%, transparent)", transition: "background 0.4s", zIndex: 3 }} />
      <div style={{ position: "relative", zIndex: 2 }}>
        <div style={{ width: 44, height: 44, borderRadius: 10, marginBottom: 16, background: hov ? `linear-gradient(135deg, rgba(${ch.accentRgb},0.2), rgba(${ch.accentRgb},0.05))` : "linear-gradient(135deg, rgba(255,255,255,0.07), rgba(108,43,217,0.05))", border: `1px solid ${hov ? `rgba(${ch.accentRgb},0.4)` : "rgba(255,255,255,0.08)"}`, display: "flex", alignItems: "center", justifyContent: "center", color: hov ? ch.accent : "rgba(139,92,246,0.45)", boxShadow: hov ? `0 0 20px rgba(${ch.accentRgb},0.25)` : "none", transition: "all 0.4s ease" }}>{ch.icon}</div>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8.5, letterSpacing: "0.2em", color: `rgba(${ch.accentRgb},${hov ? 0.7 : 0.35})`, marginBottom: 8, transition: "color 0.3s" }}>{ch.label.toUpperCase()}</div>
        <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 13, fontWeight: 700, color: hov ? "#E9E6FF" : "#C4BFEA", letterSpacing: "0.02em", marginBottom: 6, transition: "color 0.3s" }}>{ch.value}</div>
        <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 12, color: "rgba(161,161,194,0.5)", lineHeight: 1.5 }}>{ch.sub}</div>
      </div>
    </div>
  );
}

function HexNodes() {
  return (
    <svg style={{ position: "absolute", right: "3%", top: "8%", width: 280, height: 280, opacity: 0.045, pointerEvents: "none", animation: "rotateSlow 55s linear infinite" }} viewBox="0 0 280 280" fill="none">
      <polygon points="140,8 254,72 254,208 140,272 26,208 26,72" stroke="#6C2BD9" strokeWidth="0.8" strokeDasharray="5 8"/>
      <polygon points="140,40 226,88 226,192 140,240 54,192 54,88" stroke="#00FFC6" strokeWidth="0.5" strokeDasharray="3 10"/>
      <polygon points="140,72 198,104 198,176 140,208 82,176 82,104" stroke="#A78BFA" strokeWidth="0.6" strokeDasharray="2 6"/>
      <circle cx="140" cy="140" r="18" stroke="#00FFC6" strokeWidth="0.5" strokeDasharray="4 8"/>
      <circle cx="140" cy="140" r="4" fill="#00FFC6" opacity="0.5"/>
      {[0,60,120,180,240,300].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        const x = 140 + 100 * Math.cos(rad);
        const y = 140 + 100 * Math.sin(rad);
        return <circle key={i} cx={x} cy={y} r="2.5" fill="#8B5CF6" opacity="0.6"/>;
      })}
    </svg>
  );
}

export default function Contact() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({ name: "", company: "", email: "", type: "", budget: "", message: "" });
  const [focused, setFocused] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const handleChange = (field, val) => {
    setForm(f => ({ ...f, [field]: val }));
    if (field === "message") setCharCount(val.length);
  };

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) return;
    setSubmitting(true);
    setTimeout(() => { setSubmitting(false); setSubmitted(true); }, 1800);
  };

  const inputStyle = (field) => ({
    width: "100%", padding: "14px 16px", borderRadius: 10,
    background: focused === field ? "linear-gradient(145deg, rgba(108,43,217,0.08), rgba(5,3,13,0.7))" : "linear-gradient(145deg, rgba(255,255,255,0.03), rgba(5,3,13,0.6))",
    border: `1px solid ${focused === field ? "rgba(108,43,217,0.45)" : "rgba(255,255,255,0.07)"}`,
    color: "#E9E6FF", fontFamily: "'Rajdhani', sans-serif", fontSize: 14, fontWeight: 500, outline: "none",
    backdropFilter: "blur(12px)", transition: "all 0.3s ease",
    boxShadow: focused === field ? "0 0 0 3px rgba(108,43,217,0.12), inset 0 1px 0 rgba(255,255,255,0.08)" : "inset 0 1px 0 rgba(255,255,255,0.04)",
  });

  const labelStyle = {
    display: "block", fontFamily: "'JetBrains Mono', monospace", fontSize: 9,
    letterSpacing: "0.18em", color: "rgba(139,92,246,0.6)", marginBottom: 8, textTransform: "uppercase",
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #05030D; }

        @keyframes fadeUp { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes cardReveal { from{opacity:0;transform:translateY(30px) scale(0.96)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes blip { 0%,100%{opacity:0.5;transform:scale(0.9)} 50%{opacity:1;transform:scale(1.2)} }
        @keyframes rotateSlow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes scanH { 0%{transform:translateX(-100%)} 100%{transform:translateX(700%)} }
        @keyframes barPulse { 0%,100%{opacity:0.3;transform:scaleY(0.85)} 50%{opacity:1;transform:scaleY(1)} }
        @keyframes pulseRing { 0%{transform:scale(1);opacity:0.6} 100%{transform:scale(1.8);opacity:0} }
        @keyframes gradientShift { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes checkDraw { from{stroke-dashoffset:40} to{stroke-dashoffset:0} }
        @keyframes successPop { 0%{opacity:0;transform:scale(0.85) translateY(20px)} 60%{transform:scale(1.03) translateY(-4px)} 100%{opacity:1;transform:scale(1) translateY(0)} }

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

        .channels-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:16px; }
        .contact-layout { display:grid; grid-template-columns:1fr 420px; gap:32px; align-items:flex-start; }
        .form-row-2 { display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:20px; }

        @media (max-width: 1060px) {
          .channels-grid { grid-template-columns:repeat(2,1fr) !important; }
          .contact-layout { grid-template-columns:1fr !important; }
        }
        @media (max-width: 600px) {
          .channels-grid { grid-template-columns:1fr !important; }
          .desktop-nav { display:none !important; }
          #hamburger { display:flex !important; }
          .form-row-2 { grid-template-columns:1fr !important; }
          .form-panel { padding:24px 18px !important; }
          .hero-pad { padding:80px 5% 48px !important; }
        }
        @media (max-width: 420px) { .channels-grid { gap:12px !important; } }

        input::placeholder, textarea::placeholder, select option[disabled] { color:rgba(161,161,194,0.28); }
        select option { background:#0D0820; color:#E9E6FF; }
        textarea { resize:vertical; }
        ::-webkit-scrollbar { width:3px; }
        ::-webkit-scrollbar-track { background:#05030D; }
        ::-webkit-scrollbar-thumb { background:rgba(108,43,217,0.55); border-radius:2px; }
      `}</style>

      <div style={{ width: "100%", minHeight: "100vh", background: "#05030D", position: "relative", overflowX: "hidden" }}>

        <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
          <AuroraCanvas />
        </div>

        {/* ── White particles layer ── */}
        <WhiteParticles />

        <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", opacity: 0.025, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`, backgroundRepeat: "repeat", backgroundSize: "128px 128px" }} />

        <div style={{ position: "fixed", top: "40%", left: 0, right: 0, height: 1, zIndex: 1, pointerEvents: "none", overflow: "hidden" }}>
          <div style={{ width: "16%", height: "100%", background: "linear-gradient(90deg,transparent,rgba(0,255,198,0.08),transparent)", animation: "scanH 15s linear infinite" }} />
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
              <a key={l.label} href={l.href} className={`nav-link${l.href === "/contact" ? " active" : ""}`}>{l.label}</a>
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
            <HexNodes />
            <div className="hero-pad" style={{ maxWidth: 1160, margin: "0 auto", padding: "100px 5% 72px", position: "relative", zIndex: 2 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 9, padding: "6px 16px", borderRadius: 6, background: "linear-gradient(135deg, rgba(0,255,198,0.07), rgba(0,255,198,0.02))", border: "1px solid rgba(0,255,198,0.2)", backdropFilter: "blur(10px)", marginBottom: 28, animation: "fadeIn 0.5s ease both", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.07)" }}>
                <span style={{ position: "relative" }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#00FFC6", display: "block", boxShadow: "0 0 8px #00FFC6", animation: "blip 2.2s infinite" }} />
                  <span style={{ position: "absolute", top: 0, left: 0, width: 6, height: 6, borderRadius: "50%", background: "rgba(0,255,198,0.4)", animation: "pulseRing 2.2s infinite" }} />
                </span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: "0.18em", color: "rgba(0,255,198,0.85)" }}>SECURE CHANNEL · QRYPTEX COMMS</span>
              </div>
              <h1 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(30px, 5vw, 72px)", fontWeight: 900, lineHeight: 0.95, color: "#E9E6FF", letterSpacing: "-0.02em", marginBottom: 8, animation: "fadeUp 0.65s ease 0.08s both" }}>INITIATE</h1>
              <h1 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(30px, 5vw, 72px)", fontWeight: 900, lineHeight: 0.95, letterSpacing: "-0.02em", marginBottom: 28, background: "linear-gradient(100deg, #6C2BD9 0%, #A78BFA 40%, #00FFC6 80%, #A78BFA 100%)", backgroundSize: "200% 200%", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "fadeUp 0.7s ease 0.15s both, gradientShift 5s ease infinite" }}>CONTACT.</h1>
              <p style={{ maxWidth: 540, fontSize: "clamp(13px, 1.5vw, 15.5px)", lineHeight: 1.8, color: "rgba(161,161,194,0.75)", fontFamily: "'Rajdhani', sans-serif", animation: "fadeUp 0.7s ease 0.22s both" }}>
                Whether you're hardening critical infrastructure or scoping a post-quantum migration — every engagement starts with a conversation. Tell us about your threat model.
              </p>
            </div>
          </div>

          <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(0,255,198,0.2), rgba(108,43,217,0.3), transparent)" }} />

          <div style={{ maxWidth: 1160, margin: "0 auto", padding: "64px 5% 56px" }}>
            <div style={{ marginBottom: 36 }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: "0.2em", color: "rgba(108,43,217,0.5)", textTransform: "uppercase" }}>// REACH US DIRECTLY</span>
            </div>
            <div className="channels-grid">
              {CONTACT_CHANNELS.map((ch, i) => <ChannelCard key={i} ch={ch} index={i} />)}
            </div>
          </div>

          <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(108,43,217,0.25), rgba(0,255,198,0.15), transparent)" }} />

          <div style={{ background: "linear-gradient(180deg, rgba(8,5,22,0.55) 0%, rgba(5,3,13,0.35) 100%)", borderTop: "1px solid rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
            <div style={{ maxWidth: 1160, margin: "0 auto", padding: "72px 5% 80px" }}>

              <div style={{ marginBottom: 48 }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "6px 18px", borderRadius: 6, background: "linear-gradient(135deg, rgba(108,43,217,0.1), rgba(108,43,217,0.03))", border: "1px solid rgba(108,43,217,0.22)", backdropFilter: "blur(10px)", marginBottom: 18, boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)" }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: "0.18em", color: "rgba(139,92,246,0.7)" }}>SECURE FORM · ENCRYPTED TRANSIT</span>
                </div>
                <h2 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(18px, 2.6vw, 34px)", fontWeight: 900, color: "#D4D0F5", letterSpacing: "0.04em", lineHeight: 1.15 }}>
                  SEND A <span style={{ background: "linear-gradient(90deg, #8B5CF6, #00FFC6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>TRANSMISSION.</span>
                </h2>
              </div>

              <div className="contact-layout">

                <div>
                  {submitted ? (
                    <div style={{ padding: "56px 40px", borderRadius: 18, background: "linear-gradient(145deg, rgba(0,255,198,0.07) 0%, rgba(8,5,20,0.7) 100%)", backdropFilter: "blur(24px)", border: "1px solid rgba(0,255,198,0.2)", boxShadow: "0 0 60px rgba(0,255,198,0.08), inset 0 1px 0 rgba(255,255,255,0.1)", textAlign: "center", animation: "successPop 0.7s cubic-bezier(0.34,1.2,0.64,1) both", position: "relative", overflow: "hidden" }}>
                      <div style={{ position: "absolute", top: 0, left: "10%", right: "10%", height: 1, background: "linear-gradient(90deg, transparent, rgba(0,255,198,0.7) 50%, transparent)" }} />
                      <div style={{ width: 72, height: 72, borderRadius: "50%", background: "linear-gradient(135deg, rgba(0,255,198,0.15), rgba(0,255,198,0.04))", border: "1px solid rgba(0,255,198,0.35)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", boxShadow: "0 0 32px rgba(0,255,198,0.2)" }}>
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                          <polyline points="6,17 13,24 26,10" stroke="#00FFC6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="40" strokeDashoffset="0" style={{ animation: "checkDraw 0.5s ease 0.3s both" }} />
                        </svg>
                      </div>
                      <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 18, fontWeight: 900, color: "#E9E6FF", letterSpacing: "0.04em", marginBottom: 12 }}>TRANSMISSION RECEIVED</div>
                      <p style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 14.5, lineHeight: 1.7, color: "rgba(161,161,194,0.75)", maxWidth: 360, margin: "0 auto 28px" }}>Your message has been routed through our secure channel. A member of the QRYPTEX team will respond within 4 business hours.</p>
                      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: "0.18em", color: "rgba(0,255,198,0.5)" }}>// REF: QRX-{Math.random().toString(36).substr(2,8).toUpperCase()}</div>
                    </div>
                  ) : (
                    <div className="form-panel" style={{ padding: "36px 32px", borderRadius: 18, background: "linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(8,5,20,0.65) 100%)", backdropFilter: "blur(24px) saturate(160%)", WebkitBackdropFilter: "blur(24px) saturate(160%)", border: "1px solid rgba(255,255,255,0.07)", boxShadow: "0 16px 60px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.09)", position: "relative", overflow: "hidden" }}>
                      <div style={{ position: "absolute", top: 0, left: "8%", right: "8%", height: 1, background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.6) 40%, rgba(0,255,198,0.35) 70%, transparent)" }} />

                      <div className="form-row-2">
                        <div>
                          <label style={labelStyle}>Full Name *</label>
                          <input type="text" placeholder="Ada Lovelace" value={form.name} onChange={e => handleChange("name", e.target.value)} onFocus={() => setFocused("name")} onBlur={() => setFocused(null)} style={inputStyle("name")} />
                        </div>
                        <div>
                          <label style={labelStyle}>Organization</label>
                          <input type="text" placeholder="Acme Corp" value={form.company} onChange={e => handleChange("company", e.target.value)} onFocus={() => setFocused("company")} onBlur={() => setFocused(null)} style={inputStyle("company")} />
                        </div>
                      </div>

                      <div style={{ marginBottom: 20 }}>
                        <label style={labelStyle}>Work Email *</label>
                        <input type="email" placeholder="ada@acmecorp.io" value={form.email} onChange={e => handleChange("email", e.target.value)} onFocus={() => setFocused("email")} onBlur={() => setFocused(null)} style={inputStyle("email")} />
                      </div>

                      <div className="form-row-2">
                        <div>
                          <label style={labelStyle}>Inquiry Type</label>
                          <select value={form.type} onChange={e => handleChange("type", e.target.value)} onFocus={() => setFocused("type")} onBlur={() => setFocused(null)} style={{ ...inputStyle("type"), appearance: "none", WebkitAppearance: "none", cursor: "pointer" }}>
                            <option value="" disabled>Select service…</option>
                            {INQUIRY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                          </select>
                        </div>
                        <div>
                          <label style={labelStyle}>Est. Budget</label>
                          <select value={form.budget} onChange={e => handleChange("budget", e.target.value)} onFocus={() => setFocused("budget")} onBlur={() => setFocused(null)} style={{ ...inputStyle("budget"), appearance: "none", WebkitAppearance: "none", cursor: "pointer" }}>
                            <option value="" disabled>Select range…</option>
                            {["Under $25k", "$25k – $100k", "$100k – $500k", "$500k+", "Undecided"].map(b => <option key={b} value={b}>{b}</option>)}
                          </select>
                        </div>
                      </div>

                      <div style={{ marginBottom: 28 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                          <label style={{ ...labelStyle, marginBottom: 0 }}>Message *</label>
                          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8.5, color: charCount > 500 ? "rgba(0,255,198,0.5)" : "rgba(161,161,194,0.25)" }}>{charCount}/1000</span>
                        </div>
                        <textarea rows={5} placeholder="Describe your use case, current architecture, key pain points, and timeline expectations…" value={form.message} maxLength={1000} onChange={e => handleChange("message", e.target.value)} onFocus={() => setFocused("message")} onBlur={() => setFocused(null)} style={{ ...inputStyle("message"), resize: "vertical", minHeight: 120, lineHeight: 1.6 }} />
                      </div>

                      <button onClick={handleSubmit} disabled={submitting || !form.name || !form.email || !form.message}
                        style={{ width: "100%", padding: "15px 0", borderRadius: 10, cursor: (submitting || !form.name || !form.email || !form.message) ? "not-allowed" : "pointer", background: (submitting || !form.name || !form.email || !form.message) ? "linear-gradient(135deg, rgba(108,43,217,0.25), rgba(76,27,160,0.2))" : "linear-gradient(135deg, #6C2BD9 0%, #4C1BA0 100%)", border: "1px solid rgba(139,92,246,0.5)", color: "#fff", fontFamily: "'Rajdhani', sans-serif", fontSize: 12.5, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", boxShadow: (!submitting && form.name && form.email && form.message) ? "0 8px 28px rgba(108,43,217,0.4), inset 0 1px 0 rgba(255,255,255,0.15)" : "none", transition: "all 0.3s ease", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, opacity: (submitting || !form.name || !form.email || !form.message) ? 0.6 : 1 }}
                        onMouseEnter={e => { if (!submitting && form.name && form.email && form.message) { e.currentTarget.style.boxShadow = "0 14px 40px rgba(108,43,217,0.6), inset 0 1px 0 rgba(255,255,255,0.2)"; e.currentTarget.style.transform = "translateY(-2px)"; } }}
                        onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 8px 28px rgba(108,43,217,0.4), inset 0 1px 0 rgba(255,255,255,0.15)"; e.currentTarget.style.transform = "translateY(0)"; }}>
                        {submitting ? (
                          <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ animation: "spin 0.8s linear infinite" }}><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>Encrypting & Sending…</>
                        ) : (
                          <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>Send Transmission</>
                        )}
                      </button>

                      <div style={{ marginTop: 16, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="rgba(161,161,194,0.3)" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8.5, color: "rgba(161,161,194,0.28)", letterSpacing: "0.1em" }}>TLS 1.3 · End-to-end encrypted · Zero logging</span>
                      </div>
                    </div>
                  )}
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  <div style={{ padding: "28px 26px", borderRadius: 16, background: "linear-gradient(145deg, rgba(0,255,198,0.06) 0%, rgba(8,5,20,0.7) 100%)", backdropFilter: "blur(22px)", WebkitBackdropFilter: "blur(22px)", border: "1px solid rgba(0,255,198,0.15)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.09), 0 8px 32px rgba(0,0,0,0.35)", position: "relative", overflow: "hidden" }}>
                    <div style={{ position: "absolute", top: 0, left: "10%", right: "10%", height: 1, background: "linear-gradient(90deg, transparent, rgba(0,255,198,0.6) 50%, transparent)" }} />
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: "0.2em", color: "rgba(0,255,198,0.55)", marginBottom: 16 }}>// RESPONSE PROTOCOL</div>
                    {[
                      { tier: "Enterprise", sla: "< 2 hrs", col: "#00FFC6", rgb: "0,255,198" },
                      { tier: "SMB / Startup", sla: "< 4 hrs", col: "#8B5CF6", rgb: "139,92,246" },
                      { tier: "General", sla: "< 24 hrs", col: "#A78BFA", rgb: "167,139,250" },
                    ].map((r) => (
                      <div key={r.tier} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <span style={{ width: 5, height: 5, borderRadius: "50%", background: r.col, flexShrink: 0, boxShadow: `0 0 6px rgba(${r.rgb},0.6)` }} />
                          <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 13, color: "rgba(185,180,220,0.75)" }}>{r.tier}</span>
                        </div>
                        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: r.col, fontWeight: 700 }}>{r.sla}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ padding: "28px 26px", borderRadius: 16, background: "linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(8,5,20,0.65) 100%)", backdropFilter: "blur(22px)", WebkitBackdropFilter: "blur(22px)", border: "1px solid rgba(255,255,255,0.07)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08), 0 8px 32px rgba(0,0,0,0.35)", position: "relative", overflow: "hidden" }}>
                    <div style={{ position: "absolute", top: 0, left: "10%", right: "10%", height: 1, background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.5) 50%, transparent)" }} />
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: "0.2em", color: "rgba(139,92,246,0.55)", marginBottom: 18 }}>// WHAT HAPPENS NEXT</div>
                    {[
                      { n: "01", t: "Threat Model Review", d: "We assess your current architecture before the first call." },
                      { n: "02", t: "Scoping Call", d: "30-min NDA-protected session to define scope and success criteria." },
                      { n: "03", t: "Proposal Delivery", d: "Detailed SOW with timeline, team, and fixed pricing within 72 hrs." },
                      { n: "04", t: "Kickoff", d: "Secure onboarding with dedicated channel and Slack workspace." },
                    ].map((step) => (
                      <div key={step.n} style={{ display: "flex", gap: 14, marginBottom: 18 }}>
                        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "rgba(108,43,217,0.55)", flexShrink: 0, marginTop: 1, letterSpacing: "0.04em" }}>{step.n}</div>
                        <div>
                          <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 11, fontWeight: 700, color: "#C4BFEA", letterSpacing: "0.04em", marginBottom: 4 }}>{step.t}</div>
                          <p style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 12.5, lineHeight: 1.6, color: "rgba(161,161,194,0.55)" }}>{step.d}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{ padding: "22px 24px", borderRadius: 14, background: "linear-gradient(145deg, rgba(108,43,217,0.07), rgba(5,3,13,0.65))", backdropFilter: "blur(16px)", border: "1px solid rgba(108,43,217,0.15)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)" }}>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: "0.2em", color: "rgba(108,43,217,0.45)", marginBottom: 16 }}>// COMPLIANCE & TRUST</div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                      {["SOC2 Type II", "ISO 27001", "NIST CSF", "HIPAA Ready", "GDPR", "PQC Certified"].map((badge) => (
                        <div key={badge} style={{ padding: "8px 12px", borderRadius: 8, background: "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(108,43,217,0.04))", border: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", gap: 7 }}>
                          <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#00FFC6", flexShrink: 0, boxShadow: "0 0 5px rgba(0,255,198,0.5)" }} />
                          <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 11.5, color: "rgba(180,175,220,0.65)", fontWeight: 600 }}>{badge}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ padding: "22px 5%", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, borderTop: "1px solid rgba(255,255,255,0.04)" }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "rgba(161,161,194,0.2)", letterSpacing: "0.1em" }}>© 2025 QRYPTEX — ALL SYSTEMS OPERATIONAL</span>
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