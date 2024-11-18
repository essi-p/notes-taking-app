// server/server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json());
const PORT = 5000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '../public')));

// Route for root (index.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/notesapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Note Schema and Model
const noteSchema = new mongoose.Schema({
  content: String
});

const Note = mongoose.model('Note', noteSchema);

// Get all notes
app.get('/api/notes', async (req, res) => {
  const notes = await Note.find();
  res.json(notes);
});

// Create new note
app.post('/api/notes', async (req, res) => {
  const newNote = new Note({
    content: req.body.content
  });
  await newNote.save();
  res.json(newNote);
});

// Delete a note
app.delete('/api/notes/:id', async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.sendStatus(200);
});

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
