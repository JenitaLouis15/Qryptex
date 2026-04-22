import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const FOOTER_SECTIONS = [
    {
      title: "Solutions",
      links: ["Quantum Auth", "Neural Networks", "Ledger Protocol", "Vault Security"]
    },
    {
      title: "Company",
      links: ["Infrastructure", "Open Source", "Security Lab", "Whitepaper"]
    },
    {
      title: "Social",
      links: ["HackerOne", "GitHub", "X / Twitter", "Discord"]
    }
  ];

  return (
    <footer style={{
      background: "var(--bg-deep)",
      borderTop: "1px solid rgba(108, 43, 217, 0.2)",
      padding: "80px 6% 40px",
      position: "relative",
      overflow: "hidden",
      fontFamily: "'Rajdhani', sans-serif"
    }}>
      {/* Background Decorative Element */}
      <div style={{
        position: "absolute",
        bottom: 0,
        right: 0,
        width: "300px",
        height: "300px",
        background: "radial-gradient(circle, rgba(108, 43, 217, 0.05) 0%, transparent 70%)",
        pointerEvents: "none"
      }} />

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "40px",
        marginBottom: "60px",
        position: "relative",
        zIndex: 1
      }}>
        {/* Brand Column */}
        <div style={{ maxWidth: "300px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
            <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
              <polygon points="16,2 29,9 29,23 16,30 3,23 3,9" fill="none" stroke="#6C2BD9" strokeWidth="2"/>
              <circle cx="16" cy="16" r="3" fill="#00FFC6"/>
            </svg>
            <span style={{ 
              fontFamily: "'Orbitron', sans-serif", 
              fontSize: "18px", 
              fontWeight: 900, 
              color: "var(--text-primary)",
              letterSpacing: "0.05em"
            }}>
              Q<span style={{ color: "var(--accent-green)" }}>RYP</span>TEX
            </span>
          </div>
          <p style={{ 
            color: "var(--text-secondary)", 
            fontSize: "14px", 
            lineHeight: "1.6",
            marginBottom: "20px" 
          }}>
            Architecting the future of secure digital assets through decentralized intelligence and quantum-resistant protocols.
          </p>
          <div style={{ 
            display: "inline-flex", 
            alignItems: "center", 
            gap: "8px", 
            padding: "6px 12px", 
            background: "rgba(0, 255, 198, 0.05)", 
            border: "1px solid rgba(0, 255, 198, 0.2)",
            borderRadius: "2px"
          }}>
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--accent-green)" }} />
            <span style={{ fontSize: "10px", color: "var(--accent-green)", fontWeight: 700, letterSpacing: "0.1em" }}>NODES ACTIVE</span>
          </div>
        </div>

        {/* Link Columns */}
        {FOOTER_SECTIONS.map((section) => (
          <div key={section.title}>
            <h4 style={{ 
              fontFamily: "'Orbitron', sans-serif", 
              color: "var(--text-primary)", 
              fontSize: "13px", 
              marginBottom: "25px", 
              letterSpacing: "0.1em",
              textTransform: "uppercase" 
            }}>
              {section.title}
            </h4>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {section.links.map((link) => (
                <li key={link} style={{ marginBottom: "12px" }}>
                  <a href={`#${link.toLowerCase()}`} style={{ 
                    color: "var(--text-secondary)", 
                    textDecoration: "none", 
                    fontSize: "14px",
                    transition: "color 0.2s ease"
                  }}
                  onMouseOver={(e) => e.target.style.color = "var(--accent-green)"}
                  onMouseOut={(e) => e.target.style.color = "var(--text-secondary)"}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom Bar */}
      <div style={{
        borderTop: "1px solid rgba(161, 161, 194, 0.1)",
        paddingTop: "30px",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "20px"
      }}>
        <div style={{ 
          color: "var(--text-secondary)", 
          fontSize: "12px", 
          fontFamily: "'JetBrains Mono', monospace",
          opacity: 0.6 
        }}>
          © {currentYear} QRYPTEX_LABS // ALL_RIGHTS_RESERVED
        </div>
        
        <div style={{ 
          display: "flex", 
          gap: "24px", 
          color: "var(--text-secondary)", 
          fontSize: "12px",
          textTransform: "uppercase",
          letterSpacing: "0.1em"
        }}>
          <span style={{ cursor: "pointer" }}>Privacy_Policy</span>
          <span style={{ cursor: "pointer" }}>Terms_Of_Service</span>
        </div>
      </div>
    </footer>
  );
}