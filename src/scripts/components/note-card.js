import { deleteNote, archiveNote, unarchiveNote } from '../app.js';

class NoteCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
      @import "https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css";
      </style>
      <div class="card bg-white p-4 rounded-lg shadow-md flex flex-col justify-between h-44 relative transform transition-transform duration-200 hover:scale-105">
      <div class="title text-lg font-bold text-gray-800 mb-1 truncate" id="title"></div>
      <div class="body text-sm text-gray-600 flex-grow overflow-hidden line-clamp-3" id="body"></div>
      <div class="footer flex justify-between items-center text-xs text-gray-500">
        <small id="createdAt"></small>
        <div class="flex space-x-2">
        <button class="delete-btn bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs">Delete</button>
        <button class="archive-btn bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs"></button>
        </div>
      </div>
      <span class="archived-badge hidden absolute top-1 right-1 bg-yellow-400 text-gray-800 px-2 py-0.5 rounded text-[10px] font-semibold">Arsip</span>
      </div>
    `;
  }

  connectedCallback() {
    this.shadowRoot.getElementById('title').innerText =
      this.getAttribute('title');
    this.shadowRoot.getElementById('body').innerText =
      this.getAttribute('body');
    const date = new Date(this.getAttribute('createdAt'));
    const formattedDate = date.toLocaleDateString('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    this.shadowRoot.getElementById('createdAt').innerText = `${formattedDate}`;

    const archived = this.getAttribute('archived') === 'true';
    const card = this.shadowRoot.querySelector('.card');
    const archiveBtn = this.shadowRoot.querySelector('.archive-btn');
    archiveBtn.textContent = archived ? 'Buka Arsip' : 'Arsip';

    if (archived) {
      card.classList.add('bg-gray-200');
      const badge = document.createElement('span');
      badge.className =
        'archived-badge absolute top-1 right-1 bg-yellow-400 text-gray-800 px-2 py-0.5 rounded text-[10px] font-semibold';
      badge.textContent = 'Arsip';
      card.appendChild(badge);
    }

    this.shadowRoot
      .querySelector('.delete-btn')
      .addEventListener('click', async () => {
        const id = this.getAttribute('id');
        await deleteNote(id);
        this.remove();
      });

    archiveBtn.addEventListener('click', async () => {
      const id = this.getAttribute('id');
      if (archived) {
        await unarchiveNote(id);
      } else {
        await archiveNote(id);
      }
      const event = new CustomEvent('refresh-notes', { bubbles: true });
      this.dispatchEvent(event);
    });
  }
}

customElements.define('note-card', NoteCard);
