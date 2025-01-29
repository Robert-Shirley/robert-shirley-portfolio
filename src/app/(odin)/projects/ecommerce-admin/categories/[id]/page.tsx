import { db } from "@/lib/db/db";
import { productCategory } from "@/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { CategoryForm } from "../_components/category-form";

type Params = {
  params: Promise<{ id: string }>;
};

async function getCategory(id: string) {
  if (id === "new") return null;

  const category = await db.query.productCategory.findFirst({
    where: eq(productCategory.id, id),
  });

  if (!category) notFound();

  return {
    id: category.id,
    name: category.name ?? "",
    description: category.description,
    includeInNav: category.includeInNav ?? false,
    imageUrl: category.imageUrl,
  };
}

export default async function CategoryEditPage({ params }: Params) {
  const { id } = await params;
  const category = await getCategory(id);
  const title = category ? "Edit Category" : "New Category";

  return (
    <div className="p-8 w-full flex flex-col items-center">
      <h1 className="text-3xl font-bold text-slate-900 mb-8 text-left">
        {title}
      </h1>

      <CategoryForm initialData={category} />
    </div>
  );
}
