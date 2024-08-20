import classNames from "@/functions/classNames";
import { useRouter } from "next/router";
import { useMemo } from "react";
import Navbar from "./Navbar";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();

  const route = useMemo(() => {
    return router.pathname;
  }, [router.pathname]);

  const alternateLayouts = ["/projects/landing-page"];

  return (
    <div>
      <Navbar />
      <div
        className={classNames(
          "bg-gray-100 min-h-screen h-fit  text-gray-800",
          !alternateLayouts.includes(route) && "p-6 xl:p-24"
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default Layout;
