import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAnime } from '../context/AnimeContext';
import LoadingSpinner from '../components/Common/LoadingSpinner';

const AnimeDetails = () => {
  const { id } = useParams();
  const { state, dispatch } = useAnime();
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState('plan to watch');

  const isInWatchlist = state.watchlist.some(item => item.id === parseInt(id));

  useEffect(() => {
    // Mock API call to fetch anime details
    setTimeout(() => {
      setAnime({
        id: parseInt(id),
        title: 'Sample Anime',
        image: 'https://via.placeholder.com/800x400',
        rating: 8.5,
        episodes: 24,
        status: 'Airing',
        genres: ['Action', 'Adventure'],
        description: 'This is a detailed description of the anime. It includes information about the plot, characters, and more.',
        studio: 'Studio Name',
        year: 2024,
        season: 'Winter',
      });
      setLoading(false);
    }, 500);
  }, [id]);

  const handleAddToWatchlist = () => {
    if (!isInWatchlist) {
      dispatch({
        type: 'ADD_TO_WATCHLIST',
        payload: { ...anime, status: selectedStatus, progress: 0 }
      });
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container-custom py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Hero Section */}
        <div className="relative rounded-2xl overflow-hidden mb-8">
          <img
            src={anime.image}
            alt={anime.title}
            className="w-full h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{anime.title}</h1>
            <div className="flex flex-wrap gap-4 mb-4">
              <span className="bg-yellow-500 text-dark-100 px-3 py-1 rounded-full">
                ★ {anime.rating}
              </span>
              <span className="bg-primary-600 px-3 py-1 rounded-full">
                {anime.episodes} Episodes
              </span>
              <span className="bg-gray-700 px-3 py-1 rounded-full">
                {anime.status}
              </span>
            </div>
            <div className="flex gap-3">
              {!isInWatchlist ? (
                <div className="flex gap-3">
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="px-4 py-2 rounded-lg bg-white text-dark-100"
                  >
                    <option value="watching">Watching</option>
                    <option value="plan to watch">Plan to Watch</option>
                    <option value="completed">Completed</option>
                    <option value="on hold">On Hold</option>
                    <option value="dropped">Dropped</option>
                  </select>
                  <button
                    onClick={handleAddToWatchlist}
                    className="btn-primary"
                  >
                    Add to Watchlist
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => dispatch({ type: 'REMOVE_FROM_WATCHLIST', payload: anime.id })}
                  className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
                >
                  Remove from Watchlist
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-4">Synopsis</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {anime.description}
            </p>
          </div>
          <div>
            <div className="bg-gray-100 dark:bg-dark-200 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Information</h3>
              <div className="space-y-3">
                <div>
                  <span className="font-semibold">Studio:</span>
                  <span className="ml-2 text-gray-600 dark:text-gray-400">{anime.studio}</span>
                </div>
                <div>
                  <span className="font-semibold">Year:</span>
                  <span className="ml-2 text-gray-600 dark:text-gray-400">{anime.year}</span>
                </div>
                <div>
                  <span className="font-semibold">Season:</span>
                  <span className="ml-2 text-gray-600 dark:text-gray-400">{anime.season}</span>
                </div>
                <div>
                  <span className="font-semibold">Genres:</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {anime.genres.map((genre, index) => (
                      <span key={index} className="bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 px-2 py-1 rounded-md text-sm">
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AnimeDetails;