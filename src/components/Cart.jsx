
import "./Cart.css";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { placeOrder } from "../api/orders";

export default function Cart({
  open,
  setOpen,
  setShowTracker,
}) {
  const { cart, removeFromCart, total } = useCart();

  const [orderSuccess, setOrderSuccess] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleCheckout() {
    if (!customerName.trim() || !phone.trim()) {
      setError("Please enter your name and phone number.");
      return;
    }

    if (!/^\d{10}$/.test(phone.trim())) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    if (cart.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const orderData = {
        customerName: customerName.trim(),
        phone: phone.trim(),
        items: cart.map((item) => ({
          name: item.name,
          price: Number(
            String(item.price).replace(/[^\d.]/g, "")
          ),
          quantity: Number(item.quantity || 1),
        })),
      };

      const result = await placeOrder(orderData);

      setOrderSuccess(true);
    } catch (err) {
      setError(
        err.message || "Unable to place order. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;

  return (
    <>
      <div
        className="cart-overlay"
        onClick={() => setOpen(false)}
      ></div>

      <div className="cart">
        <div className="cart-header">
          <h2>🛒 Your Cart</h2>

          <button onClick={() => setOpen(false)}>
            ✕
          </button>
        </div>

        <div className="cart-items">
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cart.map((item, index) => (
              <div className="cart-item" key={index}>
                <img src={item.image} alt={item.name} />

                <div className="cart-details">
                  <h4>{item.name}</h4>
                  <p>{item.price}</p>
                </div>

                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(index)}
                >
                  ❌
                </button>
              </div>
            ))
          )}
        </div>

        <div className="cart-footer">
          <h3>Total: ₹{total}</h3>

          <input
            type="text"
            placeholder="Enter your name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />

          <input
            type="tel"
            placeholder="Enter 10-digit phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          {error && (
            <p style={{ color: "red" }}>{error}</p>
          )}

          <button
            className="checkout-btn"
            onClick={handleCheckout}
            disabled={cart.length === 0 || loading}
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </div>
      </div>

      {orderSuccess && (
        <div className="success-popup">
          <div className="success-box">
            <h1>🎉</h1>

            <h2>Order Placed Successfully!</h2>

            <p>
              Thank you for choosing
              <br />
              <strong>Midnight Restaurant</strong>
            </p>

            <h3>👨‍🍳 Preparing Your Food...</h3>

            <p>Estimated Delivery: 30 Minutes 🚚</p>

            <button
              onClick={() => {
                setOrderSuccess(false);
                setOpen(false);
                setShowTracker(true);
              }}
            >
              Track Order 🚚
            </button>
          </div>
        </div>
      )}
    </>
  );
}