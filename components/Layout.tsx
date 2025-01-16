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

  const alternateLayouts = ["/projects/landing-page", "/projects/admin-page"];

  const shouldRemovePadding =
    alternateLayouts.includes(route) || route.startsWith("/projects/ecommerce");

  return (
    <div>
      <Navbar />
      <div
        className={classNames(
          "bg-gray-100 min-h-screen h-fit  text-gray-800",
          !shouldRemovePadding && "p-6 xl:p-24"
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default Layout;
