import { Link, NavLink } from 'react-router-dom';
import { useUser } from '@/context/UserContext';
import { BookMarked, UserCircle, LogIn, LogOut } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const navLinkClasses = "text-gray-600 hover:text-primary-600 transition-colors font-medium";
const activeNavLinkClasses = "text-primary-600";

const Header = () => {
  const { user, logout } = useUser();

  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
        <Link to="/" className="flex items-center space-x-2">
          <BookMarked className="h-8 w-8 text-primary-600" />
          <span className="text-2xl font-bold text-gray-900">ESL Master</span>
        </Link>
        <div className="hidden md:flex items-center space-x-8">
          <NavLink to="/" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}>Home</NavLink>
          <NavLink to="/lessons" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}>Lessons</NavLink>
          {user && (
            <NavLink to="/dashboard" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}>Dashboard</NavLink>
            <NavLink to="/achievements" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}>Achievements</NavLink>
            <NavLink to="/leaderboard" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}>Leaderboard</NavLink>
            {user.isAdmin && (
              <NavLink to="/admin" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}>Admin</NavLink>
            )}
          )}
          <NavLink to="/about" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}>About</NavLink>
        </div>
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Link to="/settings" className="flex items-center space-x-2 text-gray-600 hover:text-primary-600">
                <UserCircle className="h-6 w-6" />
                <span>{user.name}</span>
              </Link>
              <button onClick={logout} className="btn-secondary p-2" aria-label="Logout">
                <LogOut className="h-5 w-5" />
              </button>
            </>
          ) : (
            <Link to="/login" className="btn-primary space-x-2">
              <LogIn className="h-5 w-5" />
              <span>Login</span>
            </Link>
          )}
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
};

export default Header;