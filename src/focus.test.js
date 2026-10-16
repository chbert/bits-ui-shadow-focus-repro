import { tick } from 'svelte';

import { cleanup, render, screen } from '@testing-library/svelte';
import { afterEach, expect, test } from 'vitest';

import App from './App.svelte';

afterEach(() => cleanup());

/** Let the dialog's open auto-focus (requestAnimationFrame) and the focus trap run. */
async function settle() {
	await tick();
	await new Promise((resolve) => requestAnimationFrame(() => resolve(undefined)));
	await new Promise((resolve) => setTimeout(resolve, 0));
	await tick();
}

test('an input inside an open shadow root keeps focus inside the Dialog', async () => {
	render(App);
	await settle();

	screen.getByTestId('light-button').focus();
	await settle();

	const host = screen.getByTestId('shadow-host');
	const input = host.shadowRoot.querySelector('input');
	input.focus();
	await settle();

	// bits-ui 2.19.4: passes. bits-ui 2.19.5: focus is pulled back to the light button.
	expect(document.activeElement, 'focus must stay on the shadow host').toBe(host);
	expect(host.shadowRoot.activeElement).toBe(input);
});
