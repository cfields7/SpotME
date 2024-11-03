import React from 'react';
import { motion } from 'framer-motion';

const MatchSelectionScreen = ({ matches, onSelectMatch, onBack }) => {
  const decodeImage = (base64String) => {
    return `data:image/jpeg;base64,${base64String}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -300 }}
      className="max-w-4xl mx-auto"
    >
    {/* Logo */}
      <div className="flex justify-center items-center mt-0 mb-8">
        <img 
          src="/spotme.png" 
          alt="SpotMe Logo" 
          className="object-contain w-52 h-62 py-5"
        />
      </div>

      <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
        <h2 className="text-white text-2xl font-bold mb-6 text-center">Multiple Matches Found</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {matches.map((match, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/20 backdrop-blur-lg rounded-lg p-4 cursor-pointer"
              onClick={() => onSelectMatch(match)}
            >
                {/* Show the image decoded from base64 */}
              <img
                src={decodeImage(match.image)}
                alt={`${match.firstName} ${match.lastName}`}
                className="w-32 h-32 object-cover rounded-lg mx-auto mb-3"
              />
              <p className="text-white text-center font-semibold">
                {match.firstName} {match.lastName}
              </p>
            </motion.div>
          ))}
        </div>
        
        <div className="flex justify-center mt-6">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-10 py-3 rounded-lg font-semibold"
            onClick={onBack}
          >
            Back
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default MatchSelectionScreen;