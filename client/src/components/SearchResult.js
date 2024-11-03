import React from 'react';
import { motion } from 'framer-motion';

const SearchResult = ({ image, result, error, onBack, onRegister }) => {
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
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
            {image && (
                <div className="mb-6">
                    <img 
                    src={URL.createObjectURL(image)} 
                    alt="Upload Preview" 
                    className="w-32 h-32 object-cover rounded-lg mx-auto"
                    />
                </div>
                )}
                </div>
                <br />
                <div>
                  <label className="block text-gray-400 text-sm">Name</label>
                  <p>{result.firstName} {result.lastName}</p>
                </div>
                <div>
                  <label className="block text-gray-400 text-sm">Email</label>
                  <p>{result.email}</p>
                </div>
                <div>
                  <label className="block text-gray-400 text-sm">Phone</label>
                  <p>{result.phone}</p>
                </div>
                {result.instagram && (
                  <div>
                    <label className="block text-gray-400 text-sm">Instagram</label>
                    <p>{result.instagram}</p>
                  </div>
                )}
                {result.snapchat && (
                  <div>
                    <label className="block text-gray-400 text-sm">Snapchat</label>
                    <p>{result.snapchat}</p>
                  </div>
                )}
              </div>
            </div>
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