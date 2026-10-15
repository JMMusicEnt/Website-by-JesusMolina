import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Loader from './components/Loader';
import Chrome from './components/Chrome';
import Nav from './components/Nav';
import Hero from './components/Hero';

import CoursesCarousel from './components/CoursesCarousel';
import SpotifySection from './components/SpotifySection';
import UpcomingConcerts from './components/UpcomingConcerts';
import ChinafunkVideo from './components/ChinafunkVideo';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import Separator from './components/Separator';

// New Pages
import Concerts from './components/Concerts';
import Biography from './components/Biography';
import Contact from './components/Contact';

import { useScrollReveal } from './hooks/useScrollReveal';
import { useSmoothAnchorScroll } from './hooks/useSmoothAnchorScroll';
import { AppProvider } from './context/AppContext';
import {
  MISTER_MOLINA_PATH,
  MISTER_MOLINA_SPOTIFY_ID,
  MISTER_MOLINA_SPOTIFY_URL,
  MISTER_MOLINA_SOCIALS,
} from './data/misterMolina';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Helper component to handle smooth scroll for in-page anchors and top scroll on route change
function ScrollToAnchor() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Kill any active GSAP ScrollTrigger pins from previous route to prevent section overlap
    ScrollTrigger.getAll().forEach((t) => t.kill());
    ScrollTrigger.refresh();

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
      <Separator />
      <SpotifySection />
      {/* <Separator />
      <UpcomingConcerts /> */}
      <Separator />
      <ChinafunkVideo />
      <Separator />
      <CoursesCarousel />
      <FinalCTA backgroundImage="images/biography-portrait.jpg" />
    </>
  );
}

// MISTER MOLINA home: same sections as Home with MISTER MOLINA's media, videos and Spotify
// (WATCH before LISTEN, BOOKING over a photo, no LEARN)
function MisterMolinaHome() {
  return (
    <>
      <Hero
        videoSrc="video/mrmolinaclipHomePage.mp4"
        poster="images/mrmolinavideoposter.png"
        titleFirst="MISTER"
        titleLast="MOLINA"
        spotifyUrl={MISTER_MOLINA_SPOTIFY_URL}
        socials={MISTER_MOLINA_SOCIALS}
        socialsLabel="MISTER MOLINA social media"
      />
      <Separator />
      <ChinafunkVideo artist="mister" />
      {/* No separator here: WATCH fades into LISTEN through the backdrop lighting */}
      <SpotifySection
        variant="mister"
        artistName="MISTER MOLINA"
        artistId={MISTER_MOLINA_SPOTIFY_ID}
        artistUrl={MISTER_MOLINA_SPOTIFY_URL}
      />
      <FinalCTA title="BOOKING" backgroundImage="images/mistermolinaphoto.jpeg" />
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
        <Route path={MISTER_MOLINA_PATH} element={<MisterMolinaHome />} />
        <Route path="/concerts" element={<Concerts />} />
        <Route path="/biography" element={<Biography />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </AppProvider>
  );
}


