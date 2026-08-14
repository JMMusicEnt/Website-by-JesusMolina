import { useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';

export default function Hero() {
  const videoRef = useRef(null);
  const { t } = useApp();

  /* Trigger cinematic entry after loader finishes */
  useEffect(() => {
    const hero = document.getElementById('inicio');
    function handleEntry() {
      if (hero) hero.classList.add('hero--visible');
    }
    window.addEventListener('piano:enter', handleEntry);

    /* Fallback: if loader already fired, show after short delay */
    const fallback = setTimeout(() => {
      if (hero && !hero.classList.contains('hero--visible')) {
        hero.classList.add('hero--visible');
      }
    }, 3500);

    return () => {
      window.removeEventListener('piano:enter', handleEntry);
      clearTimeout(fallback);
    };
  }, []);

  /* Subtle parallax on scroll */
  useEffect(() => {
    function onScroll() {
      const video = videoRef.current;
      if (!video) return;
      const scrollY = window.scrollY;
      const speed = 0.3;
      video.style.transform = `scale(1.08) translateY(${scrollY * speed}px)`;
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="hero" id="inicio">
      {/* ── Cinematic video background ── */}
      <div className="hero-video-wrap">
        <video
          ref={videoRef}
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src={`${import.meta.env.BASE_URL}video/CortoAnimacion.mp4`} type="video/mp4" />
        </video>
      </div>

      {/* ── Cinematic overlays ── */}
      <div className="hero-overlay" aria-hidden="true"></div>
      <div className="hero-vignette" aria-hidden="true"></div>

      {/* ── Content ── */}
      <div className="hero-content">
        <h1 className="hero-title">
          <span className="hero-title-line hero-title-firstname" data-reveal>{t.heroTitle1}</span>
          <span className="hero-title-line hero-title-lastname" data-reveal>{t.heroTitle2}</span>
        </h1>

        {/* Subhead: Pianist · Producer · Composer · Performer */}
        <p className="hero-subtitle hero-roles" data-reveal>
          {t.heroRoles || 'Pianist · Producer · Composer · Performer'}
        </p>

        <div className="hero-actions" data-reveal>
          <a
            href="#spotify"
            className="btn btn-primary btn-hero"
          >
            {/* Spotify icon */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.84 14.32c-.17.28-.53.37-.81.2-2.3-1.4-5.2-1.7-8.61-.92-.32.07-.64-.13-.71-.45-.07-.32.13-.64.45-.71 3.73-.85 6.93-.5 9.48 1.06.27.17.37.52.2.82zm1.29-2.7c-.22.35-.68.46-1.02.24-2.63-1.62-6.63-2.09-9.73-1.15-.39.12-.8-.1-.92-.49-.12-.39.1-.8.49-.92 3.55-1.08 7.96-.56 10.94 1.28.34.21.46.67.24 1.04zm.11-2.76C14.73 8.7 8.92 8.5 5.58 9.52c-.51.15-1.05-.14-1.21-.65-.15-.51.14-1.05.65-1.21 3.84-1.16 10.26-.93 14.32 1.48.46.27.61.87.34 1.33-.27.46-.87.61-1.33.34z"/>
            </svg>
            <span>{t.heroCta1}</span>
          </a>
        </div>
      </div>

    </section>
  );
}
