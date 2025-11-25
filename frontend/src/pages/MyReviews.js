import React, { useState, useEffect } from 'react';
import { Star, Calendar, Edit3, Trash2, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { movieService } from '../services/movieService';
import RatingStars from '../components/RatingStars';

const MyReviews = () => {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  // Sample data for demonstration
  const sampleReviews = [
    {
      id: 1,
      movieTitle: 'Inception',
      movieYear: 2010,
      rating: 5,
      reviewText: 'Mind-bending masterpiece! Nolan at his finest with incredible visuals and a compelling story that keeps you guessing until the end.',
      date: '2023-05-15',
      poster: 'https://via.placeholder.com/150x225/4A5568/FFFFFF?text=Inception'
    },
    {
      id: 2,
      movieTitle: 'The Dark Knight',
      movieYear: 2008,
      rating: 5,
      reviewText: 'Heath Ledger\'s Joker is iconic. The perfect superhero film that balances action with deep character development.',
      date: '2023-04-22',
      poster: 'https://via.placeholder.com/150x225/4A5568/FFFFFF?text=TDK'
    },
    {
      id: 3,
      movieTitle: 'Interstellar',
      movieYear: 2014,
      rating: 4,
      reviewText: 'Visually stunning and emotionally powerful. Some pacing issues but the science fiction elements are fascinating.',
      date: '2023-03-10',
      poster: 'https://via.placeholder.com/150x225/4A5568/FFFFFF?text=Interstellar'
    },
    {
      id: 4,
      movieTitle: 'Titanic',
      movieYear: 1997,
      rating: 3,
      reviewText: 'Classic romance with great production values, though it feels a bit dated now. The love story is still touching.',
      date: '2023-02-18',
      poster: 'https://via.placeholder.com/150x225/4A5568/FFFFFF?text=Titanic'
    }
  ];

  useEffect(() => {
    // Simulate loading reviews
    setTimeout(() => {
      setReviews(sampleReviews);
      setLoading(false);
    }, 800);
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleEditReview = (reviewId) => {
    // In a real app, this would navigate to an edit page
    alert(`Edit review with ID: ${reviewId}`);
  };

  const handleDeleteReview = (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      setReviews(reviews.filter(review => review.id !== reviewId));
    }
  };

  const handleViewMovie = (movieTitle) => {
    // Navigate to movie details page
    // This is a placeholder implementation
    navigate('/movies');
  };

  const filteredReviews = filter === 'all' 
    ? reviews 
    : reviews.filter(review => review.rating === parseInt(filter));

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">My Reviews</h1>
              <p className="text-gray-400">Manage and view all your movie reviews</p>
            </div>
            <button
              onClick={() => navigate('/add-movie')}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors duration-200 flex items-center space-x-2 mt-4 md:mt-0"
            >
              <span>Add New Review</span>
            </button>
          </div>

          {/* Filters */}
          <div className="bg-gray-800 rounded-lg p-4 mb-6">
            <div className="flex flex-wrap gap-4">
              <div>
                <label className="text-gray-400 text-sm mb-1 block">Filter by Rating</label>
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="all">All Ratings</option>
                  <option value="5">5 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="2">2 Stars</option>
                  <option value="1">1 Star</option>
                </select>
              </div>
              
              <div className="flex items-end">
                <p className="text-gray-400">
                  Showing {filteredReviews.length} of {reviews.length} reviews
                </p>
              </div>
            </div>
          </div>

          {/* Reviews List */}
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
            </div>
          ) : filteredReviews.length === 0 ? (
            <div className="text-center py-12 bg-gray-800 rounded-lg">
              <div className="text-gray-400 text-lg mb-4">No reviews found</div>
              <p className="text-gray-500 mb-6">
                {filter === 'all' 
                  ? 'You haven\'t written any reviews yet.' 
                  : 'No reviews match your filter criteria.'}
              </p>
              <button
                onClick={() => navigate('/add-movie')}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors"
              >
                Write Your First Review
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredReviews.map((review) => (
                <div key={review.id} className="bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-[1.01]">
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Movie Poster */}
                      <div className="flex-shrink-0">
                        <img 
                          src={review.poster} 
                          alt={review.movieTitle}
                          className="w-32 h-48 object-cover rounded-lg shadow-md"
                        />
                      </div>
                      
                      {/* Review Content */}
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-white">{review.movieTitle} ({review.movieYear})</h3>
                            <div className="flex items-center mt-1">
                              <RatingStars rating={review.rating} />
                              <span className="ml-2 text-gray-400">{review.rating}/5</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center text-gray-400 text-sm mt-2 md:mt-0">
                            <Calendar size={16} className="mr-1" />
                            <span>{formatDate(review.date)}</span>
                          </div>
                        </div>
                        
                        <p className="text-gray-300 mb-6">{review.reviewText}</p>
                        
                        <div className="flex flex-wrap gap-3">
                          <button
                            onClick={() => handleViewMovie(review.movieTitle)}
                            className="flex items-center text-purple-400 hover:text-purple-300"
                          >
                            <Eye size={16} className="mr-1" />
                            <span>View Movie</span>
                          </button>
                          
                          <button
                            onClick={() => handleEditReview(review.id)}
                            className="flex items-center text-blue-400 hover:text-blue-300"
                          >
                            <Edit3 size={16} className="mr-1" />
                            <span>Edit</span>
                          </button>
                          
                          <button
                            onClick={() => handleDeleteReview(review.id)}
                            className="flex items-center text-red-400 hover:text-red-300"
                          >
                            <Trash2 size={16} className="mr-1" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyReviews;