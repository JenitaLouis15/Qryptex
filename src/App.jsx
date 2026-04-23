import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Services from "./components/Services";
import About from "./components/About";
import Contact from "./components/Contact";
import Cybersec from "./pages/Cybersec";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";

function LandingPage() {
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
          
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          {/* Legal Routes - Placed before catch-all */}
          

          {/* Catch-all: Always keep this last */}
          <Route path="*" element={<LandingPage />} />
        </Routes>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;