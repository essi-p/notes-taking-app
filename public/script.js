// public/script.js
const noteForm = document.getElementById('note-form');
const notesList = document.getElementById('notes-list');

// Fetch all notes
async function loadNotes() {
  const response = await fetch('/api/notes');
  const notes = await response.json();
  notesList.innerHTML = notes.map(note => `<div>${note.content} <button onclick="deleteNote('${note._id}')">Delete</button></div>`).join('');
}

// Create new note
noteForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const noteContent = document.getElementById('note-content').value;
  const response = await fetch('/api/notes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content: noteContent })
  });
  loadNotes();
});

// Delete a note
async function deleteNote(id) {
  await fetch(`/api/notes/${id}`, { method: 'DELETE' });
  loadNotes();
}

loadNotes();
