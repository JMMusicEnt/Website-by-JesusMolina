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
          poster={`${import.meta.env.BASE_URL}images/image1.png`}
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

        <p className="hero-subtitle" data-reveal>
          {t.heroTitle3}
        </p>

        <p className="hero-sub" data-reveal>
          {t.heroSub}
        </p>

        <div className="hero-actions" data-reveal>
          <a href="#metodo" className="btn btn-primary btn-hero">
            <span>{t.heroCta1}</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div className="hero-scrolldown">
        <span>{t.heroScrollDown}</span>
        <div className="hero-scrolldown-line"></div>
      </div>
    </section>
  );
}
