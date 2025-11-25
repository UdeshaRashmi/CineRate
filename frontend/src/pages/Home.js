import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, TrendingUp, Film, Users, ArrowRight } from 'lucide-react';
import MovieCard from '../components/MovieCard';
import { movieService } from '../services/movieService';

const Home = () => {
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeaturedMovies();
  }, []);

  const loadFeaturedMovies = async () => {
    try {
      const movies = await movieService.getMovies();
      // Get top 4 rated movies for featured section
      const featured = movies
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 4);
      setFeaturedMovies(featured);
    } catch (error) {
      console.error('Error loading featured movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { icon: Film, label: 'Movies Reviewed', value: '250+' },
    { icon: Users, label: 'Active Users', value: '10K+' },
    { icon: Star, label: 'Average Rating', value: '4.2' },
    { icon: TrendingUp, label: 'Growing Daily', value: '99%' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-900 via-gray-900 to-black py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Rate, Review,{' '}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Relive
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Discover your next favorite movie. Share your thoughts. Connect with fellow cinephiles. 
            Your ultimate movie rating platform awaits.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/movies"
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <span>Explore Movies</span>
              <ArrowRight size={20} />
            </Link>
            <Link
              to="/add-movie"
              className="border border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200"
            >
              Add Your Review
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="text-center p-6 bg-gray-800 rounded-lg hover:bg-gray-750 transition-colors"
                >
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-purple-600 rounded-full">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Movies Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Featured Movies</h2>
              <p className="text-gray-400">Top rated movies from our community</p>
            </div>
            <Link
              to="/movies"
              className="text-purple-400 hover:text-purple-300 font-semibold flex items-center space-x-2"
            >
              <span>View All</span>
              <ArrowRight size={20} />
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredMovies.map(movie => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onEdit={() => {}}
                  onDelete={() => {}}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Share Your Movie Experience?
          </h2>
          <p className="text-purple-100 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of movie enthusiasts sharing their reviews and discovering new films.
          </p>
          <Link
            to="/add-movie"
            className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 inline-flex items-center space-x-2"
          >
            <span>Add Your First Review</span>
            <Star size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;