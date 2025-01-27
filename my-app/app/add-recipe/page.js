"use client";
import { useState } from "react";

export default function AddRecipePage() {
  const [recipe, setRecipe] = useState({
    name: "",
    category: "",
    ingredients: "",
    steps: "",
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRecipe((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setRecipe((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Pobierz istniejące przepisy z localStorage
    const storedRecipes = JSON.parse(localStorage.getItem("userRecipes")) || [];
    // Dodaj nowy przepis
    const newRecipes = [...storedRecipes, recipe];
    // Zapisz w localStorage
    localStorage.setItem("userRecipes", JSON.stringify(newRecipes));

    // Wyczyść formularz
    setRecipe({
      name: "",
      category: "",
      ingredients: "",
      steps: "",
      image: null,
    });

    alert("Recipe added successfully!");
  };

  return (
    <div className="container mx-auto my-10 p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Add Your Recipe</h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-6 rounded shadow"
      >
        <div className="mb-4">
          <label htmlFor="recipe-name" className="block font-semibold mb-2">
            Recipe Name
          </label>
          <input
            id="recipe-name"
            type="text"
            name="name"
            value={recipe.name}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="recipe-category" className="block font-semibold mb-2">
            Category
          </label>
          <input
            id="recipe-category"
            type="text"
            name="category"
            value={recipe.category}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="recipe-ingredients" className="block font-semibold mb-2">
            Ingredients
          </label>
          <textarea
            id="recipe-ingredients"
            name="ingredients"
            value={recipe.ingredients}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            rows="4"
            required
            placeholder="List ingredients separated by commas"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="recipe-steps" className="block font-semibold mb-2">
            Steps
          </label>
          <textarea
            id="recipe-steps"
            name="steps"
            value={recipe.steps}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            rows="4"
            required
            placeholder="Write step-by-step instructions"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="recipe-image" className="block font-semibold mb-2">
            Upload Image
          </label>
          <input
            id="recipe-image"
            type="file"
            onChange={handleImageChange}
            className="w-full"
          />
        </div>

        {recipe.image && (
          <div className="mb-4">
            <img
              src={recipe.image}
              alt="Preview"
              className="w-full h-auto max-h-64 object-cover rounded"
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-[#F3CD68] text-white p-3 rounded hover:bg-[#E3B85A]"
        >
          Add Recipe
        </button>
      </form>
    </div>
  );
}