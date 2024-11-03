import React from 'react';
import { motion } from 'framer-motion';
import { Search, UserPlus } from 'lucide-react';

const TitleScreen = ({ onScreenChange, setMode }) => {
  return (
    
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto space-y-6"
    >

        {/* Logo */}
        <div className="flex justify-center items-center mt-20 mb-8">
          <img 
            src="/spotme.png" 
            alt="SpotMe Logo" 
            className="h-41 object-contain py-8"
          />
        </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full bg-gradient-to-b from-red-500 to-red-800 text-white p-6 rounded-lg shadow-lg flex items-center justify-center space-x-3 hover:from-red-600 hover:to-red-900 transition-all"
        onClick={() => {
            onScreenChange('loading');
            setMode('search');
          }}
      >
        <Search className="w-6 h-6" />
        <span className="text-lg font-semibold">Search Faces</span>
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full bg-gradient-to-b from-purple-500 to-purple-800 text-white p-6 rounded-lg shadow-lg flex items-center justify-center space-x-3 hover:from-purple-600 hover:to-purple-800 transition-all"
        onClick={() => onScreenChange('register')}
      >
        <UserPlus className="w-6 h-6" />
        <span className="text-lg font-semibold">Register Faces</span>
      </motion.button>
    </motion.div>
  );
};

export default TitleScreen;