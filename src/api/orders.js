
const API_URL = "https://midnit-restaraunt.onrender.com/api/orders";

export async function placeOrder(orderData) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Order failed");
  }

  return data;
}