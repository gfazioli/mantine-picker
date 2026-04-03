# Mantine Picker Component

<img alt="Mantine Picker" src="https://github.com/gfazioli/mantine-picker/blob/master/logo.jpeg" />

<div align="center">
  
  [![NPM version](https://img.shields.io/npm/v/%40gfazioli%2Fmantine-picker?style=for-the-badge)](https://www.npmjs.com/package/@gfazioli/mantine-picker)
  [![NPM Downloads](https://img.shields.io/npm/dm/%40gfazioli%2Fmantine-picker?style=for-the-badge)](https://www.npmjs.com/package/@gfazioli/mantine-picker)
  [![NPM Downloads](https://img.shields.io/npm/dy/%40gfazioli%2Fmantine-picker?style=for-the-badge&label=%20&color=f90)](https://www.npmjs.com/package/@gfazioli/mantine-picker)
  ![NPM License](https://img.shields.io/npm/l/%40gfazioli%2Fmantine-picker?style=for-the-badge)

---

[<kbd> <br/> ❤️ If this component has been useful to you or your team, please consider becoming a sponsor <br/> </kbd>](https://github.com/sponsors/gfazioli?o=esc)  

</div>

## Overview

This component is created on top of the [Mantine](https://mantine.dev/) library.
It requires **Mantine 9.x** and **React 19**.

[Mantine Picker](https://gfazioli.github.io/mantine-picker/) is an iOS-style wheel picker for React with Mantine, enabling selection through dragging, mouse wheel, clicking, and keyboard navigation.

## Features

- 🎡 **iOS-style wheel picker**: Smooth drag, wheel, click, and keyboard navigation
- 🎲 **3D rotation effect**: Configurable `perspective`, `maxRotation`, `cylinderRadius`, `rotateY`
- 🔄 **Loop mode**: Infinite circular scrolling through items
- 🎯 **Momentum scrolling**: Inertia-based deceleration after drag release
- 🎨 **Custom item rendering**: `renderItem` for color swatches, badges, icons, or any React content
- 📐 **Left/Right sections**: Fixed content beside the picker (icons, labels)
- 🔒 **Read-only mode**: Programmatic updates without user interaction (counters, clocks)
- 🎭 **Visual effects**: Configurable blur, opacity, scale gradients for non-selected items
- 🖌 **Mask, highlight, dividers**: Toggle gradient mask, selection highlight, and divider lines
- ♿ **Accessible**: `aria-label`, keyboard navigation, `focusable` prop, screen reader support
- 🎨 **Styles API**: Full Mantine Styles API support with 6 selectors
- 📦 **TypeScript**: Full type safety with generic `Picker<T>` support

> [!note]
>
> → [Demo and Documentation](https://gfazioli.github.io/mantine-picker/) → [Youtube Video](https://www.youtube.com/playlist?list=PL85tTROKkZrWyqCcmNCdWajpx05-cTal4) → [More Mantine Components](https://mantine-extensions.vercel.app/)


## Installation

```sh
npm install @gfazioli/mantine-picker
```
or 

```sh
yarn add @gfazioli/mantine-picker
```

After installation import package styles at the root of your application:

```tsx
import '@gfazioli/mantine-picker/styles.css';
```

## Usage

```tsx
import { Picker } from '@gfazioli/mantine-picker';

function Demo() {

  return (
    <Picker data={['React', 'Angular', 'Vue', 'Svelte']} />
  );
}
```
## Sponsor

<div align="center">

[<kbd> <br/> ❤️ If this component has been useful to you or your team, please consider becoming a sponsor <br/> </kbd>](https://github.com/sponsors/gfazioli?o=esc)

</div>

Your support helps me:

- Keep the project actively maintained with timely bug fixes and security updates	
- Add new features, improve performance, and refine the developer experience	
- Expand test coverage and documentation for smoother adoption	
- Ensure long‑term sustainability without relying on ad hoc free time	
- Prioritize community requests and roadmap items that matter most

Open source thrives when those who benefit can give back—even a small monthly contribution makes a real difference. Sponsorships help cover maintenance time, infrastructure, and the countless invisible tasks that keep a project healthy.

Your help truly matters.

💚 [Become a sponsor](https://github.com/sponsors/gfazioli?o=esc) today and help me keep this project reliable, up‑to‑date, and growing for everyone.

---
https://github.com/user-attachments/assets/520e4838-9f2f-4714-9de2-8067c7630d1d

---  
[![Star History Chart](https://api.star-history.com/svg?repos=gfazioli/mantine-picker&type=Timeline)](https://www.star-history.com/#gfazioli/mantine-picker&Timeline)

