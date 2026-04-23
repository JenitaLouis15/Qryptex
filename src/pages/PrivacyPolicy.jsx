import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

// ── ADVANCED AMBIENT BACKGROUND ──────────────────────────────────────────────
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

      // Subtle Grid
      ctx.strokeStyle = "rgba(108, 43, 217, 0.03)";
      ctx.lineWidth = 1;
      const step = 60;
      for(let x = 0; x < W; x += step) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
      }
      for(let y = 0; y < H; y += step) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }

      // Moving Neon Gradients
      [
        { bx: 0.15, by: 0.2,  r: 450, col: "108,43,217", sp: 0.12 },
        { bx: 0.85, by: 0.7,  r: 400, col: "0,255,198",  sp: 0.18 },
        { bx: 0.5,  by: 0.9,  r: 300, col: "167,139,250",sp: 0.25 },
      ].forEach(({ bx, by, r, col, sp }) => {
        const cx = bx * W + Math.sin(t * sp) * 120;
        const cy = by * H + Math.cos(t * sp * 0.9) * 120;
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        g.addColorStop(0, `rgba(${col},0.06)`);
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

// ── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function PrivacyPolicy() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-deep, #05030D)", color: "var(--text-primary, #E9E6FF)", position: "relative", overflowX: "hidden" }}>
      
      {/* Dynamic Scoped CSS */}
      <style>{`
        html { scrollbar-color: rgba(0,255,198,0.8) transparent; scrollbar-width: thin; }
        ::-webkit-scrollbar { width: 2px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(0,255,198,0.8); border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #00A383; }

        .legal-panel {
          background: rgba(8, 5, 20, 0.65);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(108,43,217,0.15);
          border-left: 3px solid rgba(108,43,217,0.4);
          border-radius: 4px;
          padding: 36px 40px;
          margin-bottom: 24px;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .legal-panel:hover {
          transform: translateX(8px);
          border-left-color: var(--accent-green, #00FFC6);
          box-shadow: 0 10px 30px rgba(0,0,0,0.4), inset 4px 0 15px rgba(0,255,198,0.05);
          background: rgba(12, 8, 28, 0.75);
        }
        .legal-panel p, .legal-panel li {
          font-family: 'Rajdhani', sans-serif;
          font-size: 16px;
          line-height: 1.8;
          color: rgba(161,161,194,0.9);
        }
        .legal-panel strong {
          color: var(--text-primary);
        }
      `}</style>

      {/* Ambient Background */}
      <div style={{ opacity: loaded ? 1 : 0, transition: "opacity 2s ease" }}>
        <CyberAmbient />
      </div>

      <div style={{
        maxWidth: "900px", margin: "0 auto", padding: "120px 5% 100px", position: "relative", zIndex: 1,
      }}>
        
        {/* Header */}
        <header style={{ 
          marginBottom: "60px",
          opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(30px)",
          transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1)"
        }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "6px 14px", border: "1px solid rgba(0,255,198,0.2)", background: "rgba(0,255,198,0.03)", borderRadius: "2px", marginBottom: "20px" }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent-green)", boxShadow: "0 0 8px var(--accent-green)" }} />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "var(--accent-green)", letterSpacing: "0.2em", fontWeight: 700 }}>
              NODE: LEGAL_COMPLIANCE
            </span>
          </div>
          <h1 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(36px, 6vw, 68px)", fontWeight: 900, margin: "0 0 10px", letterSpacing: "0.02em" }}>
            PRIVACY <span style={{ background: "linear-gradient(90deg, #6C2BD9, #A78BFA)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>POLICY</span>
          </h1>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", color: "var(--text-secondary)", fontSize: "12px", letterSpacing: "0.15em", opacity: 0.6 }}>
            VERSION 2.1.0 // ACTIVE AS OF APRIL 2026
          </p>
        </header>

        {/* Content Panels */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          
          {[
            {
              id: "01", title: "DATA SOVEREIGNTY",
              content: <p>QRYPTEX architecture is built on the principle of minimal data persistence. We collect only the telemetry essential to maintaining the integrity of our Zero-Trust network and identifying adversarial patterns in real-time. Unnecessary data is purged at the edge.</p>
            },
            {
              id: "02", title: "INFORMATION HARVESTING",
              content: (
                <ul style={{ paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "12px" }}>
                  <li><strong>Identity Metrics:</strong> Account-level identifiers required for cryptographic handshake authentication.</li>
                  <li><strong>Security Telemetry:</strong> Anonymized IP headers, TLS handshake details, and packet metadata utilized by our intrusion detection systems.</li>
                  <li><strong>Ledger Immutability:</strong> Transaction hashes processed via decentralized nodes are permanent. On-chain data cannot be erased or modified by our operations team.</li>
                </ul>
              )
            },
            {
              id: "03", title: "COGNITIVE AI ISOLATION",
              content: <p>Our Autonomous Threat AI utilizes anonymized global telemetry to strengthen defense models. <strong style={{ color: "var(--accent-green)" }}>Proprietary client payloads and structural network data are strictly isolated.</strong> We do not inject customer data into shared Large Language Model (LLM) training sets without multi-sig enterprise authorization.</p>
            },
            {
              id: "04", title: "POST-QUANTUM SAFEGUARDS",
              content: <p>All personally identifiable data (PII) is encrypted at rest using NIST-standardized Post-Quantum algorithms (e.g., CRYSTALS-Kyber). Keys are aggressively rotated via hybrid classical-quantum exchange mechanisms to ensure data cannot be decrypted by future compute capabilities.</p>
            },
            {
              id: "05", title: "GLOBAL JURISDICTION",
              content: <p>QRYPTEX complies with the Digital Personal Data Protection (DPDP) Act of India, alongside robust mapping to GDPR and CCPA standards. Formal legal disclosures or data subject access requests must be cryptographically signed and routed to our Chennai headquarters.</p>
            }
          ].map((section, i) => (
            <div 
              key={section.id} 
              className="legal-panel"
              style={{
                opacity: loaded ? 1 : 0, 
                transform: loaded ? "translateY(0)" : "translateY(20px)",
                transitionDelay: `${0.2 + (i * 0.1)}s`
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "14px", color: "var(--purple-accent, #A78BFA)", fontWeight: 700 }}>
                  // {section.id}
                </span>
                <h2 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "19px", color: "var(--text-primary)", margin: 0, letterSpacing: "0.05em" }}>
                  {section.title}
                </h2>
              </div>
              {section.content}
            </div>
          ))}

        </div>

        {/* Footer Navigation */}
        <div style={{ 
          marginTop: "60px", 
          opacity: loaded ? 1 : 0, transition: "opacity 1s ease 1s" 
        }}>
          <Link to="/" 
            style={{ 
              display: "inline-flex", alignItems: "center", gap: "12px",
              padding: "12px 24px", background: "rgba(108,43,217,0.1)", 
              border: "1px solid rgba(108,43,217,0.4)", borderRadius: "4px",
              color: "var(--text-primary)", textDecoration: "none", 
              fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", fontWeight: 700, letterSpacing: "0.1em",
              transition: "all 0.3s"
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(108,43,217,0.3)"; e.currentTarget.style.borderColor = "var(--accent-green)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(108,43,217,0.1)"; e.currentTarget.style.borderColor = "rgba(108,43,217,0.4)"; }}
          >
            <span>←</span> INITIALIZE_RETURN_SEQUENCE
          </Link>
        </div>
      </div>
    </div>
  );
}