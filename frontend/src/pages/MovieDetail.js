import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Edit, Trash2, Star, Clock } from 'lucide-react';
import RatingStars from '../components/RatingStars';
import { movieService } from '../services/movieService';

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [similarMovies, setSimilarMovies] = useState([]);

  useEffect(() => {
    loadMovie();
  }, [id]);

  const loadMovie = async () => {
    try {
      setLoading(true);
      const movieData = await movieService.getMovieById(parseInt(id));
      if (movieData) {
        setMovie(movieData);
        loadSimilarMovies(movieData.genre);
      } else {
        navigate('/movies');
      }
    } catch (error) {
      console.error('Error loading movie:', error);
      navigate('/movies');
    } finally {
      setLoading(false);
    }
  };

  const loadSimilarMovies = async (genre) => {
    try {
      const allMovies = await movieService.getMovies();
      const similar = allMovies
        .filter(m => m.id !== parseInt(id) && m.genre.includes(genre))
        .slice(0, 4);
      setSimilarMovies(similar);
    } catch (error) {
      console.error('Error loading similar movies:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      try {
        await movieService.deleteMovie(parseInt(id));
        navigate('/movies');
      } catch (error) {
        console.error('Error deleting movie:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Movie Not Found</h2>
          <Link to="/movies" className="text-purple-400 hover:text-purple-300">
            Back to Movies
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Link
          to="/movies"
          className="inline-flex items-center text-purple-400 hover:text-purple-300 mb-6"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Movies
        </Link>

        {/* Movie Header */}
        <div className="bg-gray-800 rounded-lg p-8 mb-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Movie Poster */}
            <div className="lg:w-1/3">
              <img
                src={movie.imageUrl}
                alt={movie.title}
                className="w-full h-96 object-cover rounded-lg shadow-2xl"
              />
            </div>

            {/* Movie Info */}
            <div className="lg:w-2/3">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-4xl font-bold text-white mb-2">{movie.title}</h1>
                  <div className="flex items-center space-x-4 text-gray-300 mb-4">
                    <div className="flex items-center">
                      <Calendar size={18} className="mr-2" />
                      <span>{movie.releaseYear}</span>
                    </div>
                    <div className="flex items-center">
                      <User size={18} className="mr-2" />
                      <span>{movie.director}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock size={18} className="mr-2" />
                      <span>2h 28m</span>
                    </div>
                  </div>
                </div>
                <RatingStars rating={movie.rating} size={24} />
              </div>

              {/* Genre Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {movie.genre.split(', ').map((genre, index) => (
                  <span
                    key={index}
                    className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm"
                  >
                    {genre}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4 mb-6">
                <button
                  onClick={() => navigate(`/edit-movie/${movie.id}`)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors duration-200 flex items-center"
                >
                  <Edit size={18} className="mr-2" />
                  Edit Review
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors duration-200 flex items-center"
                >
                  <Trash2 size={18} className="mr-2" />
                  Delete
                </button>
              </div>

              {/* Review Section */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <Star className="mr-2 text-yellow-400" />
                  Review
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  {movie.review}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Movies */}
        {similarMovies.length > 0 && (
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-6">Similar Movies</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarMovies.map(similarMovie => (
                <div
                  key={similarMovie.id}
                  className="bg-gray-800 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-200 cursor-pointer"
                  onClick={() => navigate(`/movie/${similarMovie.id}`)}
                >
                  <img
                    src={similarMovie.imageUrl}
                    alt={similarMovie.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-white mb-2 truncate">
                      {similarMovie.title}
                    </h3>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">{similarMovie.releaseYear}</span>
                      <RatingStars rating={similarMovie.rating} size={16} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Movie Stats */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-2xl font-bold text-white mb-4">Movie Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Community Rating', value: movie.rating.toFixed(1) },
              { label: 'Total Reviews', value: '1.2K' },
              { label: 'Your Rating', value: movie.rating.toFixed(1) },
              { label: 'Watchlist Adds', value: '456' }
            ].map((stat, index) => (
              <div key={index} className="text-center p-4 bg-gray-700 rounded-lg">
                <div className="text-2xl font-bold text-purple-400 mb-1">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;