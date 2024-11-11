import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";


export class HaxImage extends LitElement {

  constructor() {
    super();
    this.title = '';
    this.description = '';
    this.created = '';
    this.lastUpdated = '';
    this.logo = '';
    this.slug = 'google.com';
    this.baseURL = 'google.com';
  }

  static get properties() {
    return {
      title: { type: String },
      description: { type: String },
      created: { type: String },
      lastUpdated: { type: String },
      logo: { type: String },
      slug: { type: String },
      baseURL: { type: String }
    };
  }

  static get styles() {
    return css`
      .card {
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        max-width: 320px;
        border-radius: var(--ddd-radius-md);
        padding: 16px;
        background-color: var(--ddd-theme-default-potential0);
        border: 2px solid var(--ddd-theme-default-potentialMidnight);
        height: 512px;
      }
  
      img {
        width: 100%;
        height: auto;
        object-fit: cover;
        border-radius: 8px;
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
  
      .card:focus {
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
        background-color: var(--ddd-theme-default-navy40        );
      }
  
      .card:hover {
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
        background-color: var(--ddd-theme-default-skyMaxLight);
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
  
      /*.meta {
        font-size: var(--ddd-font-size-xxs);
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
      }*/
    `;
  }
  

  render() {
    return html`
      <div
        class="card"
        tabindex="0"
        @click="${this.openWindow}"
        @keyup="${this.enter}"
      >
        <div class="image-container">
          <img src="${this.baseURL}/${this.logo}" alt="${this.title}" />
        </div>
        <div class="info">${this.title}</div>
        <div class="text">${this.description}</div>
      </div>
    `;
  }

  openWindow() {

      window.open((this.baseURL+'/'+this.slug), '_blank');
  }  

  enter(e) {
    if (e.key === 'Enter') {
      this.openSlug();
    }
  }

  static get tag() {
    return "hax-card";
  }
}

customElements.define(HaxImage.tag, HaxImage);