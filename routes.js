const express = require('express');
const router = express.Router();

router.post('/signup', async (req, res) => {
  const { id, name, password, userType } = req.body;

  try {
   
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/login', async (req, res) => {
  const { id, password } = req.body;

  try {
   
    res.status(200).json({ message: 'Login successful', user: { id, name: user.name, userType: user.userType } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/upload', upload.single('file'), (req, res) => {
  try {
  
    res.status(201).json({ message: 'File uploaded successfully', filename: file.filename });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
