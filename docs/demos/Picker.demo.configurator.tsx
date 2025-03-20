import { useState } from 'react';
import { Picker, type PickerProps } from '@gfazioli/mantine-picker';
import { Code, Stack } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

function Demo(props: PickerProps) {
  const [value, setValue] = useState('Rome');

  return (
    <Stack align="center" justify="space-between" h={300}>
      <Picker
        {...props}
        value={value}
        data={[
          'Rome',
          'Milan',
          'Naples',
          'Berlin',
          'Madrid',
          'Barcelona',
          'Paris',
          'London',
          'New York',
          'Los Angeles',
        ]}
        onChange={setValue}
      />
      <Code>Value: {value}</Code>
    </Stack>
  );
}

const code = `
import { useState } from 'react';
import { Picker, type PickerProps } from '@gfazioli/mantine-picker';
import { Code, Stack } from '@mantine/core';

function Demo(props: PickerProps) {
  const [value, setValue] = useState('Rome');

  return (
    <Stack align="center" justify="space-between" h={300}>
      <Picker{{props}}
        value={value}
        data={[
          'Rome',
          'Milan',
          'Naples',
          'Berlin',
          'Madrid',
          'Barcelona',
          'Paris',
          'London',
          'New York',
          'Los Angeles',
        ]}
        onChange={setValue}
      />
      <Code>Value: {value}</Code>
    </Stack>
  );
}

`;

export const configurator: MantineDemo = {
  type: 'configurator',
  component: Demo,
  code,
  controls: [
    {
      prop: 'loop',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'enable3D',
      type: 'boolean',
      initialValue: true,
      libraryValue: true,
    },
    {
      prop: 'rotateY',
      type: 'number',
      initialValue: 0,
      libraryValue: 0,
      min: -20,
      max: 20,
    },
    {
      prop: 'preventPageScroll',
      type: 'boolean',
      initialValue: true,
      libraryValue: true,
    },
    {
      prop: 'disabled',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'readOnly',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'withDividers',
      type: 'boolean',
      initialValue: true,
      libraryValue: true,
    },
    {
      prop: 'withHighlight',
      type: 'boolean',
      initialValue: true,
      libraryValue: true,
    },
    {
      prop: 'withMask',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'wheelSensitivity',
      type: 'number',
      initialValue: 1,
      libraryValue: 1,
      step: 0.1,
      min: 0.5,
      max: 5,
    },
    {
      prop: 'momentum',
      type: 'number',
      initialValue: 0.95,
      libraryValue: 0.95,
      step: 0.1,
      min: 0.1,
      max: 3,
    },
    {
      prop: 'decelerationRate',
      type: 'number',
      initialValue: 0.95,
      libraryValue: 0.95,
      step: 0.1,
      min: 0.1,
      max: 3,
    },

    {
      prop: 'easingFunction',
      type: 'select',
      initialValue: 'linear',
      libraryValue: 'linear',
      data: [
        { value: 'ease', label: 'ease' },
        { value: 'linear', label: 'linear' },
        { value: 'ease-in', label: 'ease-in' },
        { value: 'ease-out', label: 'ease-out' },
        { value: 'ease-in-out', label: 'ease-in-out' },
      ],
    },
    {
      prop: 'itemHeight',
      type: 'number',
      initialValue: 40,
      libraryValue: 40,
      step: 10,
      min: 10,
      max: 60,
    },
    {
      prop: 'perspective',
      type: 'number',
      initialValue: 100,
      libraryValue: 100,
      step: 10,
      min: 100,
      max: 1000,
    },
    {
      prop: 'maxRotation',
      type: 'number',
      initialValue: 60,
      libraryValue: 60,
      step: 1,
      min: 1,
      max: 180,
    },
    {
      prop: 'cylinderRadius',
      type: 'number',
      initialValue: 4,
      libraryValue: 4,
      step: 0.1,
      min: 1,
      max: 6,
    },
    {
      prop: 'visibleItems',
      type: 'number',
      initialValue: 3,
      libraryValue: 3,
      step: 2,
      min: 1,
      max: 9,
    },
    {
      prop: 'minItemOpacity',
      type: 'number',
      initialValue: 1,
      libraryValue: 1,
      step: 0.1,
      min: 0,
      max: 1,
    },
    {
      prop: 'minItemScale',
      type: 'number',
      initialValue: 1,
      libraryValue: 1,
      step: 0.01,
      min: 0,
      max: 1,
    },
    {
      prop: 'maxBlurAmount',
      type: 'number',
      initialValue: 0,
      libraryValue: 0,
      step: 1,
      min: 0,
      max: 10,
    },
    {
      prop: 'maskHeight',
      type: 'number',
      initialValue: 55,
      libraryValue: 55,
      step: 1,
      min: 1,
      max: 100,
    },
    {
      prop: 'maskIntensity',
      type: 'number',
      initialValue: 10,
      libraryValue: 10,
      step: 1,
      min: 0,
      max: 100,
    },
  ],
};
