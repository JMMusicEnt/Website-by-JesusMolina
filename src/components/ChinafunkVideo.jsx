import { useRef, useState, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useApp } from '../context/AppContext';
import { useYouTubeVideos } from '../hooks/useYouTubeVideos';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Fallback for the MORE button if the API is unavailable
const CHANNEL_URLS = {
  jesus: 'https://www.youtube.com/@Jesusmolinamusic',
  mister: 'https://www.youtube.com/@MISTERMOLINAMUSIC',
};
const SKELETON_COUNT = 3;


// Classic YouTube play button: red rounded rectangle with a white triangle
const PlayIcon = () => (
  <svg className="featured-yt-play" viewBox="0 0 68 48" aria-hidden="true" focusable="false">
    <path
      className="featured-yt-play-bg"
      d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55C3.97 2.33 2.27 4.81 1.48 7.74.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z"
    />
    <path d="M45 24 27 14v20z" fill="#FFFFFF" />
  </svg>
);

// artist: 'jesus' (default) or 'mister' — which artist's videos the carousel shows
export default function ChinafunkVideo({ artist = 'jesus' } = {}) {
  const { t } = useApp();
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const gridRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [playingId, setPlayingId] = useState(null);

  const { videos, loading, error, channelUrl } = useYouTubeVideos(artist);
  const channelLink = channelUrl || CHANNEL_URLS[artist] || CHANNEL_URLS.jesus;
  const showSkeletons = loading && videos.length === 0;
  const showStatus = !loading && videos.length === 0; // API error with no cached list, or channel without videos
  const videoIdsKey = videos.map((v) => v.id).join(',');

  const handleScroll = useCallback(() => {
    if (!gridRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = gridRef.current;
    // The first snap point can sit a few px in (snap is computed while GSAP has the cards scaled)
    setCanScrollLeft(scrollLeft > 24);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5); // 5px tolerance
  }, []);

  // Arrows move exactly one card (card width + gap), whatever the card size
  const scrollByCards = (direction) => {
    const grid = gridRef.current;
    if (!grid) return;
    const card = grid.querySelector('.featured-card');
    const gap = parseFloat(getComputedStyle(grid).columnGap) || 0;
    const step = card ? card.getBoundingClientRect().width + gap : 400;
    grid.scrollBy({ left: direction * step, behavior: 'smooth' });
  };

  // Re-evaluate arrows once the videos arrive and on resize
  useEffect(() => {
    handleScroll();
    window.addEventListener('resize', handleScroll);
    return () => window.removeEventListener('resize', handleScroll);
  }, [handleScroll, videoIdsKey]);

  // 1. Text header entrance
  useEffect(() => {
    if (!containerRef.current || !textRef.current) return;

    const ctx = gsap.context(() => {
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
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // 2. Staggered Featured Cards entrance (re-run when the video list changes)
  useEffect(() => {
    if (!containerRef.current || !videoIdsKey) return;

    const ctx = gsap.context(() => {
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
  }, [videoIdsKey]);

  return (
    <section ref={containerRef} className={`chinafunk${artist === 'mister' ? ' chinafunk--mm' : ''}`} id="destacados">
      {artist === 'mister' && (
        // Decorative backdrop (grain, petrol-blue light, giant wordmark) — see misterMolina.css
        <div className="mm-backdrop" aria-hidden="true">
          <span className="mm-backdrop-word">MISTER</span>
        </div>
      )}
      <div className="chinafunk-container">
        <div ref={textRef} className="chinafunk-text">

          <h2 className="section-title">{t.watchTitle || 'Watch'}</h2>
        </div>

        {showStatus ? (
          <div className="featured-status" role="status">
            <p>
              {error
                ? (t.watchError || "We couldn't load the latest videos right now. You can watch them all on YouTube.")
                : (t.watchEmpty || 'No videos available yet. Check back soon.')}
            </p>
          </div>
        ) : (
          <div className="carousel-wrapper">
            <button
              className={`carousel-arrow carousel-arrow-left ${!canScrollLeft || showSkeletons ? 'disabled' : ''}`}
              onClick={() => scrollByCards(-1)}
              aria-label="Previous"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>

            <div ref={gridRef} className="featured-carousel" onScroll={handleScroll} aria-busy={showSkeletons}>
              {showSkeletons && [...Array(SKELETON_COUNT)].map((_, i) => (
                <article className="featured-card featured-card--skeleton" key={`skeleton-${i}`} aria-hidden="true">
                  <div className="featured-card-media" />
                  <div className="featured-card-content">
                    <span className="featured-skeleton-line" />
                    <span className="featured-skeleton-line featured-skeleton-line--short" />
                  </div>
                </article>
              ))}

              {videos.map((video) => {
                const isPlaying = playingId === video.id;
                return (
                  <article
                    className="featured-card"
                    key={video.id}
                  >
                    <div className="featured-card-media">
                      {isPlaying ? (
                        <iframe
                          className="featured-card-video"
                          src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0`}
                          title={video.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      ) : video.embeddable ? (
                        <button
                          type="button"
                          className="featured-card-thumb"
                          onClick={() => setPlayingId(video.id)}
                          aria-label={`Play video: ${video.title}`}
                        >
                          <img className="featured-card-video" src={video.thumbnail} alt="" loading="lazy" decoding="async" />
                          <PlayIcon />
                        </button>
                      ) : (
                        // The owner disabled embedding for this video: open it on YouTube instead
                        <a
                          className="featured-card-thumb"
                          href={video.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Watch on YouTube: ${video.title}`}
                        >
                          <img className="featured-card-video" src={video.thumbnail} alt="" loading="lazy" decoding="async" />
                          <PlayIcon />
                        </a>
                      )}
                    </div>
                    <div className="featured-card-content">
                      <h3>{video.title}</h3>
                    </div>
                  </article>
                );
              })}
            </div>

            <button
              className={`carousel-arrow carousel-arrow-right ${!canScrollRight || showSkeletons ? 'disabled' : ''}`}
              onClick={() => scrollByCards(1)}
              aria-label="Next"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
          <a href={channelLink} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#ff0000', color: '#fff', padding: '12px 28px', borderRadius: '50px', textDecoration: 'none', fontWeight: 'bold', fontSize: '16px' }}>
            <svg viewBox="0 0 50 50" width="24" height="24" fill="currentColor" stroke="none">
               <path d="M35.5 19.4a2.8 2.8 0 0 0-1.9-2c-1.7-.5-8.6-.5-8.6-.5s-6.9 0-8.6.5a2.8 2.8 0 0 0-1.9 2A29 29 0 0 0 14 25a29 29 0 0 0 .5 5.6 2.8 2.8 0 0 0 1.9 2c1.7.4 8.6.4 8.6.4s6.9 0 8.6-.4a2.8 2.8 0 0 0 1.9-2 29 29 0 0 0 .5-5.6 29 29 0 0 0-.5-5.6zM22.7 28.5v-7l6.2 3.5-6.2 3.5z" />
            </svg>
            MORE
          </a>
        </div>

      </div>
    </section>
  );
}
