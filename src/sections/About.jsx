import { motion, useReducedMotion } from 'framer-motion';
import SectionHeading from '../components/SectionHeading';
import Reveal from '../components/Reveal';
import { assets, profile } from '../data/site.js';
import { maskReveal } from '../animations/variants';
import './About.css';

/* Concise pillars written only from the brief; no invented achievements. */
const pillars = [
  { label: 'Learning journey', note: `Pursuing ${profile.degree}.` },
  { label: 'Research and Development', note: 'Interested in research, innovation and emerging technologies.' },
  { label: 'Software development', note: 'Enjoys building practical projects and exploring new technologies.' },
  { label: 'Innovation', note: 'Looks for practical ways to apply new ideas and tools.' },
  { label: 'Problem solving', note: 'Enjoys solving problems and improving technical knowledge through practice.' },
  { label: 'Teamwork', note: 'Values collaboration and shared work.' },
  { label: 'Leadership', note: 'Interested in leadership and presenting ideas.' },
];

const monogram = profile.name
  .trim()
  .split(/\s+/)
  .map((part) => part[0])
  .join('')
  .slice(0, 3);

export default function About() {
  const reduceMotion = useReducedMotion();

  const portraitMotion = reduceMotion
    ? {}
    : {
        initial: 'hidden',
        whileInView: 'visible',
        viewport: { once: true, amount: 0.35 },
        variants: maskReveal,
      };

  return (
    <section id="about" className="section section--tint about">
      <div className="container">
        <SectionHeading title="BEYOND THE CODE." />

        <div className="about__grid">
          <Reveal className="about__copy">
            <p className="about__intro">{profile.about}</p>

            <div className="about__pillars">
              {pillars.map((pillar, index) => (
                <div className="about__pillar" key={pillar.label}>
                  <span className="about__pillar-index" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="about__pillar-body">
                    <h3 className="about__pillar-title">{pillar.label}</h3>
                    <p className="about__pillar-note">{pillar.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal className="about__visual" delay={0.12}>
            <motion.div className="media-frame about__portrait" {...portraitMotion}>
              <img
                src={assets.about}
                alt="Atmospheric forest backdrop behind the portrait placeholder."
                loading="lazy"
              />
              <div className="about__portrait-shade" aria-hidden="true" />
              <div className="about__monogram" aria-hidden="true">
                <span>{monogram}</span>
              </div>
              <span className="tag tag--accent about__placeholder-tag">Portrait placeholder</span>
            </motion.div>
            <p className="mono-label about__caption">
              Portrait placeholder — no personal photograph supplied
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
