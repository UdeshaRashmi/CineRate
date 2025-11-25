import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Filter, Grid, List, Plus } from 'lucide-react';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';
import { movieService } from '../services/movieService';

const MovieList = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [sortBy, setSortBy] = useState('rating');
  const [yearFilter, setYearFilter] = useState('all');

  useEffect(() => {
    loadMovies();
  }, []);

  useEffect(() => {
    filterAndSortMovies();
  }, [movies, searchTerm, selectedGenre, sortBy, yearFilter]);

  const loadMovies = async () => {
    try {
      setLoading(true);
      const moviesData = await movieService.getMovies();
      setMovies(moviesData);
    } catch (error) {
      console.error('Error loading movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortMovies = () => {
    let filtered = movies;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.director.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.genre.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply genre filter
    if (selectedGenre !== 'all') {
      filtered = filtered.filter(movie =>
        movie.genre.toLowerCase().includes(selectedGenre.toLowerCase())
      );
    }

    // Apply year filter
    if (yearFilter !== 'all') {
      const currentYear = new Date().getFullYear();
      let startYear, endYear;

      switch (yearFilter) {
        case '2020s':
          startYear = 2020;
          endYear = currentYear;
          break;
        case '2010s':
          startYear = 2010;
          endYear = 2019;
          break;
        case '2000s':
          startYear = 2000;
          endYear = 2009;
          break;
        case '1990s':
          startYear = 1990;
          endYear = 1999;
          break;
        case 'oldies':
          startYear = 1900;
          endYear = 1989;
          break;
        default:
          startYear = 1900;
          endYear = currentYear;
      }

      filtered = filtered.filter(movie =>
        movie.releaseYear >= startYear && movie.releaseYear <= endYear
      );
    }

    // Apply sorting
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'year':
          return b.releaseYear - a.releaseYear;
        case 'director':
          return a.director.localeCompare(b.director);
        case 'rating':
        default:
          return b.rating - a.rating;
      }
    });

    setFilteredMovies(filtered);
  };

  const handleEditMovie = (movie) => {
    navigate(`/edit-movie/${movie.id}`);
  };

  const handleDeleteMovie = async (movieId) => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      try {
        await movieService.deleteMovie(movieId);
        await loadMovies();
      } catch (error) {
        console.error('Error deleting movie:', error);
      }
    }
  };

  const handleViewDetails = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  const genres = ['all', ...new Set(movies.flatMap(movie => movie.genre.split(', ')))];
  const years = ['all', '2020s', '2010s', '2000s', '1990s', 'oldies'];

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Movie Collection</h1>
            <p className="text-gray-400">Discover and explore our curated movie reviews</p>
          </div>
          <button
            onClick={() => navigate('/add-movie')}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors duration-200 flex items-center space-x-2 mt-4 lg:mt-0"
          >
            <Plus size={20} />
            <span>Add New Movie</span>
          </button>
        </div>

        {/* Controls */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <SearchBar
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                placeholder="Search movies, directors, or genres..."
              />
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Genre Filter */}
              <div className="flex items-center space-x-2">
                <Filter size={20} className="text-gray-400" />
                <select
                  value={selectedGenre}
                  onChange={(e) => setSelectedGenre(e.target.value)}
                  className="bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {genres.map(genre => (
                    <option key={genre} value={genre}>
                      {genre === 'all' ? 'All Genres' : genre}
                    </option>
                  ))}
                </select>
              </div>

              {/* Year Filter */}
              <select
                value={yearFilter}
                onChange={(e) => setYearFilter(e.target.value)}
                className="bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {years.map(year => (
                  <option key={year} value={year}>
                    {year === 'all' ? 'All Years' : 
                     year === '2020s' ? '2020s' :
                     year === '2010s' ? '2010s' :
                     year === '2000s' ? '2000s' :
                     year === '1990s' ? '1990s' : 'Oldies'}
                  </option>
                ))}
              </select>

              {/* Sort By */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="rating">Sort by Rating</option>
                <option value="title">Sort by Title</option>
                <option value="year">Sort by Year</option>
                <option value="director">Sort by Director</option>
              </select>

              {/* View Mode */}
              <div className="flex border border-gray-600 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300'}`}
                >
                  <Grid size={20} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300'}`}
                >
                  <List size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-400">
            Showing {filteredMovies.length} of {movies.length} movies
          </p>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="text-purple-400 hover:text-purple-300 text-sm"
            >
              Clear search
            </button>
          )}
        </div>

        {/* Movies Grid/List */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
          </div>
        ) : filteredMovies.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-4">No movies found</div>
            <p className="text-gray-500 mb-4">
              {searchTerm ? 'Try adjusting your search terms or filters' : 'No movies in the collection yet'}
            </p>
            {!searchTerm && (
              <button
                onClick={() => navigate('/add-movie')}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Add Your First Movie
              </button>
            )}
          </div>
        ) : (
          <div className={
            viewMode === 'grid' 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              : "space-y-4"
          }>
            {filteredMovies.map(movie => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onEdit={handleEditMovie}
                onDelete={handleDeleteMovie}
                onViewDetails={handleViewDetails}
                viewMode={viewMode}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieList;