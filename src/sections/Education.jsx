import { motion, useReducedMotion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import Reveal from '../components/Reveal';
import { profile } from '../data/site.js';
import { ease } from '../animations/variants';
import { useCountUp } from '../hooks/useCountUp';
import './Education.css';

/** Counts one GPA figure; the visible digits are animated, the accessible value is static. */
function GpaFigure({ value }) {
  const countRef = useCountUp(Number(value), 2);

  return (
    <div className="edu__gpa-figure">
      <span ref={countRef} className="edu__gpa-number" aria-hidden="true">
        {value}
      </span>
      <span className="sr-only">{value}</span>
    </div>
  );
}

export default function Education() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="education" className="section edu">
      <div className="container">
        <SectionHeading title="ROOTED IN LEARNING." />

        <div className="edu__timeline">
          <motion.div
            className="edu__rail"
            aria-hidden="true"
            initial={reduceMotion ? false : { scaleY: 0 }}
            whileInView={reduceMotion ? undefined : { scaleY: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.1, ease }}
          />
          <span className="edu__node" aria-hidden="true" />

          <Reveal className="edu__entry" delay={0.08}>
            <article className="card card--hover edu__card">
              <div className="edu__card-head">
                <span className="edu__badge" aria-hidden="true">
                  <GraduationCap size={20} strokeWidth={1.8} />
                </span>
                <div className="edu__card-heading">
                  <span className="mono-label edu__label">Academic foundation</span>
                  <h3 className="edu__degree">{profile.degree}</h3>
                </div>
              </div>

              <p className="edu__college">{profile.college}</p>
              <div className="edu__divider" aria-hidden="true" />

              <div className="edu__gpa-grid">
                {profile.gpa.map((item, index) => (
                  <Reveal className="edu__gpa-item" key={item.label} delay={0.14 + index * 0.12}>
                    <div className="edu__gpa">
                      <span className="edu__gpa-label">{item.label}</span>
                      <GpaFigure value={item.value} />
                    </div>
                  </Reveal>
                ))}
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
