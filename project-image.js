import { LitElement, html, css } from "lit";

export class ProjectImage extends LitElement {

  constructor() {
    super();
    this.title = '';
    this.source = '';
  }

  static get properties() {
    return {
        source: { type: String },
        title: { type: String },
    };
  }

  static get styles() {
    return [css`
    .card{
      background-color: powderblue;
      border-radius: 8px;
      padding: 16px;
      margin: 20px;
      border: 4px solid gray;
      width: 220px;
      height: 340px;
      /* box-sizing: border-box; */
    }
    img {
      width: 100%;
      height: 200px;
      display: block;
    }

    .details{
      text-align: center;
      font-size: 20px;
      /* padding: 8px 0; */
      /* font-family: Verdana, Geneva, Tahoma, sans-serif; */
      font-family: 'Times New Roman', Times, serif;
    }

    `];
  }

  render() {
    return html`
      <div class="card">
          <img src="${this.source}" />
          <div class=details>${this.title}</div>
      </div>
    `;
  }
  static get tag() {
    return "project-image";
  }
}
customElements.define(ProjectImage.tag, ProjectImage);