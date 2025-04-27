class NoteForm extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <form id="note-form" novalidate class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div class="mb-4">
        <label for="note-title" class="block text-gray-700 text-sm font-bold mb-2">Judul Catatan</label>
        <input type="text" id="note-title" placeholder="Masukkan judul catatan" required 
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      
      <div class="mb-4">
        <label for="note-body" class="block text-gray-700 text-sm font-bold mb-2">Isi Catatan</label>
        <textarea id="note-body" placeholder="Masukkan isi catatan" required 
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
      </div>
      
      <div class="flex items-center justify-between">
        <button type="submit" 
        class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Tambah Catatan
        </button>
      </div>
      
      <p id="form-error" class="hidden text-red-500 text-xs italic mt-4" aria-live="polite">
        Judul dan isi catatan harus diisi!
      </p>
      </form>
    `;
  }
}
customElements.define('note-form', NoteForm);
