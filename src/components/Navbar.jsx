import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useUser } from '@/context/UserContext';
import { BookOpen, LayoutDashboard, BarChart2, Info, User, Award, BrainCircuit, Menu, X } from 'lucide-react';

const Navbar = () => {
  const { user } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const navLinks = [
    { to: '/', text: 'Home', icon: LayoutDashboard },
    { to: '/lessons', text: 'Lessons', icon: BookOpen },
    { to: '/progress', text: 'Progress', icon: BarChart2 },
    { to: '/about', text: 'About', icon: Info },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 transition-all">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <BrainCircuit className="h-8 w-8 text-primary-600" />
            <span className="text-xl font-bold text-gray-900 hidden sm:inline">ESL Master</span>
          </Link>
          
          {/* Main Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navLinks.map(({ to, text, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`
                }
              >
                <Icon className="h-5 w-5" />
                <span>{text}</span>
              </NavLink>
            ))}
          </div>

          {/* User Info */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Award className="h-5 w-5 text-yellow-500" />
              <span className="font-semibold text-gray-700">{user.totalPoints} pts</span>
            </div>
            <Link to="/dashboard" className="flex items-center space-x-2">
              <User className="h-6 w-6 text-gray-600" />
              <span className="font-medium text-gray-700">{user.name}</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map(({ to, text, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`
                }
              >
                <Icon className="h-6 w-6" />
                <span>{text}</span>
              </NavLink>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-5">
              <User className="h-8 w-8 text-gray-600" />
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">{user.name}</div>
                <div className="text-sm font-medium text-gray-500">{user.totalPoints} points</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;