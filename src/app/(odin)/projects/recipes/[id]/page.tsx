import Card from "@/components/shared/Card";
import { recipes as recipesData } from "@/data/recipes";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

// Type for recipe
type Recipe = {
  id: number;
  name: string;
  description: string;
  image: string;
  ingredients: string[];
  directions: string[];
};

// Generate static params at build time
export async function generateStaticParams() {
  return recipesData.map((recipe) => ({
    id: recipe.id.toString(),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const recipe = recipesData.find(
    (recipe) => recipe.id.toString() === resolvedParams.id
  );

  return {
    title: recipe ? `${recipe.name} Recipe` : "Recipe Not Found",
    description: recipe?.description || "Recipe details",
  };
}

export default async function RecipePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const recipe = recipesData.find(
    (recipe) => recipe.id.toString() === resolvedParams.id
  );

  if (!recipe) {
    notFound();
  }
  return (
    <Card>
      <div className="flex w-full justify-start">
        <Link href="/projects/recipes">
          <div className="flex gap-2 items-center h-fit">
            <ArrowLeftCircleIcon className="w-6 h-6 text-gray-600" />
            <span className="text-xl font-bold text-gray-600">
              Go Back to Recipes
            </span>
          </div>
        </Link>
      </div>
      <div className="flex flex-col gap-2 justify-center items-center h-full">
        <div className="relative w-48 h-32 xl:w-96 xl:h-64">
          <Image
            src={recipe.image}
            alt={recipe.name}
            fill
            className="object-cover rounded-lg"
          />
          <div className="absolute inset-0 rounded-lg border-2 border-gray-200 pointer-events-none" />
        </div>
      </div>
      <h1 className="text-4xl font-bold">{recipe.name}</h1>
      <p className="mt-4">{recipe.description}</p>
      <ul className="mt-4">
        <h2 className="text-2xl font-semibold">Ingredients:</h2>
        {recipe.ingredients.map((ingredient: string, index: number) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <ol className="mt-4">
        <h2 className="text-2xl font-semibold">Directions:</h2>
        {recipe.directions.map((direction: string, index: number) => (
          <li key={index}>{direction}</li>
        ))}
      </ol>
    </Card>
  );
}
