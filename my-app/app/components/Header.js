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
        <div className="flex items-center gap-6">
          <Link
            href="/favorites"
            className="
              relative text-lg font-semibold text-[#FDF9EE] 
              after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 
              after:bg-[#FDF9EE] after:transition-all after:duration-300 hover:after:w-full
              dark:text-gray-300 dark:after:bg-gray-300
            "
          >
            Favorites
          </Link>
          <Link
            href="/add-recipe"
            className="
              relative text-lg font-semibold text-[#FDF9EE] 
              after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 
              after:bg-[#FDF9EE] after:transition-all after:duration-300 hover:after:w-full
              dark:text-gray-300 dark:after:bg-gray-300
            "
          >
            Add Recipe
          </Link>
          <ThemeToggle />
        </div>
      </div>



    </div>
  );
}
