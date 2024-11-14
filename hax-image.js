import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";


export class HaxImage extends DDDSuper(LitElement) {

  constructor() {
    super();
    this.title = '';
    this.description = '';
    this.created = '';
    this.lastUpdated = '';
    this.logo = '';
    this.slug = '';
    this.url = '';
  }

  static get properties() {
    return {
      title: { type: String },
      description: { type: String },
      created: { type: String },
      lastUpdated: { type: String },
      logo: { type: String },
      slug: { type: String },
      url: { type: String }
    };
  }

  static get styles() {
    return [super.styles, css`
      .card {
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        width: 320px;
        border-radius: var(--ddd-radius-md);
        padding: 16px;
        background-color: var(--ddd-theme-default-potential0);
        border: 2px solid var(--ddd-theme-default-potentialMidnight);
        height: 512px;
        text-decoration: none;

      }

      .card:focus {
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
        background-color: var(--ddd-theme-default-navy40);
        text-decoration:none;
      }
  
      .card:hover {
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
        background-color: var(--ddd-theme-default-skyMaxLight);
        text-decoration: none;
      }
      .image-container {
        width: 100%;
        aspect-ratio: 1.618; 
        overflow: hidden;
        border-radius: var(--ddd-radius-rounded);
        background-color: var(--ddd-theme-default-potential0);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 16px;
     
      }
      img {
        width: 100%;
        height: auto;
        object-fit: cover;
        border-radius: 8px;
        height: auto;
      }
      .info {
        margin-top: var(--ddd-spacing-3);
        font-size: var(--ddd-font-size-xl);
        font: var(--ddd-font-primary);
        font-weight: var(--ddd-font-weight-regular);
        color: var(--ddd-theme-default-navy80);
        text-align: center;
        line-height: var(--ddd-lh-auto);
        
      }
  
      .text {
        font-size: var(--ddd-font-size-m);
        font: var(--ddd-font-primary);
        font-weight: var(--ddd-font-weight-regular);
        color: var(--ddd-theme-default-potential-50);
        margin-top: 8px;
        line-height: var(--ddd-lh-auto);
        text-align: center;
      }
  
      .metadata {
        font-size: 12px;
        color: var(--ddd-theme-default-navy-40);
        margin-top: 8px;
        font-style: italic;
        line-height: var(--ddd-lh-auto);
        text-align: center;
      }
  
      @media (max-width: 600px) {
        .card {
          width: 100%;
          max-width: 100%;
          padding: 12px;
          height: auto; 
        }
      }
    `];
  }
  

  render() {
    
    if (this.logo == '') {
      this.logo = "/files/HAX.psu%20World%20changer-circle1.png";//This changes the default image for empty strings
  }
    return html`
      <a
        class="card"
        tabindex="0"
        href="${this.url+'/'+this.slug}"
        target="_blank"
      >
        <div class="image-container">
          <img src="${this.url}/${this.logo}" alt="${this.title}" />
        </div>
        <div class="info">${this.title}</div>
        <div class="text">${this.description}</div>
        ${this.created ? html`<div class="metadata">Created: ${this.created}</div>` : ``}
        ${this.lastUpdated ? html`<div class="metadata">Last Updated: ${this.lastUpdated}</div>` : ``}
</a>
    `;
  }


  static get tag() {
    return "hax-image";
  }
}

customElements.define(HaxImage.tag, HaxImage);