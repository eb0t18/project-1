import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";


export class HaxImage extends DDDSuper(I18NMixin(LitElement)) {

  
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
        padding: 32px; 
        background-color: var(--ddd-theme-default-potential0);
        border: 2px solid var(--ddd-theme-default-potentialMidnight);
        border-radius: var(--ddd-radius-md);
        margin-top: var(--ddd-spacing-4);
        margin-right: var(--ddd-spacing-5);
        margin-left: var(--ddd-spacing-5);
        
      }

      :host([top-level]) .full-card{
        display:block;
        background-color: var(--hex-value, #ffffff);
        width: unset;
        height:unset;
        margin-top: var(--ddd-spacing-3);
        margin-right: var(--ddd-spacing-10);
        margin-left: var(--ddd-spacing-10);
        
    
        
      }
      :host([top-level]) img{
        width:100px;
        height: 100px;
        align-content:top;
      
      }

      :host([top-level]) .image-wrapper{
        aspect-ratio:unset;
      }

      .card:hover{
        text-decoration:none;
      }
      .card:focus{
        text-decoration:none;
        outline:none;
        box-shadow: var(--ddd-boxShadow-lg);
        background-color:var(--ddd-theme-default-skyMaxLight);
      }
     

      .full-card:focus {
        box-shadow: var(--ddd-boxShadow-lg);
        background-color:var(--ddd-theme-default-skyMaxLight);
      }
  
      .full-card:hover {
        box-shadow: var(--ddd-boxShadow-lg);
        background-color: var(--ddd-theme-default-skyMaxLight);
      }
      .image-wrapper {
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
        font-size: var(--ddd-font-size-m);
        font-weight: var(--ddd-font-weight-regular);
        color: var(--ddd-theme-default-navy80);
        text-align: center;
        line-height: var(--ddd-lh-auto);
        
      }
  
      .text {
        font-size: 20px;
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
        .full-card {
          width: 100%;
          max-width: 100%;
          padding: 16px;
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
        href="${this.url+'/'+this.slug}"
        target="_blank"
      >
        <div class="image-wrapper">
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