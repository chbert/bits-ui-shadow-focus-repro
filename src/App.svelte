<script>
	import { Dialog } from 'bits-ui';

	import './shadow-field.js';

	let { open = true } = $props();
</script>

<Dialog.Root bind:open>
	<Dialog.Trigger>Open dialog</Dialog.Trigger>
	<Dialog.Portal>
		<Dialog.Overlay style="position: fixed; inset: 0; background: rgb(0 0 0 / 0.3);" />
		<Dialog.Content
			style="position: fixed; top: 20%; left: 50%; transform: translateX(-50%); background: white; padding: 1.5rem; display: grid; gap: 1rem;"
		>
			<Dialog.Title>Shadow-root input inside a Dialog</Dialog.Title>
			<p>1. Click "Light button". 2. Click the input below and type.</p>
			<button data-testid="light-button">Light button</button>
			<!-- The <input> is inside this element's open shadow root. -->
			<shadow-field data-testid="shadow-host"></shadow-field>
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
