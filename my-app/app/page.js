"use client";
import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Search from "./components/Search";
import Card from "./components/Card";

export default function Page() {
  const [recipes, setRecipes] = useState([]);
  const [name, setName] = useState("Beef");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 6; // Liczba przepisów na stronę

  // Funkcja wyszukiwania przepisów po nazwie
  const searchRecipesByName = async (search) => {
    try {
      setLoading(true);
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
      if (!res.ok) {
        throw new Error("Something went wrong");
      }
      const result = await res.json();
      setRecipes(result?.meals || []); // Aktualizacja wyników wyszukiwania
      setCurrentPage(1); // Resetowanie strony na pierwszą
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Funkcja pobierania przepisów na podstawie kategorii
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`);
        if (!res.ok) {
          throw new Error("Something went wrong");
        }
        const result = await res.json();
        setRecipes(result?.meals || []);
        setCurrentPage(1); // Resetowanie strony na pierwszą po zmianie kategorii
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [name]);

  // Oblicz indeksy dla obecnej strony
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  // Zmiana strony
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Header />
      <Search setName={setName} searchRecipesByName={searchRecipesByName} />
      <div className="flex items-center justify-center p-10">
        {loading ? (
          <h1 className="text-center text-3xl">Loading...</h1>
        ) : currentRecipes.length === 0 ? (
          <h1 className="text-center text-3xl">No recipes found</h1>
        ) : (
          <div>
            {/* Lista przepisów */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {currentRecipes.map((recipe) => (
                <Card key={recipe?.idMeal} recipe={recipe} />
              ))}
            </div>

            {/* Paginacja */}
            <div className="flex justify-center mt-8">
              {Array.from({ length: Math.ceil(recipes.length / recipesPerPage) }, (_, index) => (
                <button
                  key={index}
                  onClick={() => paginate(index + 1)}
                  className={`mx-1 px-4 py-2 rounded ${
                    currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}