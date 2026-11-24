import { motion, useReducedMotion } from 'framer-motion';
import { projects } from '../data/site';
import ProjectCard from '../components/ProjectCard';
import SectionHeading from '../components/SectionHeading';
import { fadeUp, stagger } from '../animations/variants';
import './Projects.css';

/** All three entries come straight from the single source of truth in site.js. */
export default function Projects() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="projects" className="section section--tint projects">
      <div className="container">
        <SectionHeading
          title="IDEAS TURNED INTO PROJECTS."
          description="Three selected projects spanning production management, IT support and robotics."
        />

        <motion.div
          className="projects__grid"
          variants={reduceMotion ? undefined : stagger}
          initial={reduceMotion ? false : 'hidden'}
          whileInView={reduceMotion ? undefined : 'visible'}
          viewport={{ once: true, amount: 0.08 }}
        >
          {projects.map((project) => (
            <motion.div key={project.id} variants={reduceMotion ? undefined : fadeUp}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
