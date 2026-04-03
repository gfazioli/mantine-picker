# CLAUDE.md

## Project
`@gfazioli/mantine-picker` — A Mantine 9 iOS-style wheel picker component with 3D rotation, drag/wheel/keyboard navigation, momentum scrolling, and customizable rendering. Requires React 19 and TypeScript 6.

## Commands
| Command | Purpose |
|---------|---------|
| `yarn build` | Build the npm package via Rollup |
| `yarn dev` | Start the Next.js docs dev server (port 9281) |
| `yarn test` | Full test suite (syncpack + oxfmt + typecheck + lint + jest) |
| `yarn jest` | Run only Jest unit tests |
| `yarn docgen` | Generate component API docs (docgen.json) |
| `yarn docs:build` | Build the Next.js docs site for production |
| `yarn docs:deploy` | Build and deploy docs to GitHub Pages |
| `yarn lint` | Run oxlint + Stylelint |
| `yarn format:write` | Format all files with oxfmt |
| `yarn storybook` | Start Storybook dev server |
| `yarn clean` | Remove build artifacts |
| `yarn release:patch` | Bump patch version and deploy docs |
| `diny yolo` | AI-assisted commit (stage all, generate message, commit + push) |

> **Important**: After changing the public API, always run `yarn clean && yarn build` before `yarn test`.

## Architecture

### Workspace Layout
Yarn workspaces monorepo with two workspaces: `package/` (npm package) and `docs/` (Next.js 15 documentation site).

### Package Source (`package/src/`)
- `Picker.tsx` — Main component (polymorphicFactory pattern)
- `Picker.module.css` — CSS Modules with light/dark theme, 3D transforms
- `index.ts` — Public exports

Single-component package built with Mantine's `polymorphicFactory<PickerFactory>` pattern.

### Build Pipeline
Rollup bundles to dual ESM/CJS with `'use client'` banner. CSS modules hashed with `hash-css-selector` (prefix `me`). TypeScript declarations via `rollup-plugin-dts`. CSS split into `styles.css` and `styles.layer.css`.

## Component Details

### Props (organized by category)

**Data & Selection:**
- `data` — Array of items (`T[]`)
- `value` — Currently selected value
- `onChange` — Callback when value changes
- `loop` — Loop through items (default: `true`)

**Appearance:**
- `itemHeight` — Height per item in px (default: `40`)
- `visibleItems` — Number of visible items (default: `3`)
- `renderItem` — Custom render function for items
- `minItemOpacity` — Opacity for non-selected items (default: `0.3`)
- `minItemScale` — Scale for non-selected items (default: `0.85`)
- `maxBlurAmount` — Max blur for non-selected items (default: `0`)
- `withHighlight` — Show selection highlight (default: `true`)
- `withDividers` — Show divider lines (default: `true`)
- `withMask` — Show gradient mask (default: `false`)
- `maskHeight` — Mask gradient height % (default: `55`)
- `maskIntensity` — Mask gradient intensity % (default: `10`)

**3D Effect:**
- `enable3D` — Enable 3D rotation (default: `true`)
- `perspective` — 3D perspective in px (default: `300`)
- `maxRotation` — Max rotation angle in degrees (default: `60`)
- `cylinderRadius` — Cylinder curvature factor (default: `4`)
- `rotateY` — Y-axis rotation in degrees (default: `0`)

**Animation & Interaction:**
- `animate` — Animate scroll on mount (default: `true`)
- `animationDuration` — Animation duration ms (default: `300`)
- `easingFunction` — CSS easing function (default: `"linear"`)
- `momentum` — Momentum factor after drag (default: `0.95`)
- `decelerationRate` — Momentum deceleration (default: `0.95`)
- `wheelSensitivity` — Mouse wheel sensitivity (default: `1`)
- `preventPageScroll` — Block page scroll on hover (default: `true`)
- `disabled` — Disable interaction (default: `false`)
- `readOnly` — Read-only mode (default: `false`)

**Accessibility:**
- `id`, `label`, `description`, `keyboardHint`, `focusable`

**Sections:**
- `leftSection`, `rightSection` — Fixed content beside the picker
- `leftSectionWidth`, `rightSectionWidth` — Section widths

**Text (inherited from Mantine Text):**
- `size`, `lineClamp`, `truncate`, `inline`, `inherit`, `gradient`, `fw`, `fs`, `td`, `c`, `tt`, `ta`, `variant`

### CSS custom properties
- `--picker-height` — Total picker height (computed: `itemHeight * visibleItems`)
- `--picker-item-height` — Height of each item
- `--picker-animation-duration` — Animation speed
- `--picker-animation-easing` — Easing function
- `--picker-perspective` — 3D perspective value
- `--picker-rotate-y` — Y-axis rotation
- `--picker-mask-height` — Mask gradient height
- `--picker-mask-intensity` — Mask gradient intensity

### Styles API selectors
- `root` — Outer container with perspective
- `container` — Inner scrollable area with 3D transforms
- `item` — Individual picker item
- `mask` — Gradient fade overlay (top/bottom)
- `highlight` — Selected item background
- `dividers` — Top/bottom divider lines

### Data attributes (modifiers)
- `data-disabled` on root — when `disabled` is true
- `data-readonly` on root — when `readOnly` is true
- `data-3d` on root/container/item — when `enable3D` is true
- `data-focused` on root — when picker has focus
- `data-selected` on item — for the currently selected item
- `data-dragging` on container/item — during drag interaction
- `data-wheeling` on item — during wheel scroll
- `data-momentum` on item — during momentum scrolling

## Testing
Jest with `jsdom`, `esbuild-jest` transform, CSS mocked via `identity-obj-proxy`. Tests use `@mantine-tests/core` render helper.

## Ecosystem
This repo is part of the Mantine Extensions ecosystem, derived from the `mantine-base-component` template. See the workspace `CLAUDE.md` (in the parent directory) for:
- Development checklist (code -> test -> build -> docs -> release)
- Cross-cutting patterns (compound components, responsive CSS, GitHub sync)
- Update packages workflow
- Release process
