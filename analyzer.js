import { LitElement, html, css } from 'lit';

export class Analyzer extends LitElement {
  static get styles() {
    return css`
      .search-container {
        display: flex;
        align-items: center;
        border-radius: 24px;
        padding: 5px 10px;
        max-width: 600px;
        margin: 20px auto;
      }
      button {
        border-radius: 4px;
        padding: 10px 15px;
        font-size: 16px;
        cursor: pointer;
      }
      input {
        font-size: 20px;
        width: 100%;
      }
    `;
  }

  static get properties() {
    return {
      url: { type: String },
      isValid: { type: Boolean, reflect: true },
      placeholder: { type: String }
    };
  }

  constructor() {
    super();
    this.url = '';
    this.isValid = false;
    this.placeholder = 'https://haxtheweb.org/site.json';
  }

  updated(changedProperties) {
    if (changedProperties.has('url')) {
      this.isValid = this.url && this.url.endsWith('site.json');
    }
  }

  render() {
    return html`
      <div class="search-container">
        <button ?disabled="${!this.isValid}" @click="${this._analyze}">Analyze</button>
        <input
          type="text"
          .value="${this.url}"
          placeholder="${this.placeholder}"
          @input="${this._updateUrl}"
        />
      </div>
    `;
  }

  _updateUrl(event) {
    this.url = event.target.value;
  }

  async _analyze() {
    try {
      const response = await fetch(this.url);
      if (!response.ok) throw new Error("Network response was not ok");
      console.log(await response.json());
    } catch (error) {
      console.error("Error fetching JSON:", error);
      alert("Error fetching JSON");
    }
  }
}
customElements.define('analyzer-element', Analyzer);
