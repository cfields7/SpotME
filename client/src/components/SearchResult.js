import React from 'react';
import { motion } from 'framer-motion';

const SearchResult = ({ image, result, mode, error, onBack, onRegister }) => {

  const decodeImage = (base64String) => {
    return `data:image/jpeg;base64,${base64String}`;
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -300 }}
      className="max-w-2xl mx-auto"
    >
      {/* Logo */}
      <div className="flex justify-center items-center mt-0 mb-8">
        <img 
          src="/spotme.png" 
          alt="SpotMe Logo" 
          className="object-contain w-52 h-62 py-5"
        />
      </div>

      <div className="bg-black/20 backdrop-blur-lg justify-center items-center flexrounded-lg p-6">
      {result ? (
        <div className="text-white">
          {mode==="search" && (
            <p className="flex justify-center items-center mt-0 mb-8 text-4xl font-bold font-sans">
              Match Found!
            </p>
          )}
          {/* Display match results */}
          <div className="space-y-4">
            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
              <div className="flex justify-center items-center gap-4">
                {image && (
                  <div className="flex justify-center items-center w-32 h-32">
                    <img 
                      src={URL.createObjectURL(image)} 
                      alt="Upload Preview" 
                      className="max-w-full max-h-full object-contain rounded-lg"
                    />
                  </div>
                )}
                <div className="flex justify-center items-center w-32 h-32">
                  <img
                    src={decodeImage(result.image)}
                    alt={`${result.firstName} ${result.lastName}`}
                    className="max-w-full max-h-full object-contain rounded-lg"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-100 text-sm">Name</label>
                <p>{result.firstName} {result.lastName}</p>
              </div>
              <div>
                <label className="block text-gray-100 text-sm">Email</label>
                <p>{result.email}</p>
              </div>
              <div>
                <label className="block text-gray-100 text-sm">Phone</label>
                <p>{result.phone}</p>
              </div>
              {result.instagram && (
                <div>
                  <label className="block text-gray-100 text-sm">Instagram</label>
                  <p>{result.instagram}</p>
                </div>
              )}
              {result.snapchat && (
                <div>
                  <label className="block text-gray-100 text-sm">Snapchat</label>
                  <p>{result.snapchat}</p>
                </div>
              )}
            </div>
            <br />
            <div className="flex space-x-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gradient-to-b from-red-500 to-red-900 text-white px-10 py-3 rounded-lg font-semibold"
                onClick={onBack}
              >
                Back
              </motion.button>
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