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
  try {
    const userAdded = await database.addUser(req.body);
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

  let id = 1; // hardcode it for now though
  try {
    res.json(matches);
  } catch (error) {
    console.error('Error getting user by image:', error);
    res.status(500).json({ error: error.message });
  }
});

async function findMatches(imageSearched) {
  let matches = [];
  const users = await database.getAllUsers();
  console.log("got users");
  for (const user of users) {
    console.log("checking user");
    const isSamePersonResult = await isSamePerson(imageSearched, user.image);
    if (isSamePersonResult) {
      console.log("adding a match");
      matches.push(user);
    }
  }
  return matches;
}

async function isSamePerson(img1Base64, img2Base64) {
  const img1Data = await loadImage(img1Base64);
  const img2Data = await loadImage(img2Base64);

  console.log("Images Loaded");

  const detection1 = await faceapi.detectSingleFace(img1Data).withFaceLandmarks().withFaceDescriptor();
  const detection2 = await faceapi.detectSingleFace(img2Data).withFaceLandmarks().withFaceDescriptor();

  const detectionObject = JSON.stringify(detection1.descriptor);
  const detectionFilename = 'user' + 1 +'-detection.json';
  const detectionFilePath = './data/' + detectionFilename;
  
  fs.writeFile(detectionFilePath, detectionObject, (err) => {
    if (err) {
      console.error('Error writing detection object to file', err);
    } else {
      console.log('Detection object saved to ' + detectionFilePath);
    }
  });

  console.log("Made Detections");

  if (!detection1 || !detection2) {
    throw new Error("No faces detected in one of the images.");
  }

  let newDetection1;

  fs.readFile(detectionFilePath, "utf8", (err, data) => {
    if (err) {
      console.error('Error reading detection object from file', err);
    } else {
      newDetection1 = JSON.parse(data);
      console.log('Detection object loaded from ' + detectionFilePath);
    }
  });

  const distance = faceapi.euclideanDistance(newDetection1, detection2.descriptor);
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