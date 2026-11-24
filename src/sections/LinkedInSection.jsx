import { ArrowUpRight } from 'lucide-react';
import { FaLinkedinIn } from 'react-icons/fa';
import { profile } from '../data/site';
import Reveal from '../components/Reveal';
import SectionHeading from '../components/SectionHeading';
import './LinkedInSection.css';

/** A wide editorial band — intentionally not another card grid like Contact. */
export default function LinkedInSection() {
  return (
    <section id="linkedin" className="section linkedin">
      <div className="linkedin__band">
        <div className="container linkedin__inner">
          <div className="linkedin__lead">
            <SectionHeading
              title="LET'S CONNECT PROFESSIONALLY."
              description="Professional conversations around software development, research and innovation."
            />
          </div>

          <Reveal className="linkedin__aside" delay={0.12}>
            <span className="linkedin__mark" aria-hidden="true">
              <FaLinkedinIn size={28} />
            </span>
            <p className="linkedin__note">Let's stay connected beyond the portfolio.</p>
            <a
              className="btn btn--primary linkedin__cta"
              href={profile.social.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`Connect with ${profile.displayName} on LinkedIn (new tab)`}
            >
              Connect on LinkedIn
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
