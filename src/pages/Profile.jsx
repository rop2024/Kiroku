import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAnime } from '../context/AnimeContext';

const Profile = () => {
  const { state, dispatch } = useAnime();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(state.user);

  const stats = {
    total: state.watchlist.length,
    watching: state.watchlist.filter(a => a.status === 'watching').length,
    completed: state.watchlist.filter(a => a.status === 'completed').length,
    planToWatch: state.watchlist.filter(a => a.status === 'plan to watch').length,
  };

  const handleSave = () => {
    dispatch({ type: 'UPDATE_USER', payload: formData });
    setIsEditing(false);
  };

  return (
    <div className="container-custom py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="bg-white dark:bg-dark-200 rounded-2xl shadow-xl overflow-hidden">
          {/* Cover Image */}
          <div className="h-48 bg-gradient-to-r from-primary-600 to-primary-800" />
          
          {/* Profile Info */}
          <div className="px-8 pb-8 relative">
            <div className="flex flex-col md:flex-row items-center md:items-end -mt-16 mb-6">
              <img
                src={state.user.avatar}
                alt={state.user.name}
                className="w-32 h-32 rounded-full border-4 border-white dark:border-dark-200 bg-white"
              />
              <div className="md:ml-6 mt-4 md:mt-0 text-center md:text-left">
                {isEditing ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="input-field"
                      placeholder="Name"
                    />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="input-field"
                      placeholder="Email"
                    />
                  </div>
                ) : (
                  <>
                    <h1 className="text-3xl font-bold">{state.user.name}</h1>
                    <p className="text-gray-600 dark:text-gray-400">{state.user.email}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                      Joined {new Date(state.user.joinDate).toLocaleDateString()}
                    </p>
                  </>
                )}
              </div>
              <div className="md:ml-auto mt-4 md:mt-0">
                {isEditing ? (
                  <div className="flex gap-2">
                    <button onClick={handleSave} className="btn-primary">
                      Save
                    </button>
                    <button onClick={() => setIsEditing(false)} className="btn-secondary">
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button onClick={() => setIsEditing(true)} className="btn-primary">
                    Edit Profile
                  </button>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div className="text-center p-4 bg-gray-100 dark:bg-dark-300 rounded-lg">
                <div className="text-2xl font-bold text-primary-600">{stats.total}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Total Anime</div>
              </div>
              <div className="text-center p-4 bg-gray-100 dark:bg-dark-300 rounded-lg">
                <div className="text-2xl font-bold text-primary-600">{stats.watching}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Watching</div>
              </div>
              <div className="text-center p-4 bg-gray-100 dark:bg-dark-300 rounded-lg">
                <div className="text-2xl font-bold text-primary-600">{stats.completed}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Completed</div>
              </div>
              <div className="text-center p-4 bg-gray-100 dark:bg-dark-300 rounded-lg">
                <div className="text-2xl font-bold text-primary-600">{stats.planToWatch}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Plan to Watch</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;