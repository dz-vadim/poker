import {Link} from "react-router-dom";
import Cabinet from "./Cabinet.tsx";

function Header() {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm transition-colors duration-300">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <Link
              to="/"
              className="text-2xl font-boldtext-gray-900
               dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >🃏 Poker App </Link>
            <nav className="flex items-center gap-6">
              <Link
                  className="text-xl font-boldtext-gray-900
               dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  to="/rooms"> Rooms </Link>
              <Cabinet/>
            </nav>
        </div>
    </header>
  )
}

export default Header
