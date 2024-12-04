// public/details.js
document.addEventListener('DOMContentLoaded', () => {
  const noteDetail = document.getElementById('note-detail');
  const deleteBtn = document.getElementById('delete-btn');

  // Get the note ID from the query string
  const params = new URLSearchParams(window.location.search);
  const noteId = params.get('id');

  // Fetch and display the specific note
  if (noteId) {
    fetch(`/api/notes/${noteId}`)
      .then((response) => response.json())
      .then((note) => {
        if (note) {
          const contentDiv = document.createElement('div');
          contentDiv.textContent = note.content;
          noteDetail.appendChild(contentDiv);

          // Show the delete button
          deleteBtn.style.display = 'block';

          // Add event listener to the delete button
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
