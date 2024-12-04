// public/script.js
// DOM Elements
const notesList = document.getElementById('notes-list');
const noteForm = document.getElementById('note-form');
const noteContent = document.getElementById('note-content');

// Fetch and display notes on page load
async function loadNotes() {
  try {
    const response = await fetch('/api/notes'); // Fetch notes from the backend
    const notes = await response.json();

    notesList.innerHTML = ''; // Clear the existing list

    if (notes.length === 0) {
      notesList.innerHTML = '<li>No notes available</li>';
      return;
    }

    // Populate the notes list
    notes.forEach(note => {
      const li = document.createElement('li');
      li.textContent = note.content; // Display the note content
      notesList.appendChild(li);
    });
  } catch (error) {
    console.error('Error fetching notes:', error);
    notesList.innerHTML = '<li>Error loading notes</li>';
  }
}

// Handle new note submission
noteForm.addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent form submission from refreshing the page

  const content = noteContent.value.trim();
  if (!content) return; // Do nothing if the input is empty

  try {
    // Save the new note
    const response = await fetch('/api/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    });

    const newNote = await response.json();
    noteContent.value = ''; // Clear the textarea

    // Add the new note to the list dynamically
    const li = document.createElement('li');
    li.textContent = newNote.content;
    notesList.appendChild(li);
  } catch (error) {
    console.error('Error saving note:', error);
    alert('Could not save the note. Please try again.');
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const notesList = document.getElementById('notes-list');

  // Fetch and display all notes
  fetch('/api/notes')
    .then((response) => response.json())
    .then((notes) => {
      notes.forEach((note) => {
        const noteDiv = document.createElement('div');
        noteDiv.textContent = note.content;
        noteDiv.classList.add('note-item');
        noteDiv.addEventListener('click', () => {
          // Navigate to the detail page with the note ID
          window.location.href = `details.html?id=${note._id}`;
        });
        notesList.appendChild(noteDiv);
      });
    });
});

// Load notes when the page loads
loadNotes();
