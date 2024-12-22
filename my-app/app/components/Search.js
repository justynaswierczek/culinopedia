"use client";
import React, { useState } from "react";

function Search({ setName, searchRecipesByName }) {
  const [categories, setCategories] = useState("Chicken");
  const [search, setSearch] = useState("");

  return (
    <div className="flex items-center justify-center mt-20 mb-4">
      {/* Wybór kategorii */}
      <select
        value={categories}
        onChange={(e) => {
          setCategories(e.target.value);
          setName(e.target.value); // Zmiana kategorii w stanie nadrzędnym
        }}
        className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
      >
        <option value="Chicken">Chicken</option>
        <option value="Beef">Beef</option>
        <option value="Lamb">Lamb</option>
        <option value="Pork">Pork</option>
      </select>

      <h1 className="text-xl font-semibold text-center mx-4 text-gray-500">or</h1>

      {/* Pole wyszukiwania */}
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
        type="text"
        placeholder="Search for a recipe"
      />

      {/* Przycisk wyszukiwania */}
      <button
        onClick={() => searchRecipesByName(search)} // Wywołanie funkcji przekazanej z `Page.js`
        className="bg-black hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Search
      </button>
    </div>
  );
}

export default Search;