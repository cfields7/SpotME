import React, { useState } from 'react';
import { motion } from 'framer-motion';

const RegisterForm = ({ image, onSubmit, onCancel }) => {
 // Default form data values with empty strings
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    instagram: '',
    snapchat: '',
  });

  // Function to handle the changing of anything updating the form data
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Pressing submit button (sends back home for now)
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -300 }}
      className="max-w-2xl mx-auto"
    >
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
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="p-3 bg-white/5 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="p-3 bg-white/5 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="p-3 bg-white/5 border border-gray-600 rounded-lg text-white col-span-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="p-3 bg-white/5 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            <div className="col-span-2">
              <label className="block text-gray-300 mb-2">Socials</label>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="instagram"
                  placeholder="Instagram"
                  value={formData.instagram}
                  onChange={handleChange}
                  className="p-3 bg-white/5 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
                <input
                  type="text"
                  name="snapchat"
                  placeholder="Snapchat"
                  value={formData.snapchat}
                  onChange={handleChange}
                  className="p-3 bg-white/5 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
          <div className="flex space-x-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-3 rounded-lg font-semibold"
            >
              Save Data
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 text-white px-4 py-3 rounded-lg font-semibold"
            >
              Cancel
            </motion.button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default RegisterForm;