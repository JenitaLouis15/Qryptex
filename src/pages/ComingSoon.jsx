import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

// ── Background Effects ─────────────
function AuroraCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf, t = 0;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    const orbs = [
      { bx: 0.2,  by: 0.3,  r: 400, col: "108,43,217", sp: 0.15, a: 0.08 },
      { bx: 0.8,  by: 0.7,  r: 450, col: "0,255,198",  sp: 0.1,  a: 0.05 },
      { bx: 0.5,  by: 0.5,  r: 300, col: "139,92,246", sp: 0.2,  a: 0.06 },
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
  // Changed to fixed so it acts as a wallpaper when scrolling
  return <canvas ref={ref} style={{ position: "fixed", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }} />;
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
    const COUNT = 80;
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

export default function ComingSoon() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // ── Auto Scroll to Top on Page Load ──
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        
        /* Removed overflow: hidden so you can scroll to the footer! */
        body { background: #05030D; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        
        .return-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: rgba(161,161,194,0.6);
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.1em;
          text-decoration: none;
          text-transform: uppercase;
          transition: all 0.3s ease;
          margin-top: 32px;
        }
        .return-link:hover {
          color: #00FFC6;
          text-shadow: 0 0 8px rgba(0,255,198,0.4);
        }
        
        .notify-input {
          width: 100%;
          padding: 14px 20px;
          border-radius: 8px;
          background: rgba(5,3,13,0.5);
          border: 1px solid rgba(255,255,255,0.1);
          color: #E9E6FF;
          font-family: 'Rajdhani', sans-serif;
          font-size: 15px;
          outline: none;
          transition: all 0.3s ease;
        }
        .notify-input:focus {
          border-color: rgba(108,43,217,0.5);
          box-shadow: 0 0 0 3px rgba(108,43,217,0.15);
        }
        .notify-input::placeholder {
          color: rgba(161,161,194,0.4);
        }

        .notify-btn {
          padding: 14px 28px;
          border-radius: 8px;
          cursor: pointer;
          background: linear-gradient(135deg, #6C2BD9 0%, #4C1BA0 100%);
          border: 1px solid rgba(139,92,246,0.5);
          color: #fff;
          font-family: 'Rajdhani', sans-serif;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          transition: all 0.3s ease;
          box-shadow: 0 8px 24px rgba(108,43,217,0.3);
          white-space: nowrap;
        }
        .notify-btn:hover {
          box-shadow: 0 12px 30px rgba(108,43,217,0.5);
          transform: translateY(-2px);
        }

        @media (max-width: 500px) {
          .notify-form { flex-direction: column; }
          .notify-btn { width: 100%; }
        }
        
        ::-webkit-scrollbar { width:3px; }
        ::-webkit-scrollbar-track { background:#05030D; }
        ::-webkit-scrollbar-thumb { background:rgba(108,43,217,0.55); border-radius:2px; }
      `}</style>

      {/* Changed height to minHeight and added padding so the scrollbar works natively */}
      <div style={{ width: "100%", minHeight: "100vh", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", overflowX: "hidden", padding: "120px 0" }}>
        
        <AuroraCanvas />
        <WhiteParticles />
        <div style={{ position: "fixed", inset: 0, zIndex: 0, opacity: 0.02, pointerEvents: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }} />

        {/* Main Content Box */}
        <div style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: "560px", padding: "0 20px", animation: "fadeUp 0.8s ease-out forwards" }}>
          
          <div style={{ padding: "48px 40px", borderRadius: "16px", background: "linear-gradient(145deg, rgba(255,255,255,0.03) 0%, rgba(8,5,20,0.85) 100%)", backdropFilter: "blur(24px)", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 24px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)", textAlign: "center", position: "relative", overflow: "hidden" }}>
            
            {/* Top glowing edge */}
            <div style={{ position: "absolute", top: 0, left: "10%", right: "10%", height: 1, background: "linear-gradient(90deg, transparent, rgba(167,139,250,0.6) 50%, transparent)" }} />

            {/* Floating Geometric Icon */}
            <div style={{ width: "64px", height: "64px", margin: "0 auto 24px", borderRadius: "16px", background: "linear-gradient(135deg, rgba(108,43,217,0.15), rgba(0,255,198,0.05))", border: "1px solid rgba(139,92,246,0.3)", display: "flex", alignItems: "center", justifyContent: "center", animation: "float 6s ease-in-out infinite", boxShadow: "0 12px 30px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)" }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="url(#icon-grad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <defs>
                  <linearGradient id="icon-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#A78BFA" />
                    <stop offset="100%" stopColor="#00FFC6" />
                  </linearGradient>
                </defs>
                <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"></polygon>
                <line x1="12" y1="22" x2="12" y2="15.5"></line>
                <polyline points="22 8.5 12 15.5 2 8.5"></polyline>
                <polyline points="2 15.5 12 8.5 22 15.5"></polyline>
                <line x1="12" y1="2" x2="12" y2="8.5"></line>
              </svg>
            </div>

            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", letterSpacing: "0.2em", color: "rgba(167,139,250,0.7)", textTransform: "uppercase", marginBottom: "12px" }}>
              // Status: In Development
            </div>

            <h1 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(24px, 4vw, 32px)", fontWeight: 900, color: "#E9E6FF", letterSpacing: "0.02em", lineHeight: 1.2, marginBottom: "16px" }}>
              COMING <span style={{ background: "linear-gradient(90deg, #A78BFA, #00FFC6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>SOON.</span>
            </h1>

            <p style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "16px", lineHeight: 1.6, color: "rgba(161,161,194,0.75)", marginBottom: "36px", maxWidth: "420px", margin: "0 auto 36px" }}>
              We are currently finalizing our public channels and digital infrastructure. Leave your email to be notified the moment we deploy.
            </p>

            {submitted ? (
              <div style={{ padding: "16px", borderRadius: "8px", background: "rgba(0,255,198,0.05)", border: "1px solid rgba(0,255,198,0.2)", color: "#00FFC6", fontFamily: "'Rajdhani', sans-serif", fontSize: "15px", fontWeight: 500 }}>
                Confirmation secured. You will be notified upon launch.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="notify-form" style={{ display: "flex", gap: "12px", width: "100%" }}>
                <input 
                  type="email" 
                  placeholder="Enter your professional email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="notify-input"
                  required
                />
                <button type="submit" className="notify-btn">Notify Me</button>
              </form>
            )}

            <Link to="/" className="return-link">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              Return to Base
            </Link>
            
          </div>
        </div>
      </div>
    </>
  );
}