const express = require('express');
const cors = require('cors');
const faceapi = require("face-api.js");
const { Canvas, Image, ImageData } = require('canvas');
faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

const app = express();
const router = express.Router();
const database = require('./database');

const PORT = 3001;

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
  console.log('Models loaded');
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

// Get user by image
router.route('/users/search').post(async (req, res) => {
  // Use majic to get a result from the image recognition system here
  // This result will result the id of the user to give
  try {
    const sampleBase64 = "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";

    const img1Data = await loadImage(req.body.image);
    const img2Data = await loadImage(await database.getUser(1).then((user) => {
      return user.image;
    }));

    console.log("Images Loaded");

    const detection1 = await faceapi.detectSingleFace(img1Data).withFaceLandmarks().withFaceDescriptor();
    const detection2 = await faceapi.detectSingleFace(img2Data).withFaceLandmarks().withFaceDescriptor();

    console.log("Made Detections");

    if (!detection1 || !detection2) {
        return res.status(400).send('No faces detected in one of the images.');
    }

    const distance = faceapi.euclideanDistance(detection1.descriptor, detection2.descriptor);
    const threshold = 0.6; // Adjust threshold as needed

    const isSamePerson = distance < threshold;

    console.log("Distance:" + distance);

    res.json({ isSamePerson, distance });
  } catch (error) {
      console.error(error);
      res.status(500).send('Error processing images.');
  }


  // let id = 1; // hardcode it for now though
  // try {
  //   const user = await database.getUser(id);
  //   if (!user) {
  //     res.status(404).json({ error: 'User not found' });
  //   } else {
  //     res.json(user);
  //   }
  // } catch (error) {
  //   console.error('Error getting user by image:', error);
  //   res.status(500).json({ error: error.message });
  // }
});

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

// Compare faces endpoint
router.route('/compare').post(async (req, res) => {
  
});

//////////

// Serve the app
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});