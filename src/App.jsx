import { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
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
import { IS_MISTER_SITE, SPLIT_DOMAINS, resolveSitePath, toMisterDomainPath } from './data/sites';

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

// Cobrand fan sign-up form shown in the CONNECT section of the Jesus Molina home
const COBRAND_SIGNUP_URL = 'https://drop.cobrand.com/d/JesusMolina/JMSU/embed?form_only=true';
// ...and in the BOOKING section of the MISTER MOLINA home
const MISTER_COBRAND_SIGNUP_URL = 'https://drop.cobrand.com/d/MISTERMOLINA/MMSU/embed?form_only=true';

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
      <FinalCTA backgroundImage="images/biography-portrait.jpg" embedSrc={COBRAND_SIGNUP_URL} />
    </>
  );
}

// MISTER MOLINA home: same sections as Home with MISTER MOLINA's media, videos and Spotify
// (WATCH before LISTEN, BOOKING over a photo, no LEARN)
function MisterMolinaHome() {
  return (
    <>
      <Hero
        videoSrc="video/clipHomePageMisterMolinaNuevo.mp4"
        poster="images/videoposterhomepageMISTER.jpg"
        titleImage={{ src: 'images/logomistermolina-hero.png', alt: 'MISTER MOLINA' }}
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
      <FinalCTA title="BOOKING" backgroundImage="images/mistermolinaphoto.jpeg" embedSrc={MISTER_COBRAND_SIGNUP_URL} embedTall />
    </>
  );
}

// MISTER MOLINA's pages, keyed by their path under MISTER_MOLINA_PATH ('' is its home).
// Tour dates and booking contacts are shared with Jesus Molina for now.
const MISTER_PAGES = [
  ['', <MisterMolinaHome />],
  ['/concerts', <Concerts artist="mister" />],
  ['/biography', <Biography artist="mister" />],
  ['/contact', <Contact artist="mister" />],
];

// Sends the visitor to a page that lives on the other artist's domain
// (the Worker already does this with a 301; this covers local dev and in-app navigation)
function OtherSiteRedirect({ path }) {
  const { hash } = useLocation();
  useEffect(() => {
    window.location.replace(`${resolveSitePath(path).href}${hash}`);
  }, [path, hash]);
  return null;
}

// '/mister-molina/concerts#x' on the MISTER MOLINA domain -> '/concerts#x'
function ToMisterDomainPath() {
  const { pathname, hash } = useLocation();
  return <Navigate to={{ pathname: toMisterDomainPath(pathname), hash }} replace />;
}

function SiteRoutes() {
  if (IS_MISTER_SITE) {
    return (
      <Routes>
        {MISTER_PAGES.map(([path, element]) => (
          <Route key={path} path={path || '/'} element={element} />
        ))}
        <Route path={`${MISTER_MOLINA_PATH}/*`} element={<ToMisterDomainPath />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {MISTER_PAGES.map(([path, element]) => {
        const misterPath = `${MISTER_MOLINA_PATH}${path}`;
        return (
          <Route
            key={misterPath}
            path={misterPath}
            element={SPLIT_DOMAINS ? <OtherSiteRedirect path={misterPath} /> : element}
          />
        );
      })}
      <Route path="/concerts" element={<Concerts />} />
      <Route path="/biography" element={<Biography />} />
      <Route path="/contact" element={<Contact />} />
      {/* Unknown paths (e.g. old Wix URLs like /bio) go home instead of an empty page */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  // Global, page-wide behaviours that used to live at the bottom of script.js
  useScrollReveal();
  useSmoothAnchorScroll();

  useEffect(() => {
    if (IS_MISTER_SITE) document.title = 'MISTER MOLINA | Official Website';
  }, []);

  return (
    <AppProvider>
      <ScrollToAnchor />
      <Loader />
      <Chrome />
      <Nav />
      <SiteRoutes />
      <Footer />
    </AppProvider>
  );
}


