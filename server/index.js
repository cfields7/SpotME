const express = require('express');
const cors = require('cors');

const app = express();
const router = express.Router();
const database = require('./database');

const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use('/api', router);

// Initialize Database
database.init();

// ROUTES //

// Add new user
router.route('/users').post(async (req, res) => {
  console.log("got this request");
  console.log(req.body);
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
  let id = 1; // hardcode it for now though
  try {
    const user = await database.getUser(id);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json(user);
    }
  } catch (error) {
    console.error('Error getting user by image:', error);
    res.status(500).json({ error: error.message });
  }
});

//////////

// Serve the app
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});