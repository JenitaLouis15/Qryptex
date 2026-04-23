import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; // <-- Added React Router hook

// Updated Navigation Links
const NAV_LINKS = [
  { label: "Home",       href: "/#hero"      }, // Hash link for scrolling
  { label: "Services",   href: "/#services"  }, // Hash link for scrolling
  { label: "About Us",   href: "/about"      }, // Separate route
  { label: "Contact",    href: "/contact"    }, // Separate route
];

const SERVICES = [
  {
    id: "cybersec",
    index: "01",
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <path d="M18 3L5 10v10c0 7.2 5.6 13.9 13 15.5C25.4 33.9 31 27.2 31 20V10L18 3z"
          stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinejoin="round"/>
        <path d="M12 18l4.5 4.5L24 13" stroke="#00FFC6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    
    title: "Cybersecurity",
    subtitle: "Solutions",
    tagline: "Threat architecture designed to outpace adversaries — not just detect them.",
    capabilities: [
      "Zero-trust network design & implementation",
      "Real-time threat intelligence & SIEM integration",
      "Red team penetration testing & adversarial simulation",
    ],
    stack: "SOC2 · ISO 27001 · NIST CSF",
    accent: "#00FFC6",
    accentRgb: "0,255,198",
  },
  {
    id: "blockchain",
    index: "02",
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <rect x="4"  y="14" width="9"  height="9"  rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
        <rect x="23" y="14" width="9"  height="9"  rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
        <rect x="13.5" y="4"  width="9" height="9"  rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
        <rect x="13.5" y="23" width="9" height="9"  rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
        <line x1="13" y1="18.5" x2="9"  y2="18.5" stroke="#8B5CF6" strokeWidth="1.2"/>
        <line x1="23" y1="18.5" x2="27" y2="18.5" stroke="#8B5CF6" strokeWidth="1.2"/>
        <line x1="18" y1="13"   x2="18" y2="9"    stroke="#8B5CF6" strokeWidth="1.2"/>
        <line x1="18" y1="23"   x2="18" y2="27"   stroke="#8B5CF6" strokeWidth="1.2"/>
      </svg>
    ),
    title: "Blockchain",
    subtitle: "Development",
    tagline: "Immutable infrastructure built for enterprise trust — not prototype demos.",
    capabilities: [
      "Smart contract architecture (EVM, Solana, Cosmos)",
      "Private & permissioned ledger deployment",
      "DeFi protocol design & on-chain audit preparation",
    ],
    stack: "EVM · Solana · Hyperledger · Cosmos",
    accent: "#8B5CF6",
    accentRgb: "139,92,246",
  },
  {
    id: "ai",
    index: "03",
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <circle cx="18" cy="18" r="5"  stroke="currentColor" strokeWidth="1.3"/>
        <circle cx="18" cy="5"  r="2.5" fill="#A78BFA"/>
        <circle cx="18" cy="31" r="2.5" fill="#A78BFA"/>
        <circle cx="5"  cy="18" r="2.5" fill="#A78BFA"/>
        <circle cx="31" cy="18" r="2.5" fill="#A78BFA"/>
        <circle cx="7"  cy="7"  r="2"   fill="rgba(167,139,250,0.5)"/>
        <circle cx="29" cy="7"  r="2"   fill="rgba(167,139,250,0.5)"/>
        <circle cx="7"  cy="29" r="2"   fill="rgba(167,139,250,0.5)"/>
        <circle cx="29" cy="29" r="2"   fill="rgba(167,139,250,0.5)"/>
        <line x1="18" y1="13" x2="18" y2="7.5"  stroke="#A78BFA" strokeWidth="1.1"/>
        <line x1="18" y1="23" x2="18" y2="28.5" stroke="#A78BFA" strokeWidth="1.1"/>
        <line x1="13" y1="18" x2="7.5" y2="18"  stroke="#A78BFA" strokeWidth="1.1"/>
        <line x1="23" y1="18" x2="28.5" y2="18" stroke="#A78BFA" strokeWidth="1.1"/>
      </svg>
    ),
    title: "AI & Intelligent",
    subtitle: "Systems",
    tagline: "Operational AI integrated into your stack — not sandboxed experiments.",
    capabilities: [
      "Custom LLM fine-tuning & RAG pipeline engineering",
      "Anomaly detection & predictive threat modeling",
      "AI-augmented DevOps, CI/CD & decision automation",
    ],
    stack: "PyTorch · LangChain · Vertex · Bedrock",
    accent: "#A78BFA",
    accentRgb: "167,139,250",
  },
  {
    id: "quantum",
    index: "04",
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <ellipse cx="18" cy="18" rx="14" ry="6" stroke="currentColor" strokeWidth="1.3"/>
        <ellipse cx="18" cy="18" rx="14" ry="6" stroke="currentColor" strokeWidth="1.3" transform="rotate(60 18 18)"/>
        <ellipse cx="18" cy="18" rx="14" ry="6" stroke="currentColor" strokeWidth="1.3" transform="rotate(120 18 18)"/>
        <circle cx="18" cy="18" r="3" fill="#00FFC6"/>
        <circle cx="18" cy="18" r="1.5" fill="#05030D"/>
      </svg>
    ),
    title: "Post-Quantum",
    subtitle: "Encryption",
    tagline: "Cryptographic layers hardened against adversaries with quantum compute access.",
    capabilities: [
      "NIST PQC implementation (CRYSTALS-Kyber, Dilithium)",
      "Hybrid classical/quantum key exchange migration",
      "Quantum-safe PKI for regulated industries",
    ],
    stack: "NIST PQC · CRYSTALS · SPHINCS+ · OQS",
    accent: "#00FFC6",
    accentRgb: "0,255,198",
  },
  {
    id: "fullstack",
    index: "05",
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <rect x="4"   y="7"  width="28" height="18" rx="2" stroke="currentColor" strokeWidth="1.3"/>
        <line x1="12" y1="29" x2="24" y2="29" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
        <line x1="18" y1="25" x2="18" y2="29" stroke="currentColor" strokeWidth="1.3"/>
        <path d="M10 15l4-3.5L10 8"   stroke="#6C2BD9" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="16" y1="15" x2="22" y2="15" stroke="#6C2BD9" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
    title: "Full Stack",
    subtitle: "Engineering",
    tagline: "Systems architected for ten-year scale — not six-month roadmaps.",
    capabilities: [
      "Distributed microservices & API-first architecture",
      "High-throughput data pipelines & cloud-native infra",
      "Security-integrated CI/CD, IaC & observability stacks",
    ],
    stack: "Rust · Go · React · K8s · Terraform · AWS/GCP",
    accent: "#6C2BD9",
    accentRgb: "108,43,217",
  },
];

const HIGHLIGHTS = [
  {
    icon: (
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
        <path d="M4 30V13l13-9 13 9v17H21v-9h-8v9H4z" stroke="#00FFC6" strokeWidth="1.3" fill="none" strokeLinejoin="round"/>
      </svg>
    ),
    value: "Security-First",
    label: "Engineering Philosophy",
    body: "Every system we touch is designed with a threat model first, a deployment model second. We don't bolt on security — we bake it in at the architectural layer.",
    accent: "#00FFC6",
    accentRgb: "0,255,198",
  },
  {
    icon: (
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
        <path d="M6 28h4V15H6v13zm8 0h4V6h-4v22zm8 0h4v-9h-4v9z" stroke="#8B5CF6" strokeWidth="1.3" fill="none" strokeLinejoin="round"/>
      </svg>
    ),
    value: "Scalability",
    label: "By Design",
    body: "We architect for the load you'll have in three years, not the load you have today. Horizontal scaling and fault tolerance are defaults, not afterthoughts.",
    accent: "#8B5CF6",
    accentRgb: "139,92,246",
  },
  {
    icon: (
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
        <circle cx="17" cy="17" r="4" fill="#A78BFA"/>
        <path d="M17 4v4M17 26v4M4 17h4M26 17h4" stroke="#A78BFA" strokeWidth="1.4" strokeLinecap="round"/>
        <path d="M8.2 8.2l2.8 2.8M22.9 22.9l2.8 2.8M22.9 11l2.8-2.8M8.2 25.8l2.8-2.8" stroke="rgba(167,139,250,0.45)" strokeWidth="1.1" strokeLinecap="round"/>
      </svg>
    ),
    value: "Emerging Tech",
    label: "Innovation Focus",
    body: "From post-quantum cryptography to autonomous AI agents — we work at the frontier. Our team tracks NIST drafts, arxiv papers, and protocol RFCs the week they drop.",
    accent: "#A78BFA",
    accentRgb: "167,139,250",
  },
  {
    icon: (
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
        <circle cx="10" cy="10" r="4" stroke="#6C2BD9" strokeWidth="1.3" fill="none"/>
        <circle cx="24" cy="10" r="4" stroke="#6C2BD9" strokeWidth="1.3" fill="none"/>
        <circle cx="17" cy="24" r="4" stroke="#6C2BD9" strokeWidth="1.3" fill="none"/>
        <line x1="14" y1="10" x2="20" y2="10" stroke="#6C2BD9" strokeWidth="1.1"/>
        <line x1="12" y1="14" x2="15" y2="20" stroke="#6C2BD9" strokeWidth="1.1"/>
        <line x1="22" y1="14" x2="19" y2="20" stroke="#6C2BD9" strokeWidth="1.1"/>
      </svg>
    ),
    value: "Integrated Team",
    label: "Cross-Discipline Experts",
    body: "Blockchain devs, quantum specialists, full-stack engineers, AI researchers, and UI/UX designers — all under one roof, shipping together.",
    accent: "#6C2BD9",
    accentRgb: "108,43,217",
  },
];

function AmbientCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf, t = 0;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const { width: W, height: H } = canvas;
      ctx.clearRect(0, 0, W, H);
      t += 0.003;

      const step = 58;
      for (let x = 0; x < W; x += step) {
        for (let y = 0; y < H; y += step) {
          const d = Math.hypot(x - W / 2, y - H / 2);
          const wave = (Math.sin(d * 0.01 - t) + 1) / 2;
          ctx.strokeStyle = `rgba(108,43,217,${wave * 0.055 + 0.012})`;
          ctx.lineWidth = 0.5;
          ctx.strokeRect(x, y, step, step);
          if (wave > 0.72) {
            ctx.fillStyle = `rgba(167,139,250,${(wave - 0.72) * 0.25})`;
            ctx.beginPath(); ctx.arc(x, y, 1, 0, Math.PI * 2); ctx.fill();
          }
        }
      }

      [
        { bx: 0.08, by: 0.2,  r: 280, col: "108,43,217", sp: 0.22 },
        { bx: 0.92, by: 0.75, r: 320, col: "0,255,198",  sp: 0.17 },
        { bx: 0.5,  by: 0.5,  r: 200, col: "139,92,246", sp: 0.32 },
        { bx: 0.78, by: 0.12, r: 190, col: "0,255,198",  sp: 0.20 },
      ].forEach(({ bx, by, r, col, sp }) => {
        const cx = bx * W + Math.sin(t * sp) * 55;
        const cy = by * H + Math.cos(t * sp * 0.75) * 38;
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        g.addColorStop(0, `rgba(${col},0.07)`);
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

// ── NEW: White floating particles layer ──────────────────────────────────────
function WhiteParticles() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Initialise ~110 particles spread across the full canvas
    const COUNT = 110;
    const particles = Array.from({ length: COUNT }, () => ({
      x:     Math.random() * canvas.width,
      y:     Math.random() * canvas.height,
      r:     Math.random() * 1.4 + 0.3,          // radius 0.3 – 1.7 px
      vx:    (Math.random() - 0.5) * 0.18,        // gentle horizontal drift
      vy:    -(Math.random() * 0.22 + 0.06),      // slow upward float
      alpha: Math.random() * 0.45 + 0.08,         // base opacity
      flicker: Math.random() * Math.PI * 2,       // phase offset for twinkle
    }));

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      const now = performance.now() * 0.001;

      particles.forEach((p) => {
        // drift
        p.x += p.vx;
        p.y += p.vy;

        // wrap around edges
        if (p.x < -2)  p.x = W + 2;
        if (p.x > W + 2) p.x = -2;
        if (p.y < -2)  { p.y = H + 2; p.x = Math.random() * W; }

        // gentle twinkle
        const twinkle = (Math.sin(now * 1.1 + p.flicker) + 1) / 2; // 0 – 1
        const a = p.alpha * (0.55 + twinkle * 0.45);

        ctx.globalAlpha = a;
        ctx.fillStyle = "#ffffff";
        ctx.shadowBlur = p.r > 1.1 ? 4 : 0;
        ctx.shadowColor = "rgba(255,255,255,0.6)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      ctx.shadowBlur  = 0;
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}
// ─────────────────────────────────────────────────────────────────────────────

function CardParticles({ accent, active }) {
  const ref = useRef(null);
  const pts = useRef([]);
  const raf = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const W = canvas.width, H = canvas.height;

    const spawn = () => ({
      x: Math.random() * W, y: H + 4,
      vx: (Math.random() - 0.5) * 0.5,
      vy: -(Math.random() * 0.9 + 0.35),
      life: 1, decay: Math.random() * 0.009 + 0.004,
      r: Math.random() * 1.5 + 0.5,
    });

    const loop = () => {
      ctx.clearRect(0, 0, W, H);
      if (active && pts.current.length < 20) pts.current.push(spawn());
      pts.current = pts.current.filter(p => p.life > 0);
      pts.current.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.life -= p.decay;
        ctx.globalAlpha = p.life * 0.65;
        ctx.fillStyle = accent;
        ctx.shadowBlur = 5; ctx.shadowColor = accent;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      });
      ctx.globalAlpha = 1; ctx.shadowBlur = 0;
      raf.current = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(raf.current);
  }, [active, accent]);

  return <canvas ref={ref} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", borderRadius: 4 }} />;
}

function ServiceCard({ svc, index }) {
  const [hov, setHov] = useState(false);
  const [vis, setVis] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate(); // <-- Initialized Router hook

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); io.disconnect(); } }, { threshold: 0.1 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={() => navigate(`/${svc.id}`)} // <-- Changed to use React Router navigation
      style={{
        position: "relative", cursor: "pointer", borderRadius: 4,
        border: `1px solid ${hov ? `rgba(${svc.accentRgb},0.48)` : "rgba(108,43,217,0.17)"}`,
        background: hov ? `linear-gradient(145deg, rgba(${svc.accentRgb},0.07) 0%, rgba(5,3,13,0.96) 55%)` : "rgba(8,5,20,0.82)",
        backdropFilter: "blur(12px)",
        boxShadow: hov ? `0 0 0 1px rgba(${svc.accentRgb},0.12), 0 24px 60px rgba(${svc.accentRgb},0.13), 0 6px 24px rgba(0,0,0,0.5)` : "0 2px 14px rgba(0,0,0,0.3)",
        transform: hov ? "translateY(-7px) scale(1.012)" : "translateY(0) scale(1)",
        transition: "all 0.42s cubic-bezier(0.34,1.4,0.64,1)",
        opacity: vis ? 1 : 0,
        animation: vis ? `cardReveal 0.7s cubic-bezier(0.34,1.4,0.64,1) ${index * 0.1}s both` : "none",
        overflow: "hidden", padding: "36px 30px 30px",
      }}
    >
      <CardParticles accent={svc.accent} active={hov} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: hov ? `linear-gradient(90deg, transparent, ${svc.accent} 50%, transparent)` : "transparent", transition: "background 0.5s", zIndex: 2 }} />
      <div style={{ position: "absolute", top: 14, right: 14, width: 7, height: 7, borderRadius: "50%", background: hov ? svc.accent : "rgba(108,43,217,0.28)", boxShadow: hov ? `0 0 12px ${svc.accent}, 0 0 24px rgba(${svc.accentRgb},0.3)` : "none", transition: "all 0.4s", zIndex: 2 }} />
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: "0.2em", color: hov ? `rgba(${svc.accentRgb},0.65)` : "rgba(108,43,217,0.28)", marginBottom: 22, transition: "color 0.3s", position: "relative", zIndex: 2 }}>{`// ${svc.index}`}</div>
      <div style={{ color: hov ? svc.accent : "rgba(161,161,194,0.55)", marginBottom: 20, display: "inline-block", transition: "color 0.35s, transform 0.45s cubic-bezier(0.34,1.4,0.64,1), filter 0.35s", transform: hov ? "scale(1.18) rotate(-4deg)" : "scale(1) rotate(0deg)", filter: hov ? `drop-shadow(0 0 10px rgba(${svc.accentRgb},0.7))` : "none", position: "relative", zIndex: 2 }}>{svc.icon}</div>
      <div style={{ marginBottom: 14, position: "relative", zIndex: 2 }}>
        <h3 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(14px,1.35vw,17px)", fontWeight: 900, color: "var(--text-primary)", letterSpacing: "0.04em", lineHeight: 1.1, margin: "0 0 3px" }}>{svc.title}</h3>
        <span style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(11px,1vw,13px)", fontWeight: 400, color: hov ? svc.accent : "var(--text-secondary)", letterSpacing: "0.09em", transition: "color 0.3s" }}>{svc.subtitle}</span>
      </div>
      <p style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 13.5, lineHeight: 1.65, color: "var(--text-secondary)", marginBottom: 22, position: "relative", zIndex: 2 }}>{svc.tagline}</p>
      <div style={{ height: 1, marginBottom: 18, background: hov ? `linear-gradient(90deg, rgba(${svc.accentRgb},0.5), rgba(${svc.accentRgb},0.05) 75%, transparent)` : "rgba(108,43,217,0.12)", transition: "background 0.4s", position: "relative", zIndex: 2 }} />
      <ul style={{ listStyle: "none", padding: 0, margin: "0 0 20px", display: "flex", flexDirection: "column", gap: 10, position: "relative", zIndex: 2 }}>
        {svc.capabilities.map((cap, i) => (
          <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
            <svg width="9" height="9" viewBox="0 0 9 9" style={{ flexShrink: 0, marginTop: 4 }}><polygon points="4.5,0 9,4.5 4.5,9 0,4.5" fill={hov ? svc.accent : "rgba(108,43,217,0.4)"} style={{ transition: "fill 0.3s" }}/></svg>
            <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 12.5, lineHeight: 1.5, color: hov ? "rgba(233,230,255,0.88)" : "var(--text-secondary)", transition: "color 0.3s" }}>{cap}</span>
          </li>
        ))}
      </ul>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8.5, letterSpacing: "0.1em", color: hov ? `rgba(${svc.accentRgb},0.55)` : "rgba(108,43,217,0.22)", marginBottom: 20, transition: "color 0.3s", position: "relative", zIndex: 2 }}>{svc.stack}</div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "'Rajdhani', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: hov ? svc.accent : "transparent", transition: "color 0.3s, transform 0.35s", transform: hov ? "translateX(7px)" : "translateX(0)", position: "relative", zIndex: 2 }}>
        <span>Explore Service</span>
        <svg width="16" height="10" viewBox="0 0 16 10" fill="none"><path d="M1 5h14M10 1l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </div>
    </div>
  );
}

function CustomCell() {
  const [hov, setHov] = useState(false);
  const navigate = useNavigate(); // <-- Initialized Router hook

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={() => navigate("/contact")} // <-- Changed to use React Router navigation
      style={{
        padding: "36px 30px", borderRadius: 4,
        border: `1px dashed ${hov ? "rgba(108,43,217,0.45)" : "rgba(108,43,217,0.16)"}`,
        background: hov ? "rgba(108,43,217,0.05)" : "transparent",
        display: "flex", flexDirection: "column", justifyContent: "center", gap: 16,
        cursor: "pointer", transition: "all 0.38s ease",
        transform: hov ? "translateY(-4px)" : "translateY(0)",
        minHeight: 200,
      }}
    >
      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "rgba(108,43,217,0.32)", letterSpacing: "0.18em" }}>// 06</span>
      <h3 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 15, fontWeight: 700, letterSpacing: "0.05em", color: hov ? "var(--text-primary)" : "rgba(233,230,255,0.3)", transition: "color 0.3s" }}>CUSTOM SCOPE</h3>
      <p style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 13.5, lineHeight: 1.65, color: hov ? "var(--text-secondary)" : "rgba(161,161,194,0.3)", transition: "color 0.3s" }}>Bespoke architecture tailored to your security posture, scale requirements, and compliance landscape.</p>
      <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: hov ? "var(--accent-green)" : "rgba(108,43,217,0.28)", transition: "color 0.3s, transform 0.3s", transform: hov ? "translateX(6px)" : "translateX(0)", display: "inline-block" }}>Get in touch →</span>
    </div>
  );
}

function PageHeader() {
  const [vis, setVis] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.15 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ maxWidth: 1160, margin: "0 auto", padding: "90px 5% 64px", position: "relative", zIndex: 2 }}>
      <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 14px", borderRadius: 2, border: "1px solid rgba(0,255,198,0.2)", background: "rgba(0,255,198,0.03)", marginBottom: 24, opacity: vis ? 1 : 0, animation: vis ? "fadeIn 0.5s ease both" : "none" }}>
        <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--accent-green)", boxShadow: "0 0 6px var(--accent-green)", animation: "blip 2s infinite" }} />
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: "0.16em", color: "var(--accent-green)" }}>FULL STACK · DEEP TECH · QRYPTEX</span>
      </div>
      <h1 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(32px, 5.5vw, 78px)", fontWeight: 900, lineHeight: 1.0, color: "var(--text-primary)", letterSpacing: "-0.01em", marginBottom: 8, opacity: vis ? 1 : 0, animation: vis ? "fadeUp 0.65s ease 0.08s both" : "none" }}>WHAT WE</h1>
      <h1 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(32px, 5.5vw, 78px)", fontWeight: 900, lineHeight: 1.0, letterSpacing: "-0.01em", marginBottom: 28, background: "linear-gradient(90deg, #6C2BD9 0%, #A78BFA 45%, #00FFC6 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", opacity: vis ? 1 : 0, animation: vis ? "fadeUp 0.65s ease 0.16s both" : "none" }}>BUILD</h1>
      <p style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "clamp(13px, 1.5vw, 15.5px)", lineHeight: 1.75, color: "var(--text-secondary)", maxWidth: 540, marginBottom: 48, opacity: vis ? 1 : 0, animation: vis ? "fadeUp 0.65s ease 0.24s both" : "none" }}>Five interlocking disciplines. One integrated team. We build the infrastructure that tomorrow's enterprises trust their most critical operations to.</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 0, opacity: vis ? 1 : 0, animation: vis ? "fadeUp 0.65s ease 0.32s both" : "none" }}>
        {[["5", "Core Disciplines"], ["256-bit", "Quantum-Safe Keys"], ["99.99%", "Uptime SLA"], ["3-in-1", "Full Coverage"]].map(([n, l], i) => (
          <div key={l} style={{ padding: "14px 20px", borderLeft: "1px solid rgba(108,43,217,0.3)", borderRight: i === 3 ? "1px solid rgba(108,43,217,0.3)" : "none", background: "rgba(108,43,217,0.04)" }}>
            <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(14px, 1.8vw, 19px)", fontWeight: 700, color: "var(--accent-green)", marginBottom: 2 }}>{n}</div>
            <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 9, fontWeight: 600, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.1em" }}>{l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function HighlightCard({ h, index }) {
  const [vis, setVis] = useState(false);
  const [hov, setHov] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); io.disconnect(); } }, { threshold: 0.15 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: "30px 26px", borderRadius: 4,
        border: `1px solid ${hov ? `rgba(${h.accentRgb},0.38)` : "rgba(108,43,217,0.15)"}`,
        background: hov ? `rgba(${h.accentRgb},0.05)` : "rgba(5,3,13,0.55)",
        boxShadow: hov ? `0 16px 44px rgba(${h.accentRgb},0.12), 0 0 0 1px rgba(${h.accentRgb},0.08)` : "none",
        transform: hov ? "translateY(-5px)" : "translateY(0)",
        transition: "all 0.42s cubic-bezier(0.34,1.4,0.64,1)",
        opacity: vis ? 1 : 0,
        animation: vis ? `cardReveal 0.7s ease ${index * 0.13}s both` : "none",
      }}
    >
      <div style={{ marginBottom: 20, display: "inline-block", filter: hov ? `drop-shadow(0 0 10px rgba(${h.accentRgb},0.65))` : "none", transition: "filter 0.35s" }}>{h.icon}</div>
      <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 15, fontWeight: 700, color: hov ? h.accent : "var(--text-primary)", letterSpacing: "0.04em", marginBottom: 3, transition: "color 0.3s" }}>{h.value}</div>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8.5, letterSpacing: "0.12em", color: `rgba(${h.accentRgb},0.5)`, marginBottom: 14 }}>{h.label.toUpperCase()}</div>
      <p style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 13.5, lineHeight: 1.7, color: "var(--text-secondary)" }}>{h.body}</p>
      <div style={{ marginTop: 20, height: 1, background: hov ? `linear-gradient(90deg, rgba(${h.accentRgb},0.5), transparent)` : "rgba(108,43,217,0.1)", transition: "background 0.4s" }} />
    </div>
  );
}

export default function Services() {
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
          --purple-primary:   #6C2BD9;
          --purple-secondary: #8B5CF6;
          --purple-accent:    #A78BFA;
          --bg-deep:          #05030D;
          --text-primary:     #E9E6FF;
          --text-secondary:   #A1A1C2;
          --accent-green:     #00FFC6;
        }
        html { scroll-behavior: smooth; }
        body { background: var(--bg-deep); }

        @keyframes fadeUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes cardReveal { from{opacity:0;transform:translateY(26px) scale(0.97)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes blip { 0%,100%{opacity:0.45;transform:scale(0.9)} 50%{opacity:1;transform:scale(1.15)} }
        @keyframes floatY { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
        @keyframes scanH { 0%{transform:translateX(-100%)} 100%{transform:translateX(600%)} }
        @keyframes rotateSlow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes barPulse { 0%,100%{opacity:0.35;transform:scaleY(0.85)} 50%{opacity:1;transform:scaleY(1)} }

        .nav-link {
          position:relative; font-family:'Rajdhani',sans-serif;
          font-size:13px; font-weight:600; letter-spacing:0.1em;
          text-transform:uppercase; color:var(--text-secondary);
          text-decoration:none; padding:6px 0; transition:color 0.25s;
        }
        .nav-link.active { color:var(--accent-green); }
        .nav-link::after { content:''; position:absolute; bottom:0; left:0; width:0; height:1px; background:var(--accent-green); transition:width 0.3s; }
        .nav-link:hover  { color:var(--text-primary); }
        .nav-link:hover::after, .nav-link.active::after { width:100%; }

        .svc-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 22px;
        }
        .hi-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        /* ── MOBILE RESPONSIVE ── */
        @media (max-width: 1100px) {
          .svc-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .hi-grid  { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 660px) {
          .svc-grid, .hi-grid { grid-template-columns: 1fr !important; }
          .desktop-nav { display: none !important; }
          #hamburger { display: flex !important; }
          .page-header-stats { flex-direction: row !important; flex-wrap: wrap !important; }
          .page-header-stats > div { flex: 1 1 calc(50% - 1px) !important; min-width: 0 !important; }
        }
        @media (max-width: 480px) {
          .svc-grid { gap: 14px !important; }
        }

        ::-webkit-scrollbar { width:3px; }
        ::-webkit-scrollbar-track { background:var(--bg-deep); }
        ::-webkit-scrollbar-thumb { background:rgba(108,43,217,0.5); border-radius:2px; }
      `}</style>

      <div style={{ width: "100%", minHeight: "100vh", background: "var(--bg-deep)", position: "relative", overflowX: "hidden" }}>

        <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
          <AmbientCanvas />
        </div>

        {/* ── White particles layer (sits just above AmbientCanvas) ── */}
        <WhiteParticles />

        <div style={{ position: "fixed", top: "28%", left: 0, right: 0, height: 1, zIndex: 1, pointerEvents: "none", overflow: "hidden" }}>
          <div style={{ width: "18%", height: "100%", background: "linear-gradient(90deg,transparent,rgba(0,255,198,0.12),transparent)", animation: "scanH 9s linear infinite" }} />
        </div>

        <nav style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 5%", height: 60,
          background: scrolled ? "rgba(5,3,13,0.93)" : "rgba(5,3,13,0.65)",
          backdropFilter: "blur(14px)",
          borderBottom: "1px solid rgba(108,43,217,0.15)",
          transition: "background 0.3s",
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
              <a key={l.label} href={l.href} className={`nav-link${l.href === "/services" ? " active" : ""}`}>{l.label}</a>
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

        <div style={{ position: "relative", zIndex: 2 }}>

          <div style={{ borderBottom: "1px solid rgba(108,43,217,0.1)", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", right: "3%", top: "50%", transform: "translateY(-50%)", width: 300, height: 300, opacity: 0.055, animation: "rotateSlow 32s linear infinite", pointerEvents: "none" }}>
              <svg viewBox="0 0 300 300" fill="none">
                <circle cx="150" cy="150" r="140" stroke="#6C2BD9" strokeWidth="1" strokeDasharray="8 4"/>
                <circle cx="150" cy="150" r="110" stroke="#00FFC6" strokeWidth="0.6" strokeDasharray="4 8"/>
                <circle cx="150" cy="150" r="80"  stroke="#8B5CF6" strokeWidth="1" strokeDasharray="2 6"/>
                <circle cx="150" cy="150" r="50"  stroke="#00FFC6" strokeWidth="0.4" strokeDasharray="3 9"/>
              </svg>
            </div>
            <PageHeader />
          </div>

          <div style={{ height: 1, background: "linear-gradient(90deg,transparent,rgba(0,255,198,0.22),rgba(108,43,217,0.3),transparent)" }} />

          <div style={{ maxWidth: 1160, margin: "0 auto", padding: "64px 5% 72px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 44 }}>
              <div style={{ height: 1, flex: 1, background: "rgba(108,43,217,0.18)" }} />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: "0.2em", color: "rgba(108,43,217,0.45)" }}>SERVICES · {SERVICES.length} DISCIPLINES</span>
              <div style={{ height: 1, flex: 1, background: "rgba(108,43,217,0.18)" }} />
            </div>
            <div className="svc-grid">
              {SERVICES.map((svc, i) => <ServiceCard key={svc.id} svc={svc} index={i} />)}
              <CustomCell />
            </div>
          </div>

          <div style={{ borderTop: "1px solid rgba(108,43,217,0.1)", borderBottom: "1px solid rgba(108,43,217,0.1)", background: "rgba(6,4,16,0.7)", backdropFilter: "blur(10px)" }}>
            <div style={{ maxWidth: 1160, margin: "0 auto", padding: "72px 5% 80px" }}>
              <div style={{ textAlign: "center", marginBottom: 54 }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 14px", border: "1px solid rgba(108,43,217,0.2)", borderRadius: 2, background: "rgba(108,43,217,0.04)", marginBottom: 18 }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: "0.16em", color: "rgba(108,43,217,0.55)" }}>WHY QRYPTEX</span>
                </div>
                <h2 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(18px,3vw,36px)", fontWeight: 900, color: "var(--text-primary)", letterSpacing: "0.04em", lineHeight: 1.2 }}>
                  BUILT DIFFERENT.{" "}
                  <span style={{ background: "linear-gradient(90deg,#6C2BD9,#00FFC6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>ENGINEERED RIGHT.</span>
                </h2>
              </div>
              <div className="hi-grid">
                {HIGHLIGHTS.map((h, i) => <HighlightCard key={i} h={h} index={i} />)}
              </div>
            </div>
          </div>

          <div style={{ padding: "20px 5%", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "rgba(161,161,194,0.22)", letterSpacing: "0.1em" }}>© 2025 QRYPTEX — ALL SYSTEMS OPERATIONAL</span>
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