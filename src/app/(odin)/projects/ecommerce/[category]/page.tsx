"use client";

import Layout from "@/components/Ecommerce/Layout";
import { useFetchData } from "@/hooks/useFetchData";
import { Product } from "@/types/Ecommerce";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo } from "react";

export function getInventoryMessage(inventoryCount: number) {
  if (inventoryCount === 0) {
    return (
      <span className="text-sm text-red-600 font-medium">Out of stock</span>
    );
  }
  if (inventoryCount <= 20) {
    return (
      <span className="text-sm text-yellow-600 font-medium">
        Order now! Only {inventoryCount} left!
      </span>
    );
  }
  return <span className="text-sm text-gray-500 font-medium">In stock</span>;
}

export default function CategoryPage() {
  const params = useParams();
  const category = params?.category as string;

  // Fetch data only when category exists
  const { data, isLoading, error } = useFetchData(
    category ? `/api/ecommerce/product?category=${category}` : "", // Add null check
    [category] // Simplify cache key
  );

  const products = useMemo(() => {
    if (!data) return [];
    return data as Product[];
  }, [data]);

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 px-4 py-12">
          <div className="text-center">Loading...</div>
        </div>
      </Layout>
    );
  }

  if (error || !category) {
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

          {products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex flex-col"
                >
                  <Link
                    href={`/projects/ecommerce/${category}/${product.id}`}
                    className="group flex flex-col h-full"
                  >
                    <div className="relative h-48 w-full mb-4">
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        className="object-contain group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                    <div className="mt-auto mb-0">
                      <h2 className="text-lg font-medium text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600">
                        {product.name}
                      </h2>
                      <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-3">
                        {product.description}
                      </p>
                      {getInventoryMessage(+product.inventoryCount)}

                      <div className="flex items-center justify-between mt-auto">
                        <span className="text-lg font-semibold text-gray-900">
                          ${(+product.price).toFixed(2)}
                        </span>

                        <span className="text-emerald-600 font-medium">
                          View Details →
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-600">
              No products found in this category.
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
