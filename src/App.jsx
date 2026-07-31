import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Loader from './components/Loader';
import Chrome from './components/Chrome';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import CoursesCarousel from './components/CoursesCarousel';
import Method from './components/Method';
import SpotifySection from './components/SpotifySection';
import ChinafunkVideo from './components/ChinafunkVideo';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';

// New Pages
import Concerts from './components/Concerts';
import Biography from './components/Biography';
import Contact from './components/Contact';

import { useScrollReveal } from './hooks/useScrollReveal';
import { useSmoothAnchorScroll } from './hooks/useSmoothAnchorScroll';
import { AppProvider } from './context/AppContext';

// Helper component to handle smooth scroll for in-page anchors and top scroll on route change
function ScrollToAnchor() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const targetId = hash.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        const timer = setTimeout(() => {
          const offset = 90; // offset for nav header height
          const top = element.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }, 100);
        return () => clearTimeout(timer);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

// Home Component wrapping all landing sections
function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <SpotifySection />
      <ChinafunkVideo />
      <CoursesCarousel />
      <Method />
      <FinalCTA />
    </>
  );
}

export default function App() {
  // Global, page-wide behaviours that used to live at the bottom of script.js
  useScrollReveal();
  useSmoothAnchorScroll();

  return (
    <AppProvider>
      <ScrollToAnchor />
      <Loader />
      <Chrome />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/concerts" element={<Concerts />} />
        <Route path="/biography" element={<Biography />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </AppProvider>
  );
}


