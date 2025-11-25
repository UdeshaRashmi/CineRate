import React, { useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Film, Menu, X, Star, Home, Plus, User, Search, Info, Mail, LogIn, UserPlus } from 'lucide-react';
import { AuthContext } from '../contexts/AuthContext';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useContext(AuthContext);

  // Navigation items for authenticated users
  const fullNavigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Movies', href: '/movies', icon: Star },
    { name: 'Add Movie', href: '/add-movie', icon: Plus },
    { name: 'About', href: '/about', icon: Info },
    { name: 'Contact', href: '/contact', icon: Mail },
  ];

  // Navigation items for non-authenticated users
  const limitedNavigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'About', href: '/about', icon: Info },
    { name: 'Contact', href: '/contact', icon: Mail },
    { name: 'Login', href: '/login', icon: LogIn },
    { name: 'Sign Up', href: '/signup', icon: UserPlus },
  ];

  // Determine which navigation to show based on authentication status
  const navigation = isAuthenticated ? fullNavigation : limitedNavigation;

  const userMenuItems = [
    { name: 'My Profile', href: '/profile', icon: User },
    { name: 'My Reviews', href: '/my-reviews', icon: Star },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const query = formData.get('search');
    if (query.trim()) {
      navigate(`/movies?search=${encodeURIComponent(query)}`);
      setIsMobileMenuOpen(false);
    }
  };

  const handleQuickSearch = (query) => {
    navigate(`/movies?search=${encodeURIComponent(query)}`);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    // Navigate to home page
    navigate('/');
  };

  return (
    <header className="bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 shadow-xl border-b border-purple-500 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Main Header */}
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 group"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="relative">
              <Film className="h-10 w-10 text-purple-400 group-hover:text-purple-300 transition-colors" />
              <div className="absolute -inset-1 bg-purple-500 rounded-full blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                CineRate
              </h1>
              <p className="text-xs text-gray-400">Movie Reviews</p>
            </div>
          </Link>

          {/* Desktop Search Bar */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <form onSubmit={handleSearchSubmit} className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-purple-400" />
              </div>
              <input
                type="text"
                name="search"
                placeholder="Search movies, directors..."
                className="block w-full pl-10 pr-4 py-3 border border-gray-700 rounded-xl bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
              />
              <button
                type="submit"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-purple-400 hover:text-purple-300 transition-colors"
              >
                <Search className="h-5 w-5" />
              </button>
            </form>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-2 px-5 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                    isActive(item.href)
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-semibold">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* User Menu & Mobile Button Container */}
          <div className="flex items-center space-x-4">
            {/* Quick Search Buttons - Desktop */}
            <div className="hidden md:flex items-center space-x-2">
              <span className="text-gray-400 text-sm">Quick:</span>
              <button
                onClick={() => handleQuickSearch('action')}
                className="text-xs bg-gradient-to-r from-purple-700 to-purple-900 text-gray-200 px-3 py-1.5 rounded-full hover:from-purple-600 hover:to-purple-800 transition-all duration-300"
              >
                Action
              </button>
              <button
                onClick={() => handleQuickSearch('comedy')}
                className="text-xs bg-gradient-to-r from-purple-700 to-purple-900 text-gray-200 px-3 py-1.5 rounded-full hover:from-purple-600 hover:to-purple-800 transition-all duration-300"
              >
                Comedy
              </button>
            </div>

            {/* User Menu - Desktop (only shown when authenticated) */}
            <div className="hidden md:block">
              {isAuthenticated && (
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 p-2.5 rounded-xl text-gray-300 hover:bg-gray-800 hover:text-white transition-all duration-300"
                  >
                    <User size={22} />
                    <span className="text-sm font-medium">Menu</span>
                  </button>

                  {/* User Dropdown Menu */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-xl shadow-xl py-2 z-50 backdrop-blur-sm bg-opacity-95">
                      {userMenuItems.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.name}
                            to={item.href}
                            onClick={() => setIsUserMenuOpen(false)}
                            className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors rounded-lg mx-2"
                          >
                            <Icon size={18} />
                            <span className="font-medium">{item.name}</span>
                          </Link>
                        );
                      })}
                      <div className="border-t border-gray-700 mt-2 pt-2">
                        <button
                          onClick={handleLogout}
                          className="w-full text-left flex items-center space-x-3 px-4 py-3 text-red-400 hover:bg-gray-700 hover:text-red-300 transition-colors rounded-lg mx-2"
                        >
                          <span className="font-medium">Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
            >
              {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-6 border-t border-gray-700 bg-gradient-to-b from-gray-900 to-gray-800 rounded-b-2xl shadow-2xl mb-4">
            {/* Mobile Search */}
            <div className="mb-6 px-2">
              <form onSubmit={handleSearchSubmit} className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-purple-400" />
                </div>
                <input
                  type="text"
                  name="search"
                  placeholder="Search movies..."
                  className="block w-full pl-10 pr-4 py-3 border border-gray-700 rounded-xl bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </form>
            </div>

            {/* Quick Search - Mobile */}
            <div className="flex flex-wrap gap-3 mb-6 px-4">
              <span className="text-gray-400 text-sm w-full mb-2">Quick Search:</span>
              {['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi'].map((genre) => (
                <button
                  key={genre}
                  onClick={() => handleQuickSearch(genre.toLowerCase())}
                  className="text-sm bg-gradient-to-r from-purple-700 to-purple-900 text-gray-200 px-4 py-2 rounded-full hover:from-purple-600 hover:to-purple-800 transition-all duration-300"
                >
                  {genre}
                </button>
              ))}
            </div>

            {/* Mobile Navigation Links */}
            <nav className="flex flex-col space-y-3 px-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-4 px-5 py-4 rounded-xl transition-all duration-300 ${
                      isActive(item.href)
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    }`}
                  >
                    <Icon size={22} />
                    <span className="font-semibold text-lg">{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* User Menu - Mobile (only shown when authenticated) */}
            <div className="mt-6 pt-6 border-t border-gray-700 px-2">
              {isAuthenticated && (
                <div className="space-y-3">
                  {userMenuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center space-x-4 px-5 py-4 text-gray-300 hover:bg-gray-800 hover:text-white rounded-xl transition-colors"
                      >
                        <Icon size={20} />
                        <span className="font-medium text-lg">{item.name}</span>
                      </Link>
                    );
                  })}
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-4 px-5 py-4 text-red-400 hover:bg-gray-800 hover:text-red-300 rounded-xl transition-colors"
                  >
                    <span className="font-medium text-lg">Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;