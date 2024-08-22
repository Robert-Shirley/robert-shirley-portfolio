import classNames from "@/functions/classNames";
import { Disclosure } from "@headlessui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";

export default function Navbar() {
  const router = useRouter();

  const route = useMemo(() => {
    return router.pathname;
  }, [router.pathname]);

  const [isOpen, setIsOpen] = useState(true);

  const canShowHideButton = useMemo(() => {
    if (route.includes("/projects")) {
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
        <div className="mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex h-16 justify-between w-full">
            <div className="flex w-full">
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8 justify-center w-full">
                {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                <Link
                  href="/"
                  className={classNames(
                    "cursor-pointer inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900",

                    route === "/" ? "border-b-2 border-indigo-500" : ""
                  )}
                >
                  <span className="cursor-pointer"> Dashboard</span>
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
                    route === "/about-me" ? "border-b-2 border-indigo-500" : ""
                  )}
                >
                  About Me
                </Link>
                <Link
                  href="/settings"
                  className={classNames(
                    "cursor-pointer inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900",
                    route === "/settings" ? "border-b-2 border-indigo-500" : ""
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
      </Disclosure>
    );
  } else {
    //show a small button with an absolute position to show the navbar
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed inset-0 mx-auto h-fit w-fit cursor-pointer inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 border rounded-lg"
        style={{ zIndex: 1 }} // Ensure it's on top of everything else
      >
        Show Navbar
      </button>
    );
  }
}
