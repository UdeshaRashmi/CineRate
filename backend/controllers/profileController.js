const User = require('../models/User');
const Movie = require('../models/Movie');

// @desc    Get current user profile
// @route   GET /api/profile
// @access  Private
exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt
      }
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
    const fieldsToUpdate = {
      name: req.body.name,
      email: req.body.email
    };

    // Remove undefined fields
    Object.keys(fieldsToUpdate).forEach(key => {
      if (fieldsToUpdate[key] === undefined) {
        delete fieldsToUpdate[key];
      }
    });

    const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt
      }
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
    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;

    // Sorting
    let sort = {};
    switch (req.query.sort) {
      case 'title':
        sort.title = 1;
        break;
      case 'year':
        sort.releaseYear = -1;
        break;
      case 'rating':
        sort.rating = -1;
        break;
      default:
        sort.createdAt = -1;
    }

    const movies = await Movie.find({ user: req.user.id })
      .sort(sort)
      .skip(startIndex)
      .limit(limit);

    const total = await Movie.countDocuments({ user: req.user.id });

    res.status(200).json({
      success: true,
      count: movies.length,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      },
      data: movies
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get user profile stats
// @route   GET /api/profile/stats
// @access  Private
exports.getProfileStats = async (req, res, next) => {
  try {
    const stats = await Movie.aggregate([
      { $match: { user: req.user._id } },
      {
        $group: {
          _id: null,
          totalMovies: { $sum: 1 },
          averageRating: { $avg: '$rating' },
          highestRated: { $max: '$rating' },
          lowestRated: { $min: '$rating' },
          totalGenres: { $addToSet: '$genre' }
        }
      }
    ]);

    const result = stats[0] || {
      totalMovies: 0,
      averageRating: 0,
      highestRated: 0,
      lowestRated: 0,
      totalGenres: []
    };

    // Count unique genres
    result.totalGenres = result.totalGenres ? result.totalGenres.length : 0;

    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};