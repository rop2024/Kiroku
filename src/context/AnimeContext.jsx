import React, { createContext, useContext, useReducer, useEffect } from 'react';

const AnimeContext = createContext();

const initialState = {
  watchlist: JSON.parse(localStorage.getItem('watchlist') || '[]'),
  user: {
    name: 'Anime Fan',
    email: 'fan@anime.com',
    avatar: 'https://via.placeholder.com/150',
    joinDate: '2024-01-01',
  },
  settings: {
    theme: 'light',
    notifications: true,
    autoplayTrailers: false,
  },
};

function animeReducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_WATCHLIST':
      if (!state.watchlist.find(anime => anime.id === action.payload.id)) {
        return { ...state, watchlist: [...state.watchlist, action.payload] };
      }
      return state;
    
    case 'REMOVE_FROM_WATCHLIST':
      return { ...state, watchlist: state.watchlist.filter(anime => anime.id !== action.payload) };
    
    case 'UPDATE_WATCHLIST_STATUS':
      return {
        ...state,
        watchlist: state.watchlist.map(anime =>
          anime.id === action.payload.id
            ? { ...anime, status: action.payload.status, progress: action.payload.progress }
            : anime
        ),
      };
    
    case 'UPDATE_USER':
      return { ...state, user: { ...state.user, ...action.payload } };
    
    case 'UPDATE_SETTINGS':
      return { ...state, settings: { ...state.settings, ...action.payload } };
    
    default:
      return state;
  }
}

export function AnimeProvider({ children }) {
  const [state, dispatch] = useReducer(animeReducer, initialState);

  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(state.watchlist));
  }, [state.watchlist]);

  return (
    <AnimeContext.Provider value={{ state, dispatch }}>
      {children}
    </AnimeContext.Provider>
  );
}

export function useAnime() {
  const context = useContext(AnimeContext);
  if (!context) {
    throw new Error('useAnime must be used within an AnimeProvider');
  }
  return context;
}