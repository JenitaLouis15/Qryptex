import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Services from "./components/Services";
import About from "./components/About";
import Contact from "./components/Contact";
import Cybersec from "./pages/Cybersec";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";

// IMPORT THE COMING SOON PAGE HERE
import ComingSoon from "./pages/ComingSoon"; 

function LandingPage() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Find the element by the hash id (removing the # symbol)
      const element = document.getElementById(hash.replace("#", ""));
      if (element) {
        // A slight timeout ensures the DOM is fully painted before scrolling
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    } else {
      // If there is no hash, ensure the page loads at the very top
      window.scrollTo(0, 0);
    }
  }, [hash]);

  return (
    <main>
      <div id="hero"><Hero /></div>
      <div id="services"><Services /></div>
    </main>
  );
}

function App() {
  return (
    <Router>
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#05030D" }}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cybersec" element={<Cybersec />} />
          
          {/* ADD THE COMING SOON ROUTE HERE */}
          <Route path="/coming-soon" element={<ComingSoon />} />
          
          {/* Legal Routes */}
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          
          {/* Catch-all: Always keep this last */}
          <Route path="*" element={<LandingPage />} />
        </Routes>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;