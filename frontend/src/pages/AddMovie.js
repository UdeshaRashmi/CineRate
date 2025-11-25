import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import MovieForm from '../components/MovieForm';
import { movieService } from '../services/movieService';

const AddMovie = () => {
  const handleSubmit = async (movieData) => {
    try {
      await movieService.createMovie(movieData);
      // Show success message or redirect
      alert('Movie added successfully!');
      // Redirect to movies page after successful submission
      window.location.href = '/movies';
    } catch (error) {
      console.error('Error adding movie:', error);
      alert('Error adding movie. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/movies"
            className="inline-flex items-center text-purple-400 hover:text-purple-300 mb-4 transition-colors duration-200"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Movies
          </Link>
          <h1 className="text-4xl font-bold text-white mb-2">Add New Movie</h1>
          <p className="text-gray-400">Share your movie review with the community</p>
        </div>

        {/* Movie Form */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-800 rounded-xl shadow-lg p-6">
            <MovieForm
              onSubmit={handleSubmit}
              onCancel={() => window.history.back()}
              isOpen={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMovie;