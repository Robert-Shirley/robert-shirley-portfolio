// app/admin/categories/[id]/page.tsx
import { db } from "@/lib/db/db";
import { productCategory } from "@/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { CategoryForm } from "../_components/category-form";

interface CategoryEditPageProps {
  params: {
    id: string;
  };
}

async function getCategory(id: string) {
  if (id === "new") return null;

  const category = await db.query.productCategory.findFirst({
    where: eq(productCategory.id, id),
  });

  if (!category) notFound();

  return {
    id: category.id,
    name: category.name ?? "", // Provide default empty string
    description: category.description,
    includeInNav: category.includeInNav ?? false, // Provide default false
    imageUrl: category.imageUrl,
  };
}

export default async function CategoryEditPage({
  params,
}: CategoryEditPageProps) {
  const category = await getCategory(params.id);
  const title = category ? "Edit Category" : "New Category";

  return (
    <div className="p-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">{title}</h1>
        <CategoryForm initialData={category} />
      </div>
    </div>
  );
}
