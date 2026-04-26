import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAnime } from '../context/AnimeContext';

const Settings = () => {
  const { state, dispatch } = useAnime();
  const [settings, setSettings] = useState(state.settings);

  const handleChange = (key, value) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    dispatch({ type: 'UPDATE_SETTINGS', payload: { [key]: value } });
  };

  return (
    <div className="container-custom py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold mb-8">Settings</h1>
        
        <div className="max-w-2xl space-y-6">
          {/* Theme Setting */}
          <div className="bg-white dark:bg-dark-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Appearance</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <label className="font-medium">Theme</label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Choose your preferred theme</p>
                </div>
                <select
                  value={settings.theme}
                  onChange={(e) => handleChange('theme', e.target.value)}
                  className="input-field w-32"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="auto">Auto</option>
                </select>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white dark:bg-dark-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Notifications</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <label className="font-medium">Email Notifications</label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Receive updates about new episodes</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.notifications}
                    onChange={(e) => handleChange('notifications', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                </label>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <label className="font-medium">Autoplay Trailers</label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Automatically play trailers on anime pages</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.autoplayTrailers}
                    onChange={(e) => handleChange('autoplayTrailers', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Data Management */}
          <div className="bg-white dark:bg-dark-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Data Management</h2>
            <div className="space-y-4">
              <button className="btn-secondary w-full md:w-auto">
                Export Data
              </button>
              <button className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 w-full md:w-auto ml-0 md:ml-2">
                Clear All Data
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Settings;