// pages/projects/ecommerce/[category].tsx
import Layout from "@/components/Ecommerce/Layout";
import useLocalStorage from "@/hooks/useLocalStorage";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

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
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useLocalStorage<CartItem[]>("cart", []);

  useEffect(() => {
    const fetchProducts = async () => {
      if (category) {
        try {
          setLoading(true);
          let data = [];

          if (category === "clothing") {
            // Fetch both men's and women's clothing
            const [mensRes, womensRes] = await Promise.all([
              fetch(
                "https://fakestoreapi.com/products/category/men's clothing"
              ),
              fetch(
                "https://fakestoreapi.com/products/category/women's clothing"
              ),
            ]);
            const [mensData, womensData] = await Promise.all([
              mensRes.json(),
              womensRes.json(),
            ]);
            data = [...mensData, ...womensData].slice(0, 8); // Limit to 8 items
          } else {
            // For jewelry and electronics
            const apiCategory =
              category === "jewelry" ? "jewelery" : "electronics";
            const response = await fetch(
              `https://fakestoreapi.com/products/category/${apiCategory}?limit=8`
            );
            data = await response.json();
          }

          setProducts(data);
        } catch (error) {
          console.error("Error fetching products:", error);
          toast.error("Failed to load products");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProducts();
  }, [category]);

  const addToCart = (product: Product) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.id === product.id);

      if (existingItem) {
        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentCart, { ...product, quantity: 1 }];
    });

    toast.success("Added to cart!");
  };

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

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading products...</p>
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
                    <img
                      src={product.image}
                      alt={product.title}
                      className="absolute inset-0 w-full h-full object-contain group-hover:scale-105 transition-transform duration-200"
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
