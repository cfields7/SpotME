const express = require('express');
const cors = require('cors');
const faceapi = require("face-api.js");
const fs = require('fs');
const { Canvas, Image, ImageData } = require('canvas');
faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

const app = express();
const router = express.Router();
const database = require('./database');

const PORT = 3001;
const RECOGNITION_MODEL_THRESHOLD = 0.6;

app.use(cors());
app.use(express.json({ limit: "20mb" }));
app.use('/api', router);

// Load face-api.js models
const loadModels = async () => {
  await faceapi.nets.ssdMobilenetv1.loadFromDisk('./models');
  await faceapi.nets.faceLandmark68Net.loadFromDisk('./models');
  await faceapi.nets.faceRecognitionNet.loadFromDisk('./models');
};

loadModels().then(() => {
  console.log('Models Loaded');
});

// Initialize Database
database.init();

// ROUTES //

// Add new user
router.route('/users').post(async (req, res) => {

  const imgData = await loadImage(req.body.image);
  const detection = await faceapi.detectSingleFace(imgData).withFaceLandmarks().withFaceDescriptor();
  
  try {
    // Add user to database
    const userAdded = await database.addUser(req.body);

    // Save user detection to file
    const detectionObject = JSON.stringify(detection);
    const detectionFilename = 'user' + userAdded.id +'-detection.json';
    const detectionFilePath = './data/' + detectionFilename;
    
    fs.writeFile(detectionFilePath, detectionObject, (err) => {
      if (err) {
        console.error('Error writing detection object to file', err);
      } else {
        console.log('Detection object saved to ' + detectionFilePath);
      }
    });

    res.json(userAdded);
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get user by id
router.route('/users/:id').get(async (req, res) => {
  try {
    const user = await database.getUser(req.params.id);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json(user);
    }
  } catch (error) {
    console.error('Error getting user by id:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get all users
router.route('/users').get(async (req, res) => {
  try {
    const users = await database.getAllUsers();
    res.json(users)
  } catch (error) {
    console.error('Error getting all users:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get user by image
router.route('/users/search').post(async (req, res) => {
  const matches = await findMatches(req.body.image);
  console.log("matches:");
  console.log(matches);

  try {
    res.json(matches);
  } catch (error) {
    console.error('Error getting user by image:', error);
    res.status(500).json({ error: error.message });
  }
});

async function findMatches(imageSearched) {
  let matches = [];

  // Get detection for searched image
  const imgData = await loadImage(imageSearched);
  const searchedDetection = await faceapi.detectSingleFace(imgData).withFaceLandmarks().withFaceDescriptor();

  const users = await database.getAllUsers();
  console.log("got users");

  for (const user of users) {
    console.log("checking user");
    
    try {
      // Get saved detection for user using synchronous file read
      const detectionFilename = 'user' + user.id + '-detection.json';
      const detectionFilePath = './data/' + detectionFilename;
      const fileData = fs.readFileSync(detectionFilePath, "utf8");
      let userDetection = JSON.parse(fileData);
      
      // Convert descriptor object to array
      const descriptorArray = new Float32Array(Object.values(userDetection.descriptor));
      userDetection.descriptor = descriptorArray;
      
      console.log('Detection object loaded from ' + detectionFilePath);

      const isSamePersonResult = await isSamePerson(searchedDetection, userDetection);
      if (isSamePersonResult) {
        console.log("adding a match");
        matches.push(user);
      }
    } catch (error) {
      console.error(`Error processing user ${user.id}:`, error);
      continue; // Skip this user and continue with the next one
    }
  }
  return matches;
}

async function isSamePerson(detection1, detection2) {
  if (!detection1 || !detection2) {
    throw new Error("No faces detected in one of the images.");
  }

  if (!detection1.descriptor || !detection2.descriptor) {
    throw new Error("Missing descriptor in one of the detections.");
  }

  // Ensure both descriptors are Float32Array
  const descriptor1 = new Float32Array(Object.values(detection1.descriptor));
  const descriptor2 = new Float32Array(Object.values(detection2.descriptor));

  const distance = faceapi.euclideanDistance(descriptor1, descriptor2);
  console.log("Distance:" + distance);

  // Recognize as same person if distance is less than threshold
  const isSamePerson = distance < RECOGNITION_MODEL_THRESHOLD;

  return isSamePerson;
}

async function loadImage(base64Data) {
  // Create buffer from base64
  const buffer = Buffer.from(base64Data, 'base64');
  
  // Create image from buffer
  const img = new Image();
  
  return new Promise((resolve, reject) => {
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = buffer;
  });
}

//////////

// Serve the app
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});