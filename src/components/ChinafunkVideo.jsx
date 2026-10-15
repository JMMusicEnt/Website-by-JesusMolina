import { useRef, useState, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useApp } from '../context/AppContext';
import { useYouTubeVideos } from '../hooks/useYouTubeVideos';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const CHANNEL_URL = 'https://www.youtube.com/@Jesusmolinamusic';
const SKELETON_COUNT = 3;

const dateFormatter = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
const formatDate = (iso) => {
  const d = new Date(iso);
  return isNaN(d) ? '' : dateFormatter.format(d);
};

const PlayIcon = () => (
  <span className="featured-play-btn" aria-hidden="true">
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13l10.5-6.5L8 5.5z" /></svg>
  </span>
);

export default function ChinafunkVideo() {
  const { t } = useApp();
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const gridRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [playingId, setPlayingId] = useState(null);

  const { videos, loading, error, channelUrl } = useYouTubeVideos();
  const channelLink = channelUrl || CHANNEL_URL;
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

  const scrollByAmount = (amount) => {
    if (gridRef.current) {
      gridRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
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
    <section ref={containerRef} className="chinafunk" id="destacados">
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
              onClick={() => scrollByAmount(-400)}
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
                      {video.publishedAt && (
                        <time className="featured-card-date" dateTime={video.publishedAt}>
                          {formatDate(video.publishedAt)}
                        </time>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>

            <button
              className={`carousel-arrow carousel-arrow-right ${!canScrollRight || showSkeletons ? 'disabled' : ''}`}
              onClick={() => scrollByAmount(400)}
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
