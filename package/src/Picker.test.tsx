import React from 'react';
import { render, tests } from '@mantine-tests/core';
import { Picker, PickerProps, PickerStylesNames } from './Picker';

const defaultProps: PickerProps = {
  data: [],
};

describe('@mantine/core/Picker', () => {
  tests.itSupportsSystemProps<PickerProps, PickerStylesNames>({
    component: Picker,
    props: defaultProps,
    styleProps: true,
    children: true,
    classes: true,
    id: true,
    refType: HTMLDivElement,
    displayName: '@mantine/core/Picker',
    stylesApiSelectors: ['root'],
  });

  it('supports perspective prop', () => {
    const { container } = render(<Picker data={[]} />);
    expect(container.querySelector('.mantine-Picker-root')).toHaveStyle({ perspective: '500px' });
  });
});
