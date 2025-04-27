class AppHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header class="bg-gradient-to-r from-red-800 to-red-600 text-white text-center p-6 shadow-lg">
        <h1 class="m-0 text-2xl font-bold">📝 Notes App</h1>
        <p class="text-sm italic">Your personal note-taking companion</p>
      </header>
    `;
  }
}
customElements.define('app-header', AppHeader);
