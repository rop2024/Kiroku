import React from 'react';
import AnimeCard from './AnimeCard';

const AnimeGrid = ({ anime }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {anime.map((item) => (
        <AnimeCard key={item.id} anime={item} />
      ))}
    </div>
  );
};

export default AnimeGrid;