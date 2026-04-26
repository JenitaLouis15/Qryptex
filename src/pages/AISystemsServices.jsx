import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

// ── BACKGROUND EFFECT (Tuned for AI Theme) ──────────────────────────────────
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

      // Subtle violet grid
      ctx.strokeStyle = "rgba(167, 139, 250, 0.025)";
      ctx.lineWidth = 1;
      const step = 60;
      for(let x = 0; x < W; x += step) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
      }
      for(let y = 0; y < H; y += step) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }

      // Floating ambient glows (Violet & Cyan)
      [
        { bx: 0.2,  by: 0.3, r: 400, col: "167,139,250",  sp: 0.15 },
        { bx: 0.8,  by: 0.6, r: 350, col: "0,255,204", sp: 0.2 },
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

// ── ML & INTELLIGENT SYSTEMS DATA ───────────────────────────────────────────
const AI_CAPABILITIES = [
  {
    id: "fraud-anomaly",
    title: "Hybrid Anomaly Detection",
    subtitle: "Trade & Risk Intelligence",
    tagline: "Unsupervised machine learning fused with strict rule engines to identify suspicious behavior and financial fraud.",
    accent: "#FF3366", // Red/Pink for high-alert detection
    accentRgb: "255,51,102",
    stats: [
      { label: "Target Recall", value: "~99%" },
      { label: "False Positives", value: "-92% Reduced" }
    ],
    points: [
      "Deploy Isolation Forest models to detect behavioral outliers in high-dimensional datasets.",
      "Context-aware calibration pipelines that recover precision without suppressing critical alerts.",
      "Explainable risk scoring combining AI signals and compliance rules for fast, clear investigation workflows."
    ]
  },
  {
    id: "log-analysis",
    title: "Automated Log Analysis",
    subtitle: "Proactive Threat Defense",
    tagline: "Transform mountains of raw server and network logs into actionable security intelligence in real-time.",
    accent: "#A78BFA", // Violet
    accentRgb: "167,139,250",
    stats: [
      { label: "Processing", value: "Real-Time" },
      { label: "Alert Latency", value: "< 1s" }
    ],
    points: [
      "Behavioral analysis models that spot network intrusions and lateral movement traditional SIEMs miss.",
      "Automated signal correlation to group disparate log events into coherent threat narratives.",
      "Direct integration with existing SOC dashboards, alerting pipelines, and incident response tools."
    ]
  },
  {
    id: "computer-vision",
    title: "Real-Time Video Analytics",
    subtitle: "CCTV Perception",
    tagline: "Turn passive camera feeds into active security monitors with low-latency computer vision models.",
    accent: "#00FFCC", // Cyan
    accentRgb: "0,255,204",
    stats: [
      { label: "Inference", value: "60fps+" },
      { label: "Architecture", value: "Edge-Optimized" }
    ],
    points: [
      "Live object detection, perimeter breach alerts, and tracking using optimized neural networks.",
      "Secure facial recognition capabilities for biometric identity verification in restricted zones.",
      "Automated behavioral flagging for safety compliance violations, unauthorized access, or loitering."
    ]
  },
  {
    id: "predictive-ml",
    title: "Predictive Machine Learning",
    subtitle: "Data-Driven Operations",
    tagline: "Leverage ensemble methods like Random Forests to optimize resource allocation and anticipate system behaviors.",
    accent: "#FFB800", // Gold/Orange
    accentRgb: "255,184,0",
    stats: [
      { label: "Algorithm", value: "Ensemble ML" },
      { label: "Feature Engineering", value: "Custom" }
    ],
    points: [
      "Predictive maintenance models that alert your operations team before critical hardware or infrastructure fails.",
      "Advanced regression modeling for supply chain forecasting, inventory optimization, and price dynamics.",
      "Rigorous, domain-specific feature engineering tailored strictly to your proprietary business metrics."
    ]
  }
];

// ── AI PAGE COMPONENT ───────────────────────────────────────────────────────
export default function AISystemsServices() {
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
        html { scrollbar-color: rgba(167,139,250,0.8) transparent; scrollbar-width: thin; }
        ::-webkit-scrollbar { width: 2px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(167,139,250,0.8); border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #A78BFA; }

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
          background: rgba(167, 139, 250, 0.1);
          border: 1px solid #A78BFA;
          color: #A78BFA;
          padding: 16px 32px;
          font-family: 'Orbitron', sans-serif;
          font-weight: 700;
          font-size: 16px;
          letter-spacing: 0.1em;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 0 15px rgba(167, 139, 250, 0.2);
          text-transform: uppercase;
        }

        .cta-button:hover {
          background: #A78BFA;
          color: #05030D;
          box-shadow: 0 0 30px rgba(167, 139, 250, 0.6);
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
            background: "transparent", border: "1px solid rgba(167,139,250,0.3)", borderRadius: "4px",
            color: "#A78BFA", padding: "8px 16px", cursor: "pointer",
            fontFamily: "'Rajdhani', sans-serif", fontSize: "14px", fontWeight: 600, letterSpacing: "0.1em",
            display: "flex", alignItems: "center", gap: "8px", transition: "all 0.3s"
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(167,139,250,0.1)"; e.currentTarget.style.transform = "translateX(-4px)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.transform = "translateX(0)"; }}
        >
          <span>←</span> RETURN
        </button>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "20px 5% 60px", position: "relative", zIndex: 2 }}>
        
        {/* Outcome-Focused Header Section */}
        <div style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(20px)", transition: "all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)", marginBottom: "clamp(40px, 8vw, 60px)" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 2, border: "1px solid rgba(167,139,250,0.3)", background: "rgba(167,139,250,0.05)", marginBottom: 24 }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.16em", color: "#A78BFA" }}>// MACHINE LEARNING & PERCEPTION · QRYPTEX</span>
          </div>
          <h1 className="hero-title" style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(32px, 5vw, 58px)", fontWeight: 900, lineHeight: 1.1, letterSpacing: "-0.01em", marginBottom: 20 }}>
            INTELLIGENCE FROM DATA. <br/>
            <span style={{ color: "#A78BFA" }}>ACTION IN REAL-TIME.</span>
          </h1>
          <p className="hero-subtitle" style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "16px", lineHeight: 1.8, color: "var(--text-secondary, #A1A1C2)", maxWidth: 680 }}>
            We engineer specialized Machine Learning models—from Isolation Forests for fraud detection to edge-optimized CCTV computer vision. We deploy hybrid intelligence architectures that prioritize high recall, low false positives, and absolute explainability.
          </p>
        </div>

        {/* Capabilities Grid */}
        <div className="capabilities-grid">
          {AI_CAPABILITIES.map((cap, index) => (
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
            background: "linear-gradient(180deg, rgba(8, 5, 20, 0) 0%, rgba(167, 139, 250, 0.1) 100%)",
            border: "1px solid rgba(167, 139, 250, 0.3)",
            borderRadius: "8px",
            padding: "60px 40px",
            textAlign: "center",
            position: "relative",
            overflow: "hidden"
          }}
        >
          {/* Subtle glow behind CTA */}
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "100%", height: "100%", background: "radial-gradient(circle, rgba(167,139,250,0.15) 0%, transparent 60%)", pointerEvents: "none", zIndex: 0 }} />
          
          <div style={{ position: "relative", zIndex: 1 }}>
            <h3 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 700, marginBottom: "16px", color: "#FFF" }}>
              Ready to Deploy Real Machine Learning?
            </h3>
            <p style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "16px", color: "var(--text-secondary, #A1A1C2)", maxWidth: "600px", margin: "0 auto 30px auto", lineHeight: 1.6 }}>
              Move beyond the generative hype. Partner with us to integrate robust anomaly detection, automated log analysis, and vision models that solve actual operational and security challenges.
            </p>
            <button className="cta-button" onClick={() => navigate('/contact')}>
              REQUEST ML AUDIT
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}