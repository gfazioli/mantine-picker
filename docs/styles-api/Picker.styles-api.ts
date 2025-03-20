import type { PickerFactory } from '@gfazioli/mantine-picker';
import type { StylesApiData } from '../components/styles-api.types';

export const PickerStylesApi: StylesApiData<PickerFactory> = {
  selectors: {
    root: 'Root element',
    container: 'Container element',
    item: 'Item element',
    mask: 'Mask element',
    highlight: 'Highlight element',
    dividers: 'Dividers element',
  },

  vars: {
    root: {
      '--picker-height': 'Height of the picker',
      '--picker-item-height': 'Height of each item',
      '--picker-animation-duration': 'Animation speed duration',
      '--picker-animation-easing': 'Animation easing',
      '--picker-perspective': 'Perspective for 3D effect',
      '--picker-mask-height': 'Height of the mask',
      '--picker-mask-intensity': 'Intensity of the mask',
    },

    // container: null,
  },

  //modifiers: [{ selector: 'root' }],
};
