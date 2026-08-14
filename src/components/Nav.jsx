import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useNavScroll } from '../hooks/useNavScroll';
import { useApp } from '../context/AppContext';
import PlatformsModal from './PlatformsModal';
import { defaultTrackData } from '../data/platforms';

export default function Nav() {
  const { scrolled, onDark } = useNavScroll();
  const [menuOpen, setMenuOpen] = useState(false);
  const [platformsOpen, setPlatformsOpen] = useState(false);
  const { t } = useApp();

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
    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        setMenuOpen(false);
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => {
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
    { label: 'MISTER MOLINA', path: 'https://soundcloud.com/mistermolinamusic?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing', isButton: false, isExternal: true, offset: 50 },
    { label: t.platformsTitle || t.platform, path: '#', isButton: true, isExternal: false, offset: 60 },
  ];

  const socialLinks = [
    {
      id: 'apple',
      href: 'https://music.apple.com/us/artist/jesus-molina/1463155327',
      icon: (
        <svg viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 31V17l10-2v13" />
          <circle cx="18" cy="31" r="3" fill="currentColor" stroke="none" />
          <circle cx="28" cy="28" r="3" fill="currentColor" stroke="none" />
        </svg>
      )
    },
    {
      id: 'spotify',
      href: 'https://open.spotify.com/artist/7Gl7yiOLDSRr1cZyPwpGv4',
      icon: (
        <svg viewBox="0 0 50 50" fill="currentColor" stroke="none">
           <path d="M25 14a11 11 0 1 0 11 11A11 11 0 0 0 25 14zm5 15.8a.7.7 0 0 1-1 .2c-2.7-1.7-6.2-2.1-10.2-1.1a.7.7 0 0 1-.3-1.3c4.5-1 8.3-.6 11.3 1.3a.7.7 0 0 1 .2.9zm1.6-3a.9.9 0 0 1-1.2.3c-3.1-1.9-7.9-2.5-11.6-1.3a.9.9 0 0 1-.5-1.7c4.3-1.3 9.5-.7 13 1.5a.9.9 0 0 1 .3 1.2zm.1-3.3c-3.7-2.2-9.9-2.4-13.4-1.3a1 1 0 1 1-.6-2c4.2-1.3 10.9-1 15.2 1.6a1 1 0 0 1-1.2 1.7z" />
        </svg>
      )
    },
    {
      id: 'youtube',
      href: 'https://www.youtube.com/@Jesusmolinamusic',
      icon: (
        <svg viewBox="0 0 50 50" fill="currentColor" stroke="none">
           <path d="M35.5 19.4a2.8 2.8 0 0 0-1.9-2c-1.7-.5-8.6-.5-8.6-.5s-6.9 0-8.6.5a2.8 2.8 0 0 0-1.9 2A29 29 0 0 0 14 25a29 29 0 0 0 .5 5.6 2.8 2.8 0 0 0 1.9 2c1.7.4 8.6.4 8.6.4s6.9 0 8.6-.4a2.8 2.8 0 0 0 1.9-2 29 29 0 0 0 .5-5.6 29 29 0 0 0-.5-5.6zM22.7 28.5v-7l6.2 3.5-6.2 3.5z" />
        </svg>
      )
    },
    {
      id: 'soundcloud',
      href: 'https://soundcloud.com/mistermolinamusic?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing',
      icon: (
        <svg viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <line x1="14" y1="24" x2="14" y2="28" />
          <line x1="18" y1="21" x2="18" y2="29" />
          <line x1="22" y1="18" x2="22" y2="30" />
          <line x1="26" y1="16" x2="26" y2="30" />
          <path d="M29 18a5 5 0 0 1 5 5 4 4 0 0 1-4 4H29" fill="none" />
        </svg>
      )
    }
  ];

  return (
    <>
      <header className={navClass} id="nav">
        {/* ── Logo ── */}
        <Link to="/" className="nav-logo" onClick={() => setMenuOpen(false)}>
          <img src={`${import.meta.env.BASE_URL}images/logo.png`} alt="Jesus Molina logo" className="nav-logo-img" />
          {/* Hide name on homepage — it's prominent in the hero below */}
          {!isHomepage && (
            <span className="nav-logo-text">Jesus Molina</span>
          )}
        </Link>

        {/* ── Desktop Links & Socials ── */}
        <div className="nav-desktop">
          <div className="nav-links">
            {menuItems.map((item, idx) => (
              item.isButton ? (
                <button
                  key={idx}
                  className="nav-link"
                  onClick={() => {
                    setMenuOpen(false);
                    setPlatformsOpen(true);
                  }}
                >
                  {item.label}
                </button>
              ) : item.isExternal ? (
                <a
                  key={idx}
                  href={item.path}
                  className="nav-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={idx}
                  to={item.path}
                  className="nav-link"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              )
            ))}
          </div>
          
          <div className="nav-socials">
            {socialLinks.map((social) => (
              <a 
                key={social.id} 
                href={social.href} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="nav-social-icon"
                aria-label={social.id}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* ── Controls: Language & Menu Button ── */}
        <div className="nav-controls">

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
        platforms={defaultTrackData.platforms}
      />
    </>
  );
}
