import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";

function Card({ recipe, onEdit, onDelete }) {
  const [rating, setRating] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  // Pobierz ocenę i ulubione z localStorage
  useEffect(() => {
    const storedRatings = JSON.parse(localStorage.getItem("recipeRatings")) || {};
    if (recipe?.idMeal && storedRatings[recipe?.idMeal]) {
      setRating(storedRatings[recipe?.idMeal]);
    } else if (recipe?.id && storedRatings[recipe?.id]) {
      setRating(storedRatings[recipe?.id]);
    }

    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(
      favorites.some((fav) => fav.idMeal === recipe.idMeal || fav.id === recipe.id)
    );
  }, [recipe?.idMeal, recipe?.id]);

  // Obsługa kliknięcia w gwiazdkę
  const handleStarClick = (starValue) => {
    setRating(starValue);
    const storedRatings = JSON.parse(localStorage.getItem("recipeRatings")) || {};
    const recipeId = recipe?.idMeal || recipe?.id;
    if (recipeId) {
      storedRatings[recipeId] = starValue;
      localStorage.setItem("recipeRatings", JSON.stringify(storedRatings));
    }
  };

  // Obsługa ulubionych (toggle)
  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const recipeId = recipe?.idMeal || recipe?.id;
    if (isFavorite) {
      const updatedFavorites = favorites.filter(
        (fav) => fav.idMeal !== recipeId && fav.id !== recipeId
      );
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } else {
      favorites.push(recipe);
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="max-w-xs w-full border-2 border-gray-300 rounded-lg shadow-lg overflow-hidden cursor-pointer relative">
      {/* Link do szczegółów przepisu */}
      <Link href={`/recipes/${recipe?.idMeal || recipe?.id}`}>
        <div className="flex items-center justify-center bg-gray-200 aspect-square">
          <Image
            src={recipe?.image || recipe?.strMealThumb || "/placeholder-image.jpg"}
            alt={recipe?.name || recipe?.strMeal || "Meal Image"}
            width={350}
            height={200}
            className="object-cover"
          />
        </div>
        <h2 className="text-center text-lg font-semibold p-4">
          {recipe?.name || recipe?.strMeal}
        </h2>
      </Link>

      {/* Ulubione (toggle) */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite();
        }}
        className={`absolute top-2 right-2 text-2xl ${
          isFavorite ? "text-red-500" : "text-gray-300"
        }`}
      >
        ♥
      </button>

      {/* System ocen (gwiazdki) */}
      <div className="flex items-center justify-center gap-1 p-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            onClick={(e) => {
              e.stopPropagation();
              handleStarClick(star);
            }}
            xmlns="http://www.w3.org/2000/svg"
            className={`h-6 w-6 cursor-pointer transition-colors ${
              star <= rating ? "fill-yellow-400" : "fill-gray-300"
            }`}
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966c.14.432.518.73.968.79l4.06.588c.978.141 1.367 1.345.66 2.032l-2.94 2.866c-.34.331-.495.81-.415 1.28l.693 4.04c.168.98-.86 1.73-1.73 1.27l-3.63-1.906a1.04 1.04 0 00-.97 0l-3.63 1.906c-.87.46-1.898-.29-1.73-1.27l.693-4.04a1.36 1.36 0 00-.415-1.28L2.084 10.3c-.706-.687-.318-1.89.66-2.032l4.06-.588c.45-.06.828-.358.968-.79l1.286-3.966z" />
          </svg>
        ))}
      </div>

      {/* Przyciski edycji i usuwania (jeśli są podane propsy onEdit i onDelete) */}
      {onEdit && onDelete && (
        <div className="flex justify-between px-4 pb-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(recipe);
            }}
            className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-700"
          >
            Edit
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(recipe);
            }}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default Card;
