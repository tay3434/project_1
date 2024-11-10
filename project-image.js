import { LitElement, html, css } from "lit";
import { DDDSuper } from "haxtheweb/d-d-d/d-d-d.js";

export class ProjectImage extends DDDSuper(LitElement) {
  static get properties() {
    return {
      title: { type: String },
      description: { type: String },
      created: { type: String },
      lastUpdated: { type: String },
      logo: { type: String },
      slug: { type: String }
    };
  }

  static get styles() {
    return css`
      .card {
        background-color: powderblue;
        border-radius: 8px;
        padding: 16px;
        width: 100%;
        max-width: 320px;
        height: 512px;
      }
      img {
        width: 100%;
        height: auto;
        object-fit: cover;
        border-radius: 8px;
      }
      .info {
        font-size: 20px;
        font-weight: 600;
        text-align: center;
        line-height: 2;
      }
    `;
  }

  render() {
    return html`
      <div class="card" @click="${this.openSlug}">
        <div class="image-container">
          <img src="${this.logo}" alt="${this.title}" />
        </div>
        <div class="info">${this.title}</div>
        <div>${this.description}</div>
        <div>Created: ${this.created}</div>
        <div>Updated: ${this.lastUpdated}</div>
      </div>
    `;
  }
}
customElements.define('project-image', ProjectImage);
