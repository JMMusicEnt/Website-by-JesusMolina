import { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useApp } from '../context/AppContext';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ChinafunkVideo() {
  const { t } = useApp();
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const gridRef = useRef(null);
  const videoRefs = useRef([]);
  const [playing, setPlaying] = useState({});

  const featuredItems = [
    {
      id: 'chinafunk',
      title: 'Chika I Funk',
      label: t.featuredCard1Label || 'Main Highlight',
      description: t.featuredCard1Desc || 'A vibrant piece bringing rhythm, energy, and an unforgettable stage presence, demonstrating musical versatility and improvisational skill.',
      video: 'video/0709.mp4',
      poster: 'images/image1.png',
      externalLink: 'https://arthouserecords.lnk.to/ChikaIFunk',
    },
    {
      id: 'piano-en-vivo',
      title: 'LIVE @ La Musa Awards 10th Anniversary / Pero me acuerdo de ti',
      label: t.featuredCard2Label || 'On Stage',
      description: t.featuredCard2Desc || 'An emotional live performance at the 10th edition of the La Musa Awards, where nostalgia and deep feeling merge in every single note.',
      video: 'video/0730.mp4',
      poster: 'images/image3.png',
    },
    {
      id: 'improvisacion',
      title: 'Night in Tunisia',
      label: t.featuredCard3Label || 'New Concept',
      description: t.featuredCard3Desc || 'Dizzy Gillespie\'s classic reimagined with a personal approach, exploring new textures and dynamics honoring traditional jazz.',
      video: 'video/nighintunisia.mp4',
      poster: 'images/image2.png',
    },
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Text header entrance
      if (textRef.current) {
        gsap.fromTo(
          textRef.current,
          { opacity: 0, y: 40, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: textRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // 2. Staggered Featured Cards entrance
      const cards = containerRef.current.querySelectorAll('.featured-card');
      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 55, scale: 0.96, rotateX: 6 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            duration: 1,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 82%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const togglePlay = (index) => {
    const video = videoRefs.current[index];
    if (!video) return;

    if (video.paused) {
      // Pause any other playing video and mute it
      videoRefs.current.forEach((v, i) => {
        if (v && i !== index && !v.paused) {
          v.pause();
          v.muted = true;
        }
      });
      video.muted = false;
      video.play();
      setPlaying((prev) => {
        const next = {};
        Object.keys(prev).forEach((k) => (next[k] = false));
        next[index] = true;
        return next;
      });
    } else {
      video.pause();
      setPlaying((prev) => ({ ...prev, [index]: false }));
    }
  };

  const handleVideoEnd = (index) => {
    setPlaying((prev) => ({ ...prev, [index]: false }));
  };

  return (
    <section ref={containerRef} className="chinafunk" id="destacados">
      <div className="chinafunk-container">
        <div ref={textRef} className="chinafunk-text">
          <div className="section-eyebrow">{t.featuredEyebrow}</div>
          <h2 className="section-title">{t.featuredTitle}</h2>
          <p className="chinafunk-sub">
            {t.featuredSub}
          </p>
        </div>

        <div ref={gridRef} className="featured-grid">
          {featuredItems.map((item, index) => {
            return (
              <article 
                className="featured-card" 
                key={item.id}
              >
                <div
                  className="featured-card-media"
                  onClick={() => togglePlay(index)}
                >
                  <video
                    className="featured-card-video"
                    ref={(el) => (videoRefs.current[index] = el)}
                    src={`${import.meta.env.BASE_URL}${item.video}#t=0.001`}
                    poster={`${import.meta.env.BASE_URL}${item.poster}`}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    onEnded={() => handleVideoEnd(index)}
                  ></video>

                <button
                  className={`featured-play-btn ${playing[index] ? 'is-playing' : ''}`}
                  aria-label={playing[index] ? 'Pausar video' : 'Reproducir video'}
                  onClick={(e) => {
                    e.stopPropagation();
                    togglePlay(index);
                  }}
                >
                  {playing[index] ? (
                    /* Pause icon */
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                      <rect x="6" y="4" width="4" height="16" rx="1" />
                      <rect x="14" y="4" width="4" height="16" rx="1" />
                    </svg>
                  ) : (
                    /* Play icon */
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5.14v13.72a1 1 0 0 0 1.5.86l11.04-6.86a1 1 0 0 0 0-1.72L9.5 4.28A1 1 0 0 0 8 5.14z" />
                    </svg>
                  )}
                </button>
              </div>
              <div className="featured-card-content">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                {item.externalLink && (
                  <a
                    href={item.externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="featured-card-link-btn"
                  >
                    <span>{t.featuredListenPlatforms || 'Escuchar en plataformas'}</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </a>
                )}
              </div>
            </article>
          );
        })}
        </div>

      </div>
    </section>
  );
}
