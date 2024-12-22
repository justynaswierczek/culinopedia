"use client";
import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Search from "./components/Search";
import Card from "./components/Card";

export default function Page() {
  const [recipes, setRecipes] = useState([]);
  const [name, setName] = useState("Chicken");
  const [loading, setLoading] = useState(false);

  // Funkcja wyszukiwania przepisów po nazwie
  const searchRecipesByName = async (search) => {
    try {
      setLoading(true);
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
      if (!res.ok) {
        throw new Error("Something went wrong");
      }
      const result = await res.json();
      setRecipes(result?.meals || []); // Ustaw wynik lub pustą tablicę, jeśli brak wyników
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Funkcja wyszukiwania przepisów na podstawie wybranej kategorii
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`);
        if (!res.ok) {
          throw new Error("Something went wrong");
        }
        const result = await res.json();
        setRecipes(result?.meals || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [name]);

  console.log(recipes);

  return (
    <div>
      <Header />
      <Search setName={setName} searchRecipesByName={searchRecipesByName} />
      <div className="flex items-center justify-center p-10">
        {/* Warunki renderowania */}
        {!loading && recipes?.length === 0 ? (
          <h1 className="text-center text-3xl">No recipes found</h1>
        ) : loading ? (
          <h1 className="text-center text-3xl">Loading...</h1>
        ) : (
          <div className="flex flex-wrap flex-col lg:flex-row items-center gap-5">
            {recipes?.map((recipe) => (
              <Card key={recipe?.idMeal} recipe={recipe} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}