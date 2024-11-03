import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = ({ image, onComplete }) => {
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  useEffect(() => {
    // Simulate processing time (will be real later)
    const timer = setTimeout(onComplete, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  useEffect(() => {
    if (image) {
      const img = new Image();
      img.src = URL.createObjectURL(image);
      img.onload = () => {
        setImageDimensions({
          width: img.width,
          height: img.height,
        });
      };
    }
  }, [image]);

  const aspectRatio = imageDimensions.height / imageDimensions.width;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
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
      <div className="bg-white/10 backdrop-blur-lg rounded-lg p-8 text-center">
        {image && (
          <div 
            className="relative mb-6 rounded-lg overflow-hidden"
            style={{ 
              paddingBottom: `${aspectRatio * 100}%`,
              maxHeight: '400px'
            }}
          >
            {/* Preview of the image */}
            <img 
              src={URL.createObjectURL(image)} 
              alt="Upload Preview" 
              className="absolute top-0 left-0 w-full h-full object-contain"
            />
            {/* Moving bar as if scanning image */}
            <motion.div 
              className="absolute top-0 left-0 w-full h-full"
              style={{
                background: 'linear-gradient(transparent, rgba(59, 130, 246, 0.2), transparent)',
                transform: 'rotate(-45deg)',
              }}
              animate={{
                y: ['-100%', '200%'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            {/* Additional rotating gradient for enhanced effect */}
            <motion.div 
              className="absolute top-0 left-0 w-full h-full"
              style={{
                background: 'linear-gradient(transparent, rgba(59, 130, 246, 0.1), transparent)',
                transform: 'rotate(45deg)',
              }}
              animate={{
                y: ['200%', '-100%'],
              }}
              transition={{
                duration: 2.5,
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