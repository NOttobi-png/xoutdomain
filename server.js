const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const PORT = 3000;

// Mongoose Models
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  github: String,
});

const Contact = mongoose.model('Contact', contactSchema);
const Project = mongoose.model('Project', projectSchema);

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// MongoDB Connection (Choose ONE only)

// 👉 Use this if you're using MongoDB Atlas (Cloud):
mongoose.connect('mongodb+srv://iamnotjoby:<your_password>@sarveshacluster9.c5y6ihi.mongodb.net/yourDB?retryWrites=true&w=majority&appName=Cluster9', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.get('/aboutme', (req, res) => res.sendFile(path.join(__dirname, 'public/aboutme.html')));
app.get('/projects', (req, res) => res.sendFile(path.join(__dirname, 'public/projects.html')));
app.get('/music', (req, res) => res.sendFile(path.join(__dirname, 'public/music.html')));
app.get('/contacxout', (req, res) => res.sendFile(path.join(__dirname, 'public/contacxout.html')));
app.get('/xoutbiodata', (req, res) => res.sendFile(path.join(__dirname, 'public/xoutbiodata.html')));

// Contact form submission
app.post('/contacxout', async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).send('All fields are required.');
  }

  try {
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    res.status(200).send('Thank you for contacting us!');
  } catch (error) {
    console.error('Error saving contact:', error);
    res.status(500).send('Server error');
  }
});

// Project form submission
app.post('/submit-project', async (req, res) => {
  const { title, description, github } = req.body;
  if (!title || !description || !github) {
    return res.status(400).send('All fields are required.');
  }

  try {
    const newProject = new Project({ title, description, github });
    await newProject.save();
    res.status(200).send('Project submitted successfully!');
  } catch (error) {
    console.error('Error saving project:', error);
    res.status(500).send('Server error while saving project.');
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
