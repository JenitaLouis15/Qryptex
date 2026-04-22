import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Services from "./components/Services";
import About from "./components/About";
import Contact from "./components/Contact";

function App() {
  return (
    <Router>
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#05030D" }}>
        <Routes>
          {/* This renders your Hero component when on the Home page */}
          <Route path="/" element={<Hero />} />
          
          {/* This renders your Services component */}
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          {/* Catch-all: Redirects any unknown paths (like /blockchain) back to Home */}
          <Route path="*" element={<Hero />} />
          

        </Routes>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;