"use client";

import { useFetchData } from "@/hooks/useFetchData";
import Image from "next/image";
import { useMemo } from "react";

const AdminDashboard: React.FC = () => {
  const { data, isLoading, error } = useFetchData(
    "/api/ecommerce/category",
    ["categories"],
    "GET"
  );

  const categories = useMemo(() => {
    const categoryData = data as any[];
    return (categoryData || []).map((category: any) => ({
      id: category.id,
      name: category.name,
      imageUrl: category.imageUrl,
      description: category.description,
      slug: category.slug,
      includeInNav: category.includeInNav,
    }));
  }, [data]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-12">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-12">
        <div className="text-center">
          Failed to fetch data
          {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-900">Categories</h1>
          <button
            onClick={() => {
              // Open modal or navigate to category creation form
              console.log("Add Category");
            }}
            className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Add Category
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex flex-col items-center hover:shadow-md transition-shadow"
            >
              {/* Image Section */}
              <div className="flex flex-col items-center h-full">
                <div className="border h-fit w-fit rounded-lg overflow-hidden">
                  <Image
                    src={category.imageUrl}
                    alt={category.name}
                    width={160}
                    height={160}
                    quality={90}
                    className="object-cover"
                  />
                </div>

                {/* Category Info */}
                <div className="mt-4 text-left flex flex-col gap-4">
                  <h2 className="text-lg font-semibold text-gray-900 truncate">
                    Name: {category.name}
                  </h2>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    Description:{" "}
                    {category.description || "No description provided."}
                  </p>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    Slug: {category.slug || "No slug provided."}
                  </p>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    Show In Navbar: {category.includeInNav ? "Yes" : "No"}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between w-fit pt-4 mt-auto mb-4">
                  <button
                    onClick={() => {
                      console.log(`View Products: ${category.id}`);
                    }}
                    className="flex-grow text-center mx-1 px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    Products
                  </button>
                  <button
                    onClick={() => {
                      console.log(`Edit Category: ${category.id}`);
                    }}
                    className="flex-grow text-center mx-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      console.log(`Delete Category: ${category.id}`);
                    }}
                    className="flex-grow text-center mx-1 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
