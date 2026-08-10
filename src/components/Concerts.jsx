import { useState, useEffect, useRef, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { CONCERTS } from '../data/concerts';

// 5 Upcoming Shows as seen in mockup
const UPCOMING_SHOWS = [
  {
    id: 1,
    day: '15',
    month: 'OCT',
    year: '2026',
    dateLabel: '15 OCT 2026',
    targetDate: '2026-10-15T20:00:00',
    city: 'BOGOTÁ',
    countryCode: 'CO',
    venue: 'Teatro Mayor Julio Mario Santo Domingo',
    ticketUrl: 'https://www.teatromayor.org',
    image: `${import.meta.env.BASE_URL}images/concert-hero.png`
  },
  {
    id: 2,
    day: '04',
    month: 'NOV',
    year: '2026',
    dateLabel: '04 NOV 2026',
    targetDate: '2026-11-04T20:00:00',
    city: 'LOS ANGELES',
    countryCode: 'USA',
    venue: 'Walt Disney Concert Hall',
    ticketUrl: 'https://www.laphil.com',
    image: `${import.meta.env.BASE_URL}images/image1.png`
  },
  {
    id: 3,
    day: '21',
    month: 'NOV',
    year: '2026',
    dateLabel: '21 NOV 2026',
    targetDate: '2026-11-21T20:00:00',
    city: 'CIUDAD DE MÉXICO',
    countryCode: 'MX',
    venue: 'Auditorio Nacional',
    ticketUrl: 'https://www.auditorio.com.mx',
    image: `${import.meta.env.BASE_URL}images/image3.png`
  },
  {
    id: 4,
    day: '18',
    month: 'ENE',
    year: '2027',
    dateLabel: '18 ENE 2027',
    targetDate: '2027-01-18T20:00:00',
    city: 'MADRID',
    countryCode: 'ES',
    venue: 'Teatro Real',
    ticketUrl: 'https://www.teatroreal.es',
    image: `${import.meta.env.BASE_URL}images/image2.png`
  },
  {
    id: 5,
    day: '09',
    month: 'FEB',
    year: '2027',
    dateLabel: '09 FEB 2027',
    targetDate: '2027-02-09T20:00:00',
    city: 'BUENOS AIRES',
    countryCode: 'AR',
    venue: 'Teatro Coliseo',
    ticketUrl: 'https://www.teatrocoliseo.org.ar',
    image: `${import.meta.env.BASE_URL}images/biography-portrait.jpg`
  }
];

// All unique countries from archived concerts
const ALL_COUNTRIES = [...new Set(CONCERTS.map((c) => c.country))].sort();

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

export default function Concerts() {
  const { t } = useApp();
  const [activeShowIndex, setActiveShowIndex] = useState(1); // Default to Los Angeles (index 1) as in mockup
  const [playingId, setPlayingId] = useState(null);
  const [searchCountry, setSearchCountry] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const galleryRef = useRef(null);

  const activeShow = UPCOMING_SHOWS[activeShowIndex] || UPCOMING_SHOWS[0];

  // Filtered + sorted concerts
  const filteredConcerts = useMemo(() => {
    let result = [...CONCERTS];
    if (searchCountry.trim()) {
      const query = searchCountry.trim().toLowerCase();
      result = result.filter(
        (c) =>
          c.country.toLowerCase().includes(query) ||
          c.city.toLowerCase().includes(query)
      );
    }
    result.sort((a, b) =>
      sortOrder === 'newest' ? b.year - a.year : a.year - b.year
    );
    return result;
  }, [searchCountry, sortOrder]);

  const matchingCountries = useMemo(() => {
    if (!searchCountry.trim()) return [];
    const query = searchCountry.trim().toLowerCase();
    return ALL_COUNTRIES.filter((c) => c.toLowerCase().includes(query));
  }, [searchCountry]);

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
          <div className="wt-header">
            <div className="wt-header-left">
              <span className="wt-badge">
                <span className="wt-badge-dot" />
                WORLD TOUR
              </span>
              <h1 className="wt-title">
                WORLD TOUR
                <span className="wt-title-highlight">UPCOMING DATES</span>
              </h1>
            </div>

            <div className="wt-counter-badge">
              <span className="wt-counter-label">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="4" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M3 9h18" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M8 2v4M16 2v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                PRÓXIMAS FECHAS
              </span>
              <span className="wt-counter-value">
                {UPCOMING_SHOWS.length} <small>SHOWS</small>
              </span>
            </div>
          </div>

          {/* 2-Column Grid */}
          <div className="wt-grid">
            {/* Left Column: 5 Shows List */}
            <ul className="wt-list">
              {UPCOMING_SHOWS.map((show, idx) => {
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
                        ENTRADAS
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
            <aside className="wt-preview-card">
              <div className="wt-card-header">
                <span className="wt-card-subhead">PRÓXIMO SHOW</span>
                <LiveCountdown targetDateStr={activeShow.targetDate} />
              </div>

              <div className="wt-card-img-wrap">
                <img
                  key={activeShow.id}
                  src={activeShow.image}
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
          </div>

        </div>

        {/* ── Concert Gallery — Editorial bento grid ── */}
        <div id="todas-las-fechas" className="concerts-gallery-header" data-reveal>
          <div className="gallery-header-content">
            <h3 className="gallery-title">{t.concertsGalleryTitle}</h3>
            <p className="gallery-desc">{t.concertsGalleryDesc}</p>
          </div>
          <div className="gallery-stats">
            <div className="gallery-stat">
              <span className="stat-number">{CONCERTS.length}</span>
              <span className="stat-label">Shows</span>
            </div>
            <div className="gallery-stat">
              <span className="stat-number">{ALL_COUNTRIES.length}</span>
              <span className="stat-label">Países</span>
            </div>
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
              placeholder="Buscar por país o ciudad..."
              value={searchCountry}
              onChange={(e) => setSearchCountry(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
            />
            {searchCountry && (
              <button
                className="filter-search-clear"
                onClick={() => setSearchCountry('')}
                aria-label="Limpiar búsqueda"
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
            <span className="filter-sort-label">Ordenar:</span>
            <button
              className={`filter-sort-btn ${sortOrder === 'newest' ? 'filter-sort-btn--active' : ''}`}
              onClick={() => setSortOrder('newest')}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path d="M12 5v14M5 12l7-7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" transform={sortOrder === 'newest' ? '' : 'rotate(180 12 12)'}/>
              </svg>
              Más reciente
            </button>
            <button
              className={`filter-sort-btn ${sortOrder === 'oldest' ? 'filter-sort-btn--active' : ''}`}
              onClick={() => setSortOrder('oldest')}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path d="M12 19V5M5 12l7 7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Más antiguo
            </button>
          </div>

          {searchCountry && (
            <div className="filter-result-count">
              <span className="filter-count-number">{filteredConcerts.length}</span>
              <span className="filter-count-text">
                {filteredConcerts.length === 1 ? 'resultado' : 'resultados'}
              </span>
            </div>
          )}
        </div>

        <div className="concerts-gallery" ref={galleryRef}>
          {filteredConcerts.length === 0 && (
            <div className="concerts-empty-state">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" opacity="0.4"/>
                <path d="M20 20l-4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
              </svg>
              <p>No se encontraron conciertos para <strong>"{searchCountry}"</strong></p>
              <button className="empty-state-reset" onClick={() => setSearchCountry('')}>
                Mostrar todos los conciertos
              </button>
            </div>
          )}
          {filteredConcerts.map((concert, i) => {
            const isPlaying = playingId === concert.id;
            return (
              <article
                key={concert.id}
                className={`concert-card ${isPlaying ? 'playing' : ''} ${i === 0 && !searchCountry ? 'concert-card--featured' : ''}`}
                style={{ '--slide-delay': `${i * 80}ms` }}
              >
                <div className="concert-card-video">
                  {isPlaying ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${concert.youtubeId}?rel=0&modestbranding=1&autoplay=1`}
                      title={concert.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <div
                      className="concert-card-poster"
                      onClick={() => handlePlay(concert.id)}
                      onKeyDown={(e) => e.key === 'Enter' && handlePlay(concert.id)}
                      role="button"
                      tabIndex={0}
                      aria-label={`Play ${concert.title}`}
                    >
                      <img
                        src={`https://img.youtube.com/vi/${concert.youtubeId}/hqdefault.jpg`}
                        alt={concert.title}
                        loading="lazy"
                      />
                      <div className="poster-overlay">
                        <div className="play-btn-wrap">
                          <div className="play-btn-ring" />
                          <svg className="play-btn-icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                      <span className="concert-card-year">{concert.year}</span>
                    </div>
                  )}
                </div>
                <div className="concert-card-body">
                  <div className="concert-card-meta-row">
                    <span className="concert-card-live-dot" />
                    <span className="concert-card-location">
                      {concert.city}, {concert.country}
                    </span>
                  </div>
                  <h4 className="concert-card-title">{concert.title}</h4>
                  <p className="concert-card-venue">{concert.venue}</p>
                  <a
                    href={`https://www.youtube.com/watch?v=${concert.youtubeId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="concert-card-cta"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span>{t.concertsWatchLive}</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M7 17L17 7M17 7H7M17 7v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
