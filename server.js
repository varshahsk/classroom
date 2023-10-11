const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerDefinition = require('./swaggerDefinition'); 
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json()); 
app.use(express.static('public'));
const options = {
  swaggerDefinition,
  apis: ['./server/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));



mongoose.connect('mongodb://localhost:27017/classroom', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const userSchema = new mongoose.Schema({
  id: { type: String, unique: true }, 
  name: String,
  password: String,
  userType: String,
});

const User = mongoose.model('User', userSchema);

app.post('/signup', async (req, res) => {
  const { id, name, password, userType } = req.body;

  try {
    const existingUser = await User.findOne({ id });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const newUser = await User.create({ id, name, password, userType });
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/login', async (req, res) => {
  const { id, password } = req.body;

  try {
    const user = await User.findOne({ id });

    if (user && user.password === password) {
      res.status(200).json({ message: 'Login successful', user: { id, name: user.name, userType: user.userType } });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); 
  },
});

const upload = multer({ storage: storage });
app.post('/upload', upload.single('file'), (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    res.status(201).json({ message: 'File uploaded successfully', filename: file.filename });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


// app.post('/upload', upload.array('files', 5), (req, res) => {
//   try {
//     const files = req.files;
//     if (!files || files.length === 0) {
//       return res.status(400).json({ error: 'No files uploaded' });
//     }

//     const filenames = files.map((file) => file.filename);
//     res.status(201).json({ message: 'Files uploaded successfully', filenames: filenames });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });
