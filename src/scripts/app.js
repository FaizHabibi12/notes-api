import './components/app-header.js';
import './components/note-card.js';
import './components/note-form.js';
import './components/loading-indicator.js';

const API_URL = 'https://notes-api.dicoding.dev/v2';

async function fetchNotes(archived = false) {
  const loading = document.createElement('loading-indicator');
  document.body.appendChild(loading);
  try {
    const endpoint = archived
      ? `${API_URL}/notes/archived`
      : `${API_URL}/notes`;
    const response = await fetch(endpoint);
    const result = await response.json();
    if (result.status === 'success') {
      return result.data;
    } else {
      throw new Error(result.message);
    }
  } catch (error) {
    alert(`Gagal memuat catatan: ${error.message}`);
    return [];
  } finally {
    loading.remove();
  }
}

async function addNote(title, body) {
  const loading = document.createElement('loading-indicator');
  document.body.appendChild(loading);
  try {
    const response = await fetch(`${API_URL}/notes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, body }),
    });
    const result = await response.json();
    if (result.status === 'success') {
      showToast('Catatan berhasil ditambahkan!');
      return result.data;
    } else {
      throw new Error(result.message);
    }
  } catch (error) {
    alert(`Gagal menambah catatan: ${error.message}`);
    return null;
  } finally {
    loading.remove();
  }
}

async function deleteNote(id) {
  const loading = document.createElement('loading-indicator');
  document.body.appendChild(loading);
  try {
    const response = await fetch(`${API_URL}/notes/${id}`, {
      method: 'DELETE',
    });
    const result = await response.json();
    if (result.status === 'success') {
      showToast('Catatan berhasil dihapus!');
    } else {
      throw new Error(result.message);
    }
  } catch (error) {
    alert(`Gagal menghapus catatan: ${error.message}`);
  } finally {
    loading.remove();
  }
}

async function archiveNote(id) {
  const loading = document.createElement('loading-indicator');
  document.body.appendChild(loading);
  try {
    const response = await fetch(`${API_URL}/notes/${id}/archive`, {
      method: 'POST',
    });
    const result = await response.json();
    if (result.status === 'success') {
      showToast('Catatan berhasil diarsipkan!');
    } else {
      throw new Error(result.message);
    }
  } catch (error) {
    alert(`Gagal mengarsipkan catatan: ${error.message}`);
  } finally {
    loading.remove();
  }
}

async function unarchiveNote(id) {
  const loading = document.createElement('loading-indicator');
  document.body.appendChild(loading);
  try {
    const response = await fetch(`${API_URL}/notes/${id}/unarchive`, {
      method: 'POST',
    });
    const result = await response.json();
    if (result.status === 'success') {
      showToast('Catatan berhasil dibuka dari arsip!');
    } else {
      throw new Error(result.message);
    }
  } catch (error) {
    alert(`Gagal membuka arsip catatan: ${error.message}`);
  } finally {
    loading.remove();
  }
}

function renderNotes(notes, archived = false) {
  const targetList = archived
    ? document.getElementById('archived-notes-list')
    : document.getElementById('notes-list');
  targetList.innerHTML = '';
  notes.forEach((note) => {
    const noteElement = document.createElement('note-card');
    noteElement.setAttribute('id', note.id);
    noteElement.setAttribute('title', note.title);
    noteElement.setAttribute('body', note.body);
    noteElement.setAttribute('createdAt', note.createdAt);
    noteElement.setAttribute('archived', note.archived);
    targetList.appendChild(noteElement);
  });
}

function showToast(message) {
  const toastContainer = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerText = message;
  toastContainer.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('hide');
    setTimeout(() => toast.remove(), 500);
  }, 3000);
}

document.addEventListener('DOMContentLoaded', () => {
  const noteForm = document.getElementById('note-form');
  const titleInput = document.getElementById('note-title');
  const bodyInput = document.getElementById('note-body');
  const errorMessage = document.getElementById('form-error');

  fetchNotes(false).then((notes) => renderNotes(notes, false));
  fetchNotes(true).then((notes) => renderNotes(notes, true));

  titleInput.addEventListener('input', () => {
    if (titleInput.value.trim() === '') {
      titleInput.classList.add('invalid');
    } else {
      titleInput.classList.remove('invalid');
    }
  });

  bodyInput.addEventListener('input', () => {
    if (bodyInput.value.trim() === '') {
      bodyInput.classList.add('invalid');
    } else {
      bodyInput.classList.remove('invalid');
    }
  });

  noteForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (titleInput.value.trim() === '' || bodyInput.value.trim() === '') {
      errorMessage.classList.remove('hidden');
      return;
    }
    errorMessage.classList.add('hidden');

    const newNote = await addNote(titleInput.value, bodyInput.value);
    if (newNote) {
      fetchNotes(false).then((notes) => renderNotes(notes, false));
      fetchNotes(true).then((notes) => renderNotes(notes, true));
      titleInput.value = '';
      bodyInput.value = '';
    }
  });

  document.addEventListener('refresh-notes', () => {
    fetchNotes(false).then((notes) => renderNotes(notes, false));
    fetchNotes(true).then((notes) => renderNotes(notes, true));
  });
});

export { deleteNote, fetchNotes, showToast, archiveNote, unarchiveNote };
