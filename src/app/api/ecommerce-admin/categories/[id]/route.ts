// app/api/categories/[id]/route.ts
import { db } from "@/lib/db/db";
import { productCategory } from "@/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const category = await db.query.productCategory.findFirst({
      where: eq(productCategory.id, params.id),
    });

    if (!category) {
      return new NextResponse("Category not found", { status: 404 });
    }

    return NextResponse.json(category);
  } catch (error) {
    console.error("[CATEGORY_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
