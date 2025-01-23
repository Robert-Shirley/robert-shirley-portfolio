// app/admin/products/page.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { db } from "@/lib/db/db";
import { product } from "@/schema";
import { eq } from "drizzle-orm";
import { Plus } from "lucide-react";
import Link from "next/link";

async function getProducts() {
  return db.query.product.findMany({
    where: eq(product.deleted, false),
    orderBy: (products, { desc }) => [desc(products.createdAt)],
    with: {
      category: true,
    },
  });
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="p-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Products</h1>
            <p className="mt-2 text-slate-600">Manage your product inventory</p>
          </div>
          <Button asChild>
            <Link href="/projects/ecommerce-admin/products/new">
              <Plus className="mr-2 h-4 w-4" />
              New Product
            </Link>
          </Button>
        </div>

        <div className="grid gap-4">
          {products.map((product) => (
            <Card
              key={product.id}
              className="hover:shadow-md transition-shadow"
            >
              <CardContent className="flex items-center justify-between p-6">
                <div className="flex items-center gap-4">
                  {product.imageUrl && (
                    <img
                      src={product.imageUrl}
                      alt={product.name ?? "Product image"}
                      className="h-16 w-16 object-cover rounded"
                    />
                  )}
                  <div>
                    <h3 className="font-medium text-lg text-slate-900">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-slate-600">
                        {product.category?.name}
                      </span>
                      <span className="text-sm text-slate-600">•</span>
                      <span className="text-sm text-slate-600">
                        ${product.price}
                      </span>
                      <span className="text-sm text-slate-600">•</span>
                      <span className="text-sm text-slate-600">
                        Stock: {product.inventoryCount}
                      </span>
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link
                    href={`/projects/ecommerce-admin/products/${product.id}`}
                  >
                    Edit
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}

          {products.length === 0 && (
            <Card>
              <CardContent className="p-6 text-center text-slate-600">
                No products found. Create your first product to get started.
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
