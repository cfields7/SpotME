import React, { useState } from 'react';
import TitleScreen from './components/TitleScreen';
import LoadingScreen from './components/LoadingScreen';
import RegisterForm from './components/RegisterForm';
import SearchResult from './components/SearchResult';
import PhotoUploadScreen from './components/PhotoUploadScreen';

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('title');
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchResult, setSearchResult] = useState(null);
  const [mode, setMode] = useState(null); // this can either be 'search' or 'register' depending on what they click

  const handlePhotoUpload = (file) => {
    setSelectedImage(file);
    setCurrentScreen('loading'); // Show loading screen after uploading photo
  };

  // After loading, show the correct screen
  const handleLoadingComplete = () => {
    if (mode === 'search') {
      setCurrentScreen('result');
    } else if (mode === 'register') {
      setCurrentScreen('register');
    }
  };

  // Use the selected mode and move to the upload screen
  const startProcess = (selectedMode) => {
    setMode(selectedMode);
    setCurrentScreen('upload');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-violet-900 to-gray-900">
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
            onCancel={() => setCurrentScreen('title')}
            mode={mode}
          />
        )}
        {currentScreen === 'loading' && (
          <LoadingScreen 
            image={selectedImage}
            onComplete={handleLoadingComplete}
          />
        )}
        {currentScreen === 'register' && (
          <RegisterForm 
            image={selectedImage}
            onSubmit={() => setCurrentScreen('title')}
            onCancel={() => setCurrentScreen('title')}
          />
        )}
        {currentScreen === 'result' && (
          <SearchResult 
            result={searchResult}
            onBack={() => setCurrentScreen('title')}
            onRegister={() => {
              setMode('register');
              setCurrentScreen('register');
            }}
          />
        )}
      </div>
    </div>
  );
};

export default App;