"use client";
import React, { useState } from "react";

function Search({ setName, searchRecipesByName }) {
  const [categories, setCategories] = useState("Beef");
  const [search, setSearch] = useState("");
  const suggestions = ["Chicken", "Beef", "Lamb", "Pork", "Seafood", "Vegan","Bigos","Burgers","Salad","Risotto",
    "Curry","Pizza","Tacos","Tarts","Battenberg Cake","Pancakes","Fish","Soup","Sushi"
    
  ]; // Lista podpowiedzi

  const handleSuggestionClick = (suggestion) => {
    setSearch(suggestion); // Ustaw podpowiedź jako wpisaną wartość
    searchRecipesByName(suggestion); // Wykonaj wyszukiwanie
  };

  return (
    <div className="flex items-center justify-center mt-20 mb-4 w-full gap-4">
      {/* Wybór kategorii */}
      <select
        value={categories}
        onChange={(e) => {
          setCategories(e.target.value);
          setName(e.target.value); // Zmiana kategorii w stanie nadrzędnym
        }}
        className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
      >
        <option value="Beef">Beef</option>
        <option value="Chicken">Chicken</option>
        <option value="Lamb">Lamb</option>
        <option value="Pork">Pork</option>
        <option value="Seafood">Seafood</option>
        <option value="Vegan">Vegan</option>
      </select>

      {/* Napis OR */}
      <h1 className="text-xl font-semibold text-gray-500">OR</h1>

      {/* Pole wyszukiwania */}
      <div className="relative w-full max-w-lg">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none w-full"
          type="text"
          placeholder="Search for a recipe"
        />

        {/* Lista podpowiedzi */}
        {search && (
          <ul className="absolute top-12 left-0 bg-white border border-gray-300 rounded-lg w-full shadow-md z-10">
            {suggestions
              .filter((item) => item.toLowerCase().includes(search.toLowerCase())) // Filtrowanie pasujących podpowiedzi
              .map((item, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionClick(item)} // Obsługa kliknięcia w podpowiedź
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                >
                  {item}
                </li>
              ))}
          </ul>
        )}
      </div>

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