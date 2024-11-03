import './App.css';
import { useState } from 'react';

const App = () => {
  // Set the blank form data structure
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    instagram: '',
    snapchat: '',
  });


  // Update the form data everytime a user updates a box
  const handleDataChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-red-800 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-8">SpotME App</h1>
    
          {/* User Input */}
          <form onSubmit={handleDataChange} className="space-y-4 mb-8">
            <div className="grid grid-cols-2 gap-4">
              {/* Username will later be replaced by a photo and reference id*/}
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                className="p-2 border rounded col-span-2"
                onChange={handleDataChange}
                required
              />
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                className="p-2 border rounded"
                onChange={handleDataChange}
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                className="p-2 border rounded"
                onChange={handleDataChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                className="p-2 border rounded col-span-2"
                onChange={handleDataChange}
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                className="p-2 border rounded"
                onChange={handleDataChange}
              />
              <br />
              <label>Socials</label>
              <br />
              <input
                type="text"
                name="instagram"
                placeholder="Instagram"
                value={formData.instagram}
                className="p-2 border rounded"
                onChange={handleDataChange}
              />
              <input
                type="text"
                name="snapchat"
                placeholder="Snapchat"
                value={formData.snapchat}
                className="p-2 border rounded"
                onChange={handleDataChange}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Save Data
            </button>
          </form>
        </div>
      </div>
    );
  };

export default App;
