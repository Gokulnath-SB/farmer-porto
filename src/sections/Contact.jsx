import { Mail, MessageCircle } from 'lucide-react';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { profile } from '../data/site.js';
import Reveal from '../components/Reveal';
import SectionHeading from '../components/SectionHeading';
import ContactForm from '../components/ContactForm';
import './Contact.css';

const channels = [
  {
    id: 'email',
    label: 'Email',
    value: profile.email,
    href: `mailto:${profile.email}`,
    icon: Mail,
    external: false,
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    value: 'Start a conversation',
    href: profile.social.whatsapp,
    icon: MessageCircle,
    external: true,
  },
  {
    id: 'github',
    label: 'GitHub',
    value: 'Gokulnath-SB',
    href: profile.social.github,
    icon: FaGithub,
    external: true,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    value: 'View profile',
    href: profile.social.linkedin,
    icon: FaLinkedinIn,
    external: true,
  },
];

export default function Contact() {
  return (
    <section className="contact section section--tint" id="contact" aria-labelledby="contact-title">
      <div className="container">
        <SectionHeading id="contact-title" title="LET'S GROW SOMETHING GREAT." />

        <div className="contact__grid">
          <Reveal className="contact__info" delay={0.05}>
            <p className="mono-label contact__eyebrow">Direct lines</p>
            <h3 className="contact__lead">
              Have an idea, a role, or a question? Let&apos;s talk.
            </h3>
            <p className="section-intro contact__intro">
              Reach out through whichever channel suits you. The form prepares a draft in your own
              email app — this site does not send messages.
            </p>

            <ul className="contact__channels" aria-label="Contact channels">
              {channels.map(({ id, label, value, href, icon: Icon, external }) => (
                <li key={id}>
                  <a
                    className="contact__channel"
                    href={href}
                    {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
                  >
                    <span className="contact__channel-icon" aria-hidden="true">
                      <Icon size={20} strokeWidth={1.8} />
                    </span>
                    <span className="contact__channel-text">
                      <span className="mono-label contact__channel-label">{label}</span>
                      <span className="contact__channel-value">{value}</span>
                    </span>
                    <span className="contact__channel-arrow" aria-hidden="true">
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="contact__form-col" delay={0.12}>
            <div className="card contact__card">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
