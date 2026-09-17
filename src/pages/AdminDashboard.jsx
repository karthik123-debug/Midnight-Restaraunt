
import { useState } from "react";

const API_URL = "http://localhost:5000/api/orders";

export default function AdminDashboard() {
  const [adminKey, setAdminKey] = useState("");
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function fetchOrders() {
    if (!adminKey.trim()) {
      setError("Enter your admin key");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(API_URL, {
        headers: {
          "x-admin-key": adminKey,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not fetch orders");
      }

      setOrders(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(orderId, status) {
    try {
      const response = await fetch(
        `${API_URL}/${orderId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "x-admin-key": adminKey,
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Status update failed");
      }

      setOrders((previous) =>
        previous.map((order) =>
          order._id === orderId ? data.order : order
        )
      );
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div style={styles.page}>
      <h1>🍽️ Midnight Restaurant</h1>
      <h2>Admin Dashboard</h2>

      <div style={styles.login}>
        <input
          type="password"
          placeholder="Enter Admin Key"
          value={adminKey}
          onChange={(e) => setAdminKey(e.target.value)}
          style={styles.input}
        />

        <button onClick={fetchOrders} style={styles.button}>
          {loading ? "Loading..." : "View Orders"}
        </button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <h3>Customer Orders ({orders.length})</h3>

      {orders.length === 0 && !loading && (
        <p>No orders loaded yet.</p>
      )}

      {orders.map((order) => (
        <div key={order._id} style={styles.card}>
          <h3>Order ID: {order._id}</h3>

          <p><b>Customer:</b> {order.customerName}</p>
          <p><b>Phone:</b> {order.phone}</p>

          <p><b>Items:</b></p>
          <ul>
            {order.items.map((item, index) => (
              <li key={index}>
                {item.name} — ₹{item.price} × {item.quantity}
              </li>
            ))}
          </ul>

          <h3>Total: ₹{order.total}</h3>

          <label>
            Order Status:{" "}
            <select
              value={order.status}
              onChange={(e) =>
                updateStatus(order._id, e.target.value)
              }
            >
              <option>Pending</option>
              <option>Preparing</option>
              <option>Out for Delivery</option>
              <option>Delivered</option>
              <option>Cancelled</option>
            </select>
          </label>

          <p>
            <small>
              Ordered: {new Date(order.createdAt).toLocaleString()}
            </small>
          </p>
        </div>
      ))}
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#111",
    color: "white",
    padding: "30px",
    fontFamily: "Arial, sans-serif",
  },
  login: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    marginBottom: "25px",
  },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #555",
    minWidth: "220px",
  },
  button: {
    padding: "12px 20px",
    background: "#f5b642",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  card: {
    background: "#222",
    border: "1px solid #444",
    borderRadius: "12px",
    padding: "20px",
    marginBottom: "20px",
    overflowWrap: "anywhere",
  },
};