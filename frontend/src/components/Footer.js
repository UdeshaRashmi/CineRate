import React from 'react';
import { Link } from 'react-router-dom';
import { Film, Github, Twitter, Mail, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center space-x-3 mb-4">
              <Film className="h-8 w-8 text-purple-400" />
              <div>
                <h2 className="text-2xl font-bold text-white">CineRate</h2>
                <p className="text-gray-400">Your ultimate movie rating companion</p>
              </div>
            </Link>
            <p className="text-gray-400 mb-4 max-w-md">
              Discover, rate, and review your favorite movies. Share your cinematic experiences 
              and find your next movie night pick with our community-driven platform.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com"
                className="text-gray-400 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={20} />
              </a>
              <a
                href="https://twitter.com"
                className="text-gray-400 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter size={20} />
              </a>
              <a
                href="mailto:hello@cinerate.com"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/movies" className="text-gray-400 hover:text-white transition-colors">
                  Browse Movies
                </Link>
              </li>
              <li>
                <Link to="/add-movie" className="text-gray-400 hover:text-white transition-colors">
                  Add Review
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Features</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Movie Reviews</li>
              <li>Star Ratings</li>
              <li>Search & Filter</li>
              <li>Community Driven</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm flex items-center">
            Made with <Heart size={16} className="mx-1 text-red-500" /> for movie lovers
          </p>
          <p className="text-gray-400 text-sm mt-2 md:mt-0">
            © {currentYear} CineRate. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;