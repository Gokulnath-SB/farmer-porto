import { motion, useReducedMotion } from 'framer-motion';
import { fadeUp } from '../animations/variants';

/** Shared scroll-triggered reveal. Degrades to a plain element under reduced motion. */
export default function Reveal({ children, className = '', delay = 0, id }) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <div className={className} id={id}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.18 }}
      variants={{
        hidden: fadeUp.hidden,
        visible: {
          ...fadeUp.visible,
          transition: { ...fadeUp.visible.transition, delay },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
