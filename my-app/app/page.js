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
  const recipesPerPage = 6;

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

      {/* Formularz edycji */}
      {editingRecipe && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg w-96">
            <h2 className="text-2xl font-semibold mb-4">Edit Recipe</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                saveEditedRecipe(editingRecipe);
              }}
            >
              <div className="mb-4">
                <label className="block font-semibold mb-2">Name</label>
                <input
                  type="text"
                  value={editingRecipe.name}
                  onChange={(e) =>
                    setEditingRecipe({
                      ...editingRecipe,
                      name: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setEditingRecipe(null)}
                  className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Sekcja: Moje przepisy */}
      <div className="container mx-auto my-10">
        {userRecipes.length > 0 && (
          <>
            <h2 className="text-2xl font-semibold text-center mb-6">
              My Recipes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
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
          Recipes from API
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {currentRecipes.map((recipe) => (
                <Card
                  key={recipe?.idMeal}
                  recipe={recipe}
                />
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
                    className={`mx-1 px-4 py-2 rounded transition-colors duration-200 ${
                      currentPage === index + 1
                        ? "bg-blue-500 text-white dark:bg-blue-700"
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
