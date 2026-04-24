import React from 'react';
import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <style>{`
        @keyframes pulseBar {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(0.85); }
        }

        .footer-legal-link {
          color: rgba(161, 161, 194, 0.4);
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          text-decoration: none;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .footer-legal-link:hover {
          color: #00FFC6;
          text-shadow: 0 0 8px rgba(0, 255, 198, 0.4);
        }

        .premium-pill {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 12px 20px;
          background: linear-gradient(145deg, rgba(255,255,255,0.03), rgba(8,5,20,0.6));
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 10px;
          color: #A1A1C2;
          font-family: 'Orbitron', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          text-decoration: none;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          backdrop-filter: blur(10px);
          position: relative;
          overflow: hidden;
        }

        .premium-pill svg {
          transition: all 0.4s ease;
        }

        .premium-pill::before {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 50%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);
          transition: left 0.6s ease;
        }
        .premium-pill:hover::before {
          left: 150%;
        }

        .pill-linkedin:hover {
          border-color: rgba(139,92,246,0.6);
          box-shadow: 0 8px 24px rgba(139,92,246,0.2), inset 0 1px 0 rgba(255,255,255,0.1);
          color: #E9E6FF;
          transform: translateY(-3px);
        }
        .pill-linkedin:hover svg { color: #A78BFA; }

        .pill-instagram:hover {
          border-color: rgba(0,255,198,0.6);
          box-shadow: 0 8px 24px rgba(0,255,198,0.2), inset 0 1px 0 rgba(255,255,255,0.1);
          color: #E9E6FF;
          transform: translateY(-3px);
        }
        .pill-instagram:hover svg { color: #00FFC6; }

        .pill-contact {
          background: linear-gradient(135deg, rgba(108,43,217,0.15), rgba(0,255,198,0.05));
          border-color: rgba(108,43,217,0.3);
          color: #E9E6FF;
        }
        .pill-contact:hover {
          border-color: rgba(0,255,198,0.6);
          background: linear-gradient(135deg, rgba(108,43,217,0.25), rgba(0,255,198,0.1));
          box-shadow: 0 8px 24px rgba(0,255,198,0.25), inset 0 1px 0 rgba(255,255,255,0.2);
          transform: translateY(-3px);
        }
        .pill-contact:hover svg { color: #00FFC6; transform: translateX(2px) translateY(-2px); }

        .footer-layout {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 40px;
          margin-bottom: 60px;
          position: relative;
          z-index: 1;
        }
        
        .connect-group {
          display: flex;
          flex-direction: column;
          gap: 16px;
          align-items: flex-start; 
          width: 100%;
          max-width: 340px;
        }
        .social-row {
          display: flex;
          gap: 12px;
          width: 100%;
        }

        @media (max-width: 768px) {
          .footer-layout { flex-direction: column; }
          .connect-group { align-items: flex-start; max-width: 100%; }
          .social-row { flex-wrap: wrap; }
          .premium-pill { flex: 1; min-width: 130px; }
          .pill-contact { width: 100%; }
        }
      `}</style>

      <footer style={{
        background: "#05030D",
        borderTop: "1px solid rgba(108, 43, 217, 0.15)",
        padding: "60px 5% 30px",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute",
          bottom: "-50px",
          right: "-50px",
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, rgba(108, 43, 217, 0.04) 0%, transparent 60%)",
          pointerEvents: "none",
          zIndex: 0
        }} />

        <div className="footer-layout">
          
          <div style={{ maxWidth: "380px" }}>
            <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
                <polygon points="16,2 29,9 29,23 16,30 3,23 3,9" fill="none" stroke="#6C2BD9" strokeWidth="2"/>
                <circle cx="16" cy="16" r="3" fill="#00FFC6"/>
              </svg>
              <span style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "18px", fontWeight: 900, color: "#E9E6FF", letterSpacing: "0.05em" }}>
                Q<span style={{ color: "#00FFC6" }}>RYP</span>TEX
              </span>
            </Link>
            
            <p style={{ 
              fontFamily: "'Rajdhani', sans-serif",
              color: "#A1A1C2", 
              fontSize: "14.5px", 
              lineHeight: "1.7",
              marginBottom: "24px" 
            }}>
              Architecting the bedrock of digital sovereignty through decentralized intelligence and post-quantum layers.
            </p>
            
            <div style={{ 
              display: "inline-flex", alignItems: "center", gap: "8px", 
              padding: "6px 12px", background: "rgba(0, 255, 198, 0.03)", 
              border: "1px solid rgba(0, 255, 198, 0.15)", borderRadius: "4px"
            }}>
              <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#00FFC6", boxShadow: "0 0 6px #00FFC6", animation: "pulseBar 2s infinite" }} />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", color: "#00FFC6", fontWeight: 700, letterSpacing: "0.15em" }}>
                ALL SYSTEMS OPERATIONAL
              </span>
            </div>
          </div>

          <div className="connect-group">
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", color: "rgba(108,43,217,0.5)", letterSpacing: "0.2em", paddingLeft: "4px" }}>
              // UPLINK CHANNELS
            </span>
            
            <Link to="/contact" className="premium-pill pill-contact" style={{ width: "100%" }}>
              Initiate Contact
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </Link>

            <div className="social-row">
              <Link to="/coming-soon" className="premium-pill pill-linkedin" style={{ flex: 1 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle>
                </svg>
                LinkedIn
              </Link>
              
              {/* Replaced GitHub with Instagram */}
              <Link to="/coming-soon" className="premium-pill pill-instagram" style={{ flex: 1 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
                Instagram
              </Link>
            </div>
          </div>
        </div>

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
            <Link to="/privacy-policy" className="footer-legal-link">
              Privacy_Policy
            </Link>
            <Link to="/terms-of-service" className="footer-legal-link">
              Terms_Of_Service
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}