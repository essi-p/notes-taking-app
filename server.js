// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// Route for root (index.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/notesapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

// Note Schema and Model
const noteSchema = new mongoose.Schema({
  content: String,
});

const Note = mongoose.model('Note', noteSchema);

// Get all notes
app.get('/api/notes', async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (error) {
    res.status(500).send('Error fetching notes');
  }
});

// Get a single note by ID
app.get('/api/notes/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (note) {
      res.json(note);
    } else {
      res.status(404).send('Note not found');
    }
  } catch (error) {
    res.status(500).send('Error fetching note');
  }
});

// Create new note
app.post('/api/notes', async (req, res) => {
  try {
    const newNote = new Note({ content: req.body.content });
    await newNote.save();
    res.json(newNote);
  } catch (error) {
    res.status(500).send('Error creating note');
  }
});

// Delete a note
app.delete('/api/notes/:id', async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.sendStatus(200);
  } catch (error) {
    res.status(500).send('Error deleting note');
  }
});

// Delete a note by ID
app.delete('/api/notes/:id', async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (note) {
      res.sendStatus(200);
    } else {
      res.status(404).send('Note not found');
    }
  } catch (error) {
    res.status(500).send('Error deleting note');
  }
});


// 404 Error Handling
app.use((req, res) => {
  res.status(404).send('404 - Not Found');
});

// Start the server
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
