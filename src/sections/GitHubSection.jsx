import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { assets, profile, repositories } from '../data/site';
import Reveal from '../components/Reveal';
import SectionHeading from '../components/SectionHeading';
import { fadeUp, stagger } from '../animations/variants';
import './GitHubSection.css';

/** Public repositories are listed exactly as supplied in site.js — no metrics. */
export default function GitHubSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="github"
      className="section section--tint github"
      style={{ '--github-texture': `url("${assets.forestTexture}")` }}
    >
      <div className="github__texture" aria-hidden="true" />

      <div className="container github__inner">
        <SectionHeading
          title="MY CODE. MY JOURNEY."
          description="A straightforward list of public repositories and the links published with them."
        />

        <motion.ul
          className="github__list"
          variants={reduceMotion ? undefined : stagger}
          initial={reduceMotion ? false : 'hidden'}
          whileInView={reduceMotion ? undefined : 'visible'}
          viewport={{ once: true, amount: 0.08 }}
        >
          {repositories.map((repo) => (
            <motion.li
              key={repo.name}
              className="github__row card card--hover"
              variants={reduceMotion ? undefined : fadeUp}
            >
              <div className="github__repo">
                <span className="github__repo-icon" aria-hidden="true">
                  <FaGithub size={17} />
                </span>
                <div className="github__repo-meta">
                  <h3 className="github__repo-name">{repo.name}</h3>
                  {repo.language ? <span className="tag">{repo.language}</span> : null}
                </div>
              </div>

              <div className="github__actions">
                <a
                  className="github__action"
                  href={repo.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={`Open ${repo.name} on GitHub (new tab)`}
                >
                  <span>Repository</span>
                  <ExternalLink size={14} aria-hidden="true" />
                </a>

                {repo.homepage ? (
                  <a
                    className="github__action github__action--live"
                    href={repo.homepage}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`Open the homepage for ${repo.name} (new tab)`}
                  >
                    <span>Homepage</span>
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                ) : null}
              </div>
            </motion.li>
          ))}
        </motion.ul>

        <Reveal className="github__cta">
          <div className="github__cta-copy">
            <span className="mono-label">More on GitHub</span>
            <p className="github__cta-text">Browse the complete public profile.</p>
          </div>
          <a
            className="btn btn--primary"
            href={profile.social.github}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`Open ${profile.displayName}'s GitHub profile (new tab)`}
          >
            <FaGithub size={17} aria-hidden="true" />
            View GitHub profile
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
