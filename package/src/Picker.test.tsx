import React from 'react';
import { render } from '@mantine-tests/core';
import { Picker } from './Picker';

const sampleData = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'];

describe('Picker', () => {
  it('renders without crashing', () => {
    const { container } = render(<Picker data={sampleData} />);
    expect(container).toBeTruthy();
  });

  it('renders with empty data', () => {
    const { container } = render(<Picker data={[]} />);
    expect(container).toBeTruthy();
  });

  it('renders container for items', () => {
    const { container } = render(<Picker data={sampleData} />);
    expect(container.querySelector('[role="listbox"]')).toBeTruthy();
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Picker data={sampleData} ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('supports perspective prop as CSS variable', () => {
    const { container } = render(<Picker data={[]} perspective={500} />);
    expect(container.querySelector('.mantine-Picker-root')).toHaveStyle({
      '--picker-perspective': '500px',
    });
  });

  it('renders data-disabled attribute when disabled', () => {
    const { container } = render(<Picker data={sampleData} disabled />);
    expect(container.querySelector('[data-disabled]')).toBeTruthy();
  });

  it('does not render data-disabled when not disabled', () => {
    const { container } = render(<Picker data={sampleData} />);
    expect(container.querySelector('[data-disabled]')).toBeNull();
  });

  it('renders data-readonly attribute when readOnly', () => {
    const { container } = render(<Picker data={sampleData} readOnly />);
    expect(container.querySelector('[data-readonly]')).toBeTruthy();
  });

  it('renders highlight by default (withHighlight=true)', () => {
    const { container } = render(<Picker data={sampleData} />);
    expect(container.querySelector('.highlight')).toBeTruthy();
  });

  it('does not render highlight when withHighlight=false', () => {
    const { container } = render(<Picker data={sampleData} withHighlight={false} />);
    expect(container.querySelector('.highlight')).toBeNull();
  });

  it('renders dividers by default (withDividers=true)', () => {
    const { container } = render(<Picker data={sampleData} />);
    expect(container.querySelector('.dividers')).toBeTruthy();
  });

  it('does not render dividers when withDividers=false', () => {
    const { container } = render(<Picker data={sampleData} withDividers={false} />);
    expect(container.querySelector('.dividers')).toBeNull();
  });

  it('renders data-3d attribute when enable3D is true (default)', () => {
    const { container } = render(<Picker data={sampleData} />);
    expect(container.querySelector('[data-3d]')).toBeTruthy();
  });

  it('does not render data-3d when enable3D is false', () => {
    const { container } = render(<Picker data={sampleData} enable3D={false} />);
    expect(container.querySelector('[data-3d]')).toBeNull();
  });

  it('renders left section', () => {
    const { getByText } = render(<Picker data={sampleData} leftSection={<span>Left</span>} />);
    expect(getByText('Left')).toBeTruthy();
  });

  it('renders right section', () => {
    const { getByText } = render(<Picker data={sampleData} rightSection={<span>Right</span>} />);
    expect(getByText('Right')).toBeTruthy();
  });

  it('sets itemHeight CSS variable', () => {
    const { container } = render(<Picker data={sampleData} itemHeight={50} />);
    expect(container.querySelector('.mantine-Picker-root')).toHaveStyle({
      '--picker-item-height': '50px',
    });
  });

  it('computes picker height from itemHeight and visibleItems', () => {
    const { container } = render(<Picker data={sampleData} itemHeight={40} visibleItems={5} />);
    expect(container.querySelector('.mantine-Picker-root')).toHaveStyle({
      '--picker-height': '200px',
    });
  });

  it('renders with numeric data', () => {
    const { container } = render(<Picker data={[1, 2, 3, 4, 5]} />);
    expect(container.querySelector('.mantine-Picker-root')).toBeTruthy();
  });

  it('renders mask when withMask is true', () => {
    const { container } = render(<Picker data={sampleData} withMask />);
    expect(container.querySelector('.mask')).toBeTruthy();
  });

  it('does not render mask by default (withMask=false)', () => {
    const { container } = render(<Picker data={sampleData} />);
    expect(container.querySelector('.mask')).toBeNull();
  });
});
