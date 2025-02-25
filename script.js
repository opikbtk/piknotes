// Simpan catatan di localStorage
let notes = JSON.parse(localStorage.getItem("notes")) || [];

function addNote() {
  const title = document.getElementById("noteTitle").value;
  const content = document.getElementById("noteContent").value;

  if (title && content) {
    const newNote = {
      id: Date.now(),
      title,
      content,
      date: new Date().toLocaleDateString("id-ID"),
    };

    notes.push(newNote);
    localStorage.setItem("notes", JSON.stringify(notes));
    renderNotes();
    document.getElementById("noteTitle").value = "";
    document.getElementById("noteContent").value = "";
  }
}

function renderNotes() {
  const container = document.getElementById("notesContainer");
  container.innerHTML = "";

  notes.forEach((note) => {
    const noteElement = document.createElement("div");
    noteElement.className = "col-md-4 note-card";
    noteElement.innerHTML = `
            <h4>${note.title}</h4>
            <p>${note.content}</p>
            <small class="text-muted">${note.date}</small>
            <button onclick="deleteNote(${note.id})" class="btn btn-danger btn-sm mt-2">Hapus</button>
        `;
    container.appendChild(noteElement);
  });
}

function deleteNote(id) {
  notes = notes.filter((note) => note.id !== id);
  localStorage.setItem("notes", JSON.stringify(notes));
  renderNotes();
}

// Render catatan saat pertama kali load
document.addEventListener("DOMContentLoaded", renderNotes);
