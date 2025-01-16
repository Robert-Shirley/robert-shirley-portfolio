// pages/projects/ecommerce/[category].tsx
import Layout from "@/components/Ecommerce/Layout";
import {
  electronics,
  jewelry,
  mensClothing,
  womenClothing,
} from "@/data/products";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo } from "react";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

type CartItem = Product & {
  quantity: number;
};

export default function CategoryPage() {
  const router = useRouter();
  const { category } = router.query;

  const products = useMemo(() => {
    if (!category) return [];

    let data = [] as Product[];
    if (category === "clothing") {
      // Combine men's and women's clothing
      data = [...mensClothing, ...womenClothing].slice(0, 8);
    } else if (category === "jewelry") {
      data = jewelry.slice(0, 8);
    } else if (category === "electronics") {
      data = electronics.slice(0, 8);
    }

    return data as Product[];
  }, [category]);

  if (
    !category ||
    !["clothing", "jewelry", "electronics"].includes(category as string)
  ) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 px-4 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-900">
              Category not found
            </h1>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <nav className="mb-8">
            <ol className="flex items-center space-x-2 text-sm text-gray-500">
              <li>
                <Link
                  href="/projects/ecommerce"
                  className="hover:text-emerald-600"
                >
                  Shop
                </Link>
              </li>
              <li>→</li>
              <li>
                <Link
                  href={`/projects/ecommerce/${category}`}
                  className="hover:text-emerald-600 capitalize"
                >
                  {category}
                </Link>
              </li>
            </ol>
          </nav>
          <h1 className="text-3xl font-semibold text-gray-900 mb-8 capitalize">
            {category} Collection
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex flex-col"
              >
                <Link
                  href={`/projects/ecommerce/${category}/${product.id}`}
                  className="group"
                >
                  <div className="relative h-64 mb-4 z-0">
                    <Image
                      src={product.image}
                      alt={product.title}
                      width={256}
                      height={256}
                      className="group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                  <h2 className="text-lg font-medium text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600">
                    {product.title}
                  </h2>
                  <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-3">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-lg font-semibold text-gray-900">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className="text-emerald-600 font-medium">
                      View Details →
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {products.length === 0 && (
            <div className="text-center text-gray-600">
              No products found in this category.
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
