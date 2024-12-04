// public/details.js
document.addEventListener('DOMContentLoaded', () => {
  const noteDetail = document.getElementById('note-detail');
  const deleteBtn = document.getElementById('delete-btn');
  const editBtn = document.getElementById('edit-btn');
  const saveBtn = document.getElementById('save-btn');
  const noteContentDisplay = document.getElementById('note-content-display');
  const noteContentEdit = document.getElementById('note-content-edit');

  // Get the note ID from the query string
  const params = new URLSearchParams(window.location.search);
  const noteId = params.get('id');

  // Fetch and display the specific note
  if (noteId) {
    fetch(`/api/notes/${noteId}`)
      .then((response) => response.json())
      .then((note) => {
        if (note) {
          // Display the note content in the view mode
          noteContentDisplay.textContent = note.content;
          noteContentEdit.value = note.content; // Set the initial content in the textarea

          // Show the Edit, Delete, and Save buttons
          editBtn.style.display = 'block';
          deleteBtn.style.display = 'block';

          // Add event listener to the Edit button
          editBtn.addEventListener('click', () => {
            // Hide the display mode and show the edit mode
            noteContentDisplay.style.display = 'none';
            noteContentEdit.style.display = 'block';
            saveBtn.style.display = 'block';
            editBtn.style.display = 'none';
          });

          // Add event listener to the Save button
          saveBtn.addEventListener('click', () => {
            const updatedContent = noteContentEdit.value.trim();
            if (!updatedContent) return;

            // Save the updated note content
            fetch(`/api/notes/${noteId}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ content: updatedContent }),
            })
              .then((response) => response.json())
              .then((updatedNote) => {
                // Update the displayed note content
                noteContentDisplay.textContent = updatedNote.content;

                // Switch back to the display mode
                noteContentEdit.style.display = 'none';
                noteContentDisplay.style.display = 'block';
                saveBtn.style.display = 'none';
                editBtn.style.display = 'block';

                alert('Note updated successfully!');
              })
              .catch((error) => {
                alert('Error saving note.');
                console.error(error);
              });
          });

          // Add event listener to the Delete button
          deleteBtn.addEventListener('click', () => {
            // Delete the note from the database
            fetch(`/api/notes/${noteId}`, {
              method: 'DELETE',
            })
              .then(() => {
                alert('Note deleted');
                // Redirect back to the notes list
                window.location.href = 'index.html';
              })
              .catch((error) => {
                alert('Error deleting note');
                console.error(error);
              });
          });
        } else {
          noteDetail.textContent = 'Note not found.';
        }
      })
      .catch(() => {
        noteDetail.textContent = 'Error fetching note details.';
      });
  } else {
    noteDetail.textContent = 'Invalid note ID.';
  }
});
