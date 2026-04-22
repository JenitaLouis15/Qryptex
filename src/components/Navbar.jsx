import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NAV_LINKS = [
  { label: "Services",   href: "/services"   },
  { label: "AI",         href: "/ai"         },
  { label: "Blockchain", href: "/blockchain" },
  { label: "Security",   href: "/security"   },
  { label: "About",      href: "/about"      },
  { label: "Contact",    href: "/contact"    },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{`
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
          cursor: pointer;
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

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0);     }
        }
      `}</style>

      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0,
        zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 5%",
        height: 60,
        background: scrolled ? "rgba(5,3,13,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(108,43,217,0.15)" : "1px solid transparent",
        transition: "all 0.3s ease",
      }}>
        {/* Logo */}
        <div onClick={() => navigate("/")} style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
          <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
            <polygon points="16,2 29,9 29,23 16,30 3,23 3,9" fill="none" stroke="#6C2BD9" strokeWidth="1.5"/>
            <circle cx="16" cy="16" r="3" fill="#00FFC6"/>
          </svg>
          <span style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 15, fontWeight: 900, letterSpacing: "0.05em", color: "var(--text-primary)" }}>
            Q<span style={{ color: "var(--accent-green)" }}>RYP</span>TEX
          </span>
        </div>

        {/* Desktop links */}
        <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: 28 }}>
          {NAV_LINKS.map((l) => (
            <span key={l.label} onClick={() => navigate(l.href)} className="nav-link">
              {l.label}
            </span>
          ))}
        </div>

        {/* Nav CTAs */}
        <div className="nav-cta-full" style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button onClick={() => navigate("/contact")} className="cta-ghost" style={{ padding: "7px 16px", fontSize: 11 }}>Quote</button>
          <button onClick={() => navigate("/services")} className="cta-primary" style={{ padding: "7px 18px", fontSize: 11 }}>Launch</button>
        </div>

        {/* Hamburger */}
        <button 
          id="hamburger" 
          onClick={() => setMenuOpen(!menuOpen)} 
          style={{ display: "none", background: "none", border: "none", cursor: "pointer", color: "var(--text-primary)" }}
        >
          <svg width="20" height="20" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.8">
            {menuOpen ? (
              <><line x1="3" y1="3" x2="19" y2="19"/><line x1="19" y1="3" x2="3" y2="19"/></>
            ) : (
              <><line x1="2" y1="6" x2="20" y2="6"/><line x1="2" y1="11" x2="20" y2="11"/><line x1="2" y1="16" x2="20" y2="16"/></>
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: "fixed", top: 60, left: 0, right: 0, zIndex: 99,
          background: "rgba(5,3,13,0.97)", backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(108,43,217,0.25)",
          padding: "20px 5%", display: "flex", flexDirection: "column", gap: 15,
          animation: "slideDown 0.25s ease both",
        }}>
          {NAV_LINKS.map((l) => (
            <span key={l.label} onClick={() => { navigate(l.href); setMenuOpen(false); }} className="nav-link" style={{ fontSize: 16 }}>
              {l.label}
            </span>
          ))}
        </div>
      )}
    </>
  );
}