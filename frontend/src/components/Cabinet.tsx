import {Link} from "react-router-dom";
import {useAuth} from "../auth/AuthContext";

export default function Cabinet() {
  const {user, isAuthenticated, logout} = useAuth();

  if (!isAuthenticated) {
    return <Link to="/login" className="text-xl font-boldtext-gray-900
               dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
    >Login</Link>;
  }

  return (
    <div className="flex gap-4 items-center">
      <span className="font-medium">{user?.name ?? "User"}</span>
      <button onClick={logout} className="text-sm bg-red-50 hover:text-red-600 transition">
        Logout
      </button>
    </div>
  );
}
