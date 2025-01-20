"use client";

import Card from "@/components/shared/Card";
import { recipes as recipesData } from "@/data/recipes";
import { Recipe } from "@/types/Recipe";
import Image from "next/image";
import Link from "next/link";

const Recipes = () => {
  const recipes = recipesData as Recipe[];

  return (
    <div>
      <div className="py-6 mb-2 bg-white rounded-lg">
        <h1 className="text-4xl font-bold text-center">Recipes</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {recipes &&
          recipes.map((recipe) => (
            <Card key={recipe.id}>
              <div className="flex flex-col gap-2 justify-center items-center h-full">
                <div className="relative w-48 h-32 lg:w-64 lg:h-48 sm:w-80 sm:h-64 2xl:w-80 2xl:h-64">
                  <Image
                    src={recipe.image}
                    alt={recipe.name}
                    fill
                    className="object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 rounded-lg border-2 border-gray-200 pointer-events-none" />
                </div>
                <Link
                  href={`/projects/recipes/${recipe.id}`}
                  className="text-2xl font-bold mt-4"
                >
                  {recipe.name}
                </Link>
                <p className="mt-2">{recipe.description}</p>
              </div>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default Recipes;
