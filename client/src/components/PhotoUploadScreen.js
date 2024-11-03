import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, X } from 'lucide-react';

const PhotoUploadScreen = ({ onUpload, onUpload2, onCancel, mode }) => {
  const fileInputRef = useRef(null);

  // Get the image file and set it
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
        onUpload(file); // send the file
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result.split(',')[1]; // Get the Base64 string
            onUpload2(base64String); // Send the Base64 string 
          };
          reader.readAsDataURL(file); // Read the file as a Data URL
    } else {
        alert('Please select a valid image file');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="max-w-2xl mx-auto"
    >
      <div className="bg-white/10 backdrop-blur-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold text-white text-center mb-6">
          {mode === 'search' ? 'Upload Photo to Search' : 'Upload Photo to Register'}
        </h2>
        
        <div 
          className="border-2 border-dashed border-gray-400 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-300 mb-2">Click to upload or drag and drop</p>
          <p className="text-gray-400 text-sm">PNG, JPG up to 10MB</p>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full mt-6 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-3 rounded-lg font-semibold"
          onClick={onCancel}
        >
          Cancel
        </motion.button>
      </div>
    </motion.div>
  );
};

export default PhotoUploadScreen;