import { clothing, electronics, jewelry } from "@/data/products";
import { product, productCategory, productRating } from "@/schema";
import { ProductData } from "@/types/Ecommerce";
import { loadEnvConfig } from "@next/env";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

// Types for the product data

const main = async () => {
  // Load environment variables
  const projectDir = process.cwd();
  loadEnvConfig(projectDir);

  const connectionString =
    process.env.DATABASE_URL ??
    "postgresql://postgres:password@localhost:5432/portfolio";
  const client = postgres(connectionString, { prepare: false });
  const db = drizzle(client);

  try {
    console.log("🌱 Starting seeding...");

    // First, clear existing data
    await db.delete(productRating).execute();
    await db.delete(product).execute();
    await db.delete(productCategory).execute();

    console.log("Cleared existing data");

    // Create categories
    const [clothingCat, electronicsCat, jewelryCat] = await Promise.all([
      db
        .insert(productCategory)
        .values({
          slug: "clothing",
          name: "Clothing Store",
          includeInNav: true,
          description:
            "Browse our collection of modern clothing and accessories.",
          imageUrl: "/images/ecommerce/products/71YXzeOuslL._AC_UY879_.jpg",
        })
        .returning(),
      db
        .insert(productCategory)
        .values({
          slug: "electronics",
          name: "Electronics Hub",
          includeInNav: true,
          description: "Discover the latest in electronics and gadgets.",
          imageUrl: "/images/ecommerce/products/71kWymZ+c+L._AC_SX679_.jpg",
        })
        .returning(),
      db
        .insert(productCategory)
        .values({
          slug: "jewelry",
          name: "Jewelry Collection",
          includeInNav: true,
          description: "Explore our curated selection of fine jewelry.",
          imageUrl:
            "/images/ecommerce/products/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg",
        })
        .returning(),
    ]);

    console.log("Created categories", {
      clothingCat,
      electronicsCat,
      jewelryCat,
    });

    // Get the categories from the returned data directly
    const clothingCategory = clothingCat[0];
    const electronicsCategory = electronicsCat[0];
    const jewelryCategory = jewelryCat[0];

    // Insert products with their respective categories
    const insertProducts = async (
      products: ProductData[],
      categoryId: string
    ) => {
      return await Promise.all(
        products.map(async (item) => {
          try {
            // Insert product
            const [insertedProduct] = await db
              .insert(product)
              .values({
                name: item.title,
                imageUrl: item.image,
                description: item.description,
                price: item.price.toString(),
                inventoryCount: item.inventoryCount.toString(),
                categoryId,
              })
              .returning();

            if (insertedProduct && item.rating) {
              // Insert rating
              await db.insert(productRating).values({
                rate: item.rating.rate.toString(),
                count: item.rating.count.toString(),
                productId: insertedProduct.id,
              });
            }
          } catch (error) {
            console.error(`Failed to insert product: ${item.title}`, error);
          }
        })
      );
    };

    // Insert all products and their ratings
    if (clothingCategory) {
      await insertProducts(clothing, clothingCategory.id);
      console.log("Inserted clothing products");
    }

    if (electronicsCategory) {
      await insertProducts(electronics, electronicsCategory.id);
      console.log("Inserted electronics products");
    }

    if (jewelryCategory) {
      await insertProducts(jewelry, jewelryCategory.id);
      console.log("Inserted jewelry products");
    }

    console.log("✅ Seeding completed");
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  } finally {
    await client.end();
  }
};

main().catch((err) => {
  console.error("Failed to seed database:", err);
  process.exit(1);
});
