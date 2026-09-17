
import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Menu from "./components/Menu";
import Gallery from "./components/Gallery";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Cart from "./components/Cart";
import DeliveryTracker from "./components/DeliveryTracker";
import AdminDashboard from "./pages/AdminDashboard";

function HomePage() {
  const [openCart, setOpenCart] = useState(false);
  const [showTracker, setShowTracker] = useState(false);

  return (
    <>
      <Navbar setOpenCart={setOpenCart} />

      <main>
        <Hero />
        <About />
        <Menu />
        <Gallery />
        <Testimonials />
        <Contact />
      </main>

      <Footer />

      <Cart
        open={openCart}
        setOpen={setOpenCart}
        setShowTracker={setShowTracker}
      />

      <DeliveryTracker
        show={showTracker}
        onClose={() => setShowTracker(false)}
      />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/admin"
          element={<AdminDashboard />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;