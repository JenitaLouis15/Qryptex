import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <style>{`
        .footer-social-link {
          color: var(--text-secondary);
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          text-decoration: none;
          transition: color 0.3s ease, text-shadow 0.3s ease, transform 0.3s ease;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .footer-social-link:hover {
          color: var(--accent-green);
          text-shadow: 0 0 10px rgba(0, 255, 198, 0.4);
          transform: translateX(-4px);
        }
        
        .footer-legal-link {
          color: rgba(161, 161, 194, 0.6);
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          text-decoration: none;
          transition: color 0.3s ease;
          cursor: pointer;
        }
        .footer-legal-link:hover {
          color: var(--text-primary);
        }
      `}</style>

      <footer style={{
        background: "var(--bg-deep)",
        borderTop: "1px solid rgba(108, 43, 217, 0.15)",
        padding: "60px 5% 30px",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Background Decorative Element */}
        <div style={{
          position: "absolute",
          bottom: "-50px",
          right: "-50px",
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, rgba(108, 43, 217, 0.03) 0%, transparent 60%)",
          pointerEvents: "none",
          zIndex: 0
        }} />

        <div style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "40px",
          marginBottom: "60px",
          position: "relative",
          zIndex: 1
        }}>
          
          {/* Left: Brand Identity */}
          <div style={{ maxWidth: "380px" }}>
            <a href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
                <polygon points="16,2 29,9 29,23 16,30 3,23 3,9" fill="none" stroke="#6C2BD9" strokeWidth="2"/>
                <circle cx="16" cy="16" r="3" fill="#00FFC6"/>
              </svg>
              <span style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "18px", fontWeight: 900, color: "var(--text-primary)", letterSpacing: "0.05em" }}>
                Q<span style={{ color: "var(--accent-green)" }}>RYP</span>TEX
              </span>
            </a>
            
            <p style={{ 
              fontFamily: "'Rajdhani', sans-serif",
              color: "var(--text-secondary)", 
              fontSize: "14.5px", 
              lineHeight: "1.7",
              marginBottom: "24px" 
            }}>
              Architecting the bedrock of digital sovereignty through decentralized intelligence and post-quantum layers.
            </p>
            
            <div style={{ 
              display: "inline-flex", alignItems: "center", gap: "8px", 
              padding: "6px 12px", background: "rgba(0, 255, 198, 0.03)", 
              border: "1px solid rgba(0, 255, 198, 0.15)", borderRadius: "2px"
            }}>
              <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "var(--accent-green)", boxShadow: "0 0 6px var(--accent-green)", animation: "pulseBar 2s infinite" }} />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", color: "var(--accent-green)", fontWeight: 700, letterSpacing: "0.15em" }}>
                ALL SYSTEMS OPERATIONAL
              </span>
            </div>
          </div>

          {/* Right: Essential Socials */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", alignItems: "flex-end" }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", color: "rgba(108,43,217,0.5)", letterSpacing: "0.2em", marginBottom: "4px" }}>
              // CONNECT
            </span>
            
            <a href="https://linkedin.com/company/qryptex" target="_blank" rel="noopener noreferrer" className="footer-social-link">
              LINKEDIN
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
            
            <a href="https://github.com/qryptex" target="_blank" rel="noopener noreferrer" className="footer-social-link">
              GITHUB
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: "1px solid rgba(108, 43, 217, 0.15)",
          paddingTop: "24px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "20px",
          position: "relative",
          zIndex: 1
        }}>
          <div style={{ 
            color: "rgba(161, 161, 194, 0.4)", 
            fontSize: "10px", 
            fontFamily: "'JetBrains Mono', monospace",
            letterSpacing: "0.1em"
          }}>
            © {currentYear} QRYPTEX // ALL_RIGHTS_RESERVED
          </div>
          
          <div style={{ display: "flex", gap: "24px" }}>
            <span className="footer-legal-link">Privacy_Policy</span>
            <span className="footer-legal-link">Terms_Of_Service</span>
          </div>
        </div>
      </footer>
    </>
  );
}