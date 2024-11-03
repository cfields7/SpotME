import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = ({ image, onComplete }) => {
  useEffect(() => {
    // Simulate processing time (will be real later)
    const timer = setTimeout(onComplete, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-2xl mx-auto"
    >   
      <div className="bg-white/10 backdrop-blur-lg rounded-lg p-8 text-center">
        {image && (
          <div className="relative mb-6 rounded-lg overflow-hidden">
            {/* Preview of the image */}
            <img 
              src={URL.createObjectURL(image)} 
              alt="Upload Preview" 
              className="w-full h-64 object-cover"
            />
            {/* Moving bar as if scanning image */}
            <motion.div 
              className="absolute top-0 left-0 w-full h-1 bg-blue-500"
              animate={{
                y: ['0%', '6400%'],
                opacity: [1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </div>
        )}
        
        {/* Text to show progress (will be dynamic later) */}
        <h3 className="text-white text-xl mb-4">Uploading/Searching...</h3>
        <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-blue-500"
            animate={{
              x: ['-100%', '100%']
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;