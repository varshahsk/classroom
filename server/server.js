const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(bodyParser.json()); 
app.use(express.static('public'));
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


const classroomSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  starttime: String,
  endtime: String,
  subject: String,
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
}, { collection: 'classrooms' });

const Classroom = mongoose.model('Classroom', classroomSchema);


app.post('/classrooms', async (req, res) => {
  const { name, students } = req.body;

  try {
    const existingClassroom = await Classroom.findOne({ name });
    if (existingClassroom) {
      return res.status(400).json({ error: 'Classroom already exists' });
    }

    // Fetch student IDs based on names
    const studentDocs = await Student.find({ name: { $in: students } });
    const studentIds = studentDocs.map(student => student._id);

    // Create the classroom with student IDs
    const newClassroom = await Classroom.create({ name, students: studentIds });
    res.status(201).json({ message: 'Classroom created successfully', classroom: newClassroom });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Remove a classroom
app.delete('/classrooms/:name', async (req, res) => {
  try {
    const deletedClassroom = await Classroom.findOneAndDelete({ name: req.params.name });

    if (!deletedClassroom) {
      return res.status(404).json({ error: 'Classroom not found' });
    }

    res.status(200).json({ message: 'Classroom deleted successfully', classroom: deletedClassroom });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
const studentSchema = new mongoose.Schema({
  id: { type: String, unique: true },
  name: String,
  classroom: String,
  email: String,
  address: String,
});

const Student = mongoose.model('Student', studentSchema);

app.post('/students', async (req, res) => {
  const { newstudent, id, classroom, email, address } = req.body;

  try {
    const existingStudent = await Student.findOne({ id });
    if (existingStudent) {
      return res.status(400).json({ error: 'Student already exists' });
    }

    const newStudent = await Student.create({ id, name: newstudent, classroom, email, address });

    // Update the students array in the corresponding classroom with student names
    await Classroom.findOneAndUpdate(
      { name: classroom },
      { $push: { students: { $each: [newstudent] } } }
    );

    res.status(201).json({ message: 'Student created successfully', student: newStudent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



app.delete('/students/:id', async (req, res) => {
  try {
    const deletedStudent = await Student.findOneAndDelete({ id: req.params.id });

    if (!deletedStudent) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.status(200).json({ message: 'Student deleted successfully', student: deletedStudent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
