import React from 'react';
import { Edit, Trash2, Calendar, User, Eye } from 'lucide-react';
import RatingStars from './RatingStars';

const MovieCard = ({ movie, onEdit, onDelete, onViewDetails, viewMode = 'grid' }) => {
  if (viewMode === 'list') {
    return (
      <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-colors duration-200">
        <div className="flex items-start space-x-4">
          <img
            src={movie.imageUrl}
            alt={movie.title}
            className="w-24 h-32 object-cover rounded-lg flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-semibold text-white truncate">{movie.title}</h3>
              <RatingStars rating={movie.rating} />
            </div>
            <div className="flex items-center space-x-4 text-gray-300 mb-3">
              <div className="flex items-center">
                <User size={16} className="mr-1" />
                <span className="text-sm">{movie.director}</span>
              </div>
              <div className="flex items-center">
                <Calendar size={16} className="mr-1" />
                <span className="text-sm">{movie.releaseYear}</span>
              </div>
            </div>
            <div className="mb-3">
              <span className="inline-block bg-purple-600 text-white px-2 py-1 rounded text-xs">
                {movie.genre}
              </span>
            </div>
            <p className="text-gray-300 text-sm line-clamp-2 mb-4">
              {movie.review}
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => onViewDetails(movie.id)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center text-sm"
              >
                <Eye size={16} className="mr-2" />
                View Details
              </button>
              <button
                onClick={() => onEdit(movie)}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center text-sm"
              >
                <Edit size={16} className="mr-2" />
                Edit
              </button>
              <button
                onClick={() => onDelete(movie.id)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center text-sm"
              >
                <Trash2 size={16} className="mr-2" />
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
      <div 
        className="relative cursor-pointer" 
        onClick={() => onViewDetails(movie.id)}
      >
        <img
          src={movie.imageUrl}
          alt={movie.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2">
          <div className="bg-black bg-opacity-70 rounded-full p-1">
            <Eye size={16} className="text-white" />
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-white truncate">{movie.title}</h3>
          <RatingStars rating={movie.rating} />
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-300">
            <User size={16} className="mr-2" />
            <span className="text-sm">{movie.director}</span>
          </div>
          <div className="flex items-center text-gray-300">
            <Calendar size={16} className="mr-2" />
            <span className="text-sm">{movie.releaseYear}</span>
          </div>
        </div>

        <div className="mb-4">
          <span className="inline-block bg-purple-600 text-white px-3 py-1 rounded-full text-sm">
            {movie.genre}
          </span>
        </div>

        <p className="text-gray-300 text-sm mb-4 line-clamp-3">
          {movie.review}
        </p>

        <div className="flex space-x-3">
          <button
            onClick={() => onViewDetails(movie.id)}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center text-sm"
          >
            <Eye size={16} className="mr-2" />
            Details
          </button>
          <button
            onClick={() => onEdit(movie)}
            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center text-sm"
          >
            <Edit size={16} className="mr-2" />
            Edit
          </button>
          <button
            onClick={() => onDelete(movie.id)}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center text-sm"
          >
            <Trash2 size={16} className="mr-2" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;