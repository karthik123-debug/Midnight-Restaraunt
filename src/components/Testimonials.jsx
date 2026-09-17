import "./Testimonials.css";

const reviews = [
  {
    id: 1,
    name: "Allu Arjun 🔥",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLDejMlXliLOMRX__X8Q5WlNaFKhpA_w6O4Sl0UWnT9SxBfFwVMNYuHG56&s=10",
    review:
      "Food chala stylish ga undi! Taste kuda thaggede le! Definitely coming back for more! 😎",
  },
  {
    id: 2,
    name: "Prabhas 🍗",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiVvwZD6QCcihpxxN0hRVbKFXDXklf8RBprkL5TjROqaIEUmV0QsfNcX_2&s=10",
    review:
      "Ee food chusthunte inka aapalanipinchadu! Super taste, amazing quantity. Full meals! 😋",
  },
  {
    id: 3,
    name: "Ram Charan ⚡",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnc4OwIO7cQfWEj1bIwfNVf31Dv3r41rRDcP7R6vt9gawW0wYajMiFHWE&s=10",
    review:
      "Restaurant ambience and food rendu excellent! Friends tho vachina, family tho vachina perfect place! ⭐",
  },
];

export default function Testimonials() {
  return (
    <section className="testimonials" id="testimonials">
      <h4>TESTIMONIALS</h4>
      <h2>What Our Telugu Stars Say</h2>

      <div className="testimonial-grid">
        {reviews.map((item) => (
          <div className="testimonial-card" key={item.id}>
            <div className="testimonial-image-wrapper">
              <img
                src={item.image}
                alt={item.name}
                className="testimonial-avatar"
                loading="lazy"
              />
            </div>

            <h3>{item.name}</h3>

            <div className="stars">⭐⭐⭐⭐⭐</div>

            <p>{item.review}</p>
          </div>
        ))}
      </div>
    </section>
  );
}