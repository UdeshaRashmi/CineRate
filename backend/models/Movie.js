const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  director: {
    type: String,
    required: [true, 'Please add a director'],
    trim: true,
    maxlength: [50, 'Director name cannot be more than 50 characters']
  },
  genre: {
    type: String,
    required: [true, 'Please add at least one genre'],
    trim: true
  },
  releaseYear: {
    type: Number,
    required: [true, 'Please add a release year'],
    min: [1900, 'Year must be after 1900'],
    max: [new Date().getFullYear() + 5, 'Year cannot be more than 5 years in the future']
  },
  rating: {
    type: Number,
    required: [true, 'Please add a rating'],
    min: [0, 'Rating must be at least 0'],
    max: [5, 'Rating cannot be more than 5'],
    set: function(val) {
      return Math.round(val * 2) / 2; // Round to nearest 0.5
    }
  },
  review: {
    type: String,
    required: [true, 'Please add a review'],
    minlength: [10, 'Review must be at least 10 characters']
  },
  imageUrl: {
    type: String,
    default: ''
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for better query performance
movieSchema.index({ user: 1 });
movieSchema.index({ title: 1 });
movieSchema.index({ genre: 1 });
movieSchema.index({ releaseYear: -1 });
movieSchema.index({ rating: -1 });

module.exports = mongoose.model('Movie', movieSchema);