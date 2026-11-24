import { useEffect, useRef } from 'react';
import { animate, useReducedMotion } from 'framer-motion';

/**
 * Counts to a number by writing directly to a DOM node, so animation frames
 * never trigger React renders. Used for the academic figures.
 */
export function useCountUp(value, decimals = 0) {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const format = (next) => Number(next).toFixed(decimals);

    if (reduceMotion) {
      node.textContent = format(value);
      return undefined;
    }

    node.textContent = format(0);
    const controls = animate(0, value, {
      duration: 1.3,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        node.textContent = format(latest);
      },
    });

    return () => controls.stop();
  }, [value, decimals, reduceMotion]);

  return ref;
}
