import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

// ── BACKGROUND EFFECT ───────────────────────────────────────────────────────
function CyberAmbient() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    let raf;
    let t = 0;
    
    const resize = () => { 
      canvas.width = window.innerWidth; 
      canvas.height = window.innerHeight; 
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      t += 0.002;

      ctx.strokeStyle = "rgba(255, 0, 200, 0.025)"; 
      ctx.lineWidth = 1;
      const step = 60;
      for(let x = 0; x < W; x += step) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
      }
      for(let y = 0; y < H; y += step) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }

      [
        { bx: 0.2,  by: 0.3, r: 400, col: "255,0,200",  sp: 0.15 },
        { bx: 0.8,  by: 0.6, r: 350, col: "0,153,255", sp: 0.2 },
      ].forEach(({ bx, by, r, col, sp }) => {
        const cx = bx * W + Math.sin(t * sp) * 100;
        const cy = by * H + Math.cos(t * sp * 0.8) * 100;
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        g.addColorStop(0, `rgba(${col},0.08)`);
        g.addColorStop(1, `rgba(${col},0)`);
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }} />;
}

// ── IN-CARD PARTICLES EFFECT ────────────────────────────────────────────────
function CardParticles({ active, accent }) {
  const ref = useRef(null);
  const pts = useRef([]);
  const raf = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const spawn = () => ({
      x: Math.random() * canvas.width,
      y: canvas.height + 4,
      vx: (Math.random() - 0.5) * 0.5,
      vy: -(Math.random() * 0.9 + 0.35),
      life: 1,
      decay: Math.random() * 0.009 + 0.004,
      r: Math.random() * 1.5 + 0.5,
    });

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (active && pts.current.length < 25) pts.current.push(spawn());
      
      pts.current = pts.current.filter(p => p.life > 0);
      pts.current.forEach(p => {
        p.x += p.vx; 
        p.y += p.vy; 
        p.life -= p.decay;
        ctx.globalAlpha = Math.max(0, p.life * 0.65);
        ctx.fillStyle = accent;
        ctx.shadowBlur = 5; 
        ctx.shadowColor = accent;
        ctx.beginPath(); 
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); 
        ctx.fill();
      });
      ctx.globalAlpha = 1; 
      ctx.shadowBlur = 0;
      raf.current = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("resize", resize);
    };
  }, [active, accent]);

  return (
    <canvas 
      ref={ref} 
      style={{ 
        position: "absolute", inset: 0, width: "100%", height: "100%", 
        pointerEvents: "none", borderRadius: "inherit", zIndex: 1 
      }} 
    />
  );
}

// ── INDIVIDUAL CARD COMPONENT ───────────────────────────────────────────────
function CyberCard({ cap, index, loaded }) {
  const [hov, setHov] = useState(false);

  return (
    <div 
      className="cyber-card"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        border: `1px solid rgba(${cap.accentRgb}, 0.2)`,
        opacity: loaded ? 1 : 0, 
        transform: loaded ? "translateY(0) scale(1)" : "translateY(30px) scale(0.95)",
        '--hover-accent': cap.accent,
        '--hover-accent-alpha': `rgba(${cap.accentRgb}, 0.25)`,
        transitionDelay: `${0.1 + (index * 0.1)}s, 0s, 0s` 
      }}
    >
      <div className="accent-bar" />
      <CardParticles active={hov} accent={cap.accent} />
      
      <div style={{ position: "relative", zIndex: 2 }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: cap.accent, letterSpacing: "0.15em", marginBottom: 16 }}>
          {cap.subtitle.toUpperCase()}
        </div>
        
        <h2 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(18px, 2.5vw, 22px)", fontWeight: 700, marginBottom: 16 }}>
          {cap.title}
        </h2>
        
        <p style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "15px", lineHeight: 1.6, color: "var(--text-secondary, #A1A1C2)", marginBottom: 30, minHeight: "48px" }}>
          {cap.tagline}
        </p>

        <div style={{ display: "flex", gap: "15px", marginBottom: "30px", flexWrap: "wrap" }}>
          {cap.stats.map((stat, i) => (
            <div key={i} className="stat-box">
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "rgba(161,161,194,0.6)", marginBottom: "4px", textTransform: "uppercase" }}>{stat.label}</div>
              <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "16px", fontWeight: 700, color: cap.accent }}>{stat.value}</div>
            </div>
          ))}
        </div>

        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
          {cap.points.map((point, i) => (
            <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
              <div className="cyber-point-dot" style={{ background: cap.accent, boxShadow: `0 0 8px rgba(${cap.accentRgb}, 0.5)` }} />
              <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "14px", lineHeight: 1.6, color: "rgba(233,230,255,0.85)" }}>
                {point}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ── FULL STACK CAPABILITIES (Marketing the Portfolio) ───────────────────────
const FULLSTACK_CAPABILITIES = [
  {
    id: "connected-iot",
    title: "IoT & Smart Ecosystems",
    subtitle: "Hardware Meets Software",
    tagline: "Multi-sided platforms that seamlessly bridge physical environments with digital interfaces.",
    accent: "#FF00C8",
    accentRgb: "255,0,200",
    stats: [
      { label: "Architecture", value: "Multi-Node" },
      { label: "Data Sync", value: "Real-Time" }
    ],
    points: [
      "Dual-sided application architectures (e.g., Customer Apps communicating instantly with Vendor/Kitchen POS).",
      "Direct IoT hardware integration linking sensors, smart counters, and mobile devices.",
      "Real-time state management using WebSockets and Supabase for zero-latency updates."
    ]
  },
  {
    id: "consumer-apps",
    title: "High-Conversion Mobile Apps",
    subtitle: "Consumer Experiences",
    tagline: "Bespoke booking engines, boutique e-commerce, and native apps designed to retain users.",
    accent: "#00FFC6",
    accentRgb: "0,255,198",
    stats: [
      { label: "UI Response", value: "< 100ms" },
      { label: "Platform", value: "Cross-Device" }
    ],
    points: [
      "Scalable facility booking architectures (like Turf applications) with real-time slot conflict resolution.",
      "Custom retail and boutique e-commerce platforms optimized for fast checkouts and visual appeal.",
      "Cross-platform parity ensuring a uniform, premium brand experience on both iOS and Android."
    ]
  },
  {
    id: "enterprise-billing",
    title: "ERP & Billing Software",
    subtitle: "Financial Precision",
    tagline: "Robust, compliant, cross-platform software that powers your daily business operations and inventory.",
    accent: "#FFB800",
    accentRgb: "255,184,0",
    stats: [
      { label: "Deployment", value: "Web & Desktop" },
      { label: "Reliability", value: "Offline-First" }
    ],
    points: [
      "Complex billing applications built with React and Electron for seamless desktop and web experiences.",
      "Automated stock tracking, ledger management, and GST/Tax compliant invoice generation.",
      "Secure, encrypted local databases that sync to the cloud, ensuring operations continue even without internet."
    ]
  },
  {
    id: "cloud-scale",
    title: "Distributed Cloud Systems",
    subtitle: "Infinite Scalability",
    tagline: "Resilient backend architectures designed to handle massive traffic spikes without sweating.",
    accent: "#0099FF",
    accentRgb: "0,153,255",
    stats: [
      { label: "Throughput", value: "10k+ TPS" },
      { label: "Architecture", value: "Event-Driven" }
    ],
    points: [
      "Decoupled microservices ensuring your application never experiences a total blackout during high loads.",
      "API-first design utilizing modern query languages for blazing-fast data retrieval.",
      "Automated deployment pipelines and serverless infrastructure on AWS/GCP to optimize operational costs."
    ]
  }
];

// ── FULL STACK PAGE COMPONENT ───────────────────────────────────────────────
export default function FullStackServices() {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-deep, #05030D)", position: "relative", overflowX: "hidden", color: "var(--text-primary, #E9E6FF)" }}>
      
      {/* Dynamic Scoped CSS */}
      <style>{`
        html { scrollbar-color: rgba(255,0,200,0.8) transparent; scrollbar-width: thin; }
        ::-webkit-scrollbar { width: 2px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,0,200,0.8); border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #FF00C8; }

        .capabilities-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 30px;
          margin-bottom: 80px;
        }

        .cyber-card {
          background: rgba(8, 5, 20, 0.6);
          backdrop-filter: blur(12px);
          border-radius: 6px;
          padding: 40px 30px;
          position: relative;
          overflow: hidden;
          transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), 
                      box-shadow 0.4s ease, 
                      border-color 0.4s ease;
          cursor: default;
          display: flex;
          flex-direction: column;
        }

        .cyber-card:hover {
          transform: translateY(-10px) scale(1.02) !important;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5), 
                      0 0 20px var(--hover-accent-alpha);
          border-color: var(--hover-accent) !important;
          z-index: 5;
        }

        .cyber-card .accent-bar {
          position: absolute;
          top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, var(--hover-accent), transparent);
          transition: opacity 0.4s ease, height 0.3s ease;
          z-index: 3;
        }

        .cyber-card:hover .accent-bar {
          height: 4px;
          opacity: 1;
        }

        .stat-box {
          flex: 1;
          background: rgba(255, 255, 255, 0.02);
          border: 1px dashed rgba(255, 255, 255, 0.1);
          padding: 12px;
          border-radius: 4px;
          transition: transform 0.3s ease, background 0.3s ease, border-color 0.3s ease;
        }

        .cyber-card:hover .stat-box {
          transform: translateY(-4px);
          background: rgba(255, 255, 255, 0.06);
          border-color: var(--hover-accent-alpha);
        }

        .cyber-point-dot {
          width: 6px; height: 6px; 
          border-radius: 50%; 
          margin-top: 8px; flex-shrink: 0;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .cyber-card:hover .cyber-point-dot {
          transform: scale(1.3);
          box-shadow: 0 0 12px var(--hover-accent);
        }

        /* CTA Button Hover Effect */
        .cta-button {
          background: rgba(255, 0, 200, 0.1);
          border: 1px solid #FF00C8;
          color: #FF00C8;
          padding: 16px 32px;
          font-family: 'Orbitron', sans-serif;
          font-weight: 700;
          font-size: 16px;
          letter-spacing: 0.1em;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 0 15px rgba(255, 0, 200, 0.2);
          text-transform: uppercase;
        }

        .cta-button:hover {
          background: #FF00C8;
          color: #05030D;
          box-shadow: 0 0 30px rgba(255, 0, 200, 0.6);
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          .capabilities-grid { grid-template-columns: 1fr; gap: 20px; }
          .cyber-card { padding: 30px 20px; }
          .hero-title { font-size: clamp(28px, 8vw, 42px) !important; }
          .hero-subtitle { font-size: 15px !important; }
          .cta-container { padding: 40px 20px !important; }
        }
      `}</style>

      <CyberAmbient />
      
      {/* Navigation */}
      <div style={{ position: "relative", zIndex: 10, padding: "30px 5%", display: "flex", alignItems: "center" }}>
        <button 
          onClick={() => navigate('/services')}
          style={{
            background: "transparent", border: "1px solid rgba(255,0,200,0.3)", borderRadius: "4px",
            color: "#FF00C8", padding: "8px 16px", cursor: "pointer",
            fontFamily: "'Rajdhani', sans-serif", fontSize: "14px", fontWeight: 600, letterSpacing: "0.1em",
            display: "flex", alignItems: "center", gap: "8px", transition: "all 0.3s"
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,0,200,0.1)"; e.currentTarget.style.transform = "translateX(-4px)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.transform = "translateX(0)"; }}
        >
          <span>←</span> RETURN
        </button>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "20px 5% 60px", position: "relative", zIndex: 2 }}>
        
        {/* Outcome-Focused Header Section */}
        <div style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(20px)", transition: "all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)", marginBottom: "clamp(40px, 8vw, 60px)" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 2, border: "1px solid rgba(255,0,200,0.3)", background: "rgba(255,0,200,0.05)", marginBottom: 24 }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.16em", color: "#FF00C8" }}>// BUILD FOR SCALE · QRYPTEX</span>
          </div>
          <h1 className="hero-title" style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(32px, 5vw, 58px)", fontWeight: 900, lineHeight: 1.1, letterSpacing: "-0.01em", marginBottom: 20 }}>
            SCALABLE ARCHITECTURE. <br/>
            <span style={{ color: "#FF00C8" }}>MARKET-READY APPS.</span>
          </h1>
          <p className="hero-subtitle" style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "16px", lineHeight: 1.8, color: "var(--text-secondary, #A1A1C2)", maxWidth: 700 }}>
            We don't just write code; we engineer entire digital businesses. From multi-node IoT smart ecosystems and enterprise billing software to high-conversion consumer booking apps, we own the full stack to ensure your product performs flawlessly.
          </p>
        </div>

        {/* Capabilities Grid */}
        <div className="capabilities-grid">
          {FULLSTACK_CAPABILITIES.map((cap, index) => (
            <CyberCard key={cap.id} cap={cap} index={index} loaded={loaded} />
          ))}
        </div>

        {/* Call-To-Action Section */}
        <div 
          className="cta-container"
          style={{ 
            opacity: loaded ? 1 : 0, 
            transform: loaded ? "translateY(0)" : "translateY(30px)", 
            transition: "all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.6s",
            background: "linear-gradient(180deg, rgba(8, 5, 20, 0) 0%, rgba(255, 0, 200, 0.1) 100%)",
            border: "1px solid rgba(255, 0, 200, 0.3)",
            borderRadius: "8px",
            padding: "60px 40px",
            textAlign: "center",
            position: "relative",
            overflow: "hidden"
          }}
        >
          {/* Subtle glow behind CTA */}
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "100%", height: "100%", background: "radial-gradient(circle, rgba(255,0,200,0.15) 0%, transparent 60%)", pointerEvents: "none", zIndex: 0 }} />
          
          <div style={{ position: "relative", zIndex: 1 }}>
            <h3 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 700, marginBottom: "16px", color: "#FFF" }}>
              Ready to Architect Your Vision?
            </h3>
            <p style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "16px", color: "var(--text-secondary, #A1A1C2)", maxWidth: "600px", margin: "0 auto 30px auto", lineHeight: 1.6 }}>
              Whether you need a complex point-of-sale system, an IoT-connected web platform, or a native mobile app, let’s build an ecosystem that scales with your ambition.
            </p>
            <button className="cta-button" onClick={() => navigate('/contact')}>
              START YOUR BUILD
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}