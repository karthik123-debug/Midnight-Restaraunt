
import "./Contact.css";
import { useState } from "react";

export default function Contact() {
  const [showPopup, setShowPopup] = useState(false);

  const [reservation, setReservation] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "1 Guest",
  });

  const handleChange = (e) => {
    setReservation({
      ...reservation,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowPopup(true);
  };

  return (
    <section className="contact" id="reservation">
      <div className="reservation">
        <h2>Reserve Your Table</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={reservation.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={reservation.email}
            onChange={handleChange}
            required
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={reservation.phone}
            onChange={handleChange}
            required
          />

          <input
            type="date"
            name="date"
            value={reservation.date}
            onChange={handleChange}
            required
          />

          <input
            type="time"
            name="time"
            value={reservation.time}
            onChange={handleChange}
            required
          />

          <select
            name="guests"
            value={reservation.guests}
            onChange={handleChange}
            required
          >
            <option>1 Guest</option>
            <option>2 Guests</option>
            <option>4 Guests</option>
            <option>6 Guests</option>
            <option>8+ Guests</option>
          </select>

          <button type="submit">Reserve Now</button>
        </form>
      </div>

      <div className="contact-info">
        <h2>Visit Us</h2>
        <p>📍 24XX, Midnight Street, Bapatla</p>
        <p>📞 +91 98XX XXX XXX</p>
        <p>📧 contact@midnightrestaurant.com</p>
        <p>🕒 Open Daily: 6 PM – 1 AM</p>
      </div>

      {showPopup && (
        <div className="popup">
          <div className="popup-box">
            <h2>🎉 Reservation Successful!</h2>

            <p>
              Thank you for choosing Midnight Restaurant!
            </p>

            <div className="reservation-details">
              <p><strong>Name:</strong> {reservation.name}</p>
              <p><strong>Email:</strong> {reservation.email}</p>
              <p><strong>Phone:</strong> {reservation.phone}</p>
              <p><strong>Date:</strong> {reservation.date}</p>
              <p><strong>Time:</strong> {reservation.time}</p>
              <p><strong>Guests:</strong> {reservation.guests}</p>
            </div>

            <button onClick={() => setShowPopup(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}