import classNames from "@/functions/classNames";
import { headers } from "next/headers";
import Navbar from "./Navbar";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = async ({ children }: LayoutProps) => {
  // Get pathname from headers
  const headersList = headers();
  const pathname = (await headersList).get("x-invoke-path") || "";

  const alternateLayouts = ["/projects/landing-page", "/projects/admin-page"];

  const shouldRemovePadding =
    alternateLayouts.includes(pathname) ||
    pathname.startsWith("/projects/ecommerce");

  return (
    <div>
      <Navbar />
      <div
        className={classNames(
          "bg-gray-100 min-h-screen h-fit text-gray-800",
          !shouldRemovePadding && "p-6 xl:p-24"
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default Layout;
