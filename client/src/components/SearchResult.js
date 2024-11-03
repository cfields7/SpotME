import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

const SearchResult = ({ result, onBack, onRegister }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -300 }}
      className="max-w-2xl mx-auto"
    >
      <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
        {result ? (
          <div className="text-white">
            <h2 className="text-2xl font-bold mb-4">Match Found!</h2>
            {/* Display match results */}
          </div>
        ) : (
          <div className="text-white text-center">
            <h2 className="text-2xl font-bold mb-4">No Match Found</h2>
            <p className="text-gray-300 mb-6">Would you like to register this face?</p>
            <div className="flex space-x-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold"
                onClick={onRegister}
              >
                Register New Face
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-6 py-3 rounded-lg font-semibold"
                onClick={onBack}
              >
                Try Again
              </motion.button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default SearchResult;