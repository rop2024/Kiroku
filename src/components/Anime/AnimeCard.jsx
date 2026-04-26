import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const AnimeCard = ({ anime }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="card group"
    >
      <Link to={`/anime/${anime.id}`}>
        <div className="relative overflow-hidden">
          <img
            src={anime.image}
            alt={anime.title}
            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute top-2 right-2 bg-yellow-500 text-dark-100 px-2 py-1 rounded-md text-sm font-semibold">
            ★ {anime.rating}
          </div>
          {anime.status && (
            <div className="absolute bottom-2 left-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded-md text-xs">
              {anime.status}
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-1">{anime.title}</h3>
          <div className="flex flex-wrap gap-1 mb-2">
            {anime.genres?.slice(0, 2).map((genre, index) => (
              <span key={index} className="text-xs bg-gray-200 dark:bg-dark-300 px-2 py-1 rounded">
                {genre}
              </span>
            ))}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {anime.episodes} episodes
          </p>
        </div>
      </Link>
    </motion.div>
  );
};

export default AnimeCard;