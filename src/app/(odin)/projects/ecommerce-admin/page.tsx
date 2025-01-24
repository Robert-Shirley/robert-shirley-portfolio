import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/lib/db/db";
import { product, productCategory } from "@/schema";
import { and, eq, lte, sql } from "drizzle-orm";
import { Folders, Package2 } from "lucide-react";

import Link from "next/link";

async function getStats() {
  return db.transaction(async (tx) => {
    const categoriesCount = await tx
      .select({ count: sql<number>`count(*)` })
      .from(productCategory)
      .where(eq(productCategory.deleted, false));

    const navCategoriesCount = await tx
      .select({ count: sql<number>`count(*)` })
      .from(productCategory)
      .where(
        and(
          eq(productCategory.deleted, false),
          eq(productCategory.includeInNav, true)
        )
      );

    const productsCount = await tx
      .select({ count: sql<number>`count(*)` })
      .from(product)
      .where(eq(product.deleted, false));

    // Assuming inventoryCount is numeric and low stock is < 10
    const lowStockCount = await tx
      .select({ count: sql<number>`count(*)` })
      .from(product)
      .where(
        and(
          eq(product.deleted, false),
          lte(sql<number>`cast(${product.inventoryCount} as integer)`, 10)
        )
      );

    return {
      categories: categoriesCount[0].count,
      navCategories: navCategoriesCount[0].count,
      products: productsCount[0].count,
      lowStock: lowStockCount[0].count,
    };
  });
}

// ... other imports remain the same

const AdminDashboard = async () => {
  const stats = await getStats();

  return (
    <div className="p-8">
      <div className="max-w-7xl">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="mt-2 text-slate-600">
            Manage your products and categories
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Categories Card */}
          <Link href="/projects/ecommerce-admin/categories">
            <Card className="group cursor-pointer transition-all hover:shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-semibold">
                    Categories
                  </CardTitle>
                  <Folders className="h-6 w-6 text-slate-600 transition-transform group-hover:scale-110" />
                </div>
                <CardDescription>
                  Manage product categories and collections
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm text-slate-600">
                    <span>Total Categories</span>
                    <span className="font-medium">{stats.categories}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-slate-600">
                    <span>Active in Navigation</span>
                    <span className="font-medium">{stats.navCategories}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Products Card */}
          <Link href="/projects/ecommerce-admin/products">
            <Card className="group cursor-pointer transition-all hover:shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-semibold">
                    Products
                  </CardTitle>
                  <Package2 className="h-6 w-6 text-slate-600 transition-transform group-hover:scale-110" />
                </div>
                <CardDescription>
                  Manage your product inventory and details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm text-slate-600">
                    <span>Total Products</span>
                    <span className="font-medium">{stats.products}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-slate-600">
                    <span>Low Stock Items</span>
                    <span className="font-medium">{stats.lowStock}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
