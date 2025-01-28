"use client";
import React, { useState } from "react";

function Search({ setName, searchRecipesByName }) {
  const [categories, setCategories] = useState("Beef");
  const [search, setSearch] = useState("");
  const suggestions = [
    "Chicken", "Beef", "Lamb", "Pork", "Seafood", "Vegan",
    "Bigos", "Burgers", "Salad", "Risotto", "Curry", "Pizza", 
    "Tacos", "Tarts", "Battenberg Cake", "Pancakes", "Fish", 
    "Soup", "Sushi"
  ];

  const handleSuggestionClick = (suggestion) => {
    setSearch(suggestion);
    searchRecipesByName(suggestion);
  };

  return (
    <div className="flex items-center justify-center mt-20 mb-4 w-full gap-4">
      {/* Wybór kategorii */}
      <select
        value={categories}
        onChange={(e) => {
          setCategories(e.target.value);
          setName(e.target.value);
        }}
        className="
          border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none
          dark:bg-gray-800 dark:text-white dark:border-gray-600
        "
      >
        <option value="Beef">Beef</option>
        <option value="Chicken">Chicken</option>
        <option value="Lamb">Lamb</option>
        <option value="Pork">Pork</option>
        <option value="Seafood">Seafood</option>
        <option value="Vegan">Vegan</option>
      </select>

      {/* Napis OR */}
      <h1 className="text-xl font-semibold text-gray-500 dark:text-gray-300">
        OR
      </h1>

      {/* Pole wyszukiwania + lista podpowiedzi */}
      <div className="relative w-full max-w-lg">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm 
            focus:outline-none w-full placeholder-gray-400
            dark:bg-gray-800 dark:text-white dark:border-gray-600
            dark:placeholder-gray-500
          "
          type="text"
          placeholder="Search for a recipe"
        />

        {search && (
          <ul
            className="
              absolute top-12 left-0 w-full z-10
              bg-white border border-gray-300 rounded-lg shadow-md
              dark:bg-gray-800 dark:border-gray-600
            "
          >
            {suggestions
              .filter((item) =>
                item.toLowerCase().includes(search.toLowerCase())
              )
              .map((item, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionClick(item)}
                  className="
                    px-4 py-2 cursor-pointer 
                    hover:bg-gray-200 dark:hover:bg-gray-700
                  "
                >
                  {item}
                </li>
              ))}
          </ul>
        )}
      </div>

      {/* Przycisk wyszukiwania */}
      <button
        onClick={() => searchRecipesByName(search)}
        className="
          flex items-center justify-center
          px-8 py-3 rounded-full text-lg font-semibold text-white
          bg-[#D5A922] hover:bg-[#F3CD68]
          transition-all transform hover:scale-105 shadow-md
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FDF9EE]
        "
      >

        Search
      </button>
    </div>
  );
}

export default Search;
