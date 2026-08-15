import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useApp } from '../context/AppContext';
import { useBandsintownEvents } from '../hooks/useBandsintownEvents';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const statusLabels = {
  available: { text: 'Tickets available', cls: 'uc-status--available' },
  few: { text: 'Last tickets', cls: 'uc-status--few' },
  soldout: { text: 'Sold out', cls: 'uc-status--soldout' },
};

export default function UpcomingConcerts() {
  const { t } = useApp();
  const wrapperRef = useRef(null);
  const headingRef = useRef(null);
  const listRef = useRef(null);
  const ctaRef = useRef(null);
  
  const { events, loading, error, isEmpty } = useBandsintownEvents();
  const topConcerts = events.slice(0, 5);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!wrapperRef.current) return;
    // Don't animate if loading or error to prevent layout glitches before data is ready
    if (loading || error) return;

    const ctx = gsap.context(() => {
      // 1. Header scroll transition
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { opacity: 0, y: 40, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // 2. Staggered Concert List Rows entrance animation
      const rows = wrapperRef.current.querySelectorAll('.uc-row');
      if (rows.length > 0) {
        gsap.fromTo(
          rows,
          { opacity: 0, y: 35, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: listRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // 3. Footer CTA button scroll transition
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: ctaRef.current,
              start: 'top 92%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, wrapperRef);

    return () => ctx.revert();
  }, [loading, error, events]); // Re-run animations when data is loaded

  // Magnetic button effect helper
  const handleMouseMove = (e) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(el, {
      x: x * 0.3,
      y: y * 0.3,
      scale: 1.04,
      ease: 'power2.out',
      duration: 0.3,
    });
  };

  const handleMouseLeave = (e) => {
    const el = e.currentTarget;
    gsap.to(el, {
      x: 0,
      y: 0,
      scale: 1,
      ease: 'elastic.out(1, 0.3)',
      duration: 0.8,
    });
  };

  return (
    <div ref={wrapperRef} className="uc-curtain-wrapper" id="concerts-home">
      <section className="uc-curtain-inner">
        {/* Ambient Light & Grid Background */}
        <div className="uc-aurora pointer-events-none" />
        <div className="uc-bg-grid pointer-events-none" />

        {/* Center Content Container */}
        <div className="uc-container">
          {/* Header */}
          <div className="uc-header" ref={headingRef}>

            <h2 className="section-title uc-title-glow">Tour</h2>
          </div>

          {/* Concert List */}
          <ul className="uc-list" ref={listRef}>
            {loading && (
              <li className="uc-row footer-glass-pill" style={{ justifyContent: 'center', opacity: 0.7 }}>
                <span className="uc-city">Loading upcoming concerts...</span>
              </li>
            )}
            {error && (
              <li className="uc-row footer-glass-pill" style={{ justifyContent: 'center', opacity: 0.7 }}>
                <span className="uc-city">Unable to load concerts at this time.</span>
              </li>
            )}
            {isEmpty && (
              <li className="uc-row footer-glass-pill" style={{ justifyContent: 'center', opacity: 0.7 }}>
                <span className="uc-city">No upcoming concerts right now. Stay tuned!</span>
              </li>
            )}
            {!loading && !error && topConcerts.map((c) => {
              const st = statusLabels[c.status];
              return (
                <li key={c.id} className="uc-row footer-glass-pill">
                  {/* Date */}
                  <div className="uc-date">
                    <span className="uc-date-day">{c.day}</span>
                    <span className="uc-date-month">
                      {c.month} {c.year}
                    </span>
                  </div>

                  {/* Divider */}
                  <div className="uc-divider" aria-hidden="true" />

                  {/* Info */}
                  <div className="uc-info">
                    <span className="uc-venue">{c.venue}</span>
                    <span className="uc-city">{c.city}{c.countryCode ? `, ${c.countryCode}` : ''}</span>
                  </div>

                  {/* Status + CTA */}
                  <div className="uc-action">
                    {c.status !== 'soldout' && c.ticketUrl ? (
                      <a
                        href={c.ticketUrl}
                        className="uc-ticket-btn"
                        target="_blank"
                        rel="noopener noreferrer"
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                      >
                        Get tickets
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M7 17L17 7M17 7H7M17 7v10"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </a>
                    ) : (
                      <span className="uc-ticket-btn uc-ticket-btn--disabled">
                        Sold out
                      </span>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>

          {/* Footer CTA */}
          <div className="uc-footer-cta" ref={ctaRef}>
            <Link
              to="/concerts"
              className="uc-all-btn footer-glass-pill"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              View all concerts
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
