"use client";

import classNames from "@/functions/classNames";
import { usePathname } from "next/navigation";
import { FC, ReactElement } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../ui/navigation-menu";

const styles = {
  h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
  h2: "scroll-m-20 text-3xl font-bold lg:text-4xl",
  h3: "scroll-m-20 text-2xl font-semibold lg:text-3xl",
  h4: "scroll-m-20 text-xl font-medium lg:text-2xl",
};

export const Wrapper: FC<{ children: ReactElement }> = ({ children }) => {
  const pathName = usePathname();

  return (
    <main className="px-0 py-8 xl:px-8 h-screen w-full flex-1">
      <div className="w-full mx-auto flex flex-col justify-center h-full xl:pl-24">
        <h1 className={styles.h2}>
          {pathName === "/projects/sign-up-form/sign-up"
            ? "Get Started"
            : "Log In"}
        </h1>
        <div className="bg-gray-200 px-2 py-1 rounded-lg w-fit gap-2 flex my-8">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem className="flex h-12 justify-center items-center">
                <NavigationMenuLink
                  className={classNames(
                    "px-4 my-2  rounded-lg py-2 text-center",
                    pathName?.includes("/projects/sign-up-form/sign-up")
                      ? "text-gray-600 mx-2 bg-white min-w-fit xl:w-48 hover:bg-gray-50"
                      : "text-gray-600 mx-2 bg-gray-200 min-w-fit xl:w-48"
                  )}
                  href="/projects/sign-up-form/sign-up"
                >
                  Register
                </NavigationMenuLink>
                <NavigationMenuLink
                  className={classNames(
                    "px-4 my-2  rounded-lg py-2 text-center",
                    pathName === "/projects/sign-up-form/log-in"
                      ? "text-gray-600 mx-2 bg-white min-w-fit xl:w-48 hover:bg-gray-50"
                      : "text-gray-600 mx-2 bg-gray-200 min-w-fit xl:w-48"
                  )}
                  href="/projects/sign-up-form/log-in"
                >
                  Sign in
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="h-2/3 pb-12 w-full">{children}</div>
      </div>
    </main>
  );
};
