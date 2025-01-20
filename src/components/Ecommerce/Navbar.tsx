"use client";

import { useCart } from "@/context/CartContext";
import { Disclosure } from "@headlessui/react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import MyDrawer from "../shared/Drawer";
import Cart from "./Cart";

export default function Navbar() {
  const [openCart, setOpenCart] = useState(false);

  const { cart, setCart, totalItems } = useCart();

  const navLinks = [
    {
      name: "Clothing",
      href: "/projects/ecommerce/clothing",
    },
    {
      name: "Jewelry",
      href: "/projects/ecommerce/jewelry",
    },
    {
      name: "Electronics",
      href: "/projects/ecommerce/electronics",
    },
    {
      name: "About",
      href: "/projects/ecommerce/about",
    },
  ];

  return (
    <Disclosure
      as="nav"
      className="sticky top-0 bg-emerald-600 text-white shadow-lg z-50"
    >
      {({ open }) => (
        <>
          <div className="mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <MyDrawer
              open={openCart}
              setOpen={() => setOpenCart(false)}
              title="Your Cart"
            >
              <div className="h-full">
                <Cart cart={cart} setCart={setCart} />
              </div>
            </MyDrawer>

            <div className="flex h-16 justify-between w-full">
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center">
                  <div className="h-fit w-fit p-1 bg-white rounded-lg border border-gray-500">
                    <Link href="/projects/ecommerce">
                      <div className="text-gray-600 italic px-2 text-xl cursor-pointer">
                        <span className="hidden sm:inline">
                          Superb Products
                        </span>
                        <span className="sm:hidden">SP</span>
                      </div>
                    </Link>
                  </div>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-8">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="cursor-pointer text-lg hover:underline items-center px-1 pt-1 font-medium"
                    >
                      {link.name}
                    </Link>
                  ))}
                  <div
                    onClick={() => setOpenCart(!openCart)}
                    className="bg-white text-emerald-600 rounded-lg px-6 py-2 text-xl hover:bg-gray-100 hover:text-emerald-700 relative cursor-pointer"
                  >
                    {totalItems > 0 && (
                      <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center">
                        {totalItems}
                      </span>
                    )}
                    Cart
                    <FaShoppingCart className="inline-block ml-2" />
                  </div>
                </div>

                {/* Mobile menu button */}
                <div className="flex items-center sm:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    {open ? (
                      <X className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Menu className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile menu panel */}
          {/* Mobile menu panel */}
          <Disclosure.Panel className="sm:hidden">
            {({ close }) => (
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => {
                      setOpenCart(false);
                      close();
                    }}
                  >
                    <Disclosure.Button
                      as="div"
                      className="cursor-pointer block px-3 py-2 text-base font-medium hover:bg-emerald-700 rounded-md w-full text-left"
                    >
                      {link.name}
                    </Disclosure.Button>
                  </Link>
                ))}
                <Disclosure.Button
                  as="div"
                  onClick={() => {
                    setOpenCart(!openCart);
                    close();
                  }}
                  className="cursor-pointer flex items-center px-4 py-2 text-base font-medium text-white hover:bg-emerald-700 rounded-md transition duration-200"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-white">Cart</span>
                    <FaShoppingCart className="h-5 w-5" />
                    {totalItems > 0 && (
                      <span className="bg-red-600 text-white text-xs font-bold rounded-full px-2 py-1 shadow-md">
                        {totalItems}
                      </span>
                    )}
                  </div>
                </Disclosure.Button>
              </div>
            )}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
