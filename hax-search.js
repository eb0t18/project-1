import { LitElement, html, css } from 'lit';
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import "./hax-image.js";

export class HaxSearch extends DDDSuper(LitElement) {
  
  constructor() {
    super();
    this.value = '';
    this.title = '';
    this.loading = false;
    this.items = [];
    this.url = '';
    this.baseUrl = '';
    this.formattedUrl='';
    this.siteName='';
    this.description='';
    this.logoo='';
    this.createdDate='';
    this.updatedDate='';
    this.themeSettings='';
  }


  static get properties() {
    return {
      title: { type: String },
      loading: { type: Boolean, reflect: true },
      items: { type: Array },
      value: { type: String },
      url: { type: String },
      baseUrl: {type: String},
      formattedUrl: {type: String},
      siteName: {type: String},
      description: {type: String},
      logoo: {type: String},
      createdDate: {type: String},
      updatedDate: {type: String},
      themeSettings: {type: String},
    }
  }

  static get styles() {
    return [super.styles, css`
      :host {
        display: block;
      
      }

      .search-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: var(--ddd-theme-default-potential50);
        border-radius: var(--ddd-radius-rounded);
        border: 2px solid var(--ddd-theme-default-potentialMidnight);
        padding: var(--ddd-spacing-3);
        width: 100%;
        max-width: 500px;
        margin: var(--ddd-spacing-4) auto;
      }


      .analyze-input {
        font-size: 16px;
        line-height: var(--ddd-lh-auto);
      }

      .results {
        height: 100%;
        display: flex;
        flex-direction:row;
        flex-wrap: wrap;
        justify-content:space-between;
        align-items: center;
        
      }

      button{
        background-color: var(--ddd-theme-default-navy40);
        color: var(--ddd-theme-default-potentialMidnight);
        margin: var(--ddd-spacing-1);
        font-size: 16px;

      }


      input {
        font-size: 24px;
        line-height: var(--ddd-lh-auto);
        width: 100%;
      }
    `];
  }

  analyze(e)
  {
   
    this.url = this.shadowRoot.querySelector('#input').value;
    this.updateResults();

  }


  render() {
   
    return html`
      <h2>${this.title}</h2>
        <div class="search-wrapper">
          <input id="input" class="analyze-input" placeholder="https://haxtheweb.org/site.json"
          @keydown="${(e)=>{if(e.key==='Enter'){this.analyze}}}"/>
          
          <div class="search-button"><button @click="${this.analyze}">Analyze</button></div>
        </div>
        <div class="main-card">
          ${this.siteName ? html`
             <hax-image
            top-level
            title="${this.siteName}"
            description="${this.description}"
            logo="${this.logoo}"
            created="${this.createdDate}"
            lastUpdated="${this.updatedDate}"
            url="${this.url.replace(/\/?[^\/]*\.json$/, '')}"
            theme="${this.themeSettings}"
          ></hax-image>
          ` : ``}
        </div>
        <div class="results">
        ${this.items.map((item) => {
          const created = item.metadata ? new Date(parseInt(item.metadata.created) * 1000).toLocaleDateString() : '';
          const updated = item.metadata ? new Date(parseInt(item.metadata.updated) * 1000).toLocaleDateString() : '';
          const img = item.metadata && item.metadata.files && item.metadata.files[0] ? item.metadata.files[0].url : '';

          return html`
            <hax-image
              created="${created}"
              lastUpdated="${updated}"
              title="${item.title}"
              description="${item.description}"
              logo="${img}"
              slug="${item.slug}"
              url="${this.url.replace(/\/?[^\/]*\.json$/, '')}"
            ></hax-image>
          `;
        })}
      </div>

    `;
  }



  updateResults(value) {

    this.loading=true;

    this.baseUrl = this.url.replace(/^(?!https?:\/\/)(.+?)(\/?)$/, "https://$1/");
    this.formattedUrl = '';
    let jsonUrl ='';
    
    if(this.baseUrl.endsWith("site.json")){
      console.log(1)
      this.formattedUrl =  this.baseUrl.replace(/site\.json\/?$/, "");
      jsonUrl = this.baseUrl;
    } else{
      if(this.baseUrl.endsWith("/")){
        this.formattedUrl = this.baseUrl;
      } else{
        this.formattedUrl = this.baseUrl+'/';
      }
      
      jsonUrl = `${this.formattedUrl}site.json`;
      console.log(jsonUrl)
    }
  
    fetch(jsonUrl)
      .then(response => response.ok ? response.json() : {})
      .then(data => {
          this.items = data.items
          this.loading = false;
          this.siteName=data.title;
          this.description=data.description;
          this.logoo=data.metadata.site.logo;
          this.themeSettings=data.metadata.theme.name;
          this.updateGlobalHexColor(data);
          this.createdDate=data.metadata ? new Date(parseInt(data.metadata.created)* 1000).toLocaleDateString() : '';
          this.updatedDate=data.metadata ? new Date(parseInt(data.metadata.updated)* 1000).toLocaleDateString() : '';
       
      });
  
  }
  updateGlobalHexColor(data) {
    if (data.metadata && data.metadata.theme && data.metadata.theme.variables) {
      const hexCode = data.metadata.theme.variables.hexCode;
      document.documentElement.style.setProperty('--global-hex-color', hexCode);
    } else {
      console.log('Hex Code not found');
    }
  }


  static get tag() {
    return 'hax-search';
  }
}

customElements.define(HaxSearch.tag, HaxSearch);