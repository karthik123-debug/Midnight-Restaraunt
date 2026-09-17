import "./Menu.css";
import { useState } from "react";
import { useCart } from "../context/CartContext";

const dishes = [
  // 🍕 Pizza
  {
    id: 1,
    name: "Margherita Pizza",
    category: "Pizza",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80",
    price: "₹499",
  },
  {
    id: 2,
    name: "Pepperoni Pizza",
    category: "Pizza",
    image: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?auto=format&fit=crop&w=600&q=80",
    price: "₹599",
  },
  {
    id: 3,
    name: "Veggie Pizza",
    category: "Pizza",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQinwLfJkQLle1YKD4mn2JPjwde99W6TznytP_taYh_cjOXwCOVC3sANFV0&s=10",
    price: "₹549",
  },

  // 🍔 Burger
  {
    id: 4,
    name: "Classic Burger",
    category: "Burger",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80",
    price: "₹299",
  },
  {
    id: 5,
    name: "Chicken Burger",
    category: "Burger",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80",
    price: "₹349",
  },
  {
    id: 6,
    name: "Cheese Burger",
    category: "Burger",
    image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=600&q=80",
    price: "₹399",
  },

  // 🍝 Pasta
  {
    id: 7,
    name: "Alfredo Pasta",
    category: "Pasta",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=600&q=80",
    price: "₹449",
  },
  {
    id: 8,
    name: "Spaghetti",
    category: "Pasta",
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=600&q=80",
    price: "₹399",
  },
  {
    id: 9,
    name: "Lasagna",
    category: "Pasta",
    image: "https://images.unsplash.com/photo-1619895092538-128341789043?auto=format&fit=crop&w=600&q=80",
    price: "₹499",
  },

  // 🥗 Salad
  {
    id: 10,
    name: "Greek Salad",
    category: "Salad",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80",
    price: "₹249",
  },
  {
    id: 11,
    name: "Caesar Salad",
    category: "Salad",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80",
    price: "₹279",
  },
  {
    id: 12,
    name: "Avocado Salad",
    category: "Salad",
    image: "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?auto=format&fit=crop&w=600&q=80",
    price: "₹299",
  },

  // 🍰 Dessert
  {
    id: 13,
    name: "Chocolate Cake",
    category: "Dessert",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80",
    price: "₹249",
  },
  {
    id: 14,
    name: "Ice Cream",
    category: "Dessert",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80",
    price: "₹199",
  },
  {
    id: 15,
    name: "Cheesecake",
    category: "Dessert",
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=80",
    price: "₹279",
  },

  // 🍗 Main Course
  {
    id: 16,
    name: "Grilled Steak",
    category: "Main Course",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80",
    price: "₹899",
  },
  {
    id: 17,
    name: "Grilled Chicken",
    category: "Main Course",
    image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=600&q=80",
    price: "₹599",
  },
  {
    id: 18,
    name: "Fish Fillet",
    category: "Main Course",
    image: "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=600&q=80",
    price: "₹649",
  },

  // 🥤 Drinks
  {
    id: 19,
    name: "Mojito",
    category: "Drinks",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80",
    price: "₹199",
  },
  {
    id: 20,
    name: "Orange Juice",
    category: "Drinks",
    image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?auto=format&fit=crop&w=600&q=80",
    price: "₹149",
  },
  {
    id: 21,
    name: "Cold Coffee",
    category: "Drinks",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80",
    price: "₹179",
  },

  // 🍜 Asian
  {
    id: 22,
    name: "Chicken Noodles",
    category: "Main Course",
    image: "https://images.unsplash.com/photo-1617093727343-374698b1b08d?auto=format&fit=crop&w=600&q=80",
    price: "₹399",
  },
  {
    id: 23,
    name: "Fried Rice",
    category: "Main Course",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=600&q=80",
    price: "₹349",
  },
  {
    id: 24,
    name: "Chicken Biryani",
    category: "Main Course",
    image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=600&q=80",
    price: "₹449",
  },

  // 🍟 Snacks
  {
    id: 25,
    name: "French Fries",
    category: "Snacks",
    image: "https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=600&q=80",
    price: "₹149",
  },
  {
    id: 26,
    name: "Garlic Bread",
    category: "Snacks",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80",
    price: "₹179",
  },
  {
    id: 27,
    name: "Chicken Wings",
    category: "Snacks",
    image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=600&q=80",
    price: "₹299",
  },

  // 🍹 More Drinks
  {
    id: 28,
    name: "Strawberry Shake",
    category: "Drinks",
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80",
    price: "₹229",
  },
  {
    id: 29,
    name: "Lemon Soda",
    category: "Drinks",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=600&q=80",
    price: "₹129",
  },
  {
    id: 30,
    name: "Brownie Sundae",
    category: "Dessert",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80",
    price: "₹299",
  },
];

export default function Menu() {
  const [filter, setFilter] = useState("All");
  const { addToCart } = useCart();

  const filtered =
    filter === "All"
      ? dishes
      : dishes.filter((dish) => dish.category === filter);

  return (
    <section className="menu" id="menu">
      <h4>OUR MENU</h4>
      <h2>Featured Dishes</h2>

      <div className="filter-buttons">
        {[
          "All",
          "Pizza",
          "Burger",
          "Pasta",
          "Dessert",
          "Salad",
          "Main Course",
          "Drinks",
          "Snacks",
        ].map((cat) => (
          <button
            key={cat}
            className={filter === cat ? "active-filter" : ""}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="menu-grid">
        {filtered.map((dish) => (
          <div className="menu-card" key={dish.id}>
            <img src={dish.image} alt={dish.name} />

            <div className="menu-info">
              <h3>{dish.name}</h3>
              <p>{dish.price}</p>

              <button onClick={() => addToCart(dish)}>
                Add To Cart 🛒
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}