import { db } from "@/lib/db/db";
import { productCategory } from "@/schema";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const categorySlug = searchParams.get("category");

    let categories;

    if (categorySlug) {
      // Query for specific category
      categories = await db
        .select({
          id: productCategory.id,
          name: productCategory.name,
          slug: productCategory.slug,
          imageUrl: productCategory.imageUrl,
          description: productCategory.description,
        })
        .from(productCategory)
        .where(
          and(
            eq(productCategory.slug, categorySlug),
            eq(productCategory.deleted, false)
          )
        );
    } else {
      // Query all categories
      categories = await db
        .select({
          id: productCategory.id,
          name: productCategory.name,
          slug: productCategory.slug,
          imageUrl: productCategory.imageUrl,
          description: productCategory.description,
          includeInNav: productCategory.includeInNav,
        })
        .from(productCategory);
    }

    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}
