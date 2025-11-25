const User = require('../models/User');
const Movie = require('../models/Movie');
const mongoose = require('mongoose');

// @desc    Get user profile
// @route   GET /api/profile
// @access  Private
exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/profile
// @access  Private
exports.updateProfile = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    
    // Build user object
    const userFields = {};
    if (name) userFields.name = name;
    if (email) userFields.email = email;
    
    const user = await User.findByIdAndUpdate(
      req.user.id,
      userFields,
      {
        new: true,
        runValidators: true
      }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get user's movies
// @route   GET /api/profile/movies
// @access  Private
exports.getUserMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({ user: req.user.id })
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: movies.length,
      data: movies
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get user's movie stats
// @route   GET /api/profile/stats
// @access  Private
exports.getProfileStats = async (req, res, next) => {
  try {
    const movieCount = await Movie.countDocuments({ user: req.user.id });
    
    const stats = await Movie.aggregate([
      { $match: { user: mongoose.Types.ObjectId(req.user.id) } },
      {
        $group: {
          _id: null,
          averageRating: { $avg: '$rating' },
          totalReviews: { $sum: 1 }
        }
      }
    ]);
    
    const profileStats = {
      totalMovies: movieCount,
      averageRating: stats.length > 0 ? stats[0].averageRating : 0,
      totalReviews: stats.length > 0 ? stats[0].totalReviews : 0
    };
    
    res.status(200).json({
      success: true,
      data: profileStats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};