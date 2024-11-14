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
    this.topLevel=false;
    this.theme='';
  }

  static get properties() {
    return {
      title: { type: String },
      description: { type: String },
      created: { type: String },
      lastUpdated: { type: String },
      logo: { type: String },
      slug: { type: String },
      url: { type: String },
      topLevel: {type: Boolean, reflect: true, attribute: "top-level"},
      theme: {type: String},
    };
  }

  static get styles() {
    return [super.styles, css`
      .card {     
       
  
        text-decoration: none;
      }

      .full-card{
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        width: 320px;
        height: 512px;
        padding: 16px; 
        background-color: var(--ddd-theme-default-potential0);
        border: 2px solid var(--ddd-theme-default-potentialMidnight);
        border-radius: var(--ddd-radius-md);
      }

      :host([top-level]) .full-card{
        display:block;
        background-color:green;
        width: 512px;
        height:320px;
        
      }
      :host([top-level]) img{
        width:100px;
        height: 100px;
        align-content:top;
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
      this.logo = "/files/HAX.psu%20World%20changer-circle1.png";
  }
    return html`
      <div class = "full-card">
      
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
        ${this.theme ? html`<div class="metadata">Theme: ${this.theme}</div>` : ``}
</a>
  </div>
    `;
  }


  static get tag() {
    return "hax-image";
  }
}

customElements.define(HaxImage.tag, HaxImage);