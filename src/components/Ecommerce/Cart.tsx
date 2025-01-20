"use client";

import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";
import { useFetchData } from "@/hooks/useFetchData";
import { Product } from "@/types/Ecommerce";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

const Cart = () => {
  const { cart, setCart, setIsOpen } = useCart();
  const { toast } = useToast();

  // Fetch all products that are in the cart
  const { data: productsQuery, isLoading } = useFetchData(
    cart.length > 0
      ? `/api/ecommerce/product?ids=${cart.map((item) => item.id).join(",")}`
      : "",
    [cart]
  );

  const products = useMemo(() => {
    if (!productsQuery) return [];
    return productsQuery as Product[];
  }, [productsQuery]);

  const cartProducts = useMemo(() => {
    if (isLoading) return [];
    if (!products.length) return [];
    console.log("Cart products", cart, products);
    try {
      return cart.map((item) => {
        const product = products.find((p: Product) => p.id === item.id);
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
      return [];
    }
  }, [cart, products, isLoading]);

  const updateQuantity = (itemId: string, newQuantity: number) => {
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

  const removeItem = (itemId: string) => {
    setCart((currentCart) => currentCart.filter((item) => item.id !== itemId));
    toast({
      title: "Item removed",
      description: "The item has been removed from your cart",
    });
  };

  if (isLoading) {
    return (
      <div className="w-full">
        <div className="space-y-4">
          {[...Array(cart.length)].map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex items-center gap-4"
            >
              <div className="w-20 h-20 relative flex-shrink-0 bg-gray-100 animate-pulse" />
              <div className="flex-grow">
                <div className="h-4 bg-gray-100 rounded w-3/4 animate-pulse" />
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-8 w-24 bg-gray-100 rounded animate-pulse" />
                    <div className="space-y-2">
                      <div className="h-4 w-20 bg-gray-100 rounded animate-pulse" />
                      <div className="h-4 w-24 bg-gray-100 rounded animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (cartProducts.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-500">Your cart is empty</div>
        <Link
          href="/projects/ecommerce"
          onClick={() => setIsOpen(false)}
          className="text-emerald-600 hover:text-emerald-700 mt-4 inline-block"
        >
          Continue Shopping →
        </Link>
      </div>
    );
  }
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
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex-grow">
                <h3 className="text-gray-800 font-medium line-clamp-1">
                  {item.name}
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
                        ${parseFloat(item.price).toFixed(2)} each
                      </div>
                      <div className="font-medium">
                        Total: $
                        {(parseFloat(item.price) * item.quantity).toFixed(2)}
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
                  .reduce(
                    (sum, item) => sum + parseFloat(item.price) * item.quantity,
                    0
                  )
                  .toFixed(2)}
              </div>
              <button
                onClick={() =>
                  toast({
                    title: "Checkout",
                    description:
                      "This would proceed to checkout in a real app!",
                  })
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
