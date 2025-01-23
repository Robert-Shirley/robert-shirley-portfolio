"use client";
import Card from "@/components/shared/Card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

interface AdminLayoutProps {
  children: React.ReactNode;
  params: any;
}

interface Breadcrumb {
  href: string;
  label: string;
  isHome: boolean;
  key: string;
}

async function fetchCategoryName(id: string): Promise<string | null> {
  try {
    const response = await fetch(`/api/ecommerce-admin/categories/${id}`);
    if (!response.ok) return null;
    const data = await response.json();
    return data.name;
  } catch (error) {
    console.error("Error fetching category:", error);
    return null;
  }
}

function generateBreadcrumbs(
  pathname: string,
  categoryName: string | null = null
): Breadcrumb[] {
  const paths = pathname.split("/").filter(Boolean);
  const basePath = "/projects/ecommerce-admin";

  // Handle category edit page
  if (paths.includes("categories") && paths.length > 3) {
    return [
      { href: basePath, label: "Dashboard", isHome: true, key: "dashboard" },
      {
        href: `${basePath}/categories`,
        label: "Categories",
        isHome: false,
        key: "categories",
      },
      {
        href: `${basePath}/categories/${paths[paths.length - 1]}`,
        label: categoryName || "Loading...",
        isHome: false,
        key: "category",
      },
    ];
  }

  // Handle category list page
  if (paths.includes("categories")) {
    return [
      { href: basePath, label: "Dashboard", isHome: true, key: "dashboard" },
      {
        href: `${basePath}/categories`,
        label: "Categories",
        isHome: false,
        key: "categories",
      },
    ];
  }

  // Handle products pages (you can add similar logic for product editing later)
  if (paths.includes("products")) {
    return [
      { href: basePath, label: "Dashboard", isHome: true, key: "dashboard" },
      {
        href: `${basePath}/products`,
        label: "Products",
        isHome: false,
        key: "products",
      },
    ];
  }

  // Dashboard
  return [
    { href: basePath, label: "Dashboard", isHome: false, key: "dashboard" },
  ];
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname() ?? "";
  const [categoryName, setCategoryName] = useState<string | null>(null);

  useEffect(() => {
    const paths = pathname.split("/").filter(Boolean);
    if (
      paths.includes("categories") &&
      paths.length > 3 &&
      paths[paths.length - 1] !== "new"
    ) {
      fetchCategoryName(paths[paths.length - 1]).then((name) => {
        setCategoryName(name);
      });
    }
  }, [pathname]);

  const breadcrumbs = generateBreadcrumbs(pathname, categoryName);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="border-b bg-white px-8 py-3">
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={crumb.key}>
                <BreadcrumbItem>
                  {index === breadcrumbs.length - 1 ? (
                    <BreadcrumbPage>
                      {crumb.isHome ? (
                        <Home className="h-4 w-4" />
                      ) : (
                        crumb.label
                      )}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link href={crumb.href}>
                        {crumb.isHome ? (
                          <Home className="h-4 w-4" />
                        ) : (
                          crumb.label
                        )}
                      </Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <main>
        <Card className="p-8 max-w-7xl flex justify-center items-center mx-auto mt-8">
          {children}
        </Card>
      </main>
    </div>
  );
}
