# bits-ui FocusScope: focus inside an open shadow root is pulled out of a Dialog (2.19.5)

Minimal reproduction for a FocusScope regression in bits-ui 2.19.5.

A `Dialog` contains a light-DOM button and a web component (`<shadow-field>`) whose `<input>` lives inside an open shadow root.

## Steps

```sh
pnpm install
pnpm dev
```

1. The dialog opens on load.
2. Click **Light button**.
3. Click the input below it and type.

**Expected (bits-ui 2.19.4):** the input keeps focus and receives the typed text.

**Actual (bits-ui 2.19.5):** focus jumps back to **Light button**, so the input never receives the typed text.

## Automated check

```sh
pnpm test
```

`src/focus.test.js` fails on 2.19.5 and passes on 2.19.4. To compare, run:

```sh
pnpm add bits-ui@2.19.4 && pnpm test
```

## Cause

Since #2180, the `focusin` handler uses `e.composedPath()[0]` (the input inside the shadow root) and checks it with `container.contains(target)`. That check does not cross shadow boundaries, so the focus is treated as escaping the scope.
