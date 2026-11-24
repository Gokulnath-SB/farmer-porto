import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { assets } from '../data/site.js';
import { ease } from '../animations/variants.js';
import './Intro.css';

const SEEN_KEY = 'porto-intro-seen';
const INTRO_MS = 3400;

/** Deterministic pollen positions so the sequence looks identical on every visit. */
const PARTICLES = Array.from({ length: 24 }, (_, index) => {
  const unit = (seed) => {
    const value = Math.sin((index + 1) * seed) * 10000;
    return value - Math.floor(value);
  };

  return {
    left: 6 + unit(12.9898) * 88,
    size: 2 + unit(78.233) * 3,
    drift: (unit(45.164) - 0.5) * 90,
    delay: 0.5 + unit(93.989) * 1.8,
    duration: 2.6 + unit(31.416) * 2.2,
  };
});

function hasSeenIntro() {
  try {
    return window.sessionStorage.getItem(SEEN_KEY) === '1';
  } catch {
    return false;
  }
}

export default function Intro() {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(() => !reduceMotion && !hasSeenIntro());
  const skipRef = useRef(null);

  const finish = useCallback(() => {
    try {
      window.sessionStorage.setItem(SEEN_KEY, '1');
    } catch {
      /* Storage can be unavailable in private browsing; the intro still closes. */
    }
    setVisible(false);
  }, []);

  useEffect(() => {
    if (!visible || reduceMotion) return undefined;
    const timer = window.setTimeout(finish, INTRO_MS);
    return () => window.clearTimeout(timer);
  }, [visible, reduceMotion, finish]);

  useEffect(() => {
    if (!visible) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    skipRef.current?.focus({ preventScroll: true });
    return () => {
      document.body.style.overflow = previous;
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="intro"
          role="dialog"
          aria-modal="true"
          aria-label="PORTO opening sequence"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.85, ease }}
        >
          <motion.div
            className="intro__landscape"
            style={{ backgroundImage: `url(${assets.intro})` }}
            initial={{ opacity: 0, scale: 1.12 }}
            animate={{ opacity: 0.82, scale: 1 }}
            transition={{ duration: 1.5, ease }}
          />

          <motion.div
            className="intro__ray"
            aria-hidden="true"
            initial={{ opacity: 0, x: '-35%' }}
            animate={{ opacity: [0, 0.55, 0.25], x: ['-35%', '-10%', '5%'] }}
            transition={{ duration: 2.8, delay: 0.45, ease: 'easeOut' }}
          />

          <div className="intro__particles" aria-hidden="true">
            {PARTICLES.map((particle, index) => (
              <motion.span
                key={index}
                className="intro__particle"
                style={{ left: `${particle.left}%`, width: particle.size, height: particle.size }}
                initial={{ opacity: 0, y: 20, x: 0 }}
                animate={{
                  opacity: [0, 0.85, 0],
                  y: [20, -70, -150],
                  x: [0, particle.drift / 2, particle.drift],
                }}
                transition={{
                  duration: particle.duration,
                  delay: particle.delay,
                  repeat: Infinity,
                  ease: 'easeOut',
                }}
              />
            ))}
          </div>

          <div className="intro__content">
            <motion.p
              className="intro__eyebrow mono-label"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05, duration: 0.6, ease }}
            >
              Growing ideas. Building the future.
            </motion.p>

            <motion.div
              className="intro__logo"
              initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ delay: 1.3, duration: 0.85, ease }}
            >
              PORTO<span>.</span>
            </motion.div>

            <motion.div
              className="intro__tagline"
              initial="hidden"
              animate="visible"
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.16, delayChildren: 1.85 } } }}
            >
              {['GROWING IDEAS.', 'BUILDING THE FUTURE.'].map((line) => (
                <motion.span
                  key={line}
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease } },
                  }}
                >
                  {line}
                </motion.span>
              ))}
            </motion.div>
          </div>

          <button ref={skipRef} className="intro__skip" type="button" onClick={finish}>
            Skip intro <span aria-hidden="true">→</span>
          </button>

          <motion.div
            className="intro__progress"
            aria-hidden="true"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: INTRO_MS / 1000, ease: 'linear' }}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
