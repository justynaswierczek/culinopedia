"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { use } from "react";

export default function RecipeDetails({ params }) {
  // Użycie React.use() do wyodrębnienia id z params
  const { id } = use(params);

  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Pobranie przepisów użytkownika z localStorage
        const storedRecipes = JSON.parse(localStorage.getItem("userRecipes")) || [];
        const userRecipe = storedRecipes.find((recipe) => recipe.id === id);

        if (userRecipe) {
          setRecipe(userRecipe);
        } else {
          // Pobranie przepisów z API
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

  // Obsługa błędów
  if (error) {
    return (
      <div className="container mx-auto my-20">
        <p className="text-center text-gray-500 dark:text-gray-300">
          Recipe not found.
        </p>
      </div>
    );
  }

  // Obsługa ładowania
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
    <div className="container mx-auto my-20 space-y-12">
      {/* Obraz i składniki */}
      <div className="flex flex-wrap md:flex-nowrap gap-8 items-center">
        {/* Obrazek */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="w-80 h-80 md:w-[450px] md:h-[450px] shadow-lg rounded-lg overflow-hidden relative">
            <Image
              src={recipe.image || recipe.strMealThumb || "/placeholder-image.jpg"}
              alt={recipe.name || recipe.strMeal || "Meal Image"}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* Składniki */}
        <div className="w-full md:w-1/2 bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-[#D5A922]">Ingredients:</h2>
          <ul className="list-none space-y-2">
            {Array.from({ length: 20 }, (_, i) => recipe[`strIngredient${i + 1}`])
              .filter(Boolean)
              .map((ingredient, index) => (
                <li key={index} className="flex items-center">
                  <span className="text-green-500 mr-2">✅</span>
                  {ingredient} - {recipe[`strMeasure${index + 1}`] || ""}
                </li>
              ))}
          </ul>
        </div>
      </div>

      {/* Kroki przygotowania */}
      <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-[#D5A922]">Steps to Prepare:</h2>
        <ol className="space-y-4">
          {recipe.strInstructions
            .split("\r\n")
            .filter((step) => step.trim())
            .map((step, index) => (
              <li
                key={index}
                className="relative p-4 pl-8 border-l-4 border-[#F3CD68] bg-white dark:bg-gray-800 rounded"
              >
                <span className="absolute -left-4 top-4 h-8 w-8 rounded-full flex items-center justify-center bg-[#D5A922] text-white">
                  {index + 1}
                </span>
                {step.trim()}
              </li>
            ))}
        </ol>
      </div>

      {/* Powrót */}
      <div className="flex justify-center mt-8">
        <button
          onClick={() => history.back()}
          className="px-6 py-2 bg-[#D5A922] text-white font-semibold rounded-lg hover:bg-[#8B5E3C] transition-colors"
        >
          Back to Recipes
        </button>
      </div>
    </div>
  );
}
