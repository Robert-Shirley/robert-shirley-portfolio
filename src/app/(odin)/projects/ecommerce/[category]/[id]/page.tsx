"use client";

import Layout from "@/components/Ecommerce/Layout";
import { useCart } from "@/context/CartContext";
import { getInventoryMessage } from "@/functions/getInventoryMessgage";
import { useToast } from "@/hooks/use-toast";
import { useFetchData } from "@/hooks/useFetchData";
import { Product } from "@/types/Ecommerce";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";

export default function ProductPage() {
  const params = useParams();
  const category = params?.category as string;
  const id = params?.id as string;
  const { setCart, setIsOpen } = useCart();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);

  // Fetch main product
  const { data: productQuery, isLoading } = useFetchData(
    id ? `/api/ecommerce/product?id=${id}` : "",
    [id]
  );

  // Fetch similar products in the same category
  const { data: similarProductsQuery } = useFetchData(
    category ? `/api/ecommerce/product?category=${category}` : "",
    [category]
  );

  const product = useMemo(() => {
    if (!productQuery) return null;
    return productQuery as Product;
  }, [productQuery]);

  const similarProducts = useMemo(() => {
    if (!similarProductsQuery) return [];
    const similar = similarProductsQuery as Product[];
    if (similar.length < 4) return similar;

    // Shuffle and slice the array to get 4 random products
    const shuffled = [...similar].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 4) as Product[];
  }, [similarProductsQuery]);

  const addToCart = (product: Product) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.id === product.id);

      if (existingItem) {
        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...currentCart, { ...product, quantity }];
    });

    toast({
      title: "Added to cart",
      description: `${quantity} ${product.name}(s) added to cart successfully`,
    });

    setQuantity(1);
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 px-4 py-12">
          <div className="text-center">Loading...</div>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 px-4 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-900">
              Product not found
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
          {/* Breadcrumbs */}
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
              <li>→</li>
              <li className="text-gray-900 font-medium line-clamp-1">
                {product?.name}
              </li>
            </ol>
          </nav>

          {/* Product details */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Product image */}
              <div className="aspect-square bg-white rounded-lg p-8">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  width={500}
                  height={500}
                  className="w-full h-full object-contain"
                  priority={true}
                />
              </div>

              {/* Product info */}
              <div className="flex flex-col">
                <h1 className="text-3xl font-semibold text-gray-900 mb-4">
                  {product.name}
                </h1>

                <div className="flex items-center mb-6">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.round(+(product?.ratings?.rate || 0) || 0)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">
                    {+(product?.ratings?.count || 0)}
                  </span>
                </div>

                <p className="text-2xl font-bold text-gray-900 mb-6">
                  ${(+product.price).toFixed(2)}
                </p>

                <p className="text-gray-600 mb-8">{product.description}</p>

                {getInventoryMessage(+product.inventoryCount)}

                {+product.inventoryCount > 0 && (
                  <div className="flex items-center space-x-4 mb-6">
                    <label htmlFor="quantity" className="text-sm font-medium">
                      Quantity:
                    </label>

                    <div className="flex items-center border rounded-lg">
                      {quantity > 0 && (
                        <button
                          onClick={() =>
                            setQuantity(
                              Math.max(
                                1,
                                Math.min(+product.inventoryCount, quantity - 1)
                              )
                            )
                          }
                          className="px-3 py-1 hover:bg-gray-100"
                        >
                          −
                        </button>
                      )}
                      <span className="px-3 py-1">{quantity}</span>
                      <button
                        onClick={() =>
                          setQuantity(
                            Math.max(
                              1,
                              Math.min(+product.inventoryCount, quantity + 1)
                            )
                          )
                        }
                        className="px-3 py-1 hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                  </div>
                )}
                <button
                  onClick={() => {
                    addToCart(product);
                    setIsOpen(true);
                  }}
                  className={`bg-emerald-600 text-white px-8 py-3 rounded-lg hover:bg-emerald-700 transition-colors w-full sm:w-auto ${
                    +product.inventoryCount === 0
                      ? "bg-gray-400 cursor-not-allowed hover:bg-gray-400"
                      : ""
                  }`}
                  disabled={+product.inventoryCount === 0}
                >
                  {+product.inventoryCount === 0
                    ? "Out of Stock"
                    : "Add to Cart"}
                </button>
              </div>
            </div>
          </div>

          {/* Similar Products */}
          <div className="mt-16">
            <h2 className="text-2xl font-semibold text-gray-900 mb-8">
              Similar Products
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarProducts.map((similar) => (
                <Link
                  key={similar.id}
                  href={`/projects/ecommerce/${category}/${similar.id}`}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex flex-col group"
                >
                  <div className="relative h-48 mb-4">
                    <Image
                      src={similar.imageUrl}
                      alt={similar.name}
                      width={300}
                      height={300}
                      className="absolute inset-0 w-full h-full object-contain group-hover:scale-105 transition-transform duration-200"
                      priority={true}
                    />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600">
                    {similar.name}
                  </h3>
                  <span className="text-lg font-semibold text-gray-900 mt-auto">
                    ${(+similar.price).toFixed(2)}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mt-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-semibold text-gray-900">
                Customer Reviews
              </h2>
              <button
                onClick={() =>
                  toast({
                    title: "This would open a review form in a real app!",
                  })
                }
                className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Write a Review
              </button>
            </div>

            {/* Review Stats */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-gray-900">
                      {product?.ratings?.rate}
                    </div>
                    <div className="flex items-center justify-center my-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.round(Number(product?.ratings?.rate || 0))
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="text-sm text-gray-500">
                      {product.ratings?.count} reviews
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((rating) => {
                    const percentage = Math.round(Math.random() * 100);
                    return (
                      <div key={rating} className="flex items-center">
                        <div className="flex items-center w-24">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < rating
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full mx-4">
                          <div
                            className="h-2 bg-yellow-400 rounded-full"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-500 w-12">
                          {percentage}%
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Individual Reviews */}
            <div className="space-y-6">
              {[...Array(3)].map((_, i) => {
                const randomRating = Math.floor(Math.random() * 3) + 3;
                const randomDays = Math.floor(Math.random() * 30) + 1;

                return (
                  <div
                    key={i}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                          <span className="text-emerald-600 font-semibold">
                            {["JD", "AK", "ML", "RW", "BP"][i % 5]}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            {
                              [
                                "John Doe",
                                "Alice King",
                                "Mike Lee",
                                "Rachel West",
                                "Bob Parker",
                              ][i % 5]
                            }
                          </div>
                          <div className="text-sm text-gray-500">
                            {randomDays} days ago
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, starIndex) => (
                          <Star
                            key={starIndex}
                            className={`w-5 h-5 ${
                              starIndex < randomRating
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <h3 className="font-medium text-gray-900 mb-2">
                      {
                        [
                          "Great product, highly recommend!",
                          "Exactly what I was looking for",
                          "Good quality for the price",
                        ][i % 3]
                      }
                    </h3>
                    <p className="text-gray-600">
                      {
                        [
                          "This exceeded my expectations. The quality is outstanding and it arrived quickly. Would definitely purchase again!",
                          "Perfect fit and great material. Shipping was fast and the packaging was excellent. Very satisfied with this purchase.",
                          "Really happy with this product. It looks exactly like the pictures and the quality is exactly what I was hoping for.",
                        ][i % 3]
                      }
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Show More Reviews Button */}
            <div className="mt-8 text-center">
              <button
                onClick={() =>
                  toast({
                    title: "This would load more reviews in a real app!",
                  })
                }
                className="text-emerald-600 font-medium hover:text-emerald-700 transition-colors"
              >
                Show More Reviews →
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
