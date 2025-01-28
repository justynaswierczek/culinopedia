"use client";

import React, { useState, useEffect } from "react";
import Search from "./components/Search";
import Card from "./components/Card";

export default function Page() {
  const [recipes, setRecipes] = useState([]); // Przepisy z API
  const [userRecipes, setUserRecipes] = useState([]); // Przepisy użytkowników
  const [editingRecipe, setEditingRecipe] = useState(null); // Aktualnie edytowany przepis
  const [name, setName] = useState("Beef"); // Domyślna kategoria
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 12;

  // Wyszukiwanie przepisów po nazwie
  const searchRecipesByName = async (search) => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
      );
      if (!res.ok) throw new Error("Something went wrong");
      const result = await res.json();
      setRecipes(result?.meals || []);
      setCurrentPage(1); // Reset paginacji
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Pobieranie przepisów z API na podstawie kategorii
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`
        );
        if (!res.ok) throw new Error("Something went wrong");
        const result = await res.json();
        setRecipes(result?.meals || []);
        setCurrentPage(1); // Reset paginacji
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, [name]);

  // Pobieranie przepisów użytkownika z localStorage
  useEffect(() => {
    const storedUserRecipes =
      JSON.parse(localStorage.getItem("userRecipes")) || [];
    setUserRecipes(storedUserRecipes);
  }, []);

  // Usuwanie przepisu użytkownika
  const deleteRecipe = (recipeToDelete) => {
    const updatedRecipes = userRecipes.filter(
      (recipe) => recipe.name !== recipeToDelete.name
    );
    localStorage.setItem("userRecipes", JSON.stringify(updatedRecipes));
    setUserRecipes(updatedRecipes);
  };

  // Zapis edytowanego przepisu
  const saveEditedRecipe = (updatedRecipe) => {
    const updatedRecipes = userRecipes.map((recipe) =>
      recipe.name === updatedRecipe.name ? updatedRecipe : recipe
    );
    localStorage.setItem("userRecipes", JSON.stringify(updatedRecipes));
    setUserRecipes(updatedRecipes);
    setEditingRecipe(null); // Zakończ edycję
  };

  // Indeksy do paginacji
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  // Funkcja do zmiany strony w paginacji
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      {/* Wyszukiwarka */}
      <Search setName={setName} searchRecipesByName={searchRecipesByName} />

      {/* Sekcja: Moje przepisy */}
      <div className="container mx-auto my-10">
        {userRecipes.length > 0 && (
          <>
            <h2 className="text-2xl font-semibold text-center mb-6">
              My Recipes
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {userRecipes.map((recipe, index) => (
                <Card
                  key={`user-${index}`}
                  recipe={recipe}
                  onEdit={setEditingRecipe}
                  onDelete={deleteRecipe}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Sekcja: Przepisy z API */}
      <div className="container mx-auto my-10">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Discover Recipes
        </h2>
        {loading ? (
          <h1 className="text-center text-3xl text-gray-500 dark:text-gray-300">
            Loading...
          </h1>
        ) : currentRecipes.length === 0 ? (
          <h1 className="text-center text-3xl text-gray-500 dark:text-gray-300">
            No recipes found
          </h1>
        ) : (
          <div>
            {/* Lista przepisów */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {currentRecipes.map((recipe) => (
                <Card key={recipe?.idMeal} recipe={recipe} />
              ))}
            </div>

            {/* Paginacja */}
            <div className="flex justify-center mt-8">
              {Array.from(
                { length: Math.ceil(recipes.length / recipesPerPage) },
                (_, index) => (
                  <button
                    key={index}
                    onClick={() => paginate(index + 1)}
                    className={`mx-2 w-10 h-10 flex items-center justify-center rounded-full text-sm font-semibold transition-colors duration-200 ${
                      currentPage === index + 1
                        ? "bg-[#F3CD68] text-white dark:bg-blue-700"
                        : "bg-gray-300 text-black dark:bg-gray-700 dark:text-white"
                    }`}
                  >
                    {index + 1}
                  </button>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


