"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { use } from "react";

export default function Page({ params }) {
  // Używamy React.use do rozpakowania params.id
  const { id } = use(params);

  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedRecipes = JSON.parse(localStorage.getItem("userRecipes")) || [];
        const userRecipe = storedRecipes.find((recipe) => recipe.id === id);

        if (userRecipe) {
          setRecipe(userRecipe);
        } else {
          const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
          if (!res.ok) {
            throw new Error("Failed to fetch data");
          }
          const data = await res.json();
          if (data?.meals?.[0]) {
            setRecipe(data.meals[0]);
          } else {
            setError(true);
          }
        }
      } catch (err) {
        console.error(err);
        setError(true);
      }
    };

    fetchData();
  }, [id]);

  if (error) {
    return (
      <div className="container mx-auto my-20">
        <p className="text-center text-gray-500 dark:text-gray-300">
          Recipe not found.
        </p>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="container mx-auto my-20">
        <p className="text-center text-gray-500 dark:text-gray-300">
          Loading...
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto my-20">
      <div className="flex border-2 border-gray-300 dark:border-gray-600 p-4 bg-white dark:bg-gray-900 rounded-lg">
        {/* Obraz */}
        <div className="relative w-[50%] h-[500px] mr-8">
          <Image
            src={recipe.image || recipe.strMealThumb || "/placeholder-image.jpg"}
            alt={recipe.name || recipe.strMeal || "Meal Image"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="rounded-lg object-cover"
          />
        </div>

        {/* Informacje o przepisie */}
        <div className="w-[50%] text-gray-700 dark:text-gray-300">
          <h1 className="text-2xl font-bold text-center mb-4">
            {recipe.name || recipe.strMeal || "No Name Available"}
          </h1>

          {/* Składniki */}
          <div className="bg-white dark:bg-gray-800 p-4 mb-4 border border-gray-300 dark:border-gray-600 rounded">
            <h2 className="text-xl font-semibold mb-2">Ingredients:</h2>
            {recipe.ingredients ? (
              <ul className="list-disc pl-6">
                {recipe.ingredients.split(",").map((ingredient, index) => (
                  <li key={index}>{ingredient.trim()}</li>
                ))}
              </ul>
            ) : (
              <ul className="list-disc pl-6">
                {Array.from({ length: 20 }, (_, i) => recipe[`strIngredient${i + 1}`])
                  .filter(Boolean)
                  .map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
              </ul>
            )}
          </div>

          {/* Kroki */}
          <div className="bg-white dark:bg-gray-800 p-4 mb-4 border border-gray-300 dark:border-gray-600 rounded">
            <h2 className="text-xl font-semibold mb-2">Steps:</h2>
            {recipe.steps ? (
              <ol className="list-decimal pl-4">
                {recipe.steps.split("\n").map((step, index) => (
                  <li key={index} className="mb-2">
                    {step.trim()}
                  </li>
                ))}
              </ol>
            ) : recipe.strInstructions ? (
              <ol className="list-decimal pl-4">
                {recipe.strInstructions.split("\r\n").map((step, index) => (
                  <li key={index} className="mb-2">
                    {step.trim()}
                  </li>
                ))}
              </ol>
            ) : (
              <p>No steps available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}