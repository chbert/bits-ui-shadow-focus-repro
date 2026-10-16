// A minimal web component whose <input> lives inside an OPEN shadow root, the way
// web-component libraries (here: a PDF viewer's form fields) render their inputs.
class ShadowField extends HTMLElement {
	constructor() {
		super();
		const root = this.attachShadow({ mode: 'open' });
		const input = document.createElement('input');
		input.setAttribute('aria-label', 'shadow input');
		input.placeholder = 'Type here';
		root.append(input);
	}
}

if (!customElements.get('shadow-field')) customElements.define('shadow-field', ShadowField);
