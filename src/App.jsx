import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Services from "./components/Services";
import About from "./components/About";
import Contact from "./components/Contact";
import Cybersec from "./pages/Cybersec"; // Your new page import

function App() {
  return (
    <Router>
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#05030D" }}>
        <Routes>
          {/* Home Route */}
          <Route path="/" element={<Hero />} />
          
          {/* Main Navigation Routes */}
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Service Details Routes */}
          <Route path="/cybersec" element={<Cybersec />} />

          {/* Catch-all: Redirects any unknown paths back to Home */}
          <Route path="*" element={<Hero />} />
        </Routes>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;