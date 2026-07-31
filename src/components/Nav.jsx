import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavScroll } from '../hooks/useNavScroll';
import { useApp } from '../context/AppContext';
import PlatformsModal from './PlatformsModal';
import { defaultTrackData } from '../data/platforms';

const LANGUAGES = ['en', 'es', 'fr'];

export default function Nav() {
  const { scrolled, onDark } = useNavScroll();
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [platformsOpen, setPlatformsOpen] = useState(false);
  const { language, setLanguage, t } = useApp();
  const langRef = useRef(null);

  /* Close dropdowns on outside click */
  useEffect(() => {
    function handleClick(e) {
      if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const navClass = ['nav', scrolled && 'scrolled', onDark && 'on-dark'].filter(Boolean).join(' ');

  return (
    <>
      <header className={navClass} id="nav">

        {/* ── Logo ── */}
        <Link to="/#inicio" className="nav-logo">
          <img src={`${import.meta.env.BASE_URL}images/logo.png`} alt="Jesús Molina logo" className="nav-logo-img" />
          <span className="nav-logo-text">Jesús Molina</span>
        </Link>

        {/* ── Centro: enlaces de redirección ── */}
        <nav className="nav-links" aria-label="Navegación principal">
          <Link to="/" className="nav-link">{t.home}</Link>
          <Link to="/concerts" className="nav-link">{t.concerts}</Link>
          <Link to="/biography" className="nav-link">{t.biography}</Link>
          <Link to="/contact" className="nav-link">{t.contact}</Link>
          <button className="nav-link" onClick={() => setPlatformsOpen(true)}>{t.platformsTitle || t.platform}</button>
        </nav>

        {/* ── Derecha: controles ── */}
        <div className="nav-controls">
          {/* Language selector */}
          <div
            className={`nav-lang${langOpen ? ' open' : ''}`}
            ref={langRef}
          >
            <button
              className="nav-lang-trigger"
              onClick={() => setLangOpen((v) => !v)}
              aria-label={t.changeLanguage}
              title={t.changeLanguage}
              aria-expanded={langOpen}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.6" />
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 0 20M12 2a15.3 15.3 0 0 0 0 20" stroke="currentColor" strokeWidth="1.6" />
              </svg>
              <span>{language.toUpperCase()}</span>
              <svg className="nav-dropdown-chevron" width="10" height="10" viewBox="0 0 12 12" fill="none">
                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className="nav-lang-menu">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang}
                  className={`nav-lang-option${language === lang ? ' active' : ''}`}
                  onClick={() => { setLanguage(lang); setLangOpen(false); }}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Burger (mobile) ── */}
        <button
          className={`nav-burger${menuOpen ? ' open' : ''}`}
          aria-label="Abrir menú"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span></span><span></span><span></span>
        </button>
      </header>

      {/* ── Mobile menu ── */}
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>{t.home}</Link>
        <Link to="/concerts" onClick={() => setMenuOpen(false)}>{t.concerts}</Link>
        <Link to="/biography" onClick={() => setMenuOpen(false)}>{t.biography}</Link>
        <Link to="/#cursos" onClick={() => setMenuOpen(false)}>{t.navCourses}</Link>
        <Link to="/#cursos" onClick={() => setMenuOpen(false)}>{t.masterclass}</Link>
        <Link to="/contact" onClick={() => setMenuOpen(false)}>{t.contact}</Link>
        <button className="nav-link" style={{ fontSize: 'inherit' }} onClick={() => { setPlatformsOpen(true); setMenuOpen(false); }}>{t.platformsTitle || t.platform}</button>
        <Link to="/#planes" className="mobile-cta" onClick={() => setMenuOpen(false)}>
          {t.startNow}
        </Link>
      </div>

      <PlatformsModal 
        isOpen={platformsOpen} 
        onClose={() => setPlatformsOpen(false)} 
        {...defaultTrackData}
      />
    </>
  );
}
