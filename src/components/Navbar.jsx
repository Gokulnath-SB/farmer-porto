import { useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { navItems } from '../data/site.js';
import { useActiveSection } from '../hooks/useActiveSection.js';
import { ease } from '../animations/variants.js';
import './Navbar.css';

const SECTION_IDS = navItems.map((item) => item.id);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection(SECTION_IDS);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const next = latest > 28;
    setScrolled((previous) => (previous === next ? previous : next));
  });

  return (
    <header className={`nav ${scrolled ? 'nav--solid' : ''}`}>
      <nav className="container nav__inner" aria-label="Primary navigation">
        <a className="nav__brand" href="#home" onClick={() => setMenuOpen(false)}>
          PORTO<span aria-hidden="true">.</span>
        </a>

        <ul className="nav__links">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                className={`nav__link ${active === item.id ? 'nav__link--active' : ''}`}
                href={`#${item.id}`}
                aria-current={active === item.id ? 'location' : undefined}
              >
                {item.label}
                {active === item.id ? (
                  <motion.span
                    className="nav__indicator"
                    layoutId="nav-active-indicator"
                    transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                  />
                ) : null}
              </a>
            </li>
          ))}
        </ul>

        <a className="nav__cta" href="#contact">
          Let&apos;s connect
        </a>

        <button
          className="nav__toggle"
          type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={22} strokeWidth={1.7} /> : <Menu size={22} strokeWidth={1.7} />}
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            id="mobile-navigation"
            className="nav__mobile"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease }}
          >
            <ul className="container nav__mobile-list">
              {navItems.map((item, index) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.035, duration: 0.3, ease }}
                >
                  <a
                    href={`#${item.id}`}
                    className={active === item.id ? 'nav__mobile-link nav__mobile-link--active' : 'nav__mobile-link'}
                    onClick={() => setMenuOpen(false)}
                  >
                    <span className="mono-label">{String(index + 1).padStart(2, '0')}</span>
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
