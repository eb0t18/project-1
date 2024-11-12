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
    this.jsonUrl = '';
    this.baseUrl = this.noJsonEnding(this.jsonUrl);
  }


  static get properties() {
    return {
      title: { type: String },
      loading: { type: Boolean, reflect: true },
      items: { type: Array },
      value: { type: String },
      jsonUrl: { type: String },
      baseUrl: { type: String },
    };
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
        padding: 5px 10px;
        width: 100%;
        max-width: 400px;
        margin: 20px auto;
      }


      .analyze-input {
        font-size: 16px;
        line-height: var(--ddd-lh-auto);
      }

      .results {
        height: 100%;
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
    this.jsonUrl = this.shadowRoot.querySelector('#input').value;

  }


  render() {
   
    return html`
      <h2>${this.title}</h2>
        <div class="search-wrapper">
          <input id="input" class="analyze-input" placeholder="https://haxtheweb.org/site.json" />
          <div class="search-button"><button @click="${this.analyze}">Analyze</button></div>
        </div>
        <div class="results">
        ${this.items.map((item) => {
          const created = item.metadata ? new Date(parseInt(item.metadata.created) * 1000).toLocaleDateString() : '';
          const updated = item.metadata ? new Date(parseInt(item.metadata.updated) * 1000).toLocaleDateString() : '';
          const img = item.metadata && item.metadata.files && item.metadata.files[0] ? item.metadata.files[0].url : '';

          return html`
            
            <hax-card
              created="${created}"
              lastUpdated="${updated}"
              title="${item.title}"
              description="${item.description}"
              logo="${img}"
              slug="${item.slug}"
              baseURL="${this.baseUrl}"
            ></hax-card>
          `;
        })}
      </div>
      
    `;
  }

  inputChanged(e) {
    this.jsonUrl = this.shadowRoot.querySelector('#input').value;
  }

  updated(changedProperties) {
    if (changedProperties.has('jsonUrl')) {
      this.updateResults(this.jsonUrl);
    } else if (changedProperties.has('jsonUrl') && !this.value) {
      this.items = [];
    }

    if (changedProperties.has('items') && this.items.length > 0) {
      console.log(this.items);
    }
  }
  noJsonEnding(url) {
    return url.replace(/\/?[^\/]*\.json$/, '');
  }
  updateResults(value) {
    this.loading = true;
    this.baseUrl = this.noJsonEnding(this.jsonUrl);
    fetch(this.jsonUrl)
      .then(response => response.ok ? response.json() : {})
      .then(data => {
          this.items = data.items
          this.loading = false;
      });
  }


  static get tag() {
    return 'hax-search';
  }
}

customElements.define(HaxSearch.tag, HaxSearch);