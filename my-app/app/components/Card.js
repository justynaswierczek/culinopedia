import Image from "next/image";
import Link from "next/link";
import React from "react";

function Card({ recipe }) {
  return (
    <Link href={`/recipes/${recipe?.idMeal}`} passHref>
      <div className="max-w-xs w-full border-2 border-gray-300 rounded-lg shadow-lg overflow-hidden cursor-pointer">
        <div className="flex items-center justify-center bg-gray-200 aspect-square">
          {recipe?.strMealThumb ? (
            <Image
              src={recipe.strMealThumb}
              alt="meal image"
              width={350}
              height={200}
              className="object-cover"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-gray-300">
              <span className="text-gray-500">No Image Available</span>
            </div>
          )}
        </div>
        <h2 className="text-center text-lg font-semibold p-4">{recipe?.strMeal}</h2>
      </div>
    </Link>
  );
}

export default Card;