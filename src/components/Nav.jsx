import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
  const menuListRef = useRef(null);
  const menuItemsRef = useRef([]);
  const location = useLocation();

  const isHomepage = location.pathname === '/';

  /* Close menu when route changes */
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  /* Close dropdowns and overlay on outside click or ESC key */
  useEffect(() => {
    function handleClick(e) {
      if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false);
    }
    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        setLangOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  /* 3D Parallax effect on mousemove when overlay menu is open */
  useEffect(() => {
    if (!menuOpen) return;

    const handleMouseMove = (e) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const offsetX = 0.5 - e.clientX / w;
      const offsetY = 0.5 - e.clientY / h;

      const offsetPoster = 15;
      const transformPoster = `translate3d(0, ${-offsetY * offsetPoster}px, 0) rotateX(${-offsetY * offsetPoster * 1.2}deg) rotateY(${offsetX * (offsetPoster * 2)}deg)`;

      if (menuListRef.current) {
        menuListRef.current.style.transform = transformPoster;
      }

      menuItemsRef.current.forEach((itemNode) => {
        if (!itemNode) return;
        const offsetLayer = parseFloat(itemNode.getAttribute('data-offset') || '0');
        const transformLayer = `translate3d(${offsetX * offsetLayer}px, ${offsetY * offsetLayer}px, 20px)`;
        itemNode.style.transform = transformLayer;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [menuOpen]);

  /* Lock body scroll when overlay is open */
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const navClass = ['nav', scrolled && 'scrolled', onDark && 'on-dark', menuOpen && 'menu-is-open']
    .filter(Boolean)
    .join(' ');

  const menuItems = [
    { label: t.home, path: '/', isButton: false, isExternal: false, offset: 10 },
    { label: t.tourNav || 'Tour', path: '/concerts', isButton: false, isExternal: false, offset: 20 },
    { label: t.aboutNav || 'About', path: '/biography', isButton: false, isExternal: false, offset: 30 },
    { label: t.connectNav || 'Connect', path: '/contact', isButton: false, isExternal: false, offset: 40 },
    { label: 'MISTER MOLINA', path: 'https://on.soundcloud.com/m22tPEah8lVmQLRFTe', isButton: false, isExternal: true, offset: 50 },
    { label: t.platformsTitle || t.platform, path: '#', isButton: true, isExternal: false, offset: 60 },
  ];

  return (
    <>
      <header className={navClass} id="nav">
        {/* ── Logo ── */}
        <Link to="/" className="nav-logo" onClick={() => setMenuOpen(false)}>
          <img src={`${import.meta.env.BASE_URL}images/logo.png`} alt="Jesús Molina logo" className="nav-logo-img" />
          {/* Hide name on homepage — it's prominent in the hero below */}
          {!isHomepage && (
            <span className="nav-logo-text">Jesús Molina</span>
          )}
        </Link>

        {/* ── Controls: Language & Menu Button ── */}
        <div className="nav-controls">
          {/* Language selector */}
          <div className={`nav-lang${langOpen ? ' open' : ''}`} ref={langRef}>
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
                  onClick={() => {
                    setLanguage(lang);
                    setLangOpen(false);
                  }}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Menu button with text label */}
          <button
            className={`nav-burger${menuOpen ? ' open' : ''}`}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {!menuOpen && <span className="nav-burger-label">Menu</span>}
            <span className="nav-burger-lines">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>
      </header>

      {/* ── 3D Fullscreen Overlay Menu ── */}
      <div className={`menu-overlay${menuOpen ? ' open' : ''}`}>
        <ul className="Menu-list" ref={menuListRef}>
          {menuItems.map((item, idx) => {
            const content = (
              <>
                <span className="Menu-item-sizer" aria-hidden="true">{item.label}</span>
                <span className="Mask">
                  <span>{item.label}</span>
                </span>
                <span className="Mask">
                  <span>{item.label}</span>
                </span>
              </>
            );

            return (
              <li
                key={idx}
                className="Menu-list-item"
                data-offset={item.offset}
                ref={(el) => (menuItemsRef.current[idx] = el)}
              >
                {item.isButton ? (
                  <button
                    className="Menu-list-item-link"
                    onClick={() => {
                      setMenuOpen(false);
                      setPlatformsOpen(true);
                    }}
                  >
                    {content}
                  </button>
                ) : item.isExternal ? (
                  <a
                    href={item.path}
                    className="Menu-list-item-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMenuOpen(false)}
                  >
                    {content}
                  </a>
                ) : (
                  <Link
                    to={item.path}
                    className="Menu-list-item-link"
                    onClick={() => setMenuOpen(false)}
                  >
                    {content}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      <PlatformsModal
        isOpen={platformsOpen}
        onClose={() => setPlatformsOpen(false)}
        {...defaultTrackData}
      />
    </>
  );
}
