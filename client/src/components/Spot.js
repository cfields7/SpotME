import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';

const Spot = ({ currentScreen }) => {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);

  // Tips for each screen
  const screenTips = {
    title: [
      "Hi! I'm Spot the dog! I'll help you find information on anyone I spot!",
      "My facial recognition can help you find people quickly!",
      "Click 'Search' to find someone, or 'Register' to add yourself!",
      "Did you know, the background color changes every time you refresh?",
    ],
    upload: [
      "Choose a well-lit, front-facing photo for best results.",
      "Click the box to select a photo!",
      "Make sure the face is clearly visible in the image.",
    ],
    loading: [
      "Hang tight while we process your photo!",
      "Our algorithems are working their magic...",
      "Almost there!",
    ],
    register: [
      "Fill out your name, and the rest is optional!",
      "Don't forget to double-check your information!",
      "Adding your socials helps others contact you easier.",
    ],
    result: [
      "Found what you were looking for?",
      "You can try another search if needed.",
      "Click 'Back' to start over!",
    ],
    'match-selection': [
      "Multiple matches found! Select the correct person.",
      "Take your time to review each match carefully.",
      "Didn't find the right person? Try another image!",
    ],
  };

  // Blinking animation
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 200);
    }, 4000);

    return () => clearInterval(blinkInterval);
  }, []);

  const getCurrentTips = () => screenTips[currentScreen] || screenTips.title;

  const nextTip = () => {
    // setIsAnimating(true);
    const tips = getCurrentTips();
    setCurrentTipIndex((prev) => (prev + 1) % tips.length);
    // setTimeout(() => setIsAnimating(false), 300);
  };

  useEffect(() => {
    setCurrentTipIndex(0);
  }, [currentScreen]);

  return (
    <div className="fixed bottom-4 right-4 flex items-end gap-3">
      {/* Speech Bubble */}
      <div className={`relative bottom-20 bg-white rounded-2xl p-4 max-w-xs shadow-lg transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
        <div className="text-gray-800 mb-2 font-medium">
          {getCurrentTips()[currentTipIndex]}
        </div>
        <button 
          onClick={nextTip}
          className="flex items-center text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          Next Tip <ChevronRight className="w-4 h-4" />
        </button>
        {/* Speech Bubble Triangle */}
        <div className="absolute -bottom-2 right-10 w-4 h-4 bg-white transform rotate-45" />
      </div>

      {/* Spot the Dog */}
      <div className="w-32 h-32 relative">
        <svg viewBox="0 0 100 100" className="w-32 h-32">
          <defs>
            <g id="ear">
              <path d="M0,0 Q5,-10 10,0 Q5,2 0,0" fill="#8B6F4B" />
            </g>
          </defs>

          {/* Body */}
          <ellipse cx="50" cy="65" rx="25" ry="20" fill="#C4A484" />
          
          {/* Head */}
          <circle cx="50" cy="40" r="20" fill="#C4A484" />
          
          {/* Ears */}
          <use href="#ear" transform="translate(35,25) rotate(-30)" >
            <animate attributeName="transform" 
              attributeType="XML"
              type="rotate"
              from="-30 35 25"
              to="-20 35 25"
              dur="2s"
              repeatCount="indefinite"
            />
          </use>
          <use href="#ear" transform="translate(65,25) scale(-1,1) rotate(-30)" >
            <animate attributeName="transform" 
              attributeType="XML"
              type="rotate"
              from="-30 65 25"
              to="-20 65 25"
              dur="2s"
              repeatCount="indefinite"
            />
          </use>

          {/* Spot over eye */}
          <circle cx="40" cy="35" r="8" fill="#8B6F4B" />
          
          {/* Eyes */}
          <circle cx="40" cy="38" r="3" fill={isBlinking ? "#C4A484" : "black"} />
          <circle cx="60" cy="38" r="3" fill={isBlinking ? "#C4A484" : "black"} />
          
          {/* Nose */}
          <circle cx="50" cy="45" r="5" fill="#573D1C" />
          
          {/* Mouth */}
          <path d="M45,50 Q50,55 55,50" fill="none" stroke="#573D1C" strokeWidth="2" strokeLinecap="round" />
          
          {/* Tail */}
          <path d="M75,65 Q85,65 90,60" fill="none" stroke="#C4A484" strokeWidth="6" strokeLinecap="round">
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="rotate"
              values="0 75 65; 10 75 65; 0 75 65"
              dur="1s"
              repeatCount="indefinite"
            />
          </path>

          {/* Front Legs */}
          <rect x="40" y="80" width="6" height="15" fill="#C4A484" rx="3" />
          <rect x="55" y="80" width="6" height="15" fill="#C4A484" rx="3" />
        </svg>
      </div>
    </div>
  );
};

export default Spot;