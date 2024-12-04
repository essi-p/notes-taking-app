document.addEventListener('DOMContentLoaded', async () => {
    const noteList = document.getElementById('note-list');

    try {
        const response = await fetch('/api/notes'); // Fetch notes from backend
        const notes = await response.json();

        if (notes.length === 0) {
            noteList.innerHTML = '<li>No notes available</li>';
            return;
        }

        // Populate the note list
        notes.forEach(note => {
            const li = document.createElement('li');
            li.textContent = note.content; // Display the note content
            noteList.appendChild(li);
        });
    } catch (error) {
        console.error('Error fetching notes:', error);
        noteList.innerHTML = '<li>Error loading notes</li>';
    }
});
