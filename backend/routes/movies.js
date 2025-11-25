const express = require('express');
const { protect } = require('../middleware/auth');
const {
  getMovies,
  getMovie,
  createMovie,
  updateMovie,
  deleteMovie
} = require('../controllers/moviesController');

const router = express.Router();

// Public routes
router.route('/')
  .get(getMovies);

router.route('/:id')
  .get(getMovie);

// Protected routes
router.use(protect);

router.route('/')
  .post(createMovie);

router.route('/:id')
  .put(updateMovie)
  .delete(deleteMovie);

module.exports = router;