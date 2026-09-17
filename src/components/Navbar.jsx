import "./Navbar.css";
import { useCart } from "../context/CartContext";

export default function Navbar({ setOpenCart }) {

  const { cart } = useCart();

  const scrollToSection = (id) => {
    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <nav className="navbar">

      <div
        className="logo"
        onClick={() => scrollToSection("home")}
      >
        🍽️ Midnight Restaurant
      </div>

      <ul className="nav-links">

        <li onClick={() => scrollToSection("home")}>
          Home
        </li>

        <li onClick={() => scrollToSection("about")}>
          About
        </li>

        <li onClick={() => scrollToSection("menu")}>
          Menu
        </li>

        <li onClick={() => scrollToSection("gallery")}>
          Gallery
        </li>

        <li onClick={() => scrollToSection("reservation")}>
          Contact
        </li>

      </ul>

      <button
  className="book-btn"
  onClick={() => setOpenCart(true)}
>
  🛒 Cart ({cart.length})
</button>

    </nav>
  );
}