import { db } from "@/lib/db/db";
import { productCategory } from "@/schema";
import { eq } from "drizzle-orm";

import { Button } from "@/components/SignUpForm/Button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "../../../../../../components/ui/card";

async function getCategories() {
  return db.query.productCategory.findMany({
    where: eq(productCategory.deleted, false),
    orderBy: (categories, { desc }) => [desc(categories.createdAt)],
  });
}

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="p-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Categories</h1>
            <p className="mt-2 text-slate-600">
              Manage your product categories and collections
            </p>
          </div>
          <Button asChild>
            <Link href="/projects/ecommerce-admin/categories/new">
              <Plus className="mr-2 h-4 w-4" />
              New Category
            </Link>
          </Button>
        </div>

        <div className="grid gap-4">
          {categories.map((category) => (
            <Card
              key={category.id}
              className="hover:shadow-md transition-shadow"
            >
              <CardContent className="flex items-center justify-between p-6">
                <div>
                  <h3 className="font-medium text-lg text-slate-900">
                    {category.name}
                  </h3>
                  {category.description && (
                    <p className="text-sm text-slate-600 mt-1">
                      {category.description}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {category.includeInNav && (
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      In Navigation Menu
                    </span>
                  )}
                  <Button variant="outline" size="sm" asChild>
                    <Link
                      href={`/projects/ecommerce-admin/categories/${category.id}`}
                    >
                      Edit
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {categories.length === 0 && (
            <Card>
              <CardContent className="p-6 text-center text-slate-600">
                No categories found. Create your first category to get started.
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
