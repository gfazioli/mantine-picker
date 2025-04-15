import React from 'react';
import { render } from '@mantine-tests/core';
import { Picker } from './Picker';

describe('@mantine/core/Picker', () => {
  it('supports perspective prop', () => {
    const { container } = render(<Picker data={[]} perspective={500} />);
    expect(container.querySelector('.mantine-Picker-root')).toHaveStyle({
      '--picker-perspective': '500px',
    });
  });
});
