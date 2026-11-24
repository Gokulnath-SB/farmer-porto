import { motion, useReducedMotion } from 'framer-motion';
import { skillGroups } from '../data/site.js';
import { ease } from '../animations/variants.js';
import SectionHeading from '../components/SectionHeading.jsx';
import './Skills.css';

export default function Skills() {
  const reduceMotion = useReducedMotion();

  const gridMotion = reduceMotion
    ? {}
    : {
        initial: 'hidden',
        whileInView: 'visible',
        viewport: { once: true, amount: 0.12 },
        variants: {
          hidden: {},
          visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
        },
      };

  const cardMotion = reduceMotion
    ? {}
    : {
        variants: {
          hidden: { opacity: 0, y: 26 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease, staggerChildren: 0.055, delayChildren: 0.1 },
          },
        },
        whileHover: { y: -5, opacity: 0.98, transition: { duration: 0.3, ease } },
      };

  const itemMotion = reduceMotion
    ? {}
    : {
        variants: {
          hidden: { opacity: 0, y: 10 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease } },
        },
      };

  const Grid = reduceMotion ? 'div' : motion.div;
  const Card = reduceMotion ? 'article' : motion.article;
  const Item = reduceMotion ? 'li' : motion.li;

  return (
    <section id="skills" className="section section--tint skills">
      <div className="container">
        <SectionHeading
          title="TOOLS THAT SHAPE MY IDEAS."
          description="The languages, web technologies, platforms and professional practices behind my work. Listed as supplied — with no invented proficiency scores."
        />

        <Grid className="skills__grid" {...gridMotion}>
          {skillGroups.map((group, index) => (
            <Card className="card skills__card" key={group.title} {...cardMotion}>
              <div className="skills__card-head">
                <span className="skills__index mono-label" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="skills__group-title">{group.title}</h3>
              </div>

              <ul className="skills__list">
                {group.items.map((item) => (
                  <Item className="skills__item" key={item.name} {...itemMotion}>
                    <span className="skills__item-name">{item.name}</span>
                    {item.note ? <span className="skills__note">{item.note}</span> : null}
                  </Item>
                ))}
              </ul>
            </Card>
          ))}
        </Grid>

        <p className="skills__footnote">
          Notes such as “Currently learning” are shown exactly as provided; no skill levels or percentages are assigned.
        </p>
      </div>
    </section>
  );
}
