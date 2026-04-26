import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import AnimeGrid from '../components/Anime/AnimeGrid';
import LoadingSpinner from '../components/Common/LoadingSpinner';

const Search = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (query) {
      setLoading(true);
      // Simulate search API call
      setTimeout(() => {
        // Mock search results
        const mockResults = [
          {
            id: 1,
            title: `Search Result for "${query}"`,
            image: 'https://via.placeholder.com/300x400',
            rating: 8.5,
            episodes: 12,
            status: 'Airing',
            genres: ['Action', 'Fantasy'],
          },
        ];
        setResults(mockResults);
        setLoading(false);
      }, 500);
    }
  }, [query]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container-custom py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold mb-2">
          Search Results for "{query}"
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Found {results.length} results
        </p>

        {results.length > 0 ? (
          <AnimeGrid anime={results} />
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No results found for "{query}". Try searching for something else!
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Search;