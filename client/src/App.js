import React, { useState } from 'react';
import TitleScreen from './components/TitleScreen';
import LoadingScreen from './components/LoadingScreen';
import RegisterForm from './components/RegisterForm';
import SearchResult from './components/SearchResult';
import PhotoUploadScreen from './components/PhotoUploadScreen';

const API_BASE_URL = 'http://localhost:3001/api';

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('title');
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImage2, setSelectedImage2] = useState(null);
  const [searchResult, setSearchResult] = useState(null);
  const [userData, setUserData] = useState(null);
  const [mode, setMode] = useState(null); // this can either be 'search' or 'register' depending on what they click
  const [error, setError] = useState(null);

  const searchFace = async (imageFile) => {
    try {
      setError(null);
      const formData = new FormData();
      formData.append('image', imageFile);

      const response = await fetch(`${API_BASE_URL}/users/search`, {
        method: 'POST',
        body: formData,
      });

      console.log('Search response status:', response.status);
      const data = await response.json();
      console.log('Search response data:', data);

      if (!response.ok) {
        throw new Error(data.error || 'Error searching face');
      }

      setUserData(data);
      setCurrentScreen('result');
    } catch (error) {
      console.error('Error in searchFace:', error);
      setError(error.message);
      setCurrentScreen('result');
    }
  };

  const registerFace = async (formData, imageFile) => {
    try {
      setError(null);
      setCurrentScreen('loading');

      const submitFormData = new FormData();
      submitFormData.append('image', selectedImage2);
      // Append all form fields to FormData
      Object.keys(formData).forEach(key => {
        submitFormData.append(key, formData[key]);
      });

      // Testing to see how this sends with the photo
      console.log(submitFormData);

      const response = await fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        body: submitFormData,
      });

      console.log('Submit response status:', response.status);
      const data = await response.json();
      console.log('Submit response data:', data);

      if (!response.ok) {
        throw new Error(data.error || 'Error registering face');
      }

      setCurrentScreen('title');
    } catch (error) {
      console.error('Error in registerFace:', error);
      setError(error.message);
      setCurrentScreen('register'); // Go back to form on error
    }
  };

  const handlePhotoUpload = (file) => {
    setSelectedImage(file);
    if (mode === "search") {
        setCurrentScreen('loading'); // Show loading screen after uploading photo
    } else {
        setCurrentScreen('register');
    }
};

  const handlePhotoUpload2 = (file) => {
    setSelectedImage2(file);
  };

  const handleRegisterSubmit = async (formData) => {
    if (!selectedImage) {
      setError('No image selected');
      return;
    }
    await registerFace(formData, selectedImage);
  };


  // Use the selected mode and move to the upload screen
  const startProcess = (selectedMode) => {
    setMode(selectedMode);
    setCurrentScreen('upload');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-700 via-red-600 to-red-900">
      <div className="container mx-auto px-10 py-8">


        
        {/* The Screen System */}
        {currentScreen === 'title' && (
          <TitleScreen 
            onScreenChange={startProcess} 
            setMode={setMode} 
          />
        )}
        {currentScreen === 'upload' && (
          <PhotoUploadScreen 
            onUpload={handlePhotoUpload}
            onUpload2={handlePhotoUpload2}
            onCancel={() => setCurrentScreen('title')}
            mode={mode}
          />
        )}
        {currentScreen === 'loading' && (
          <LoadingScreen 
            image={selectedImage}
          />
        )}
        {currentScreen === 'register' && (
          <RegisterForm 
            image={selectedImage}
            onSubmit={handleRegisterSubmit}
            onCancel={() => setCurrentScreen('title')}
          />
        )}
        {currentScreen === 'result' && (
          <SearchResult 
            result={userData}
            error={error}
            onBack={() => setCurrentScreen('title')}
            onRegister={() => {
              setMode('register');
              setCurrentScreen('register');
            }}
          />
        )}

        {/* Show error at bottom of any active screen  */}
        {error && (
          <div className="max-w-2xl mx-auto mb-4 bg-yellow-500/30 border border-red-500 text-white p-4 rounded-lg">
            {error}
          </div>
        )}

      </div>
    </div>
  );
};

export default App;