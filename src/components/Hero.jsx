import "./Hero.css";
<section className="hero" id="home"></section>
export default function Hero() {

  const scrollTo = (id) => {
    document.getElementById(id).scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <section className="hero" id="home">

      <div className="overlay"></div>

      <div className="hero-content">

        <h1>Midnight Restaurant</h1>

        <p>
          Delicious food, elegant ambience and unforgettable moments.
        </p>

        <div className="buttons">

          <button
            className="gold-btn"
            onClick={() => scrollTo("reservation")}
          >
            Book Table
          </button>

          <button
            className="outline-btn"
            onClick={() => scrollTo("menu")}
          >
            View Menu
          </button>

        </div>

      </div>

    </section>
  );
}