import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Info } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { ease, maskReveal } from '../animations/variants';
import './ProjectCard.css';

/**
 * The single card used for every entry in the `projects` data array.
 * Every branch below is driven by the project data — there are no
 * project-specific forks or hard-coded names in this component.
 */
export default function ProjectCard({ project }) {
  const reduceMotion = useReducedMotion();
  const [activeImage, setActiveImage] = useState(0);

  const gallery = project.gallery ?? [];
  const images = [
    { src: project.image, alt: project.imageAlt, label: 'Show main project image' },
    ...gallery.map((item) => ({
      src: item.src,
      alt: item.alt,
      label: `Show ${item.alt}`,
    })),
  ];
  const currentImage = images[activeImage] ?? images[0];
  const hasWorkingSource = Boolean(project.links?.github) && !project.sourceNote;

  const TitleTag = reduceMotion ? 'h3' : motion.h3;
  const titleMotion = reduceMotion
    ? {}
    : {
        initial: 'hidden',
        whileInView: 'visible',
        viewport: { once: true, amount: 0.6 },
        variants: maskReveal,
      };

  return (
    <article className="project-card card card--hover" aria-labelledby={`project-${project.id}-title`}>
      <div className="project-card__visual">
        <div className="project-card__media media-frame">
          <AnimatePresence initial={false} mode="wait">
            <motion.img
              key={currentImage.src}
              className="project-card__image"
              src={currentImage.src}
              alt={currentImage.alt}
              loading="lazy"
              decoding="async"
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.35, ease }}
            />
          </AnimatePresence>
        </div>

        {images.length > 1 ? (
          <div
            className="project-card__gallery"
            role="group"
            aria-label={`${project.name} image gallery`}
          >
            {images.map((image, index) => (
              <button
                key={image.src}
                type="button"
                className={`project-card__thumb${
                  index === activeImage ? ' project-card__thumb--active' : ''
                }`}
                onClick={() => setActiveImage(index)}
                aria-label={image.label}
                aria-pressed={index === activeImage}
              >
                <img src={image.src} alt="" loading="lazy" decoding="async" />
              </button>
            ))}
          </div>
        ) : null}
      </div>

      <div className="project-card__body">
        <div className="project-card__topline">
          <span className="mono-label">Project {project.number}</span>
          <span className="project-card__kind">{project.kind}</span>
        </div>

        <TitleTag
          id={`project-${project.id}-title`}
          className="project-card__title"
          {...titleMotion}
        >
          {project.name}
        </TitleTag>

        <p className="project-card__summary">{project.summary}</p>

        {project.workflow?.length ? (
          <div className="project-card__workflow">
            <p className="mono-label project-card__label">Workflow</p>
            <ol className="project-card__steps" aria-label="Production workflow stages">
              {project.workflow.map((step, index) => (
                <li key={step} className="project-card__step">
                  {index > 0 ? (
                    <span className="project-card__arrow" aria-hidden="true">
                      →
                    </span>
                  ) : null}
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        ) : null}

        {project.features?.length ? (
          <div className="project-card__features">
            <p className="mono-label project-card__label">Features</p>
            <ul className="project-card__feature-list">
              {project.features.map((feature) => (
                <li key={feature} className="project-card__feature">
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="project-card__tags" role="group" aria-label="Technologies used">
          {project.tech.map((tech, index) => (
            <span key={tech} className={index === 0 ? 'tag tag--accent' : 'tag'}>
              {tech}
            </span>
          ))}
        </div>

        <div className="project-card__footer">
          {project.links?.live ? (
            <a
              className="btn btn--primary project-card__action"
              href={project.links.live}
              target="_blank"
              rel="noreferrer noopener"
            >
              View live <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          ) : null}

          {hasWorkingSource ? (
            <a
              className="btn btn--ghost project-card__action"
              href={project.links.github}
              target="_blank"
              rel="noreferrer noopener"
            >
              <FaGithub size={15} aria-hidden="true" /> Source
            </a>
          ) : null}
        </div>

        {project.sourceNote ? (
          <p className="project-card__source-note">
            <Info size={14} aria-hidden="true" />
            <span>{project.sourceNote}</span>
          </p>
        ) : null}
      </div>
    </article>
  );
}
