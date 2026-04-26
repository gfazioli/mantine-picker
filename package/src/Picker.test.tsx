import { render } from '@mantine-tests/core';
import { act } from '@testing-library/react';
import React from 'react';
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

  // Regression tests for #24 (loop toggle) and #23 (findBestPathToValue useCallback).
  // The bugs were stale closures inside the loop-change and value-change effects.
  // These tests exercise both effect paths to lock in the corrected dependency model.
  describe('loop toggle (#24)', () => {
    it('does not call onChange spuriously when toggling loop with a valid value', () => {
      const onChange = jest.fn();
      const { rerender } = render(
        <Picker data={sampleData} value="Cherry" loop onChange={onChange} />
      );
      onChange.mockClear();

      rerender(<Picker data={sampleData} value="Cherry" loop={false} onChange={onChange} />);

      expect(onChange).not.toHaveBeenCalled();
    });

    it('preserves the selected value when toggling loop=true → loop=false at index 0', () => {
      const { rerender, container } = render(<Picker data={sampleData} value="Apple" loop />);
      rerender(<Picker data={sampleData} value="Apple" loop={false} />);

      expect(container.querySelector('[role="listbox"]')).toBeTruthy();
      expect(container).toHaveTextContent('Apple');
    });

    it('preserves the selected value when toggling loop=true → loop=false at last index', () => {
      const { rerender, container } = render(<Picker data={sampleData} value="Elderberry" loop />);
      rerender(<Picker data={sampleData} value="Elderberry" loop={false} />);

      expect(container).toHaveTextContent('Elderberry');
    });

    it('survives multiple loop toggles without crashing', () => {
      const onChange = jest.fn();
      const { rerender, container } = render(
        <Picker data={sampleData} value="Cherry" loop onChange={onChange} />
      );

      rerender(<Picker data={sampleData} value="Cherry" loop={false} onChange={onChange} />);
      rerender(<Picker data={sampleData} value="Cherry" loop onChange={onChange} />);
      rerender(<Picker data={sampleData} value="Cherry" loop={false} onChange={onChange} />);

      expect(container.querySelector('[role="listbox"]')).toBeTruthy();
      expect(container).toHaveTextContent('Cherry');
    });
  });

  describe('scroll lifecycle callbacks (#15)', () => {
    it('does not fire onScrollStart or onScrollEnd on initial mount (idle state)', () => {
      const onScrollStart = jest.fn();
      const onScrollEnd = jest.fn();
      render(
        <Picker
          data={sampleData}
          value="Cherry"
          onScrollStart={onScrollStart}
          onScrollEnd={onScrollEnd}
        />
      );

      expect(onScrollStart).not.toHaveBeenCalled();
      expect(onScrollEnd).not.toHaveBeenCalled();
    });

    it('accepts the callbacks without crashing across value transitions', () => {
      const onScrollStart = jest.fn();
      const onScrollEnd = jest.fn();
      const { rerender, container } = render(
        <Picker
          data={sampleData}
          value="Apple"
          animate={false}
          onScrollStart={onScrollStart}
          onScrollEnd={onScrollEnd}
        />
      );

      rerender(
        <Picker
          data={sampleData}
          value="Date"
          animate={false}
          onScrollStart={onScrollStart}
          onScrollEnd={onScrollEnd}
        />
      );

      expect(container.querySelector('[role="listbox"]')).toBeTruthy();
    });
  });

  describe('hapticFeedback (#26)', () => {
    let vibrate: jest.Mock;
    const nav = navigator as { vibrate?: unknown };
    let originalVibrate: unknown;

    beforeEach(() => {
      originalVibrate = nav.vibrate;
      vibrate = jest.fn().mockReturnValue(true);
      nav.vibrate = vibrate;
    });

    afterEach(() => {
      if (originalVibrate === undefined) {
        delete nav.vibrate;
      } else {
        nav.vibrate = originalVibrate;
      }
    });

    // Wrapper that keeps the Picker mounted across value changes so the internal
    // ref-based "previous value" tracking persists. Using rerender() with the
    // mantine-tests render helper resets refs because the wrapper recreates the tree.
    function HapticHarness({
      initial,
      hapticFeedback,
    }: {
      initial: string;
      hapticFeedback?: boolean | number;
    }) {
      const [v, setV] = React.useState(initial);
      return (
        <>
          <Picker data={sampleData} value={v} animate={false} hapticFeedback={hapticFeedback} />
          <button data-testid="change" type="button" onClick={() => setV('Date')} />
          <button data-testid="change-cherry" type="button" onClick={() => setV('Cherry')} />
        </>
      );
    }

    it('does not vibrate on initial mount', () => {
      render(<Picker data={sampleData} value="Cherry" hapticFeedback />);
      expect(vibrate).not.toHaveBeenCalled();
    });

    it('vibrates with default 15ms when selected value changes', () => {
      const { getByTestId } = render(<HapticHarness initial="Apple" hapticFeedback />);
      expect(vibrate).not.toHaveBeenCalled();

      act(() => {
        getByTestId('change').click();
      });
      expect(vibrate).toHaveBeenCalledWith(15);
    });

    it('vibrates with the provided duration when hapticFeedback is a number', () => {
      const { getByTestId } = render(<HapticHarness initial="Apple" hapticFeedback={40} />);
      act(() => {
        getByTestId('change-cherry').click();
      });
      expect(vibrate).toHaveBeenCalledWith(40);
    });

    it('does not vibrate when hapticFeedback is omitted', () => {
      const { getByTestId } = render(<HapticHarness initial="Apple" />);
      act(() => {
        getByTestId('change').click();
      });
      expect(vibrate).not.toHaveBeenCalled();
    });

    it('does not vibrate when hapticFeedback is false', () => {
      const { getByTestId } = render(<HapticHarness initial="Apple" hapticFeedback={false} />);
      act(() => {
        getByTestId('change').click();
      });
      expect(vibrate).not.toHaveBeenCalled();
    });
  });

  describe('uncontrolled mode (#16)', () => {
    const selectedText = (container: HTMLElement) =>
      container.querySelector('[data-selected]')?.textContent;

    it('renders the defaultValue as initial selection', () => {
      const { container } = render(<Picker data={sampleData} defaultValue="Cherry" />);
      expect(selectedText(container)).toBe('Cherry');
    });

    it('controlled value takes precedence over defaultValue', () => {
      const { container } = render(<Picker data={sampleData} value="Date" defaultValue="Cherry" />);
      expect(selectedText(container)).toBe('Date');
    });

    it('falls back to data[0] when neither value nor defaultValue is provided', () => {
      const { container } = render(<Picker data={sampleData} />);
      expect(selectedText(container)).toBe('Apple');
    });
  });

  describe('value change effect (#23)', () => {
    it('renders correctly after a controlled value change', () => {
      const { rerender, container } = render(
        <Picker data={sampleData} value="Apple" animate={false} />
      );
      expect(container).toHaveTextContent('Apple');

      rerender(<Picker data={sampleData} value="Date" animate={false} />);

      expect(container).toHaveTextContent('Date');
    });

    it('reacts to value changes both with loop enabled and disabled', () => {
      const { rerender, container } = render(
        <Picker data={sampleData} value="Apple" loop animate={false} />
      );
      rerender(<Picker data={sampleData} value="Cherry" loop animate={false} />);
      expect(container).toHaveTextContent('Cherry');

      rerender(<Picker data={sampleData} value="Elderberry" loop={false} animate={false} />);
      expect(container).toHaveTextContent('Elderberry');
    });
  });
});
