import {
  Box,
  createVarsResolver,
  MantineGradient,
  MantineSize,
  polymorphicFactory,
  Text,
  useProps,
  useStyles,
  type BoxProps,
  type PolymorphicFactory,
  type StylesApiProps,
  type TextProps,
} from '@mantine/core';
import { useMergedRef, useUncontrolled } from '@mantine/hooks';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import classes from './Picker.module.css';

export type PickerStylesNames = 'root' | 'container' | 'item' | 'mask' | 'highlight' | 'dividers';

export type PickerCssVariables = {
  root:
    | '--picker-height'
    | '--picker-item-height'
    | '--picker-animation-duration'
    | '--picker-animation-easing'
    | '--picker-perspective'
    | '--picker-rotate-y'
    | '--picker-mask-height'
    | '--picker-mask-intensity';
};

type TextTruncate = 'end' | 'start' | boolean;

export interface PickerBaseProps<T = string | number> {
  /**
   * Array of items to display in the picker
   */
  data: T[];

  /**
   * Currently selected value (controlled mode)
   */
  value?: T;

  /**
   * Initial selected value for uncontrolled mode. Ignored when `value` is provided.
   */
  defaultValue?: T;

  /**
   * Callback function called when value changes (called in both controlled and uncontrolled mode)
   */
  onChange?: (value: T) => void;

  /**
   * Called when any scroll interaction begins: drag, mouse wheel, keyboard nav, or programmatic animation.
   */
  onScrollStart?: () => void;

  /**
   * Called when all scroll interactions have settled: momentum ends, animation completes, or the wheel debounce expires.
   */
  onScrollEnd?: () => void;

  /**
   * Trigger a short `navigator.vibrate()` pulse on supported devices whenever the selected item changes,
   * giving the picker a native iOS/Android feel. Pass `true` for the default 15ms duration, or a number to
   * set a custom duration in milliseconds. No-op on desktop or unsupported browsers.
   * @default false
   */
  hapticFeedback?: boolean | number;

  /**
   * Whether to animate the scroll to the selected value on mount
   * @default true
   */
  animate?: boolean;

  /**
   * Animation duration in milliseconds
   * @default 300
   */
  animationDuration?: number;

  /**
   * Easing function for animations
   * @default "linear"
   */
  easingFunction?: string;

  /**
   * Whether to loop through the items when reaching the end
   * @default true
   */
  loop?: boolean;

  /**
   * Height of each item in pixels
   * @default 40
   */
  itemHeight?: number;

  /**
   * Number of visible items
   * @default 3
   */
  visibleItems?: number;

  /**
   * Custom render function for items
   */
  renderItem?: (item: T) => React.ReactNode;

  /**
   * Whether to prevent page scrolling when the mouse is over the picker
   * @default true
   */
  preventPageScroll?: boolean;

  /**
   * Whether the picker is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether the picker is read-only (disables interaction but maintains visual appearance)
   * @default false
   */
  readOnly?: boolean;

  /**
   * Minimum opacity for non-selected items
   * @default 0.3
   */
  minItemOpacity?: number;

  /**
   * Minimum scale for non-selected items
   * @default 0.85
   */
  minItemScale?: number;

  /**
   * Maximum blur amount for non-selected items (in pixels)
   * @default 0
   */
  maxBlurAmount?: number;

  /**
   * ID for the component, necessary for accessibility
   */
  id?: string;

  /**
   * Label for the component, necessary for accessibility
   */
  label?: string;

  /**
   * Additional description for the component, useful for accessibility
   */
  description?: string;

  /**
   * Keyboard navigation hint
   */
  keyboardHint?: string;

  /**
   * If true, the component can receive focus
   * @default true
   */
  focusable?: boolean;

  /**
   * Mouse wheel sensitivity (higher = more sensitive)
   * @default 1
   */
  wheelSensitivity?: number;

  /**
   * Whether to include the highlight for the selected item
   * @default true
   */
  withHighlight?: boolean;

  /**
   * Whether to include dividers above and below the selected item
   * @default true
   */
  withDividers?: boolean;

  /**
   * Whether to include the gradient mask at the top and bottom
   * @default true
   */
  withMask?: boolean;

  /** Controls `font-size` and `line-height`, `'md'` by default */
  size?: MantineSize | (string & {});

  /** Number of lines after which Text will be truncated */
  lineClamp?: number;

  /** Side on which Text must be truncated, if `true`, text is truncated from the start */
  truncate?: TextTruncate;

  /** Sets `line-height` to 1 for centering, `false` by default */
  inline?: boolean;

  /** Determines whether font properties should be inherited from the parent, `false` by default */
  inherit?: boolean;

  /** Gradient configuration, ignored when `variant` is not `gradient`, `theme.defaultGradient` by default */
  gradient?: MantineGradient;

  /**
   * Enable 3D effect similar to iOS
   * @default true
   */
  enable3D?: boolean;

  /**
   * Perspective value for 3D effect (in pixels)
   * @default 300
   */
  perspective?: number;

  /**
   * Maximum rotation angle for items (in degrees)
   * @default 60
   */
  maxRotation?: number;

  /**
   * Cylinder radius factor (affects the curvature of the 3D effect)
   * @default 4
   */
  cylinderRadius?: number;

  /**
   * Momentum factor for inertia effect after drag
   * @default 0.95
   */
  momentum?: number;

  /**
   * Deceleration rate for momentum scrolling
   * @default 0.95
   */
  decelerationRate?: number;

  /**
   * Height of the mask gradient at top and bottom (in percentage)
   * @default 55
   */
  maskHeight?: number;

  /**
   * Intensity of the mask gradient (in percentage)
   * @default 10
   */
  maskIntensity?: number;

  /**
   * Content to display on the left side of the picker
   */
  leftSection?: React.ReactNode;

  /**
   * Content to display on the right side of the picker
   */
  rightSection?: React.ReactNode;

  /**
   * Width of the left section in pixels
   * @default "auto"
   */
  leftSectionWidth?: number | string;

  /**
   * Width of the right section in pixels
   * @default "auto"
   */
  rightSectionWidth?: number | string;

  /**
   * Rotation angle for the items around the Y-axis (in degrees)
   * @default 0
   */
  rotateY?: number;
}

export interface PickerProps<T = string | number>
  extends BoxProps, PickerBaseProps<T>, StylesApiProps<PickerFactory> {}

export type PickerFactory = PolymorphicFactory<{
  props: PickerProps;
  defaultComponent: 'div';
  defaultRef: HTMLDivElement;
  stylesNames: PickerStylesNames;
  vars: PickerCssVariables;
}>;

const defaultProps: Partial<PickerProps> = {
  animate: true,
  animationDuration: 300,
  loop: true,
  itemHeight: 40,
  visibleItems: 3,
  preventPageScroll: true,
  disabled: false,
  readOnly: false,
  minItemOpacity: 0.3,
  minItemScale: 0.85,
  maxBlurAmount: 0,
  easingFunction: 'linear',
  focusable: true,
  wheelSensitivity: 1,
  withHighlight: true,
  withDividers: true,
  withMask: false,
  enable3D: true,
  perspective: 300,
  maxRotation: 60,
  cylinderRadius: 4,
  momentum: 0.95,
  decelerationRate: 0.95,
  maskHeight: 55,
  maskIntensity: 10,
  leftSectionWidth: 'auto',
  rightSectionWidth: 'auto',
  rotateY: 0,
};

// We are modifying the varsResolver to ensure it correctly sets the CSS variables.
const varsResolver = createVarsResolver<PickerFactory>(
  (
    _,
    {
      itemHeight,
      animationDuration,
      visibleItems,
      easingFunction,
      perspective,
      maskHeight,
      maskIntensity,
      rotateY,
      enable3D,
    }
  ) => {
    // Calculate the exact height based on the number of visible items
    const pickerHeight = (itemHeight || 40) * (visibleItems || 5);
    return {
      root: {
        '--picker-height': `${pickerHeight}px`,
        '--picker-item-height': `${itemHeight || 40}px`,
        '--picker-animation-duration': `${animationDuration || 300}ms`,
        '--picker-animation-easing': easingFunction || 'ease-out',
        '--picker-perspective': `${perspective || 300}px`,
        '--picker-mask-height': `${maskHeight || 45}%`,
        '--picker-mask-intensity': `${maskIntensity || 60}%`,
        '--picker-rotate-y': enable3D ? `${rotateY || 0}deg` : '0deg',
      },
    };
  }
);

/**
 * Picker Component
 *
 * A component that replicates the iOS picker with smooth scrolling, 3D rotation effect, and animations.
 */
export const Picker = polymorphicFactory<PickerFactory>((_props) => {
  const { ref, ...restProps } = _props as typeof _props & { ref?: React.Ref<HTMLDivElement> };
  const props = useProps('Picker', defaultProps, restProps);

  const {
    data,
    value,
    defaultValue,
    onChange,
    onScrollStart,
    onScrollEnd,
    hapticFeedback,
    animate,
    animationDuration,
    easingFunction,
    loop,
    itemHeight,
    visibleItems,
    renderItem,
    preventPageScroll,
    disabled,
    readOnly,
    minItemOpacity,
    minItemScale,
    maxBlurAmount,
    id,
    label,
    description,
    keyboardHint,
    focusable,
    wheelSensitivity,
    withHighlight,
    withDividers,
    withMask,
    enable3D,
    perspective,
    maxRotation,
    cylinderRadius,
    momentum,
    decelerationRate,
    maskHeight,
    maskIntensity,
    leftSection,
    rightSection,
    leftSectionWidth,
    rightSectionWidth,
    rotateY,

    size,
    lineClamp,
    truncate,
    inline,
    inherit,
    gradient,
    fw,
    fs,
    td,
    c,
    tt,
    ta,
    variant,

    classNames,
    style,
    styles,
    unstyled,
    vars,
    className,

    ...others
  } = props;

  const textProps: TextProps = {
    size,
    lineClamp,
    truncate,
    inline,
    inherit,
    gradient,
    fw,
    fs,
    td,
    c,
    tt,
    ta,
    variant,
  };

  const getStyles = useStyles<PickerFactory>({
    name: 'Picker',
    props,
    classes,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver,
  });

  // Bridge controlled and uncontrolled modes. handleChange always notifies the
  // consumer-supplied onChange and updates internal state when uncontrolled.
  // useUncontrolled is called with a loose type because the polymorphicFactory
  // erases the generic from the function body.
  const [_value, handleChange] = useUncontrolled<any>({
    value,
    defaultValue,
    finalValue: undefined,
    onChange,
  });

  // Find the index of the selected value, falling back to 0 when the value isn't in
  // `data` (e.g. an out-of-band defaultValue or a typo) so the wheel always lands on a
  // real item and the data-selected attribute can be set.
  const rawSelectedIndex = _value !== undefined ? data.indexOf(_value) : 0;
  const selectedIndex = rawSelectedIndex >= 0 ? rawSelectedIndex : 0;
  const prevValueRef = useRef<typeof _value>(_value);

  // Reference to the container element
  const containerRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const mergedRootRef = useMergedRef(ref as React.Ref<HTMLDivElement>, rootRef);

  // State for tracking drag
  const [isDragging, setIsDragging] = useState(false);
  const lastYRef = useRef(0);
  const velocityRef = useRef(0);

  // State for tracking momentum
  const [isMomentumScrolling, setIsMomentumScrolling] = useState(false);
  const lastMoveTime = useRef<number>(0);
  const lastMovePosition = useRef<number>(0);
  const momentumAnimationRef = useRef<number | null>(null);

  // State for tracking wheel scrolling
  const [isWheeling, setIsWheeling] = useState(false);
  const wheelTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastWheelEventTime = useRef<number>(0);

  // State for the current position (can be fractional during drag)
  const [currentPosition, setCurrentPosition] = useState(selectedIndex);
  const currentPositionRef = useRef(currentPosition);
  currentPositionRef.current = currentPosition;

  // State for animation
  const [isAnimating, setIsAnimating] = useState(false);
  const animationRef = useRef<number | null>(null);

  // Notify consumers about transitions between idle and any kind of scroll activity.
  // The four boolean states (drag, momentum, wheel, animate) are unioned so a single
  // continuous interaction (e.g. drag → momentum) only fires onScrollStart/onScrollEnd once.
  const isScrolling = isDragging || isMomentumScrolling || isWheeling || isAnimating;
  const wasScrollingRef = useRef(false);
  useEffect(() => {
    if (isScrolling && !wasScrollingRef.current) {
      onScrollStart?.();
    } else if (!isScrolling && wasScrollingRef.current) {
      onScrollEnd?.();
    }
    wasScrollingRef.current = isScrolling;
  }, [isScrolling, onScrollStart, onScrollEnd]);

  // Optional haptic feedback on selection change. The first run primes the previous-value
  // tracker (so initial mount doesn't vibrate); subsequent value changes vibrate when
  // hapticFeedback is enabled, silently no-ops on devices without navigator.vibrate.
  const hapticPrevRef = useRef<{ value: typeof _value } | null>(null);
  useEffect(() => {
    if (hapticPrevRef.current === null) {
      hapticPrevRef.current = { value: _value };
      return;
    }
    if (!hapticFeedback || hapticPrevRef.current.value === _value) {
      hapticPrevRef.current.value = _value;
      return;
    }
    hapticPrevRef.current.value = _value;
    if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
      const duration = typeof hapticFeedback === 'number' ? hapticFeedback : 15;
      navigator.vibrate(duration);
    }
  }, [_value, hapticFeedback]);

  // State for focus
  const [isFocused, setIsFocused] = useState(false);

  // Track previous loop value
  const prevLoopRef = useRef(loop);

  // Save original body overflow for proper restoration (fix #1)
  const originalOverflowRef = useRef<string | null>(null);

  // Platform detection (computed once)
  const isWindows = typeof navigator !== 'undefined' && navigator.userAgent.includes('Windows');

  // Find the best (shortest) path to a target index, wrapping around when loop is enabled.
  // Reads currentPositionRef.current so the callback identity stays stable across position
  // updates and can safely participate in dependency arrays of effects/handlers.
  const findBestPathToValue = useCallback(
    (targetIndex: number) => {
      if (!loop || data.length <= 1) {
        return targetIndex;
      }

      const currentRoundedPos = Math.round(currentPositionRef.current);
      const currentDataIndex = ((currentRoundedPos % data.length) + data.length) % data.length;

      // Special handling for small arrays with loop enabled
      if (data.length <= (visibleItems || 5)) {
        let directPath = targetIndex - currentDataIndex;
        if (directPath > data.length / 2) {
          directPath -= data.length;
        } else if (directPath < -data.length / 2) {
          directPath += data.length;
        }

        return currentRoundedPos + directPath;
      }

      // For larger datasets, use standard shortest path calculation
      const directPath = Math.abs(targetIndex - currentDataIndex);
      const wrapPath = data.length - directPath;

      if (wrapPath < directPath) {
        // It's shorter to go the other way around
        if (targetIndex > currentDataIndex) {
          return currentRoundedPos - wrapPath;
        }
        return currentRoundedPos + wrapPath;
      }

      // Direct path is shorter or equal
      if (targetIndex > currentDataIndex) {
        return currentRoundedPos + directPath;
      }
      return currentRoundedPos - directPath;
    },
    [loop, data.length, visibleItems]
  );

  // Snap to nearest item and notify via handleChange (must be before animateToPosition).
  // handleChange routes through useUncontrolled, so it both updates internal state in
  // uncontrolled mode and forwards to consumer onChange in either mode.
  const snapAndNotify = useCallback(
    (roundedPosition: number) => {
      if (data.length === 0) {
        return;
      }
      const realIndex = loop
        ? ((roundedPosition % data.length) + data.length) % data.length
        : Math.max(0, Math.min(data.length - 1, roundedPosition));
      if (!disabled) {
        handleChange(data[realIndex]);
      }
      prevValueRef.current = data[realIndex];
    },
    [disabled, loop, data, handleChange]
  );

  // Function to animate to a specific position
  const animateToPosition = useCallback(
    (targetPosition: number) => {
      if (targetPosition === currentPositionRef.current || isAnimating) {
        return;
      }

      // If loop is false, clamp the target position to valid range
      let clampedTargetPosition = targetPosition;
      if (!loop) {
        clampedTargetPosition = Math.max(0, Math.min(data.length - 1, targetPosition));
      }

      // Cancel any ongoing animation
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }

      // Cancel any momentum scrolling
      if (momentumAnimationRef.current !== null) {
        cancelAnimationFrame(momentumAnimationRef.current);
        setIsMomentumScrolling(false);
      }

      // Set animation state
      setIsAnimating(true);

      const startTime = performance.now();
      const startPosition = currentPositionRef.current;
      const distance = Math.abs(clampedTargetPosition - startPosition);

      // Adjust duration based on distance - much shorter for small distances
      const duration = Math.min(
        animationDuration || 300,
        Math.max(100, (animationDuration || 300) * Math.min(distance / 3, 1))
      );

      // Animation function
      const animate = (time: number) => {
        const elapsed = time - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Use easeOutQuad for smoother, less bouncy animation
        const easeProgress = 1 - (1 - progress) * (1 - progress);

        // Calculate the current position
        const position = startPosition + (clampedTargetPosition - startPosition) * easeProgress;

        // Update the current position for rendering
        setCurrentPosition(position);

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate);
        } else {
          // Animation complete
          setIsAnimating(false);
          animationRef.current = null;

          // Set exactly to the target position to avoid floating point issues
          setCurrentPosition(clampedTargetPosition);

          // Notify via onChange
          snapAndNotify(Math.round(clampedTargetPosition));
        }
      };

      // Start animation
      animationRef.current = requestAnimationFrame(animate);
    },
    [isAnimating, loop, data.length, animationDuration, snapAndNotify]
  );

  // Handle external value changes (controlled) or initial defaultValue (uncontrolled)
  useEffect(() => {
    if (_value !== prevValueRef.current && selectedIndex !== -1) {
      if (animate) {
        const targetPosition = findBestPathToValue(selectedIndex);
        animateToPosition(targetPosition);
      } else {
        setCurrentPosition(selectedIndex);
      }
      prevValueRef.current = _value;
    }
  }, [_value, selectedIndex, animate, findBestPathToValue, animateToPosition]);

  // Handle loop property changes
  // Reads currentPositionRef.current to avoid stale closure and to keep this effect
  // out of the per-frame render loop (currentPosition updates ~60fps during drag/scroll).
  useEffect(() => {
    if (prevLoopRef.current === loop) {
      return;
    }

    if (!loop) {
      const position = currentPositionRef.current;
      const clampedPosition = Math.max(0, Math.min(data.length - 1, position));

      if (clampedPosition !== position) {
        setCurrentPosition(clampedPosition);
      }

      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
        setIsAnimating(false);
      }

      if (momentumAnimationRef.current !== null) {
        cancelAnimationFrame(momentumAnimationRef.current);
        momentumAnimationRef.current = null;
        setIsMomentumScrolling(false);
      }

      const realIndex = Math.round(clampedPosition);
      if (realIndex >= 0 && realIndex < data.length && _value !== data[realIndex]) {
        handleChange(data[realIndex]);
      }
    }

    setIsDragging(false);
    prevLoopRef.current = loop;
  }, [loop, handleChange, _value, data]);

  // Function to apply momentum scrolling
  const applyMomentum = useCallback(() => {
    if (velocityRef.current === 0 || disabled) {
      return;
    }

    setIsMomentumScrolling(true);

    // Apply the momentum factor to the initial velocity
    let currentVelocity = velocityRef.current * (momentum || 0.95);
    let currentPos = currentPositionRef.current;
    let lastDirection = Math.sign(currentVelocity);

    const momentumScroll = () => {
      // Apply deceleration to velocity
      currentVelocity *= decelerationRate || 0.95;

      // Update position based on velocity
      let newPos = currentPos + currentVelocity;

      // If loop is false, clamp the position and apply bounce effect
      if (!loop) {
        const minPos = 0;
        const maxPos = data.length - 1;

        if (newPos < minPos) {
          // Bounce effect at the start
          newPos = minPos + (minPos - newPos) * 0.2;
          currentVelocity *= -0.5; // Reverse and reduce velocity
        } else if (newPos > maxPos) {
          // Bounce effect at the end
          newPos = maxPos - (newPos - maxPos) * 0.2;
          currentVelocity *= -0.5; // Reverse and reduce velocity
        }

        // If we're very close to the edge, just snap to it
        if (Math.abs(newPos - minPos) < 0.1) {
          newPos = minPos;
        }
        if (Math.abs(newPos - maxPos) < 0.1) {
          newPos = maxPos;
        }

        // If we hit a boundary, reduce velocity more quickly
        if (newPos === minPos || newPos === maxPos) {
          currentVelocity *= 0.7;
        }
      }

      currentPos = newPos;

      // Check if direction has changed or velocity is very small
      const currentDirection = Math.sign(currentVelocity);
      const directionChanged =
        lastDirection !== 0 && currentDirection !== 0 && lastDirection !== currentDirection;
      const isSlowEnough = Math.abs(currentVelocity) < 0.02;

      // Update position
      setCurrentPosition(currentPos);

      // Continue momentum or snap to nearest item
      if (!isSlowEnough && !directionChanged) {
        momentumAnimationRef.current = requestAnimationFrame(momentumScroll);
      } else {
        // End of momentum, snap directly to nearest item WITHOUT animation
        setIsMomentumScrolling(false);

        // Find the nearest item
        let roundedPosition = Math.round(currentPos);

        // If loop is false, clamp the position
        if (!loop) {
          roundedPosition = Math.max(0, Math.min(data.length - 1, roundedPosition));
        }

        // Set the position directly without animation
        setCurrentPosition(roundedPosition);

        // Update the DOM before calling onChange
        requestAnimationFrame(() => {
          snapAndNotify(roundedPosition);
        });
      }

      // Update direction for next frame
      lastDirection = currentDirection;
    };

    // Start momentum scrolling
    momentumAnimationRef.current = requestAnimationFrame(momentumScroll);
  }, [disabled, momentum, decelerationRate, loop, data.length, snapAndNotify]);

  // Clean up animation on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
      if (momentumAnimationRef.current !== null) {
        cancelAnimationFrame(momentumAnimationRef.current);
      }
      if (wheelTimeoutRef.current) {
        clearTimeout(wheelTimeoutRef.current);
      }
    };
  }, []);

  // Handle mouse enter to disable page scrolling (saves original value)
  const handleMouseEnter = () => {
    const isInteractionDisabled = disabled || readOnly;
    if (preventPageScroll && !isInteractionDisabled && typeof document !== 'undefined') {
      originalOverflowRef.current = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
    }
  };

  // Handle mouse leave to restore page scrolling (only if we modified it)
  const handleMouseLeave = () => {
    if (
      preventPageScroll &&
      typeof document !== 'undefined' &&
      originalOverflowRef.current !== null
    ) {
      document.body.style.overflow = originalOverflowRef.current;
      originalOverflowRef.current = null;
    }
  };

  // Ensure overflow is restored on unmount
  useEffect(() => {
    return () => {
      if (
        preventPageScroll &&
        typeof document !== 'undefined' &&
        originalOverflowRef.current !== null
      ) {
        document.body.style.overflow = originalOverflowRef.current;
        originalOverflowRef.current = null;
      }
    };
  }, [preventPageScroll]);

  // Calculate the visible items
  const halfVisible = Math.floor((visibleItems || 5) / 2);

  // Shared drag start logic
  const startDrag = (clientY: number) => {
    const isInteractionDisabled = disabled || readOnly;
    if (isAnimating || isInteractionDisabled || isMomentumScrolling) {
      return;
    }

    // Cancel any momentum scrolling
    if (momentumAnimationRef.current !== null) {
      cancelAnimationFrame(momentumAnimationRef.current);
      setIsMomentumScrolling(false);
    }

    setIsDragging(true);
    lastYRef.current = clientY;
    velocityRef.current = 0;
    lastMoveTime.current = performance.now();
    lastMovePosition.current = currentPosition;
  };

  // Handle mouse down event
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    startDrag(e.clientY);
  };

  // Handle touch start event
  const handleTouchStart = (e: React.TouchEvent) => {
    startDrag(e.touches[0].clientY);
  };

  // Function to clamp position when loop is false
  const clampPosition = useCallback(
    (position: number): number => {
      if (loop) {
        return position;
      }

      if (position < 0) {
        return position * 0.3;
      } else if (position > data.length - 1) {
        return data.length - 1 + (position - (data.length - 1)) * 0.3;
      }
      return position;
    },
    [loop, data.length]
  );

  // Shared drag move logic (fix #4: eliminates mouse/touch duplication)
  const handleDragMove = useCallback(
    (clientY: number) => {
      const isInteractionDisabled = disabled || readOnly;
      if (!isDragging || isInteractionDisabled) {
        return;
      }

      const currentTime = performance.now();
      const deltaY = clientY - lastYRef.current;
      const timeDelta = currentTime - lastMoveTime.current;

      const itemOffsetRatio = deltaY / (itemHeight || 40);

      setCurrentPosition((prev) => {
        let newPosition = prev - itemOffsetRatio;
        newPosition = clampPosition(newPosition);

        if (timeDelta > 0) {
          const positionDelta = newPosition - lastMovePosition.current;
          velocityRef.current = (positionDelta / timeDelta) * 16;
        }

        lastMovePosition.current = newPosition;
        lastMoveTime.current = currentTime;

        return newPosition;
      });

      lastYRef.current = clientY;
    },
    [isDragging, disabled, readOnly, itemHeight, clampPosition]
  );

  // Shared drag end logic (fix #3: eliminates mouse/touch duplication)
  const handleDragEnd = useCallback(() => {
    const isInteractionDisabled = disabled || readOnly;
    if (!isDragging || isInteractionDisabled) {
      return;
    }

    setIsDragging(false);

    if (Math.abs(velocityRef.current) > 0.05) {
      applyMomentum();
    } else {
      let roundedPosition = Math.round(currentPositionRef.current);

      if (!loop) {
        roundedPosition = Math.max(0, Math.min(data.length - 1, roundedPosition));
      }

      if (roundedPosition !== currentPositionRef.current) {
        animateToPosition(roundedPosition);
      } else {
        snapAndNotify(roundedPosition);
      }
    }
  }, [
    isDragging,
    disabled,
    readOnly,
    loop,
    data.length,
    applyMomentum,
    animateToPosition,
    snapAndNotify,
  ]);

  // Add and remove event listeners
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => handleDragMove(e.clientY);
    const onMouseUp = () => handleDragEnd();
    const onTouchMove = (e: TouchEvent) => handleDragMove(e.touches[0].clientY);
    const onTouchEnd = () => handleDragEnd();

    if (isDragging) {
      window.addEventListener('mousemove', onMouseMove, { passive: false });
      window.addEventListener('mouseup', onMouseUp);
      window.addEventListener('touchmove', onTouchMove, { passive: false });
      window.addEventListener('touchend', onTouchEnd);
    }

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [isDragging, handleDragMove, handleDragEnd]);

  // Shared wheel-end snap logic (uses ref to avoid stale closure — fix #2)
  const wheelSnapToNearest = useCallback(() => {
    setIsWheeling(false);

    let roundedPosition = Math.round(currentPositionRef.current);

    if (!loop) {
      roundedPosition = Math.max(0, Math.min(data.length - 1, roundedPosition));
    }

    if (roundedPosition !== currentPositionRef.current) {
      animateToPosition(roundedPosition);
    } else {
      snapAndNotify(roundedPosition);
    }

    wheelTimeoutRef.current = null;
  }, [loop, data.length, snapAndNotify, animateToPosition]);

  // Handle wheel event
  const handleWheel = useCallback(
    (e: WheelEvent) => {
      const isInteractionDisabled = disabled || readOnly;
      if (isAnimating || isInteractionDisabled || isMomentumScrolling) {
        return;
      }

      // Cancel any momentum scrolling
      if (momentumAnimationRef.current !== null) {
        cancelAnimationFrame(momentumAnimationRef.current);
        setIsMomentumScrolling(false);
      }

      e.preventDefault();
      e.stopPropagation();

      setIsWheeling(true);

      let sensitivity = wheelSensitivity || 1;
      let delta = e.deltaY;

      // Normalize deltaMode (Firefox line mode, page mode)
      if (e.deltaMode === 1) {
        delta *= 16;
      } else if (e.deltaMode === 2) {
        delta *= 100;
      }

      // Windows mouse wheels produce larger deltas
      if (isWindows) {
        sensitivity *= 0.2;
      }

      delta *= sensitivity;

      // Update position directly for smooth scrolling
      setCurrentPosition((prev) => {
        let newPosition = prev + (delta / (itemHeight || 40)) * 0.08;

        if (!loop) {
          if (newPosition < 0) {
            newPosition *= 0.3;
          } else if (newPosition > data.length - 1) {
            newPosition = data.length - 1 + (newPosition - (data.length - 1)) * 0.3;
          }
        }

        return newPosition;
      });

      // Debounce wheel end detection
      if (wheelTimeoutRef.current) {
        clearTimeout(wheelTimeoutRef.current);
      }

      lastWheelEventTime.current = Date.now();

      wheelTimeoutRef.current = setTimeout(() => {
        if (Date.now() - lastWheelEventTime.current >= 150) {
          wheelSnapToNearest();
        } else {
          // Retry after another 150ms
          if (wheelTimeoutRef.current) {
            clearTimeout(wheelTimeoutRef.current);
          }
          wheelTimeoutRef.current = setTimeout(wheelSnapToNearest, 150);
        }
      }, 150);
    },
    [
      data,
      loop,
      isAnimating,
      disabled,
      readOnly,
      itemHeight,
      wheelSensitivity,
      isMomentumScrolling,
      isWindows,
      wheelSnapToNearest,
    ]
  );

  // Register wheel listener as native event with { passive: false } to allow preventDefault
  useEffect(() => {
    const el = containerRef.current;
    if (!el || disabled || readOnly) {
      return;
    }

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', handleWheel);
    };
  }, [handleWheel, disabled, readOnly]);

  // Handle key down event
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      // Check if interaction is disabled (either by disabled or readOnly prop)
      const isInteractionDisabled = disabled || readOnly;
      if (isInteractionDisabled) {
        return;
      }

      // Cancel any momentum scrolling
      if (momentumAnimationRef.current !== null) {
        cancelAnimationFrame(momentumAnimationRef.current);
        setIsMomentumScrolling(false);
      }

      switch (e.key) {
        case 'ArrowUp': {
          e.preventDefault();
          // Calculate new position
          let prevPosition = Math.round(currentPosition) - 1;
          // If loop is false, clamp the position
          if (!loop) {
            prevPosition = Math.max(0, prevPosition);
          }
          // Animate to new position
          animateToPosition(prevPosition);
          break;
        }
        case 'ArrowDown': {
          e.preventDefault();
          // Calculate new position
          let nextPosition = Math.round(currentPosition) + 1;
          // If loop is false, clamp the position
          if (!loop) {
            nextPosition = Math.min(data.length - 1, nextPosition);
          }
          // Animate to new position
          animateToPosition(nextPosition);
          break;
        }
        case 'Home':
          e.preventDefault();
          // Go to first item
          animateToPosition(0);
          break;
        case 'End':
          e.preventDefault();
          // Go to last item
          animateToPosition(data.length - 1);
          break;
        case 'PageUp': {
          e.preventDefault();
          // Go up 5 items or to beginning
          let pageUpPosition = Math.round(currentPosition) - 5;
          if (loop) {
            pageUpPosition = ((pageUpPosition % data.length) + data.length) % data.length;
          } else {
            pageUpPosition = Math.max(0, pageUpPosition);
          }
          animateToPosition(pageUpPosition);
          break;
        }
        case 'PageDown': {
          e.preventDefault();
          // Go down 5 items or to end
          let pageDownPosition = Math.round(currentPosition) + 5;
          if (loop) {
            pageDownPosition = ((pageDownPosition % data.length) + data.length) % data.length;
          } else {
            pageDownPosition = Math.min(data.length - 1, pageDownPosition);
          }
          animateToPosition(pageDownPosition);
          break;
        }
        default:
          break;
      }
    },
    [currentPosition, data.length, loop, disabled, readOnly, animateToPosition]
  );

  // Handle focus
  const handleFocus = () => {
    if (!disabled) {
      setIsFocused(true);
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  // Handle click on an item
  const handleItemClick = (clickedIndex: number, virtualIndex: number) => {
    // Check if interaction is disabled (either by disabled or readOnly prop)
    const isInteractionDisabled = disabled || readOnly;
    if (isDragging || isAnimating || isInteractionDisabled || isMomentumScrolling) {
      return;
    }

    // Cancel any momentum scrolling
    if (momentumAnimationRef.current !== null) {
      cancelAnimationFrame(momentumAnimationRef.current);
      setIsMomentumScrolling(false);
    }

    // For visible elements, we should always scroll directly to the visual position instead of calculating the path based on data indices.

    // Calculate the current rounded position.
    const currentRoundedPos = Math.round(currentPosition);

    // Calculate the difference between the virtual position of the clicked element and the current position. This is the direct visual distance, regardless of the data indices.
    const directVisualPath = virtualIndex - currentRoundedPos;

    // Animates directly to the virtual position of the clicked element
    // This ensures that we always scroll in the most visually direct direction
    animateToPosition(currentRoundedPos + directVisualPath);

    // Use the real data index for the onChange callback
    snapAndNotify(clickedIndex);
  };

  // Memoized continuous indices for smooth looping (fix #8: avoid allocation every render)
  const flooredPosition = Math.floor(currentPosition);
  const continuousIndices = useMemo(() => {
    if (!loop || data.length <= 1) {
      return Array.from({ length: data.length }, (_, i) => ({ dataIndex: i, virtualIndex: i }));
    }

    const duplicatesPerSide = Math.max((visibleItems || 5) * 2, data.length * 2);
    const indices = [];

    const startIndex = flooredPosition - duplicatesPerSide;
    const endIndex = flooredPosition + duplicatesPerSide;

    for (let i = startIndex; i <= endIndex; i++) {
      const dataIndex = ((i % data.length) + data.length) % data.length;
      indices.push({ dataIndex, virtualIndex: i });
    }

    return indices;
  }, [loop, data.length, visibleItems, flooredPosition]);

  // Render the items with enhanced handling for loop transitions and 3D effect
  const renderItems = () => {
    const items = [];

    // Calculate the range of indices to render
    // We use exactly the number of visible items specified, plus a small buffer for smooth scrolling
    const visibleRange = Math.max(
      halfVisible + 1, // Add just 1 extra item on each side for smoother scrolling
      Math.ceil(data.length / 2) // Keep this for small datasets
    );

    // Render each item in the visible range
    for (const { dataIndex, virtualIndex } of continuousIndices) {
      // Calculate the relative position from the current position
      const relativePos = virtualIndex - currentPosition;

      // Only render items in the visible range
      if (Math.abs(relativePos) <= visibleRange) {
        // Calculate the position of the item
        const itemOffset = relativePos * (itemHeight || 40);

        // Calculate the distance from the center
        const distanceFromCenter = Math.abs(relativePos);
        const maxDistance = halfVisible;

        // Calculate the normalized distance (0 to 1)
        const normalizedDistance = Math.min(distanceFromCenter / maxDistance, 1);

        // Check if this is the selected item
        const isSelected = Math.round(currentPosition) === virtualIndex;

        // Get the minOpacity value, ensuring it's a number
        const minOpacity = typeof minItemOpacity === 'number' ? minItemOpacity : 0.3;

        // For selected item, always use opacity 1
        // For non-selected items, calculate based on distance and minItemOpacity
        let opacity;
        if (isSelected) {
          opacity = 1;
        } else {
          // Linear interpolation between 1 and minItemOpacity
          opacity = minOpacity + (1 - minOpacity) * (1 - normalizedDistance);
        }

        // Calculate scale - enhanced to allow for more dramatic scaling
        // For selected item, always use 1
        const minScale = typeof minItemScale === 'number' ? minItemScale : 0.85;
        const scale = isSelected ? 1 : minScale + (1 - minScale) * (1 - normalizedDistance);

        // Calculate blur amount based on maxBlurAmount
        // If maxBlurAmount is 0, no blur will be applied
        const blurAmount =
          maxBlurAmount && maxBlurAmount > 0 && !isSelected
            ? `${normalizedDistance * maxBlurAmount}px`
            : '0px';

        // Use a stable key that includes both the data index and virtual index
        const key = `item-${dataIndex}-${virtualIndex}`;

        // Build the transform style with 3D effects if enabled
        let transform;
        if (enable3D) {
          // Let's increase the intensity of the 3D effect to make it more visible.
          const zTranslation = enable3D ? Math.abs(relativePos) * -20 : 0; // Increased from -10 to -20
          const rotationAngle = enable3D
            ? -(relativePos * (maxRotation || 45)) / (cylinderRadius || 4)
            : 0;

          transform = `
            translateY(${itemOffset}px)
            translateZ(${zTranslation}px)
            rotateX(${rotationAngle}deg)
            scale(${scale})
          `;
        } else {
          transform = `translateY(${itemOffset}px) scale(${scale})`;
        }

        items.push(
          <Text
            {...textProps}
            span
            key={key}
            id={id ? `${id}-item-${dataIndex}` : undefined}
            className={classes.item}
            role="option"
            aria-selected={isSelected || undefined}
            style={{
              transform,
              opacity,
              height: `${itemHeight || 40}px`,
              transition: isDragging || isWheeling || isMomentumScrolling ? 'none' : undefined,
              filter: `blur(${blurAmount})`,
              // Add pointer-events: none when opacity is very low to prevent clicking on nearly invisible items
              // or when interaction is disabled
              pointerEvents: opacity < 0.1 || disabled || readOnly ? 'none' : 'auto',
              // For 3D effect
              backfaceVisibility: enable3D ? 'hidden' : undefined,
              transformStyle: enable3D ? 'preserve-3d' : undefined,
            }}
            data-selected={isSelected || undefined}
            data-dragging={isDragging || undefined}
            data-wheeling={isWheeling || undefined}
            data-animating={isAnimating || undefined}
            data-momentum={isMomentumScrolling || undefined}
            data-disabled={disabled || undefined}
            data-readonly={readOnly || undefined}
            data-3d={enable3D || undefined}
            onClick={() => handleItemClick(dataIndex, virtualIndex)}
          >
            {renderItem ? renderItem(data[dataIndex]) : data[dataIndex]}
          </Text>
        );
      }
    }

    return items;
  };

  // Render the sections
  const renderLeftSection = leftSection && (
    <div className={classes.section} data-position="left" style={{ width: leftSectionWidth }}>
      {leftSection}
    </div>
  );

  const renderRightSection = rightSection && (
    <div className={classes.section} data-position="right" style={{ width: rightSectionWidth }}>
      {rightSection}
    </div>
  );

  return (
    <Box
      ref={mergedRootRef}
      {...getStyles('root', {
        style: {
          perspective: enable3D ? `${perspective}px` : undefined,
        },
      })}
      {...others}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-disabled={disabled || undefined}
      data-readonly={readOnly || undefined}
      data-focused={isFocused || undefined}
      data-3d={enable3D || undefined}
      data-with-left-section={!!leftSection || undefined}
      data-with-right-section={!!rightSection || undefined}
      role="group"
      aria-labelledby={label && id ? `${id}-label` : undefined}
      aria-describedby={
        (description && id ? `${id}-description` : undefined) ||
        (keyboardHint && id ? `${id}-hint` : undefined) ||
        undefined
      }
    >
      {label && id && (
        <div id={`${id}-label`} className="sr-only">
          {label}
        </div>
      )}
      {description && id && (
        <div id={`${id}-description`} className="sr-only">
          {description}
        </div>
      )}
      {keyboardHint && id && (
        <div id={`${id}-hint`} className="sr-only">
          {keyboardHint}
        </div>
      )}

      <div className={classes.pickerWrapper}>
        {withHighlight && <div className={classes.highlight} />}
        {withMask && <div className={classes.mask} />}
        {withDividers && <div className={classes.dividers} />}

        {renderLeftSection}
        {renderRightSection}

        <div
          ref={containerRef}
          className={classes.container}
          onMouseDown={disabled || readOnly ? undefined : handleMouseDown}
          onTouchStart={disabled || readOnly ? undefined : handleTouchStart}
          onKeyDown={disabled || readOnly ? undefined : handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          tabIndex={disabled || readOnly ? -1 : 0}
          role="listbox"
          aria-activedescendant={id ? `${id}-item-${Math.round(currentPosition)}` : undefined}
          aria-disabled={disabled || undefined}
          aria-readonly={readOnly || undefined}
          style={{
            cursor: disabled
              ? 'not-allowed'
              : readOnly
                ? 'default'
                : isDragging
                  ? 'grabbing'
                  : 'grab',
            perspective: enable3D ? `${perspective}px` : undefined,
            transformStyle: enable3D ? 'preserve-3d' : undefined,
          }}
          data-animating={isAnimating || undefined}
          data-wheeling={isWheeling || undefined}
          data-momentum={isMomentumScrolling || undefined}
          data-disabled={disabled || undefined}
          data-readonly={readOnly || undefined}
          data-3d={enable3D || undefined}
          data-dragging={isDragging || undefined}
        >
          {renderItems()}
        </div>
      </div>
    </Box>
  );
});

Picker.classes = classes;
Picker.displayName = 'Picker';
