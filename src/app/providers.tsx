"use client";

import { CartProvider } from "@/context/CartContext";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "../lib/queryClient";

type ProvidersProps = {
  children: React.ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  return (
    <CartProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </CartProvider>
  );
}
