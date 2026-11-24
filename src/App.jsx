import Intro from './components/Intro';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Education from './sections/Education';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Experience from './sections/Experience';
import Certifications from './sections/Certifications';
import GitHubSection from './sections/GitHubSection';
import LinkedInSection from './sections/LinkedInSection';
import Contact from './sections/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <Intro />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Education />
        <Skills />
        <Projects />
        <Experience />
        <Certifications />
        <GitHubSection />
        <LinkedInSection />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
