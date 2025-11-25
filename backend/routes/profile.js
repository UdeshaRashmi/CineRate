const express = require('express');
const { protect } = require('../middleware/auth');
const {
  getProfile,
  updateProfile,
  getUserMovies,
  getProfileStats
} = require('../controllers/profileController');

const router = express.Router();

// All routes are protected
router.use(protect);

// Profile routes
router.route('/')
  .get(getProfile)
  .put(updateProfile);

// User movies routes
router.route('/movies')
  .get(getUserMovies);

// Profile stats routes
router.route('/stats')
  .get(getProfileStats);

module.exports = router;