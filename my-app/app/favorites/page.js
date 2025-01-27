"use client";
import React, { useState, useEffect } from "react";
import Card from "../components/Card";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  return (
    <div className="container mx-auto my-10">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">
        Your Favorite Recipes
      </h1>

      {favorites.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-300">
          You haven't added any favorite recipes yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {favorites.map((recipe) => (
            <Card key={recipe.idMeal} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
}