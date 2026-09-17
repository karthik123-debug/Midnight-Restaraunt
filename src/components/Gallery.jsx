import "./Gallery.css";

const images = [
  {
  img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1000&q=90",
  title: "Signature Pizza",
},
  {
    img: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1000&q=90",
    title: "Creamy Italian Pasta",
  },
  {
    img: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1000&q=90",
    title: "Fresh Gourmet Salad",
  },
  {
    img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1000&q=90",
    title: "Delicious Pizza",
  },
  {
    img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1000&q=90",
    title: "Luxury Fine Dining",
  },
  {
    img: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=90",
    title: "Chef's Special BBQ",
  },
];

export default function Gallery() {
  return (
    <section className="gallery" id="gallery">
      <h4>OUR GALLERY</h4>
      <h2>Delicious Moments</h2>

      <div className="gallery-grid">
        {images.map((item, index) => (
          <div className="gallery-card" key={index}>
            <img src={item.img} alt={item.title} />

            <div className="overlay">
              <h3>{item.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}