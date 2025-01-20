"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

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
      <div>
        <h2 className="text-lg text-black font-semibold">{title}</h2>
        <div className="b h-fit w-fit rounded-lg overflow-hidden">
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
  const routes = [
    {
      title: "Clothing Store",
      imageUrl: "/images/ecommerce/products/71YXzeOuslL._AC_UY879_.jpg", // Men's casual slim fit t-shirt
      description: "Browse our collection of modern clothing and accessories",
      route: "/projects/ecommerce/clothing",
    },
    {
      title: "Jewelry Collection",
      imageUrl:
        "/images/ecommerce/products/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg", // Gold plated necklace
      description: "Explore our curated selection of fine jewelry",
      route: "/projects/ecommerce/jewelry",
    },
    {
      title: "Electronics Hub",
      imageUrl: "/images/ecommerce/products/71kWymZ+c+L._AC_SX679_.jpg", // Samsung gaming monitor
      description: "Discover the latest in consumer electronics",
      route: "/projects/ecommerce/electronics",
    },
  ];

  return (
    <div className="min-h-96 h-fit bg-white flex text-gray-700 lg:px-48 py-12 w-full justify-center">
      <div className="w-full flex flex-col items-center">
        <h1 className="text-center text-black text-3xl">Explore Our Stores</h1>
        <div className="w-full flex flex-col xl:flex-row items-center xl:justify-evenly mt-8 gap-8 xl:gap-4">
          {routes.map((route) => (
            <MainImage key={route.title} {...route} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Main;
