import { db } from "@/lib/db/db";
import { product, productCategory } from "@/schema";
import { and, eq, inArray } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const productId = searchParams.get("id");
    const categorySlug = searchParams.get("category");
    const ids = searchParams.get("ids")?.split(",");
    let result;

    if (ids) {
      result = await db.query.product.findMany({
        where: and(inArray(product.id, ids), eq(product.deleted, false)),
        columns: {
          id: true,
          name: true,
          description: true,
          imageUrl: true,
          price: true,
          inventoryCount: true,
          categoryId: true,
          createdAt: true,
          updatedAt: true,
        },
        with: {
          category: {
            columns: {
              id: true,
              name: true,
              slug: true,
              imageUrl: true,
            },
          },
          ratings: {
            columns: {
              rate: true,
              count: true,
            },
          },
        },
      });
    } else if (productId) {
      // Query specific product by ID
      result = await db.query.product.findFirst({
        where: and(eq(product.id, productId), eq(product.deleted, false)),
        columns: {
          id: true,
          name: true,
          description: true,
          imageUrl: true,
          price: true,
          inventoryCount: true,
          categoryId: true,
          createdAt: true,
          updatedAt: true,
        },
        with: {
          category: {
            columns: {
              id: true,
              name: true,
              slug: true,
              imageUrl: true,
            },
          },
          ratings: {
            columns: {
              rate: true,
              count: true,
            },
          },
        },
      });
    } else if (categorySlug) {
      // Query products by category
      result = await db.query.productCategory.findFirst({
        where: and(
          eq(productCategory.slug, categorySlug),
          eq(productCategory.deleted, false)
        ),
        columns: {
          id: true,
          name: true,
          slug: true,
          description: true,
          imageUrl: true,
        },
        with: {
          products: {
            where: eq(product.deleted, false),
            columns: {
              id: true,
              name: true,
              description: true,
              imageUrl: true,
              price: true,
              inventoryCount: true,
            },
            with: {
              ratings: {
                columns: {
                  rate: true,
                  count: true,
                },
              },
            },
          },
        },
      });

      return NextResponse.json(result?.products ?? []);
    } else {
      // Query all products
      result = await db.query.product.findMany({
        where: eq(product.deleted, false),
        columns: {
          id: true,
          name: true,
          description: true,
          imageUrl: true,
          price: true,
          inventoryCount: true,
          categoryId: true,
          createdAt: true,
          updatedAt: true,
        },
        with: {
          category: {
            columns: {
              id: true,
              name: true,
              slug: true,
              imageUrl: true,
            },
          },
          ratings: {
            columns: {
              rate: true,
              count: true,
            },
          },
        },
      });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
