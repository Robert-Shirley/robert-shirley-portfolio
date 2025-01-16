// context/CartContext.tsx
import useLocalStorage from "@/hooks/useLocalStorage";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

type CartItem = {
  id: number;
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  totalItems: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false);
  const [cart, setCart] = useLocalStorage<CartItem[]>("cart", []);

  useEffect(() => {
    setIsReady(true);
  }, []);

  const totalItems = useMemo(() => {
    if (!isReady) return 0;
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [isReady, cart]);

  return (
    <CartContext.Provider value={{ cart, setCart, totalItems }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
