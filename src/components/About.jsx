import "./About.css";
import { motion } from "framer-motion";
export default function About() {
  return (
    <section className="about" id="about">

      <div className="about-image">
        <img
          src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80"
          alt="Chef"
        />
      </div>

      <div className="about-content">

        <h4>ABOUT US</h4>

        <h2>We Create Delicious Memories</h2>

        <p>
          Welcome to Midnight, where every dish is crafted with passion and
          every meal becomes an unforgettable experience. Enjoy premium
          ingredients, elegant ambiance, and exceptional hospitality.
        </p>

        <div className="stats">

          <div className="card">
            <h3>15+</h3>
            <span>Years Experience</span>
          </div>

          <div className="card">
            <h3>120+</h3>
            <span>Signature Dishes</span>
          </div>

          <div className="card">
            <h3>50K+</h3>
            <span>Happy Customers</span>
          </div>

        </div>

      </div>

    </section>
  );
}