import { motion, useReducedMotion } from 'framer-motion';
import { Code, Radar } from 'lucide-react';
import { experience } from '../data/site.js';
import { ease } from '../animations/variants.js';
import SectionHeading from '../components/SectionHeading.jsx';
import './Experience.css';

const TYPE_ICONS = {
  Internship: Code,
  Hackathon: Radar,
};

export default function Experience() {
  const reduceMotion = useReducedMotion();

  const listMotion = reduceMotion
    ? {}
    : {
        initial: 'hidden',
        whileInView: 'visible',
        viewport: { once: true, amount: 0.15 },
        variants: {
          hidden: {},
          visible: { transition: { staggerChildren: 0.18, delayChildren: 0.12 } },
        },
      };

  const itemMotion = reduceMotion
    ? {}
    : {
        variants: {
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 0.7, ease } },
        },
      };

  const railMotion = reduceMotion
    ? {}
    : {
        initial: { scaleY: 0 },
        whileInView: { scaleY: 1 },
        viewport: { once: true, amount: 0.4 },
        transition: { duration: 1.15, ease, delay: 0.05 },
      };

  const List = reduceMotion ? 'ol' : motion.ol;
  const Item = reduceMotion ? 'li' : motion.li;
  const Rail = reduceMotion ? 'div' : motion.div;

  return (
    <section id="experience" className="section experience">
      <div className="container">
        <SectionHeading
          title="MY JOURNEY OF INNOVATION."
          description="Two experiences from the journey so far: a Python development internship and participation in the Smart India Hackathon."
        />

        <div className="experience__timeline">
          <Rail className="experience__rail" aria-hidden="true" {...railMotion} />

          <List className="experience__list" {...listMotion}>
            {experience.map((entry) => {
              const Icon = TYPE_ICONS[entry.type] ?? Code;

              return (
                <Item className="experience__item" key={entry.id} {...itemMotion}>
                  <div className="experience__marker" aria-hidden="true">
                    <span className="experience__node" />
                  </div>

                  <article className="card experience__content">
                    <div className="experience__top">
                      <span className="tag tag--accent experience__type">{entry.type}</span>
                      <Icon className="experience__icon" size={20} strokeWidth={1.6} aria-hidden="true" />
                    </div>

                    <h3 className="experience__title">{entry.title}</h3>

                    {entry.project ? (
                      <div className="experience__project">
                        <span className="mono-label">Project focus</span>
                        <p className="experience__project-title">{entry.project}</p>
                      </div>
                    ) : null}

                    <p className="experience__detail">{entry.detail}</p>
                  </article>
                </Item>
              );
            })}
          </List>
        </div>
      </div>
    </section>
  );
}
