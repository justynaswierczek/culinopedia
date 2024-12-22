import Image from "next/image";
import Link from "next/link";
import React from "react";

function Card({ recipe }) {
  return (
    <Link href={`/recipes/${recipe?.idMeal}`} passHref>
      <div className="max-w-sm border-2 border-gray-300 cursor-pointer hover:border-black">
        {recipe?.strMealThumb ? (
          <Image
            src={recipe.strMealThumb}
            alt="meal image"
            width={350}
            height={250}
            className="object-cover"
          />
        ) : (
          <div className="w-full h-48 bg-gray-300 flex items-center justify-center">
            <span className="text-gray-500">No Image Available</span>
          </div>
        )}
        <h1 className="bg-white py-4 text-gray-500 font-semibold text-2xl text-center">
          {recipe?.strMeal}
        </h1>
      </div>
    </Link>
  );
}

export default Card;