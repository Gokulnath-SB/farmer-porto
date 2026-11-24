import { Mail, MessageCircle } from 'lucide-react';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { profile } from '../data/site.js';
import './Footer.css';

const socialLinks = [
  {
    id: 'email',
    label: 'Email',
    href: `mailto:${profile.email}`,
    icon: Mail,
    external: false,
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    href: profile.social.whatsapp,
    icon: MessageCircle,
    external: true,
  },
  {
    id: 'github',
    label: 'GitHub',
    href: profile.social.github,
    icon: FaGithub,
    external: true,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: profile.social.linkedin,
    icon: FaLinkedinIn,
    external: true,
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <a className="footer__wordmark" href="#home" aria-label="PORTO — back to top">
            PORTO<span aria-hidden="true">.</span>
          </a>
          <p className="footer__tagline">GROWING IDEAS. BUILDING THE FUTURE.</p>
        </div>

        <p className="footer__owner">
          Portfolio of <strong>{profile.displayName}</strong>
        </p>

        <ul className="footer__links" aria-label="Social links">
          {socialLinks.map(({ id, label, href, icon: Icon, external }) => (
            <li key={id}>
              <a
                className="icon-link footer__link"
                href={href}
                aria-label={label}
                title={`${label}${external ? ' (opens in a new tab)' : ''}`}
                {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
              >
                <Icon size={18} strokeWidth={1.8} aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="container footer__base">
        <span>© {currentYear} {profile.displayName}.</span>
        <span className="mono-label footer__base-label">Portfolio</span>
      </div>
    </footer>
  );
}
