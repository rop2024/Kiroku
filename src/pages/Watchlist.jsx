import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAnime } from '../context/AnimeContext';
import AnimeCard from '../components/Anime/AnimeCard';

const Watchlist = () => {
  const { state, dispatch } = useAnime();
  const [filter, setFilter] = useState('all');

  const statuses = ['all', 'watching', 'completed', 'plan to watch', 'on hold', 'dropped'];

  const filteredAnime = filter === 'all'
    ? state.watchlist
    : state.watchlist.filter(anime => anime.status === filter);

  return (
    <div className="container-custom py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold mb-2">My Watchlist</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {state.watchlist.length} anime in your collection
        </p>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-8">
          {statuses.map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg capitalize transition ${
                filter === status
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 dark:bg-dark-300 text-gray-700 dark:text-gray-300 hover:bg-gray-300'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Watchlist Grid */}
        {filteredAnime.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            <AnimatePresence>
              {filteredAnime.map((anime) => (
                <motion.div
                  key={anime.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  <AnimeCard anime={anime} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              Your watchlist is empty. Start adding some anime!
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Watchlist;