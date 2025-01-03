import Image from "next/image";

// Funkcja do pobierania danych
async function getData(id) {
  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Page({ params }) {
  const { id } = await params; // Użycie `await` do uzyskania `id`

  // Pobieranie danych
  const data = await getData(id);

  return (
    <div className="container mx-auto my-20">
      <div className="flex border-2 border-gray-300 cursor-pointer hover:border-black p-4">
        {/* Sekcja obrazu */}
        <div className="relative w-[50%] h-[500px] mr-8">
          <Image
            src={data?.meals[0]?.strMealThumb}
            layout="fill"
            objectFit="cover"
            alt="Meal Image"
          />
        </div>

        {/* Informacje o przepisie */}
        <div className="w-[50%]">
          <h1 className="bg-white py-4 text-gray-500 font-semibold text-2xl text-center mb-4">
            {data?.meals[0]?.strMeal}
          </h1>

          {/* Składniki */}
          <div className="bg-white p-4 mb-4 border border-gray-300 rounded">
            <h2 className="text-xl font-semibold mb-2">Ingredients:</h2>
            {Array.from({ length: 20 }, (_, i) => i + 1).map((index) => {
              const ingredient = data?.meals[0][`strIngredient${index}`];
              const measurement = data?.meals[0][`strMeasure${index}`];

              if (ingredient && measurement) {
                return (
                  <div key={index} className="mb-2">
                    <span className="font-semibold">{ingredient}:</span> {measurement}
                  </div>
                );
              }

              return null;
            })}
          </div>

          {/* Instrukcje */}
          <div className="bg-white p-4 mb-4 border border-gray-300 rounded">
            <h2 className="text-xl font-semibold mb-2">Steps:</h2>
            <ol className="list-decimal pl-4">
              {data?.meals[0]?.strInstructions.split("\r\n").map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>

          {/* Wideo z YouTube */}
          {data?.meals[0]?.strYoutube && (
            <div className="mb-4">
              <iframe
                width="100%"
                height="315"
                src={data?.meals[0]?.strYoutube.replace("watch?v=", "embed/")}
                title="YouTube Video"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}