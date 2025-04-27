class LoadingIndicator extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <div class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-70 text-white p-5 rounded z-50">
          Loading...
        </div>
      `;
  }
}
customElements.define('loading-indicator', LoadingIndicator);
