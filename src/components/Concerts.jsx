import { useState, useEffect, useRef, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { useBandsintownEvents } from '../hooks/useBandsintownEvents';
import { getRecapUrl } from '../data/pastRecaps';

function LiveCountdown({ targetDateStr }) {
  const [timeLeft, setTimeLeft] = useState({ days: 68, hours: 6, minutes: 58, seconds: 1 });

  useEffect(() => {
    function updateTimer() {
      const target = new Date(targetDateStr).getTime();
      const now = new Date().getTime();
      const diff = target - now;

      if (isNaN(diff) || diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [targetDateStr]);

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <div className="wt-countdown-grid">
      <div className="wt-countdown-item">
        <span className="wt-countdown-val">{pad(timeLeft.days)}</span>
        <span className="wt-countdown-lbl">DÍAS</span>
      </div>
      <div className="wt-countdown-item">
        <span className="wt-countdown-val">{pad(timeLeft.hours)}</span>
        <span className="wt-countdown-lbl">HRS</span>
      </div>
      <div className="wt-countdown-item">
        <span className="wt-countdown-val">{pad(timeLeft.minutes)}</span>
        <span className="wt-countdown-lbl">MIN</span>
      </div>
      <div className="wt-countdown-item">
        <span className="wt-countdown-val">{pad(timeLeft.seconds)}</span>
        <span className="wt-countdown-lbl">SEG</span>
      </div>
    </div>
  );
}

// Tour dates are shared by both artists for now; artist="mister" only rebrands the artist card
export default function Concerts({ artist = 'jesus' }) {
  const { t } = useApp();
  const isMister = artist === 'mister';
  const [activeShowIndex, setActiveShowIndex] = useState(0); // Default to first
  const [playingId, setPlayingId] = useState(null);
  const [searchCountry, setSearchCountry] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');
  const [showOnlyRecaps, setShowOnlyRecaps] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const galleryRef = useRef(null);

  const { events, loading, error } = useBandsintownEvents();

  const { upcomingEvents, pastEvents } = useMemo(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const upcoming = [];
    const past = [];
    events.forEach(e => {
      if (new Date(e.targetDate) >= now) {
        upcoming.push(e);
      } else {
        past.push(e);
      }
    });
    upcoming.sort((a, b) => new Date(a.targetDate) - new Date(b.targetDate));
    past.sort((a, b) => new Date(b.targetDate) - new Date(a.targetDate));
    return { upcomingEvents: upcoming, pastEvents: past };
  }, [events]);

  const isEmptyUpcoming = !loading && !error && upcomingEvents.length === 0;

  const topConcerts = upcomingEvents.slice(0, 5);
  const activeShow = topConcerts[activeShowIndex] || topConcerts[0] || null;

  const ALL_COUNTRIES = useMemo(() => {
    return [...new Set(pastEvents.map((c) => c.country))].sort();
  }, [pastEvents]);

  // Filtered + sorted past concerts for the gallery
  const filteredConcerts = useMemo(() => {
    let result = [...pastEvents];
    if (searchCountry.trim()) {
      const query = searchCountry.trim().toLowerCase();
      result = result.filter(
        (c) =>
          c.country.toLowerCase().includes(query) ||
          c.city.toLowerCase().includes(query)
      );
    }
    if (showOnlyRecaps) {
      result = result.filter((c) => getRecapUrl(c.id));
    }
    result.sort((a, b) =>
      sortOrder === 'newest' ? new Date(b.targetDate) - new Date(a.targetDate) : new Date(a.targetDate) - new Date(b.targetDate)
    );
    return result;
  }, [searchCountry, sortOrder, showOnlyRecaps, pastEvents]);

  const matchingCountries = useMemo(() => {
    if (!searchCountry.trim()) return [];
    const query = searchCountry.trim().toLowerCase();
    return ALL_COUNTRIES.filter((c) => c.toLowerCase().includes(query));
  }, [searchCountry, ALL_COUNTRIES]);

  // Slide-up animation on scroll using IntersectionObserver
  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    );

    // Small delay to let React render the new cards before observing
    const timer = setTimeout(() => {
      const cards = gallery.querySelectorAll('.concert-card');
      cards.forEach((card) => observer.observe(card));
    }, 50);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [filteredConcerts]);


  const handlePlay = (concertId) => {
    const scrollY = window.scrollY;
    setPlayingId(concertId);
    requestAnimationFrame(() => {
      window.scrollTo(0, scrollY);
    });
  };

  const scrollToArchive = (e) => {
    e.preventDefault();
    const el = document.getElementById('todas-las-fechas');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="concerts-page">
      <div className="concerts-bg-piano-strings" aria-hidden="true" />
      <div className="concerts-ambient-glow-1" aria-hidden="true" />
      <div className="concerts-ambient-glow-2" aria-hidden="true" />

      <div className="concerts-container">
        {/* ── World Tour Interactive Section ── */}
        <div className="wt-section" data-reveal>
          {/* Section Header */}
          <div className="wt-header" style={{ justifyContent: 'center', alignItems: 'center' }}>
            <div className="wt-header-left" style={{ alignItems: 'center', textAlign: 'center' }}>
              <h1 className="wt-title" style={{ textAlign: 'center' }}>
                TOUR
              </h1>
            </div>
          </div>

          {/* 2-Column Grid */}
          <div className="wt-grid">
            {/* Left Column: 5 Shows List */}
            <ul className="wt-list">
              {loading && <li className="wt-row" style={{display: 'flex', justifyContent: 'center'}}><span className="wt-city">Loading tours...</span></li>}
              {error && <li className="wt-row" style={{display: 'flex', justifyContent: 'center'}}><span className="wt-city">Error loading tours.</span></li>}
              {isEmptyUpcoming && <li className="wt-row" style={{display: 'flex', justifyContent: 'center', textAlign: 'center'}}><span className="wt-city">NO UPCOMING DATES.</span></li>}
              {!loading && !error && topConcerts.map((show, idx) => {
                const isActive = idx === activeShowIndex;
                return (
                  <li
                    key={show.id}
                    className={`wt-row ${isActive ? 'wt-row--active' : ''}`}
                    onMouseEnter={() => setActiveShowIndex(idx)}
                    onClick={() => setActiveShowIndex(idx)}
                  >
                    {/* Date */}
                    <div className="wt-date-block">
                      <span className="wt-date-day">{show.day}</span>
                      <span className="wt-date-my">{show.month} {show.year}</span>
                    </div>

                    {/* City & Venue */}
                    <div className="wt-info-block">
                      <div className="wt-city-wrap">
                        <span className="wt-city">{show.city}</span>
                        <span className="wt-country-code">{show.countryCode}</span>
                      </div>
                      <span className="wt-venue">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="currentColor" opacity="0.6"/>
                          <circle cx="12" cy="9" r="2.5" fill="currentColor"/>
                        </svg>
                        {show.venue}
                      </span>
                    </div>

                    {/* Button & Arrow */}
                    <div className="wt-actions">
                      <a
                        href={show.ticketUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="wt-ticket-btn"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                          <rect x="2" y="6" width="20" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                          <path d="M6 10h.01M6 14h.01M18 10h.01M18 14h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                        TICKETS
                      </a>
                      <svg className="wt-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </li>
                );
              })}
            </ul>

            {/* Right Column: Dark Interactive Card */}
            {activeShow ? (
              <aside className="wt-preview-card">
                <div className="wt-card-header">
                  <span className="wt-card-subhead">NEXT SHOW</span>
                  <LiveCountdown targetDateStr={activeShow.targetDate} />
                </div>

                <div className="wt-card-img-wrap">
                  <img
                    key={activeShow.id}
                    src={activeShow.image || `${import.meta.env.BASE_URL}images/concert-hero.png`}
                    alt={activeShow.city}
                    className="wt-card-img"
                  />
                  <div className="wt-card-img-overlay">
                    <span className="wt-card-date">{activeShow.dateLabel}</span>
                    <h3 className="wt-card-city">{activeShow.city}</h3>
                    <span className="wt-card-venue">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="currentColor"/>
                        <circle cx="12" cy="9" r="2.5" fill="#0E0D0F"/>
                      </svg>
                      {activeShow.venue}
                    </span>
                  </div>
                </div>
              </aside>
            ) : (
              <aside className="wt-follow-card">
                <div className="wt-follow-bg-glow" />
                <div className="wt-follow-brand">
                  <img 
                    src={`${import.meta.env.BASE_URL}images/bandsintownlogo.svg`} 
                    alt="Bandsintown" 
                    className="wt-bandsintown-logo"
                    style={{ height: '32px', marginTop: '2px' }}
                  />
                </div>
                <div className="wt-follow-content">
                  <img 
                    src={`${import.meta.env.BASE_URL}images/${isMister ? 'mistermolinaphoto.jpeg' : 'bioPhoto.jpeg'}`} 
                    alt={isMister ? 'MISTER MOLINA' : 'Jesús Molina'} 
                    className="wt-follow-avatar" 
                  />
                  
                  <div className="wt-follow-info">
                    <span className="wt-follow-label">Artist</span>
                    <h3 className="wt-follow-name">{isMister ? 'MISTER MOLINA' : 'Jesús Molina'}</h3>
                    {/* Verified badge and follower count belong to Jesus Molina's Bandsintown profile */}
                    {!isMister && (
                    <>
                    <div className="wt-follow-stats-row">
                      <span className="wt-follow-verified">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                          <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Verified
                      </span>
                    </div>
                    <div className="wt-follow-stats">8.49K Followers</div>
                    </>
                    )}

                    <a 
                      href="https://www.bandsintown.com/a/13813493-jesus-molina"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="wt-follow-btn"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                      Follow
                    </a>
                  </div>
                </div>
                <div className="wt-follow-decorative-text">LIVE • UPDATES</div>
              </aside>
            )}
          </div>

        </div>

        {/* ── Concert Gallery — Editorial bento grid ── */}
        <div id="todas-las-fechas" className="concerts-gallery-header" data-reveal>
          <div className="gallery-header-content">
            <h3 className="gallery-title">Past Performances</h3>
          </div>
        </div>

        {/* ── Search & Filter Bar ── */}
        <div className="concerts-filter-bar" data-reveal>
          <div className={`filter-search-wrap ${isSearchFocused ? 'filter-search-wrap--focused' : ''}`}>
            <svg className="filter-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/>
              <path d="M20 20l-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <input
              type="text"
              className="filter-search-input"
              placeholder="Search by country or city..."
              value={searchCountry}
              onChange={(e) => setSearchCountry(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
            />
            {searchCountry && (
              <button
                className="filter-search-clear"
                onClick={() => setSearchCountry('')}
                aria-label="Clear search"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            )}

            {/* Autocomplete dropdown */}
            {isSearchFocused && searchCountry.trim() && matchingCountries.length > 0 && (
              <div className="filter-search-dropdown">
                {matchingCountries.map((country) => (
                  <button
                    key={country}
                    className="filter-dropdown-item"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      setSearchCountry(country);
                      setIsSearchFocused(false);
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="currentColor" opacity="0.5"/>
                      <circle cx="12" cy="9" r="2.5" fill="currentColor"/>
                    </svg>
                    <span>{country}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="filter-sort-wrap">
            <span className="filter-sort-label">Sort by:</span>
            <button
              className={`filter-sort-btn ${sortOrder === 'newest' ? 'filter-sort-btn--active' : ''}`}
              onClick={() => setSortOrder('newest')}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path d="M12 5v14M5 12l7-7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" transform={sortOrder === 'newest' ? '' : 'rotate(180 12 12)'}/>
              </svg>
              Newest
            </button>
            <button
              className={`filter-sort-btn ${sortOrder === 'oldest' ? 'filter-sort-btn--active' : ''}`}
              onClick={() => setSortOrder('oldest')}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path d="M12 19V5M5 12l7 7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Oldest
            </button>
            <button
              className={`filter-sort-btn ${showOnlyRecaps ? 'filter-sort-btn--active' : ''}`}
              onClick={() => setShowOnlyRecaps((v) => !v)}
              aria-pressed={showOnlyRecaps}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path d="M8 5.5v13l10.5-6.5L8 5.5z" fill="currentColor"/>
              </svg>
              Show Recap
            </button>
          </div>

          {(searchCountry || showOnlyRecaps) && (
            <div className="filter-result-count">
              <span className="filter-count-number">{filteredConcerts.length}</span>
              <span className="filter-count-text">
                {filteredConcerts.length === 1 ? 'result' : 'results'}
              </span>
            </div>
          )}
        </div>

        <div className="concerts-gallery" ref={galleryRef}>
          {loading && (
             <div className="concerts-empty-state">
               <p>Loading concerts...</p>
             </div>
          )}
          {error && (
             <div className="concerts-empty-state">
               <p>Error loading concerts: {error}</p>
             </div>
          )}
          {!loading && !error && filteredConcerts.length === 0 && (
            <div className="concerts-empty-state">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" opacity="0.4"/>
                <path d="M20 20l-4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
              </svg>
              <p>
                {searchCountry
                  ? <>No {showOnlyRecaps ? 'recaps' : 'concerts'} found for <strong>"{searchCountry}"</strong></>
                  : 'No recaps found'}
              </p>
              <button className="empty-state-reset" onClick={() => { setSearchCountry(''); setShowOnlyRecaps(false); }}>
                Show all concerts
              </button>
            </div>
          )}
          {filteredConcerts.map((concert, i) => {
            const recapUrl = getRecapUrl(concert.id);
            return (
              <article
                key={concert.id}
                className={`concert-card concert-card--list ${i === 0 && !searchCountry ? 'concert-card--featured' : ''}`}
                style={{ '--slide-delay': `${i * 80}ms` }}
              >
                <div className="concert-card-list-body">
                  <div className="concert-card-meta-row">
                    <span className="concert-card-live-dot" />
                    <span className="concert-card-location">
                      {concert.city}, {concert.country}
                    </span>
                    <span className="concert-card-year-badge">{concert.year}</span>
                  </div>
                  <h4 className="concert-card-title">{concert.title}</h4>
                  <p className="concert-card-venue">{concert.venue}</p>
                </div>
                {recapUrl && (
                  <a
                    href={recapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="concert-card-cta"
                  >
                    <svg width="18" height="18" viewBox="0 0 50 50" fill="currentColor">
                      <path d="M35.5 19.4a2.8 2.8 0 0 0-1.9-2c-1.7-.5-8.6-.5-8.6-.5s-6.9 0-8.6.5a2.8 2.8 0 0 0-1.9 2A29 29 0 0 0 14 25a29 29 0 0 0 .5 5.6 2.8 2.8 0 0 0 1.9 2c1.7.4 8.6.4 8.6.4s6.9 0 8.6-.4a2.8 2.8 0 0 0 1.9-2 29 29 0 0 0 .5-5.6 29 29 0 0 0-.5-5.6zM22.7 28.5v-7l6.2 3.5-6.2 3.5z" />
                    </svg>
                    <span>Watch Recap</span>
                  </a>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
