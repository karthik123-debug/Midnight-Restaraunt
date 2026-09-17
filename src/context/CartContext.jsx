import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {

  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart((prev) => [...prev, item]);
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item,index)=>index!==id));
  };

  const total = cart.reduce(
  (sum, item) => sum + Number(String(item.price).replace(/[^\d.]/g, "")),
  0
);

  return(
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        total
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart=()=>useContext(CartContext);