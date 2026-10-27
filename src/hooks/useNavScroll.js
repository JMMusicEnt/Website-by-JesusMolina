import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MISTER_MOLINA_PATH } from '../data/misterMolina';

const SUB_PAGES = ['/concerts', '/biography', '/contact'];
const DARK_SECTION_SELECTORS = [
  '.hero',
  '.spotify-sec',
  '.uc-curtain-wrapper',
  '.learn-section',
  '.chinafunk',
  '.method',
  '.community',
  '.final-cta',
  '.concerts-page',
  '.biography-page',
  '.contact-page',
].join(', ');

/**
 * Tracks nav scroll state and contrast mode.
 * Sub-pages and the homepage use the dark transparent nav at all times.
 */
export function useNavScroll() {
  const [scrolled, setScrolled] = useState(false);
  const [onDark, setOnDark] = useState(false);
  const { pathname } = useLocation();
  // MISTER MOLINA's sub-pages also live at '/mister-molina/concerts'... when sharing one domain
  const isSubPage = SUB_PAGES.some((page) => pathname === page || pathname === `${MISTER_MOLINA_PATH}${page}`);
  const isHomepage = pathname === '/' || pathname === '/mister-molina';

  useEffect(() => {
    function update() {
      const y = window.scrollY;
      setScrolled(isSubPage ? y > 8 : y > 40);

      if (isSubPage || isHomepage) {
        setOnDark(true);
        return;
      }

      let dark = false;
      document.querySelectorAll(DARK_SECTION_SELECTORS).forEach((sec) => {
        const rect = sec.getBoundingClientRect();
        if (rect.top < 80 && rect.bottom > 80) dark = true;
      });
      setOnDark(dark);
    }

    window.addEventListener('scroll', update, { passive: true });
    update();
    const timer = setTimeout(update, 80);
    return () => {
      window.removeEventListener('scroll', update);
      clearTimeout(timer);
    };
  }, [pathname, isSubPage, isHomepage]);

  return { scrolled: isSubPage || scrolled, onDark: isSubPage || isHomepage || onDark, isSubPage };
}
