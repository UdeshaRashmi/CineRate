import React, { useState, useEffect } from 'react';
import { X, Upload, Image } from 'lucide-react';
import RatingStars from './RatingStars';
import { movieService } from '../services/movieService';

const MovieForm = ({ movie, onSubmit, onCancel, isOpen }) => {
  const [formData, setFormData] = useState({
    title: '',
    director: '',
    genre: '',
    releaseYear: new Date().getFullYear(),
    rating: 3.0,
    review: '',
    imageUrl: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState('');

  const genres = [
    'Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Documentary', 
    'Drama', 'Fantasy', 'Horror', 'Mystery', 'Romance', 'Sci-Fi', 
    'Thriller', 'Western', 'Biography', 'Family', 'History', 'Music'
  ];

  useEffect(() => {
    if (movie) {
      setFormData(movie);
      setImagePreview(movie.imageUrl);
    } else {
      setFormData({
        title: '',
        director: '',
        genre: '',
        releaseYear: new Date().getFullYear(),
        rating: 3.0,
        review: '',
        imageUrl: ''
      });
      setImagePreview('');
    }
    setErrors({});
  }, [movie, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      try {
        await onSubmit(formData);
      } catch (error) {
        console.error('Error submitting form:', error);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.title.trim()) {
      errors.title = 'Movie title is required';
    } else if (formData.title.length < 2) {
      errors.title = 'Title must be at least 2 characters long';
    }

    if (!formData.director.trim()) {
      errors.director = 'Director name is required';
    }

    if (!formData.genre) {
      errors.genre = 'Please select a genre';
    }

    if (!formData.releaseYear) {
      errors.releaseYear = 'Release year is required';
    } else if (formData.releaseYear < 1900 || formData.releaseYear > new Date().getFullYear() + 5) {
      errors.releaseYear = 'Please enter a valid release year';
    }

    if (!formData.review.trim()) {
      errors.review = 'Review is required';
    } else if (formData.review.length < 10) {
      errors.review = 'Review must be at least 10 characters long';
    }

    if (formData.imageUrl && !isValidUrl(formData.imageUrl)) {
      errors.imageUrl = 'Please enter a valid image URL';
    }

    return errors;
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Update image preview for URL changes
    if (name === 'imageUrl' && isValidUrl(value)) {
      setImagePreview(value);
    }
  };

  const handleRatingChange = (rating) => {
    setFormData(prev => ({
      ...prev,
      rating
    }));
  };

  const handleImageUrlBlur = (e) => {
    const url = e.target.value;
    if (url && isValidUrl(url)) {
      setImagePreview(url);
    }
  };

  const handleAddGenre = (genre) => {
    const currentGenres = formData.genre ? formData.genre.split(', ') : [];
    if (!currentGenres.includes(genre)) {
      const newGenres = [...currentGenres, genre].join(', ');
      setFormData(prev => ({
        ...prev,
        genre: newGenres
      }));
    }
  };

  const handleRemoveGenre = (genreToRemove) => {
    const currentGenres = formData.genre.split(', ').filter(genre => genre !== genreToRemove);
    setFormData(prev => ({
      ...prev,
      genre: currentGenres.join(', ')
    }));
  };

  const clearImage = () => {
    setFormData(prev => ({ ...prev, imageUrl: '' }));
    setImagePreview('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-700 sticky top-0 bg-gray-800">
          <h2 className="text-2xl font-bold text-white">
            {movie ? 'Edit Movie Review' : 'Add New Movie Review'}
          </h2>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-700"
            disabled={isSubmitting}
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Image Preview Section */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Image Preview */}
            <div className="md:w-1/3">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Movie Poster
              </label>
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 text-center h-64 flex items-center justify-center">
                {imagePreview ? (
                  <div className="relative w-full h-full">
                    <img
                      src={imagePreview}
                      alt="Movie poster preview"
                      className="w-full h-full object-cover rounded-lg"
                      onError={() => setImagePreview('')}
                    />
                    <button
                      type="button"
                      onClick={clearImage}
                      className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-700"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="text-gray-400">
                    <Image size={48} className="mx-auto mb-2" />
                    <p>No image selected</p>
                    <p className="text-sm">Add an image URL below</p>
                  </div>
                )}
              </div>
            </div>

            {/* Basic Info */}
            <div className="md:w-2/3 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Movie Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className={`w-full px-3 py-2 border rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    errors.title ? 'border-red-500' : 'border-gray-600'
                  }`}
                  placeholder="Enter movie title"
                  disabled={isSubmitting}
                />
                {errors.title && (
                  <p className="text-red-400 text-sm mt-1">{errors.title}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Director *
                </label>
                <input
                  type="text"
                  name="director"
                  value={formData.director}
                  onChange={handleChange}
                  required
                  className={`w-full px-3 py-2 border rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    errors.director ? 'border-red-500' : 'border-gray-600'
                  }`}
                  placeholder="Enter director name"
                  disabled={isSubmitting}
                />
                {errors.director && (
                  <p className="text-red-400 text-sm mt-1">{errors.director}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Release Year *
                  </label>
                  <input
                    type="number"
                    name="releaseYear"
                    value={formData.releaseYear}
                    onChange={handleChange}
                    required
                    min="1900"
                    max={new Date().getFullYear() + 5}
                    className={`w-full px-3 py-2 border rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                      errors.releaseYear ? 'border-red-500' : 'border-gray-600'
                    }`}
                    disabled={isSubmitting}
                  />
                  {errors.releaseYear && (
                    <p className="text-red-400 text-sm mt-1">{errors.releaseYear}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Your Rating *
                  </label>
                  <div className="flex items-center space-x-4">
                    <RatingStars
                      rating={formData.rating}
                      onRatingChange={handleRatingChange}
                      editable={!isSubmitting}
                      size={28}
                    />
                    <span className="text-white font-semibold">
                      {formData.rating.toFixed(1)}/5.0
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Genre Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Genre *
            </label>
            <div className="space-y-3">
              {/* Selected Genres */}
              {formData.genre && (
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.genre.split(', ').map((genre, index) => (
                    <span
                      key={index}
                      className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm flex items-center space-x-1"
                    >
                      <span>{genre}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveGenre(genre)}
                        className="hover:text-red-200"
                        disabled={isSubmitting}
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              )}

              {/* Genre Quick Select */}
              <div>
                <p className="text-sm text-gray-400 mb-2">Quick select genres:</p>
                <div className="flex flex-wrap gap-2">
                  {genres.map(genre => (
                    <button
                      key={genre}
                      type="button"
                      onClick={() => handleAddGenre(genre)}
                      className="bg-gray-700 hover:bg-gray-600 text-gray-300 px-3 py-1 rounded-full text-sm transition-colors disabled:opacity-50"
                      disabled={isSubmitting || formData.genre.includes(genre)}
                    >
                      + {genre}
                    </button>
                  ))}
                </div>
              </div>

              {/* Manual Genre Input */}
              <input
                type="text"
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                required
                className={`w-full px-3 py-2 border rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                  errors.genre ? 'border-red-500' : 'border-gray-600'
                }`}
                placeholder="Or type genres separated by commas (e.g., Action, Adventure)"
                disabled={isSubmitting}
              />
              {errors.genre && (
                <p className="text-red-400 text-sm mt-1">{errors.genre}</p>
              )}
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Image URL
            </label>
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              onBlur={handleImageUrlBlur}
              className={`w-full px-3 py-2 border rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                errors.imageUrl ? 'border-red-500' : 'border-gray-600'
              }`}
              placeholder="https://example.com/movie-poster.jpg"
              disabled={isSubmitting}
            />
            {errors.imageUrl && (
              <p className="text-red-400 text-sm mt-1">{errors.imageUrl}</p>
            )}
            <p className="text-gray-400 text-sm mt-1">
              Leave empty to use a default placeholder image
            </p>
          </div>

          {/* Review */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Your Review *
            </label>
            <textarea
              name="review"
              value={formData.review}
              onChange={handleChange}
              required
              rows="6"
              className={`w-full px-3 py-2 border rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none ${
                errors.review ? 'border-red-500' : 'border-gray-600'
              }`}
              placeholder="Share your thoughts about the movie... What did you like? What could be better? Would you recommend it?"
              disabled={isSubmitting}
            />
            {errors.review && (
              <p className="text-red-400 text-sm mt-1">{errors.review}</p>
            )}
            <div className="flex justify-between text-sm text-gray-400 mt-1">
              <span>Minimum 10 characters</span>
              <span>{formData.review.length} characters</span>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-700">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors duration-200 disabled:opacity-50"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 disabled:opacity-50 flex items-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Upload size={20} />
                  <span>{movie ? 'Update Review' : 'Add Movie Review'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MovieForm;