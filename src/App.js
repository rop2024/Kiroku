import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimeProvider } from './context/AnimeContext';
import Layout from './components/Layout/Layout';
import ScrollToTop from './components/Common/ScrollToTop';
import Home from './pages/Home';
import AnimeDetails from './pages/AnimeDetails';
import Watchlist from './pages/Watchlist';
import Profile from './pages/Profile';
import Search from './pages/Search';
import Settings from './pages/Settings';

function App() {
  return (
    <AnimeProvider>
      <Router>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/anime/:id" element={<AnimeDetails />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/search" element={<Search />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Layout>
      </Router>
    </AnimeProvider>
  );
}

export default App;