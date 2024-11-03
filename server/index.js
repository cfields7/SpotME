const express = require('express');
const cors = require('cors');

const app = express();
const router = express.Router();
const database = require('./database');

const PORT = 3001;

app.use(express.json());
app.use('/api', router);

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

//////////

// Serve the app
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});