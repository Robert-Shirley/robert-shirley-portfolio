"use client";

import classNames from "@/functions/classNames";
import { Disclosure } from "@headlessui/react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";

export default function Navbar() {
  const route = usePathname();
  const [isOpen, setIsOpen] = useState(true);

  const canShowHideButton = useMemo(() => {
    if (route?.includes("/projects")) {
      return true;
    } else {
      setIsOpen(true);
      return false;
    }
  }, [route]);

  if (isOpen) {
    return (
      <Disclosure
        as="nav"
        className="bg-white shadow-xl border-b border-gray-200"
      >
        {({ open }) => (
          <>
            <div className="mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="flex h-16 justify-between w-full">
                <div className="flex w-full">
                  {/* Mobile menu button and hide button container */}
                  <div className="sm:hidden flex items-center justify-between w-full">
                    <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100">
                      {open ? (
                        <X className="h-6 w-6" />
                      ) : (
                        <Menu className="h-6 w-6" />
                      )}
                    </Disclosure.Button>
                    {canShowHideButton && (
                      <button
                        onClick={() => setIsOpen(false)}
                        className="border rounded-lg cursor-pointer inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100"
                      >
                        Hide Navbar
                      </button>
                    )}
                  </div>

                  {/* Desktop nav - keeping original */}
                  <div className="hidden sm:ml-6 sm:flex sm:space-x-8 justify-center w-full">
                    <Link
                      href="/"
                      className={classNames(
                        "cursor-pointer inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900",
                        route === "/" ? "border-b-2 border-indigo-500" : ""
                      )}
                    >
                      <span className="cursor-pointer">Dashboard</span>
                    </Link>
                    <Link
                      href="/about-project"
                      className={classNames(
                        "cursor-pointer inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900",
                        route === "/about-project"
                          ? "border-b-2 border-indigo-500"
                          : ""
                      )}
                    >
                      About Project
                    </Link>
                    <Link
                      href="/about-me"
                      className={classNames(
                        "cursor-pointer inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900",
                        route === "/about-me"
                          ? "border-b-2 border-indigo-500"
                          : ""
                      )}
                    >
                      About Me
                    </Link>
                    <Link
                      href="/settings"
                      className={classNames(
                        "cursor-pointer inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900",
                        route === "/settings"
                          ? "border-b-2 border-indigo-500"
                          : ""
                      )}
                    >
                      Settings
                    </Link>
                    {canShowHideButton && (
                      <button
                        onClick={() => setIsOpen(false)}
                        className="border rounded-lg h-fit my-auto cursor-pointer inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100"
                      >
                        Hide Navbar
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile menu panel */}
            {/* Mobile menu panel */}
            <Disclosure.Panel className="sm:hidden">
              {({ close }) => (
                <div className="space-y-1 px-2 pb-3 pt-2">
                  <Link
                    href="/"
                    onClick={() => close()}
                    className={classNames(
                      "block px-3 py-2 rounded-md text-base font-medium",
                      route === "/"
                        ? "bg-gray-50 text-gray-900"
                        : "text-gray-600 hover:bg-gray-50"
                    )}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/about-project"
                    onClick={() => close()}
                    className={classNames(
                      "block px-3 py-2 rounded-md text-base font-medium",
                      route === "/about-project"
                        ? "bg-gray-50 text-gray-900"
                        : "text-gray-600 hover:bg-gray-50"
                    )}
                  >
                    About Project
                  </Link>
                  <Link
                    href="/about-me"
                    onClick={() => close()}
                    className={classNames(
                      "block px-3 py-2 rounded-md text-base font-medium",
                      route === "/about-me"
                        ? "bg-gray-50 text-gray-900"
                        : "text-gray-600 hover:bg-gray-50"
                    )}
                  >
                    About Me
                  </Link>
                  <Link
                    href="/settings"
                    onClick={() => close()}
                    className={classNames(
                      "block px-3 py-2 rounded-md text-base font-medium",
                      route === "/settings"
                        ? "bg-gray-50 text-gray-900"
                        : "text-gray-600 hover:bg-gray-50"
                    )}
                  >
                    Settings
                  </Link>
                </div>
              )}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    );
  } else {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-2 left-1/2 -translate-x-1/2 cursor-pointer inline-flex items-center px-3 py-1 text-xs font-medium text-gray-600 hover:bg-gray-100 border rounded-md shadow-sm z-[100]"
      >
        Show Nav
      </button>
    );
  }
}
