import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AnimeGrid from '../components/Anime/AnimeGrid';
import LoadingSpinner from '../components/Common/LoadingSpinner';

// Mock data for demonstration
const mockAnime = [
  {
    id: 1,
    title: 'Attack on Titan',
    image: 'https://via.placeholder.com/300x400',
    rating: 9.0,
    episodes: 75,
    status: 'Completed',
    genres: ['Action', 'Drama', 'Fantasy'],
  },
  {
    id: 2,
    title: 'Demon Slayer',
    image: 'https://via.placeholder.com/300x400',
    rating: 8.8,
    episodes: 44,
    status: 'Airing',
    genres: ['Action', 'Supernatural'],
  },
  // Add more mock anime as needed
];

const Home = () => {
  const [trendingAnime, setTrendingAnime] = useState([]);
  const [popularAnime, setPopularAnime] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setTrendingAnime(mockAnime);
      setPopularAnime(mockAnime);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container-custom py-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Track Your Anime Journey
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Discover, track, and share your favorite anime with the community.
          </p>
          <button className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
            Get Started
          </button>
        </div>
      </motion.div>

      {/* Trending Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-12"
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Trending Now</h2>
        <AnimeGrid anime={trendingAnime} />
      </motion.section>

      {/* Popular Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Most Popular</h2>
        <AnimeGrid anime={popularAnime} />
      </motion.section>
    </div>
  );
};

export default Home;