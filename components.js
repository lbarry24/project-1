class DddStepsList extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add('steps-list');
    const items = Array.from(this.children).filter(child =>
      child.tagName === 'DDD-STEPS-LIST-ITEM'
    );
    items.forEach((item, index) => {
      item.setAttribute('step', index + 1);
      if (typeof item.render === 'function') {
        item.render();
      }
    });
  }
}

class DddStepsListItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['step', 'title'];
  }

  attributeChangedCallback(name, oldVal, newVal) {
    this[name] = newVal;
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="style.css">
      <div class="steps-list-item">
        <div class="steps-circle">${this.step}</div>
        <h3 class="steps-title">${this.title || ''}</h3>
        <div class="steps-content">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

customElements.define('ddd-steps-list', DddStepsList);
customElements.define('ddd-steps-list-item', DddStepsListItem);
