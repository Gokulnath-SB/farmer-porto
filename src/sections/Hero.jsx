import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Mail } from 'lucide-react';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { assets, profile } from '../data/site.js';
import { fadeUp, stagger } from '../animations/variants';
import './Hero.css';

/* Section copy comes from the brief. Personal facts and links come from site.js. */
const HERO_COPY = {
  hello: "HELLO, I'M",
  headline: 'BUILDING IDEAS INTO DIGITAL REALITY.',
  description:
    'Computer Science Engineering student passionate about technology, research, innovation and creating meaningful digital experiences.',
  primaryAction: 'EXPLORE MY WORK',
  secondaryAction: "LET'S CONNECT",
  scroll: 'SCROLL',
};

export default function Hero() {
  const sectionRef = useRef(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '16%']);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -44]);

  const stageProps = reduceMotion
    ? {}
    : { initial: 'hidden', animate: 'visible', variants: stagger };
  const itemProps = reduceMotion ? {} : { variants: fadeUp };

  return (
    <section ref={sectionRef} id="home" className="hero" aria-label="Introduction">
      <motion.div
        className="hero__background"
        aria-hidden="true"
        style={{
          backgroundImage: `url("${assets.hero}")`,
          ...(reduceMotion ? {} : { y: backgroundY }),
        }}
      />
      <div className="hero__scrim" aria-hidden="true" />
      <div className="hero__sunlight" aria-hidden="true" />

      <div className="container hero__inner">
        <motion.div
          className="hero__content"
          style={reduceMotion ? undefined : { y: contentY }}
          {...stageProps}
        >
          <motion.p className="mono-label hero__hello" {...itemProps}>
            {HERO_COPY.hello}
          </motion.p>
          <motion.h1 className="hero__name" {...itemProps}>
            {profile.name}
          </motion.h1>
          <motion.p className="hero__headline" {...itemProps}>
            {HERO_COPY.headline}
          </motion.p>
          <motion.p className="hero__description" {...itemProps}>
            {HERO_COPY.description}
          </motion.p>
          <motion.div className="hero__actions" {...itemProps}>
            <a className="btn btn--primary hero__btn" href="#projects">
              {HERO_COPY.primaryAction}
              <ArrowUpRight size={16} strokeWidth={2} aria-hidden="true" />
            </a>
            <a className="btn btn--ghost hero__btn" href="#contact">
              {HERO_COPY.secondaryAction}
            </a>
          </motion.div>
        </motion.div>
      </div>

      <div className="hero__foot container">
        <a className="hero__scroll" href="#about" aria-label="Scroll to the about section">
          <span className="hero__scroll-track" aria-hidden="true">
            <span className="hero__scroll-dot" />
          </span>
          <span className="hero__scroll-label" aria-hidden="true">
            {HERO_COPY.scroll}
          </span>
          <ArrowDown className="hero__scroll-arrow" size={14} aria-hidden="true" />
        </a>

        <nav className="hero__socials" aria-label="Social links">
          <a
            className="icon-link hero__social"
            href={profile.social.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FaGithub size={17} aria-hidden="true" />
          </a>
          <a
            className="icon-link hero__social"
            href={profile.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn size={17} aria-hidden="true" />
          </a>
          <a className="icon-link hero__social" href={`mailto:${profile.email}`} aria-label="Email">
            <Mail size={17} strokeWidth={1.8} aria-hidden="true" />
          </a>
        </nav>
      </div>
    </section>
  );
}
