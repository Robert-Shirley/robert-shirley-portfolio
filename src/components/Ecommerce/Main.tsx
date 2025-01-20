"use client";

import { useFetchData } from "@/hooks/useFetchData";
import Image from "next/image";
import Link from "next/link";
import React, { useMemo } from "react";

type MainImageProps = {
  title: string;
  imageUrl: string;
  description: string;
  route: string;
};

const MainImage: React.FC<MainImageProps> = ({
  title,
  imageUrl,
  description,
  route,
}) => {
  return (
    <Link href={route} className="block">
      <div className="flex flex-col items-center">
        <h2 className="text-xl text-black font-semibold text-center pb-2">
          {title}
        </h2>
        <div className="border h-fit w-fit rounded-lg overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            width={160}
            height={160}
            quality={90}
          />
        </div>

        <p className="max-w-36 text-center text-xs text-gray-500 mt-2">
          {description}
        </p>
      </div>
    </Link>
  );
};

const Main: React.FC = () => {
  const { data, isLoading, error } = useFetchData(
    "/api/ecommerce/category",
    ["categories"],
    "GET"
  );

  const routes = useMemo(() => {
    const categories = data as {
      id: string;
      slug: string;
      name: string;
      image: string;
      description: string;
      imageUrl: string;
    }[];

    if (categories) {
      return categories.map((category) => ({
        id: category.id,
        title: category.name,
        imageUrl: category.imageUrl,
        description: category.description,
        route: `/projects/ecommerce/${category.slug.toLowerCase()}`,
      }));
    }

    return [];
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
    <div className="min-h-96 h-fit bg-white flex text-gray-700 lg:px-48 py-12 w-full justify-center">
      <div className="w-full flex flex-col items-center">
        <h1 className="text-center text-black text-3xl">Explore Our Stores</h1>
        <div className="w-full flex flex-col xl:flex-row items-center xl:justify-evenly mt-8 gap-8 xl:gap-4">
          {routes.map((route) => (
            <MainImage key={route.id} {...route} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Main;
