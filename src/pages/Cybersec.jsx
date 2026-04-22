import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

// ── BACKGROUND EFFECT ────────────────────────────────────────────────────────
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

      ctx.strokeStyle = "rgba(0, 255, 198, 0.025)";
      ctx.lineWidth = 1;
      const step = 60;
      for(let x = 0; x < W; x += step) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
      }
      for(let y = 0; y < H; y += step) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }

      [
        { bx: 0.2,  by: 0.3, r: 400, col: "0,255,198",  sp: 0.15 },
        { bx: 0.8,  by: 0.6, r: 350, col: "108,43,217", sp: 0.2 },
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

// ── SERVICE DATA ─────────────────────────────────────────────────────────────
const CAPABILITIES = [
  {
    id: "risk-ai",
    title: "Cognitive Risk & Fraud Intelligence",
    subtitle: "AI-Driven Anomaly Detection",
    tagline: "Context-aware hybrid risk analysis systems that eliminate noise and scale infinitely.",
    accent: "#00FFC6",
    accentRgb: "0,255,198",
    stats: [
      { label: "Throughput", value: "100k+ TPS" },
      { label: "False Positives", value: "-92%" }
    ],
    points: [
      "Hybrid AI and rule-based anomaly detection for transactional data.",
      "Context-aware calibration that drastically reduces alert fatigue without suppressing high-risk signals.",
      "Explainable risk scoring with real-time investigation workflows."
    ]
  },
  {
    id: "quantum-crypto",
    title: "Post-Quantum Cryptographic Architecture",
    subtitle: "Deterministic Consensus Systems",
    tagline: "Decentralized state machines hardened against the cryptographic threats of tomorrow.",
    accent: "#A78BFA",
    accentRgb: "167,139,250",
    stats: [
      { label: "Encryption", value: "Dilithium PQC" },
      { label: "Architecture", value: "BFT Consensus" }
    ],
    points: [
      "Lattice-based quantum encryption (Dilithium) combined with SHA3-256 for future-proof security.",
      "Full-stack observability of block construction, transactions, and validator activity.",
      "Deterministic state transitions preventing replay attacks and consensus divergence."
    ]
  },
  {
    id: "app-sec",
    title: "Offensive Security & Penetration Testing",
    subtitle: "Proactive Perimeter Hardening",
    tagline: "Deep-dive exploitation, SIEM integration, and granular packet-level analysis.",
    accent: "#8B5CF6",
    accentRgb: "139,92,246",
    stats: [
      { label: "Analysis", value: "Deep PCAP" },
      { label: "Coverage", value: "Full-Stack" }
    ],
    points: [
      "Advanced exploitation modeling (Injection, Auth Bypass, Logic Flaws, Client-Side Attacks).",
      "Detection engineering, SIEM correlation, and rigorous PCAP behavioral analysis.",
      "Comprehensive system hardening supported by actionable, SOC-ready vulnerability reports."
    ]
  },
  {
    id: "secure-apps",
    title: "Secure Enterprise FinTech Solutions",
    subtitle: "Scalable Web & Mobile Architectures",
    tagline: "High-performance applications built with bank-grade security and zero-trust principles.",
    accent: "#6C2BD9",
    accentRgb: "108,43,217",
    stats: [
      { label: "Payments", value: "Encrypted" },
      { label: "Ecosystem", value: "Edge-Native" }
    ],
    points: [
      "End-to-end encrypted mobile and web application development.",
      "Highly secure payment gateway integration (Razorpay) with strict authorization protocols.",
      "Business logic flaw prevention and API misuse protection built directly into the architecture."
    ]
  }
];

// ── TEAM DATA ────────────────────────────────────────────────────────────────
const ENGINEERS = [
  {
    name: "Person 1",
    role: "Lead Systems Architect & Quantum Engineer",
    bio: "Drives the vision for deeply scalable architecture and post-quantum cryptography. Specializes in building deterministic consensus engines, full-stack observability platforms, and integrating AI into enterprise data flows.",
    github: "https://github.com/SureshKrishnaR", 
    linkedin: "https://linkedin.com/in/sureshkrishnar", 
    accent: "#A78BFA",
    accentRgb: "167,139,250"
  },
  {
    name: "Person 2",
    role: "Lead Cybersecurity & Blockchain Engineer",
    bio: "Focuses on perimeter hardening, adversarial simulation, and decentralized infrastructure. Architect of hybrid AI risk models, secure payment pipelines, and deep-dive vulnerability exploitation frameworks.",
    github: "https://github.com/sai-shashank-2005",
    linkedin: "https://linkedin.com/in/sai-shashank", 
    accent: "#00FFC6",
    accentRgb: "0,255,198"
  }
];

// ── COMPONENT ────────────────────────────────────────────────────────────────
export default function Cybersec() {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-deep, #05030D)", position: "relative", overflowX: "hidden", color: "var(--text-primary, #E9E6FF)" }}>
      <CyberAmbient />
      
      {/* Navigation */}
      <div style={{ position: "relative", zIndex: 10, padding: "30px 5%", display: "flex", alignItems: "center" }}>
        <button 
          onClick={() => navigate('/services')}
          style={{
            background: "transparent", border: "1px solid rgba(0,255,198,0.3)", borderRadius: "4px",
            color: "var(--accent-green, #00FFC6)", padding: "8px 16px", cursor: "pointer",
            fontFamily: "'Rajdhani', sans-serif", fontSize: "14px", fontWeight: 600, letterSpacing: "0.1em",
            display: "flex", alignItems: "center", gap: "8px", transition: "all 0.3s"
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(0,255,198,0.1)"; e.currentTarget.style.transform = "translateX(-4px)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.transform = "translateX(0)"; }}
        >
          <span>←</span> RETURN
        </button>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "20px 5% 100px", position: "relative", zIndex: 2 }}>
        
        {/* Header Section */}
        <div style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(20px)", transition: "all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)", marginBottom: 60 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 2, border: "1px solid rgba(167,139,250,0.3)", background: "rgba(167,139,250,0.05)", marginBottom: 24 }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.16em", color: "#A78BFA" }}>// CORE SERVICES · QRYPTEX</span>
          </div>
          <h1 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(32px, 5vw, 58px)", fontWeight: 900, lineHeight: 1.1, letterSpacing: "-0.01em", marginBottom: 20 }}>
            ENTERPRISE SECURITY <br/>
            <span style={{ color: "var(--accent-green, #00FFC6)" }}>& THREAT ARCHITECTURE.</span>
          </h1>
          <p style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "16px", lineHeight: 1.8, color: "var(--text-secondary, #A1A1C2)", maxWidth: 650 }}>
            We engineer systems that outpace adversaries. From hybrid AI risk analysis processing millions of transactions, to quantum-safe blockchains and deep-dive offensive security operations—we build the infrastructure businesses trust when failure is not an option.
          </p>
        </div>

        {/* Capabilities Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "30px", marginBottom: "80px" }}>
          {CAPABILITIES.map((cap, index) => (
            <div 
              key={cap.id} 
              style={{
                background: "rgba(8,5,20,0.6)", backdropFilter: "blur(12px)",
                border: `1px solid rgba(${cap.accentRgb}, 0.2)`, borderRadius: "6px",
                padding: "40px 30px", position: "relative", overflow: "hidden",
                opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(30px)",
                transition: `all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) ${0.1 + (index * 0.1)}s`
              }}
            >
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: `linear-gradient(90deg, ${cap.accent}, transparent)` }} />
              
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: cap.accent, letterSpacing: "0.15em", marginBottom: 16 }}>
                {cap.subtitle.toUpperCase()}
              </div>
              
              <h2 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "22px", fontWeight: 700, marginBottom: 16 }}>
                {cap.title}
              </h2>
              
              <p style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "15px", lineHeight: 1.6, color: "var(--text-secondary, #A1A1C2)", marginBottom: 30 }}>
                {cap.tagline}
              </p>

              <div style={{ display: "flex", gap: "15px", marginBottom: "30px" }}>
                {cap.stats.map((stat, i) => (
                  <div key={i} style={{ flex: 1, background: "rgba(255,255,255,0.02)", border: "1px dashed rgba(255,255,255,0.1)", padding: "12px", borderRadius: "4px" }}>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "rgba(161,161,194,0.6)", marginBottom: "4px", textTransform: "uppercase" }}>{stat.label}</div>
                    <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "16px", fontWeight: 700, color: cap.accent }}>{stat.value}</div>
                  </div>
                ))}
              </div>

              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                {cap.points.map((point, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                    <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: cap.accent, marginTop: "8px", flexShrink: 0, boxShadow: `0 0 8px ${cap.accent}` }} />
                    <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "14px", lineHeight: 1.6, color: "rgba(233,230,255,0.85)" }}>
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── ENGINEERS SECTION ── */}
        <div style={{ opacity: loaded ? 1 : 0, transition: "opacity 1s ease 0.6s" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 40 }}>
            <h3 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "24px", fontWeight: 700, color: "var(--text-primary)" }}>ENGINEERING LEADERSHIP</h3>
            <div style={{ height: 1, flex: 1, background: "linear-gradient(90deg, rgba(108,43,217,0.3), transparent)" }} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
            {ENGINEERS.map((eng, idx) => (
              <div 
                key={idx} 
                style={{
                  background: "linear-gradient(145deg, rgba(10,8,24,0.8) 0%, rgba(5,3,13,0.95) 100%)",
                  border: `1px solid rgba(${eng.accentRgb}, 0.25)`,
                  borderRadius: "8px", padding: "30px", display: "flex", flexDirection: "column",
                  boxShadow: `0 8px 32px rgba(0,0,0,0.3)`, position: "relative", overflow: "hidden"
                }}
              >
                <div style={{ position: "absolute", top: "-20px", right: "-20px", width: "100px", height: "100px", background: `radial-gradient(circle, rgba(${eng.accentRgb},0.15) 0%, transparent 70%)`, borderRadius: "50%", pointerEvents: "none" }} />
                
                <h4 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "20px", fontWeight: 700, margin: "0 0 4px 0", color: "white" }}>{eng.name}</h4>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: eng.accent, marginBottom: "16px", letterSpacing: "0.05em" }}>{eng.role}</div>
                
                <p style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "14px", lineHeight: 1.6, color: "var(--text-secondary)", marginBottom: "24px", flexGrow: 1 }}>
                  {eng.bio}
                </p>

                {/* Social Links */}
                <div style={{ display: "flex", gap: "16px" }}>
                  <a href={eng.github} target="_blank" rel="noreferrer" style={{ color: "var(--text-secondary)", transition: "color 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.color = eng.accent} onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-secondary)"}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                    </svg>
                  </a>
                  <a href={eng.linkedin} target="_blank" rel="noreferrer" style={{ color: "var(--text-secondary)", transition: "color 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.color = eng.accent} onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-secondary)"}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}