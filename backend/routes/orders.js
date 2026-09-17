
import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

// Admin authentication
function verifyAdmin(req, res, next) {
  const adminKey = req.headers["x-admin-key"];

  if (!process.env.ADMIN_KEY || adminKey !== process.env.ADMIN_KEY) {
    return res.status(401).json({
      message: "Unauthorized: Admin access required",
    });
  }

  next();
}

// Place a new order
router.post("/", async (req, res) => {
  try {
    const { customerName, phone, items } = req.body;

    if (
      !customerName?.trim() ||
      !phone?.trim() ||
      !Array.isArray(items) ||
      items.length === 0
    ) {
      return res.status(400).json({
        message: "Customer name, phone, and items are required",
      });
    }

    const cleanItems = items.map((item) => {
      const price = Number(
        String(item.price).replace(/[^\d.]/g, "")
      );
      const quantity = Number(item.quantity ?? 1);

      if (
        !item.name ||
        !Number.isFinite(price) ||
        price < 0 ||
        !Number.isInteger(quantity) ||
        quantity < 1
      ) {
        throw new Error("Invalid item details");
      }

      return {
        name: String(item.name),
        price,
        quantity,
      };
    });

    const total = cleanItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const order = await Order.create({
      customerName: customerName.trim(),
      phone: phone.trim(),
      items: cleanItems,
      total,
    });

    res.status(201).json({
      message: "Order placed successfully!",
      order,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || "Could not place order",
    });
  }
});

// Get all orders (Admin only)
router.get("/", verifyAdmin, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: "Could not fetch orders",
    });
  }
});

// Update order status (Admin only)
router.patch("/:id/status", verifyAdmin, async (req, res) => {
  try {
    const allowedStatuses = [
      "Pending",
      "Preparing",
      "Out for Delivery",
      "Delivered",
      "Cancelled",
    ];

    const { status } = req.body;

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid order status",
      });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.json({
      message: "Order status updated",
      order,
    });
  } catch (error) {
    res.status(400).json({
      message: "Could not update order status",
    });
  }
});

export default router;