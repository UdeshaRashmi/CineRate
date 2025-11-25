const Movie = require('../models/Movie');
const User = require('../models/User');

// @desc    Get all movies
// @route   GET /api/movies
// @access  Public
exports.getMovies = async (req, res, next) => {
  try {
    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    
    // Search and filter
    const query = {};
    
    if (req.query.search) {
      query.$or = [
        { title: { $regex: req.query.search, $options: 'i' } },
        { director: { $regex: req.query.search, $options: 'i' } },
        { genre: { $regex: req.query.search, $options: 'i' } }
      ];
    }
    
    if (req.query.genre) {
      query.genre = { $regex: req.query.genre, $options: 'i' };
    }
    
    if (req.query.year) {
      query.releaseYear = parseInt(req.query.year);
    }
    
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
    
    const movies = await Movie.find(query)
      .populate('user', 'name')
      .sort(sort)
      .skip(startIndex)
      .limit(limit);
    
    const total = await Movie.countDocuments(query);
    
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

// @desc    Get single movie
// @route   GET /api/movies/:id
// @access  Public
exports.getMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id)
      .populate('user', 'name');
    
    if (!movie) {
      return res.status(404).json({
        success: false,
        message: 'Movie not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: movie
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Create new movie
// @route   POST /api/movies
// @access  Private
exports.createMovie = async (req, res, next) => {
  try {
    // Add user to req.body
    req.body.user = req.user.id;
    
    const movie = await Movie.create(req.body);
    
    res.status(201).json({
      success: true,
      data: movie
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update movie
// @route   PUT /api/movies/:id
// @access  Private
exports.updateMovie = async (req, res, next) => {
  try {
    let movie = await Movie.findById(req.params.id);
    
    if (!movie) {
      return res.status(404).json({
        success: false,
        message: 'Movie not found'
      });
    }
    
    // Check if user is the owner of the movie
    if (movie.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to update this movie'
      });
    }
    
    movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    res.status(200).json({
      success: true,
      data: movie
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Delete movie
// @route   DELETE /api/movies/:id
// @access  Private
exports.deleteMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id);
    
    if (!movie) {
      return res.status(404).json({
        success: false,
        message: 'Movie not found'
      });
    }
    
    // Check if user is the owner of the movie
    if (movie.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to delete this movie'
      });
    }
    
    await movie.remove();
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};