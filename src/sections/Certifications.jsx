import { motion, useReducedMotion } from 'framer-motion';
import { Award, BadgeCheck, Code, Terminal } from 'lucide-react';
import { certifications } from '../data/site.js';
import { ease } from '../animations/variants.js';
import SectionHeading from '../components/SectionHeading.jsx';
import './Certifications.css';

const CERT_ICONS = {
  'oracle-java': BadgeCheck,
  'hackerrank-java': Code,
  leetcode: Terminal,
  be10x: Award,
};

export default function Certifications() {
  const reduceMotion = useReducedMotion();

  const gridMotion = reduceMotion
    ? {}
    : {
        initial: 'hidden',
        whileInView: 'visible',
        viewport: { once: true, amount: 0.12 },
        variants: {
          hidden: {},
          visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
        },
      };

  const cardMotion = reduceMotion
    ? {}
    : {
        variants: {
          hidden: { opacity: 0, y: 24 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
        },
        whileHover: { y: -5, opacity: 0.98, transition: { duration: 0.3, ease } },
      };

  const Grid = reduceMotion ? 'div' : motion.div;
  const Card = reduceMotion ? 'article' : motion.article;

  return (
    <section id="certifications" className="section section--tint certifications">
      <div className="container">
        <SectionHeading
          title="ALWAYS GROWING."
          description="Learning, practice and credentials as supplied. Certificate previews can be added here when they are provided — none are shown or implied here."
        />

        <Grid className="certs__grid" {...gridMotion}>
          {certifications.map((cert) => {
            const Icon = CERT_ICONS[cert.id] ?? Award;
            const inProgress = cert.status === 'In Progress';

            return (
              <Card className="card certs__card" key={cert.id} {...cardMotion}>
                <div className="certs__card-top">
                  <span className="certs__icon" aria-hidden="true">
                    <Icon size={22} strokeWidth={1.6} />
                  </span>
                  <span
                    className={`tag certs__status ${
                      inProgress ? 'certs__status--outline' : 'certs__status--solid'
                    }`}
                  >
                    {cert.status}
                  </span>
                </div>

                <div className="certs__body">
                  <h3 className="certs__title">{cert.title}</h3>
                  <p className="certs__detail">{cert.detail}</p>
                </div>
              </Card>
            );
          })}
        </Grid>
      </div>
    </section>
  );
}
