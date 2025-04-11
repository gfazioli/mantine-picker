import React, { useCallback, useEffect, useRef, useState } from 'react';
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
   * Currently selected value
   */
  value?: T;

  /**
   * Callback function called when value changes
   */
  onChange?: (value: T) => void;

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

export interface PickerProps<T = any>
  extends BoxProps,
    PickerBaseProps<T>,
    StylesApiProps<PickerFactory> {}

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
export const Picker = polymorphicFactory<PickerFactory>((_props, ref) => {
  const props = useProps('Picker', defaultProps, _props);

  const {
    data,
    value,
    onChange,
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

  // Find the index of the selected value
  const selectedIndex = value !== undefined ? data.indexOf(value) : 0;
  const prevValueRef = useRef<typeof value>(value);

  // Reference to the container element
  const containerRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  // State for tracking drag
  const [isDragging, setIsDragging] = useState(false);
  const [lastY, setLastY] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

  // State for tracking momentum
  const [velocity, setVelocity] = useState(0);
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

  // State for animation
  const [isAnimating, setIsAnimating] = useState(false);
  const animationRef = useRef<number | null>(null);

  // State for focus
  const [isFocused, setIsFocused] = useState(false);

  // Track previous loop value
  const prevLoopRef = useRef(loop);

  // Handle external value changes
  useEffect(() => {
    if (value !== prevValueRef.current && selectedIndex !== -1) {
      if (animate) {
        // Find the best path to the new value
        const targetPosition = findBestPathToValue(selectedIndex);
        animateToPosition(targetPosition);
      } else {
        setCurrentPosition(selectedIndex);
      }
      prevValueRef.current = value;
    }
  }, [value, selectedIndex, animate]);

  // Handle loop property changes
  useEffect(() => {
    // Check if loop has changed
    if (prevLoopRef.current !== loop) {
      // If changing from loop=true to loop=false, ensure position is valid
      if (!loop) {
        // Clamp the current position to valid range
        const clampedPosition = Math.max(0, Math.min(data.length - 1, currentPosition));

        // If position changed, update it
        if (clampedPosition !== currentPosition) {
          setCurrentPosition(clampedPosition);
        }

        // Force a re-render by canceling any animations and resetting states
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

        // Update the selected value if needed
        const realIndex = Math.round(clampedPosition);
        if (realIndex >= 0 && realIndex < data.length && value !== data[realIndex]) {
          onChange?.(data[realIndex]);
        }
      }

      // Force a re-render to update the visible items
      setIsDragging(false);

      // Update the ref for next comparison
      prevLoopRef.current = loop;
    }
  }, [loop, currentPosition, onChange, value, data]);

  // Function to find the best path to a value
  const findBestPathToValue = (targetIndex: number) => {
    if (!loop || data.length <= 1) {
      return targetIndex;
    }

    // Special handling for small arrays with loop enabled
    if (data.length <= (visibleItems || 5)) {
      // Get the current rounded position
      const currentRoundedPos = Math.round(currentPosition);

      // Calculate the current data index
      const currentDataIndex = ((currentRoundedPos % data.length) + data.length) % data.length;

      // Calculate the shortest path
      let directPath = targetIndex - currentDataIndex;
      if (directPath > data.length / 2) {
        directPath -= data.length;
      } else if (directPath < -data.length / 2) {
        directPath += data.length;
      }

      return currentRoundedPos + directPath;
    }

    // For larger datasets, use standard shortest path calculation
    const currentRoundedPos = Math.round(currentPosition);
    const currentDataIndex = ((currentRoundedPos % data.length) + data.length) % data.length;

    // Calculate direct and wrap paths
    const directPath = Math.abs(targetIndex - currentDataIndex);
    const wrapPath = data.length - directPath;

    if (wrapPath < directPath) {
      // It's shorter to go the other way around
      if (targetIndex > currentDataIndex) {
        return currentRoundedPos - wrapPath;
      } else {
        return currentRoundedPos + wrapPath;
      }
    }

    // Direct path is shorter or equal
    if (targetIndex > currentDataIndex) {
      return currentRoundedPos + directPath;
    } else {
      return currentRoundedPos - directPath;
    }
  };

  // Function to animate to a specific position
  const animateToPosition = (targetPosition: number) => {
    if (targetPosition === currentPosition || isAnimating) return;

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
    const startPosition = currentPosition;
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

        // Call onChange with the new value if not disabled
        if (!disabled) {
          // Always use the real data index for the onChange callback
          const realIndex = loop
            ? ((Math.round(clampedTargetPosition) % data.length) + data.length) % data.length
            : Math.round(clampedTargetPosition);
          onChange?.(data[realIndex]);
        }

        // Store the real data value
        const realIndex = loop
          ? ((Math.round(clampedTargetPosition) % data.length) + data.length) % data.length
          : Math.round(clampedTargetPosition);
        prevValueRef.current = data[realIndex];
      }
    };

    // Start animation
    animationRef.current = requestAnimationFrame(animate);
  };

  // Function to apply momentum scrolling
  const applyMomentum = () => {
    if (velocity === 0 || disabled) return;

    setIsMomentumScrolling(true);

    // Apply the momentum factor to the initial velocity
    let currentVelocity = velocity * (momentum || 0.95);
    let currentPos = currentPosition;
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
        if (Math.abs(newPos - minPos) < 0.1) newPos = minPos;
        if (Math.abs(newPos - maxPos) < 0.1) newPos = maxPos;

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
          // Call onChange with the new value if not disabled
          if (!disabled) {
            const realIndex = loop
              ? ((roundedPosition % data.length) + data.length) % data.length
              : roundedPosition;
            onChange?.(data[realIndex]);
          }
          const realIndex = loop
            ? ((roundedPosition % data.length) + data.length) % data.length
            : roundedPosition;
          prevValueRef.current = data[realIndex];
        });
      }

      // Update direction for next frame
      lastDirection = currentDirection;
    };

    // Start momentum scrolling
    momentumAnimationRef.current = requestAnimationFrame(momentumScroll);
  };

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

  // Handle mouse enter to disable page scrolling
  const handleMouseEnter = () => {
    // Check if interaction is disabled (either by disabled or readOnly prop)
    const isInteractionDisabled = disabled || readOnly;
    if (preventPageScroll && !isInteractionDisabled && typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  };

  // Handle mouse leave to restore page scrolling
  const handleMouseLeave = () => {
    if (preventPageScroll && typeof document !== 'undefined') {
      document.body.style.overflow = 'auto';
    }
  };

  // Ensure overflow is restored on unmount
  useEffect(() => {
    return () => {
      if (preventPageScroll && typeof document !== 'undefined') {
        document.body.style.overflow = 'auto';
      }
    };
  }, [preventPageScroll]);

  // Calculate the visible items
  const halfVisible = Math.floor((visibleItems || 5) / 2);

  // Handle mouse down event
  const handleMouseDown = (e: React.MouseEvent) => {
    // Check if interaction is disabled (either by disabled or readOnly prop)
    const isInteractionDisabled = disabled || readOnly;
    if (isAnimating || isInteractionDisabled || isMomentumScrolling) return;

    // Cancel any momentum scrolling
    if (momentumAnimationRef.current !== null) {
      cancelAnimationFrame(momentumAnimationRef.current);
      setIsMomentumScrolling(false);
    }

    e.preventDefault();
    setIsDragging(true);
    setLastY(e.clientY);
    setDragOffset(0);
    setVelocity(0);
    lastMoveTime.current = performance.now();
    lastMovePosition.current = currentPosition;
  };

  // Handle touch start event
  const handleTouchStart = (e: React.TouchEvent) => {
    // Check if interaction is disabled (either by disabled or readOnly prop)
    const isInteractionDisabled = disabled || readOnly;
    if (isAnimating || isInteractionDisabled || isMomentumScrolling) return;

    // Cancel any momentum scrolling
    if (momentumAnimationRef.current !== null) {
      cancelAnimationFrame(momentumAnimationRef.current);
      setIsMomentumScrolling(false);
    }

    setIsDragging(true);
    setLastY(e.touches[0].clientY);
    setDragOffset(0);
    setVelocity(0);
    lastMoveTime.current = performance.now();
    lastMovePosition.current = currentPosition;
  };

  // Function to clamp position when loop is false
  const clampPosition = (position: number): number => {
    if (loop) return position;

    // Apply resistance when going beyond boundaries
    if (position < 0) {
      // Apply resistance when going below 0
      return position * 0.3; // Resistance factor
    } else if (position > data.length - 1) {
      // Apply resistance when going beyond the last item
      return data.length - 1 + (position - (data.length - 1)) * 0.3; // Resistance factor
    }
    return position;
  };

  // Handle mouse move event
  const handleMouseMove = (e: MouseEvent) => {
    // Check if interaction is disabled (either by disabled or readOnly prop)
    const isInteractionDisabled = disabled || readOnly;
    if (!isDragging || isInteractionDisabled) return;

    const currentTime = performance.now();
    const newY = e.clientY;
    const deltaY = newY - lastY;
    const timeDelta = currentTime - lastMoveTime.current;

    // Calculate the drag offset in terms of items
    const itemOffsetRatio = deltaY / (itemHeight || 40);

    // Update the current position directly for smooth movement
    setCurrentPosition((prev) => {
      // Calculate new position
      let newPosition = prev - itemOffsetRatio;

      // Apply clamping if loop is false
      newPosition = clampPosition(newPosition);

      // Calculate velocity for momentum
      if (timeDelta > 0) {
        const positionDelta = newPosition - lastMovePosition.current;
        setVelocity((positionDelta / timeDelta) * 16); // Scale to roughly 60fps
      }

      lastMovePosition.current = newPosition;
      lastMoveTime.current = currentTime;

      return newPosition;
    });

    // Reset last position for next move
    setLastY(newY);
  };

  // Handle touch move event
  const handleTouchMove = (e: TouchEvent) => {
    // Check if interaction is disabled (either by disabled or readOnly prop)
    const isInteractionDisabled = disabled || readOnly;
    if (!isDragging || isInteractionDisabled) return;

    const currentTime = performance.now();
    const newY = e.touches[0].clientY;
    const deltaY = newY - lastY;
    const timeDelta = currentTime - lastMoveTime.current;

    // Calculate the drag offset in terms of items
    const itemOffsetRatio = deltaY / (itemHeight || 40);

    // Update the current position directly for smooth movement
    setCurrentPosition((prev) => {
      // Calculate new position
      let newPosition = prev - itemOffsetRatio;

      // Apply clamping if loop is false
      newPosition = clampPosition(newPosition);

      // Calculate velocity for momentum
      if (timeDelta > 0) {
        const positionDelta = newPosition - lastMovePosition.current;
        setVelocity((positionDelta / timeDelta) * 16); // Scale to roughly 60fps
      }

      lastMovePosition.current = newPosition;
      lastMoveTime.current = currentTime;

      return newPosition;
    });

    // Reset last position for next move
    setLastY(newY);
  };

  // Handle mouse up event
  const handleMouseUp = () => {
    // Check if interaction is disabled (either by disabled or readOnly prop)
    const isInteractionDisabled = disabled || readOnly;
    if (!isDragging || isInteractionDisabled) return;

    setIsDragging(false);
    setDragOffset(0);

    // Apply momentum if velocity is significant
    if (Math.abs(velocity) > 0.05) {
      applyMomentum();
    } else {
      // Otherwise snap to the nearest item
      let roundedPosition = Math.round(currentPosition);

      // If loop is false, clamp the position
      if (!loop) {
        roundedPosition = Math.max(0, Math.min(data.length - 1, roundedPosition));
      }

      if (roundedPosition !== currentPosition) {
        animateToPosition(roundedPosition);
      } else {
        // Call onChange with the new value if not disabled
        if (!disabled) {
          const realIndex = loop
            ? ((roundedPosition % data.length) + data.length) % data.length
            : roundedPosition;
          onChange?.(data[realIndex]);
        }
        const realIndex = loop
          ? ((roundedPosition % data.length) + data.length) % data.length
          : roundedPosition;
        prevValueRef.current = data[realIndex];
      }
    }
  };

  // Handle touch end event
  const handleTouchEnd = () => {
    // Check if interaction is disabled (either by disabled or readOnly prop)
    const isInteractionDisabled = disabled || readOnly;
    if (!isDragging || isInteractionDisabled) return;

    setIsDragging(false);
    setDragOffset(0);

    // Apply momentum if velocity is significant
    if (Math.abs(velocity) > 0.05) {
      applyMomentum();
    } else {
      // Otherwise snap to the nearest item
      let roundedPosition = Math.round(currentPosition);

      // If loop is false, clamp the position
      if (!loop) {
        roundedPosition = Math.max(0, Math.min(data.length - 1, roundedPosition));
      }

      if (roundedPosition !== currentPosition) {
        animateToPosition(roundedPosition);
      } else {
        // Call onChange with the new value if not disabled
        if (!disabled) {
          const realIndex = loop
            ? ((roundedPosition % data.length) + data.length) % data.length
            : roundedPosition;
          onChange?.(data[realIndex]);
        }
        const realIndex = loop
          ? ((roundedPosition % data.length) + data.length) % data.length
          : roundedPosition;
        prevValueRef.current = data[realIndex];
      }
    }
  };

  // Add and remove event listeners
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => handleMouseMove(e);
    const handleGlobalMouseUp = () => handleMouseUp();
    const handleGlobalTouchMove = (e: TouchEvent) => handleTouchMove(e);
    const handleGlobalTouchEnd = () => handleTouchEnd();

    if (isDragging) {
      window.addEventListener('mousemove', handleGlobalMouseMove, { passive: false });
      window.addEventListener('mouseup', handleGlobalMouseUp);
      window.addEventListener('touchmove', handleGlobalTouchMove, { passive: false });
      window.addEventListener('touchend', handleGlobalTouchEnd);
    }

    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
      window.removeEventListener('touchmove', handleGlobalTouchMove);
      window.removeEventListener('touchend', handleGlobalTouchEnd);
    };
  }, [isDragging, lastY, currentPosition, disabled, readOnly, loop, data.length]);

  // Handle wheel event
  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      // Check if interaction is disabled (either by disabled or readOnly prop)
      const isInteractionDisabled = disabled || readOnly;
      if (isAnimating || isInteractionDisabled || isMomentumScrolling) return;

      // Cancel any momentum scrolling
      if (momentumAnimationRef.current !== null) {
        cancelAnimationFrame(momentumAnimationRef.current);
        setIsMomentumScrolling(false);
      }

      // Prevent default to stop page scrolling
      e.stopPropagation();

      // Set wheeling state
      setIsWheeling(true);

      // Calculate delta with sensitivity applied
      const sensitivity = wheelSensitivity || 1;
      const delta = e.deltaY * sensitivity;

      // Update position directly for smooth scrolling
      setCurrentPosition((prev) => {
        // Calculate new position (wheel down = move up, wheel up = move down)
        let newPosition = prev + (delta / (itemHeight || 40)) * 0.05;

        // Apply clamping if loop is false
        if (!loop) {
          // Apply resistance when going beyond boundaries
          if (newPosition < 0) {
            // Apply resistance when going below 0
            newPosition = newPosition * 0.3; // Resistance factor
          } else if (newPosition > data.length - 1) {
            // Apply resistance when going beyond the last item
            newPosition = data.length - 1 + (newPosition - (data.length - 1)) * 0.3; // Resistance factor
          }
        }

        return newPosition;
      });

      // Set timeout to end wheeling state
      if (wheelTimeoutRef.current) {
        clearTimeout(wheelTimeoutRef.current);
      }

      // Store timestamp of last wheel event
      lastWheelEventTime.current = Date.now();

      // Set timeout to end wheeling state after a short period
      wheelTimeoutRef.current = setTimeout(() => {
        // Check if enough time has passed since last wheel event
        if (Date.now() - lastWheelEventTime.current >= 150) {
          setIsWheeling(false);

          // Snap to nearest item
          let roundedPosition = Math.round(currentPosition);

          // If loop is false, clamp the position
          if (!loop) {
            roundedPosition = Math.max(0, Math.min(data.length - 1, roundedPosition));
          }

          if (roundedPosition !== currentPosition) {
            animateToPosition(roundedPosition);
          } else {
            // Call onChange with the new value if not disabled
            if (!disabled) {
              const realIndex = loop
                ? ((roundedPosition % data.length) + data.length) % data.length
                : roundedPosition;
              onChange?.(data[realIndex]);
            }
            const realIndex = loop
              ? ((roundedPosition % data.length) + data.length) % data.length
              : roundedPosition;
            prevValueRef.current = data[realIndex];
          }

          wheelTimeoutRef.current = null;
        } else {
          // If little time has passed, try again later
          if (wheelTimeoutRef.current) {
            clearTimeout(wheelTimeoutRef.current);
          }
          wheelTimeoutRef.current = setTimeout(() => {
            setIsWheeling(false);

            // Snap to nearest item
            let roundedPosition = Math.round(currentPosition);

            // If loop is false, clamp the position
            if (!loop) {
              roundedPosition = Math.max(0, Math.min(data.length - 1, roundedPosition));
            }

            if (roundedPosition !== currentPosition) {
              animateToPosition(roundedPosition);
            } else {
              // Call onChange with the new value if not disabled
              if (!disabled) {
                const realIndex = loop
                  ? ((roundedPosition % data.length) + data.length) % data.length
                  : roundedPosition;
                onChange?.(data[realIndex]);
              }
              const realIndex = loop
                ? ((roundedPosition % data.length) + data.length) % data.length
                : roundedPosition;
              prevValueRef.current = data[realIndex];
            }

            wheelTimeoutRef.current = null;
          }, 150);
        }
      }, 150);
    },
    [
      currentPosition,
      data,
      loop,
      isAnimating,
      disabled,
      readOnly,
      itemHeight,
      onChange,
      wheelSensitivity,
      isMomentumScrolling,
    ]
  );

  // Handle key down event
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      // Check if interaction is disabled (either by disabled or readOnly prop)
      const isInteractionDisabled = disabled || readOnly;
      if (isInteractionDisabled) return;

      // Cancel any momentum scrolling
      if (momentumAnimationRef.current !== null) {
        cancelAnimationFrame(momentumAnimationRef.current);
        setIsMomentumScrolling(false);
      }

      switch (e.key) {
        case 'ArrowUp':
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
        case 'ArrowDown':
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
        case 'PageUp':
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
        case 'PageDown':
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
        default:
          break;
      }
    },
    [currentPosition, data.length, loop, disabled, readOnly, isMomentumScrolling]
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
    if (isDragging || isAnimating || isInteractionDisabled || isMomentumScrolling) return;

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
    if (!disabled) {
      onChange?.(data[clickedIndex]);
    }
    prevValueRef.current = data[clickedIndex];
  };

  // Create a continuous array of indices for smooth looping
  const createContinuousIndices = () => {
    if (!loop || data.length <= 1) {
      return Array.from({ length: data.length }, (_, i) => ({ dataIndex: i, virtualIndex: i }));
    }

    // Calculate how many duplicates we need on each side
    const duplicatesPerSide = Math.max(
      // At least visibleItems * 2 to ensure we have enough items on both sides
      (visibleItems || 5) * 2,
      // Or data.length * 2 to ensure we have enough duplicates for large datasets
      data.length * 2
    );

    const continuousIndices = [];

    // Create a continuous range of indices centered around the current position
    const startIndex = Math.floor(currentPosition) - duplicatesPerSide;
    const endIndex = Math.floor(currentPosition) + duplicatesPerSide;

    // Add all indices in the range
    for (let i = startIndex; i <= endIndex; i++) {
      const dataIndex = ((i % data.length) + data.length) % data.length;
      continuousIndices.push({ dataIndex, virtualIndex: i });
    }

    return continuousIndices;
  };

  // Render the items with enhanced handling for loop transitions and 3D effect
  const renderItems = () => {
    const items = [];

    // Create a continuous array of indices for smooth looping
    const continuousIndices = createContinuousIndices();

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
        const itemOffset = relativePos * (itemHeight || 40) + dragOffset;

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
      ref={(node) => {
        // Handle both refs
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
        rootRef.current = node;
      }}
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
          onWheel={disabled || readOnly ? undefined : handleWheel}
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
