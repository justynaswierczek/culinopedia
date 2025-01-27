import ThemeToggle from "./ThemeToggle";
import Link from "next/link";

export default function Header() {
  return (
    <div>
      {/* Pasek nawigacyjny */}
      <div
        className="
          flex items-center justify-between 
          p-6 
          bg-[#D5A922] text-gray-900
          dark:bg-gray-900 dark:text-gray-100
          transition-colors
        "
      >
        {/* Logo */}
        <h1 className="text-3xl font-serif font-semibold text-white">
          <Link href="/">Culinopedia</Link>
        </h1>

        {/* Nawigacja */}
        <div className="flex items-center gap-4">
          <Link
            href="/favorites"
            className="text-[#FDF9EE] font-bold dark:text-gray-300 hover:underline"
          >
            Favorites
          </Link>
          <Link
            href="/add-recipe"
            className="text-[#FDF9EE] font-bold dark:text-gray-300 hover:underline"
          >
            Add Recipe
          </Link>
          <ThemeToggle />
        </div>
      </div>

      {/* Cienki pasek pod nawigacją */}
      <div className="h-1 bg-[#FDF9EE]"></div>
    </div>
  );
}