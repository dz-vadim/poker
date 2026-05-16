import {Link} from "react-router-dom";
import {useAuth} from "../auth/AuthContext";

function HomePage() {
  const {isAuthenticated} = useAuth();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">

      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Poker App</h1>

      <p className="text-gray-600 dark:text-gray-400">Welcome. Please login or register.</p>

      {
        !isAuthenticated ?
          <div className="flex gap-4">
            <Link
              className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 transition-colors"
              to="/login"
            >
              Login
            </Link>

            <Link
              className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600 transition-colors"
              to="/register"
            >
              Register
            </Link>
          </div> : null
      }
    </div>
  )
}

export default HomePage
