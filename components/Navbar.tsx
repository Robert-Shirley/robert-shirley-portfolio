import classNames from "@/functions/classNames";
import { Disclosure } from "@headlessui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo } from "react";

export default function Navbar() {
  const router = useRouter();

  const route = useMemo(() => {
    return router.pathname;
  }, [router.pathname]);

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
            </div>
          </div>
        </div>
      </div>
    </Disclosure>
  );
}
