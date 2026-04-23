import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Services from "./components/Services";
import About from "./components/About";
import Contact from "./components/Contact";
import Cybersec from "./pages/Cybersec";

// 1. Landing page now only stacks Hero and Services for scrolling
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
          {/* Main Landing Page */}
          <Route path="/" element={<LandingPage />} />
          
          {/* Dedicated Pages (No longer stacked on the home page) */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Service Details Routes */}
          <Route path="/cybersec" element={<Cybersec />} />

          {/* Catch-all */}
          <Route path="*" element={<LandingPage />} />
        </Routes>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;