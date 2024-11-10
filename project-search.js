import { LitElement, html, css } from 'lit';
import { DDDSuper } from "haxtheweb/d-d-d/d-d-d.js";
import "./project-image.js";

export class ProjectSearch extends DDDSuper(LitElement)  {
  constructor() {
    super();
    this.value = '';
    this.title = '';
    this.loading = false;
    this.items = [];
    this.jsonUrl = '';
  }

  static get properties() {
    return {
      title: { type: String },
      loading: { type: Boolean, reflect: true },
      items: { type: Array },
      value: { type: String },
      jsonUrl: { type: String, attribute: 'json-url'}
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
        width: 100%;
      }
      .results {
        opacity: ${this.loading ? 0.1 : 1};
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        gap: 16px;
        box-sizing: border-box;
        padding: 20px;
      }
      .search-container {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 24px;
        border: 1px solid pink;
        padding: 4px 12px;
        max-width: 600px;
        margin: 10px auto; 
      }
      .search-icon {
        margin-right: 16px;
        font-size: 24px;
        cursor: pointer;
      }
      .search-input {
        flex: 1;
        font-size: 16px;
        border: none;
      }
      .search-input:focus {
        outline: none;
      }
    `;
  }

  render() {
    return html`
      <h2>${this.title}</h2>
      <div class="search-container">
        <div class="search-icon">🔍</div>
        <input 
          id="input" 
          class="search-input"
          placeholder="Search HAX the web"
          @input="${this.inputChanged}" 
        />
      </div>
      <div class="results">
        ${this.items.map(item => html`
          <project-image
            title="${item.title}"
            description="${item.description}"
            created="${this.formatDate(item.metadata?.created)}"
            lastUpdated="${this.formatDate(item.metadata?.updated)}"
            logo="${item.metadata?.files?.[0]?.url || ''}"
            slug="${item.slug}"
          ></project-image>
        `)}
      </div>
    `;
  }

  inputChanged(e) {
    this.value = e.target.value.trim();
    this.updateResults(this.value);
  }

  async updateResults(value) {
    this.loading = true;
    try {
      const response = await fetch(this.jsonUrl);
      const data = await response.json();
      this.items = data.items.filter(item => 
        item.title.toLowerCase().includes(value.toLowerCase()) ||
        item.description.toLowerCase().includes(value.toLowerCase())
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      this.loading = false;
    }
  }

  formatDate(timestamp) {
    return timestamp ? new Date(parseInt(timestamp) * 1000).toLocaleDateString() : '';
  }

  static get tag() {
    return 'project-search';
  }
}
customElements.define(ProjectSearch.tag, ProjectSearch);
