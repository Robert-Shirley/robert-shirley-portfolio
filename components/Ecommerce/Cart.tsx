import Link from "next/link";
import { useMemo } from "react";
import toast from "react-hot-toast";

import {
  electronics,
  jewelry,
  mensClothing,
  womenClothing,
} from "@/data/products";

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  category: string;
};

type CartItem = {
  id: number;
  quantity: number;
};

type CartDisplayItem = Product & {
  quantity: number;
};

// Cart.tsx
type CartProps = {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
};

const Cart: React.FC<CartProps> = ({ cart, setCart }) => {
  const allProducts = useMemo(
    () => [...mensClothing, ...womenClothing, ...jewelry, ...electronics],
    []
  );

  const cartProducts = useMemo(() => {
    try {
      return cart.map((item) => {
        const product = allProducts.find((p) => p.id === item.id);
        if (!product) {
          throw new Error(`Product with ID ${item.id} not found`);
        }
        return {
          ...product,
          quantity: item.quantity,
        };
      });
    } catch (error) {
      console.error("Error processing cart items:", error);
      toast.error("Failed to load cart items");
      return [];
    }
  }, [cart, allProducts]);

  if (cartProducts.length === 0) {
    return <div>Your cart is empty</div>;
  }

  const updateQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(itemId);
      return;
    }

    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (itemId: number) => {
    setCart((currentCart) => currentCart.filter((item) => item.id !== itemId));
    toast.success("Item removed from cart");
  };

  return (
    <div className="w-full">
      {cartProducts.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-gray-500">Your cart is empty</div>
          <Link
            href="/projects/ecommerce"
            className="text-emerald-600 hover:text-emerald-700 mt-4 inline-block"
          >
            Continue Shopping →
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {cartProducts.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex items-center gap-4"
            >
              <div className="w-20 h-20 relative flex-shrink-0">
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-contain"
                />
              </div>
              <div className="flex-grow">
                <h3 className="text-gray-800 font-medium line-clamp-1">
                  {item.title}
                </h3>
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border rounded-lg">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="px-3 py-1 hover:bg-gray-100"
                      >
                        −
                      </button>
                      <span className="px-3 py-1">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="px-3 py-1 hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                    <div className="text-gray-800 space-y-0.5">
                      <div className="text-sm text-gray-500">
                        ${item.price.toFixed(2)} each
                      </div>
                      <div className="font-medium">
                        Total: ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <span className="hidden sm:inline">Remove</span>
                    <span className="sm:hidden text-3xl">×</span>
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="border-t pt-4 mt-4">
            <div className="text-right">
              <div className="text-lg font-semibold text-gray-900">
                Total: $
                {cartProducts
                  .reduce((sum, item) => sum + item.price * item.quantity, 0)
                  .toFixed(2)}
              </div>
              <button
                onClick={() =>
                  toast.success("This would proceed to checkout in a real app!")
                }
                className="mt-4 bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
