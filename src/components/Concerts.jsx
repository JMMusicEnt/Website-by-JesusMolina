import { useState, useRef, useEffect, useMemo } from 'react';
import Globe from 'react-globe.gl';
import { useApp } from '../context/AppContext';
import { CONCERTS, GLOBE_LOCATIONS, GLOBE_ARCS } from '../data/concerts';

// Next 5 upcoming concerts for the sidebar card
const UPCOMING_DATES = GLOBE_LOCATIONS.slice(0, 5);

// All unique countries from archived concerts
const ALL_COUNTRIES = [...new Set(CONCERTS.map((c) => c.country))].sort();

export default function Concerts() {
  const { t } = useApp();
  const [hoveredMarker, setHoveredMarker] = useState(null);
  const [playingId, setPlayingId] = useState(null);
  const [activeUpcoming, setActiveUpcoming] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [searchCountry, setSearchCountry] = useState('');
  const [sortOrder, setSortOrder] = useState('newest'); // 'newest' | 'oldest'
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Filtered + sorted concerts
  const filteredConcerts = useMemo(() => {
    let result = [...CONCERTS];
    // Filter by country
    if (searchCountry.trim()) {
      const query = searchCountry.trim().toLowerCase();
      result = result.filter(
        (c) =>
          c.country.toLowerCase().includes(query) ||
          c.city.toLowerCase().includes(query)
      );
    }
    // Sort by year
    result.sort((a, b) =>
      sortOrder === 'newest' ? b.year - a.year : a.year - b.year
    );
    return result;
  }, [searchCountry, sortOrder]);

  // Countries matching search for dropdown suggestions
  const matchingCountries = useMemo(() => {
    if (!searchCountry.trim()) return [];
    const query = searchCountry.trim().toLowerCase();
    return ALL_COUNTRIES.filter((c) => c.toLowerCase().includes(query));
  }, [searchCountry]);
  const globeEl = useRef();

  useEffect(() => {
    if (globeEl.current) {
      const controls = globeEl.current.controls();
      controls.autoRotate = false;
      controls.enableZoom = false;
    }
  }, []);

  // Auto-cycle upcoming dates every 3.5s
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveUpcoming((prev) => (prev + 1) % UPCOMING_DATES.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handlePlay = (concertId) => {
    const scrollY = window.scrollY;
    setPlayingId(concertId);
    requestAnimationFrame(() => {
      window.scrollTo(0, scrollY);
    });
  };

  const activeMarker = null; // No longer needed for globe since it has native labels if needed, or we can use custom markers.


  return (
    <section className="concerts-page">
      <div className="concerts-bg-piano-strings" aria-hidden="true" />
      <div className="concerts-ambient-glow-1" aria-hidden="true" />
      <div className="concerts-ambient-glow-2" aria-hidden="true" />

      <div className="concerts-container">
        <header className="concerts-header" data-reveal>
          <span className="section-eyebrow">{t.concertsEyebrow2}</span>
          <h1 className="section-title">
            Jesús Molina <em>{t.concerts}</em>
          </h1>
          <p className="concerts-subtitle">{t.concertsSubtitle}</p>
        </header>

        {/* ── World Tour Map — Premium redesign ── */}
        <div className="concerts-map-section" data-reveal>
          <div className="map-card">
            <div className="map-header">
              <div className="map-header-left">
                <span className="map-badge">
                  <span className="map-badge-dot" />
                  World Tour
                </span>
                <h3 className="map-title">World Tour Upcoming Dates</h3>
              </div>
              <p className="map-desc">{t.concertsMapDesc}</p>
            </div>

            <div className="map-canvas-container">
              <div 
                className="globe-wrapper" 
                style={{ width: '100%', height: '100%', cursor: 'grab' }}
                onMouseEnter={() => setHoveredMarker('globe')}
                onMouseLeave={() => setHoveredMarker(null)}
              >
                <Globe
                  ref={globeEl}
                  width={1000}
                  height={700}
                  backgroundColor="rgba(0,0,0,0)"
                  globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
                  bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                  atmosphereColor="#C9A227"
                  atmosphereAltitude={0.18}
                  
                  // Rings for upcoming concert cities only
                  ringsData={UPCOMING_DATES}
                  ringLat="lat"
                  ringLng="lng"
                  ringColor="color"
                  ringMaxRadius={2}
                  ringPropagationSpeed={2.5}
                  ringRepeatPeriod={800}

                  // Points/Dots — only upcoming concert locations
                  pointsData={UPCOMING_DATES}
                  pointLat="lat"
                  pointLng="lng"
                  pointColor={() => '#C9A227'}
                  pointAltitude={0.01}
                  pointRadius={0.8}
                  
                  // Premium HTML Tooltip on hover
                  pointLabel={(d) => `
                    <div class="globe-tooltip" style="pointer-events:none;">
                      <div class="tooltip-header">
                        <span class="tooltip-city">${d.city}</span>, <span class="tooltip-country">${d.country}</span>
                      </div>
                      <div class="tooltip-details">
                        <span class="tooltip-date">${d.date}</span>
                        <span class="tooltip-venue">${d.venue}</span>
                      </div>
                    </div>
                  `}

                  // Arcs (airline routes)
                  arcsData={GLOBE_ARCS}
                  arcStartLat="startLat"
                  arcStartLng="startLng"
                  arcEndLat="endLat"
                  arcEndLng="endLng"
                  arcColor="color"
                  arcDashLength={0.4}
                  arcDashGap={4}
                  arcDashInitialGap={() => Math.random() * 5}
                  arcDashAnimateTime={2000}
                  arcAltitudeAutoScale={0.3}
                />
              </div>

              {/* ── Upcoming Dates Card ── */}
              <aside
                className="upcoming-dates-card"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                <div className="upcoming-card-header">
                  <div className="upcoming-card-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <rect x="3" y="4" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M3 9h18" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M8 2v4M16 2v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      <circle cx="12" cy="15" r="1.5" fill="currentColor"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="upcoming-card-title">Próximas Fechas</h4>
                    <span className="upcoming-card-count">{UPCOMING_DATES.length} shows</span>
                  </div>
                </div>

                {/* Timeline progress bar */}
                <div className="upcoming-progress-track">
                  <div
                    className="upcoming-progress-fill"
                    style={{ width: `${((activeUpcoming + 1) / UPCOMING_DATES.length) * 100}%` }}
                  />
                </div>

                <ul className="upcoming-list">
                  {UPCOMING_DATES.map((concert, i) => (
                    <li
                      key={i}
                      className={`upcoming-item ${i === activeUpcoming ? 'upcoming-item--active' : ''} ${i < activeUpcoming ? 'upcoming-item--past' : ''}`}
                      onClick={() => setActiveUpcoming(i)}
                      onKeyDown={(e) => e.key === 'Enter' && setActiveUpcoming(i)}
                      role="button"
                      tabIndex={0}
                    >
                      <div className="upcoming-item-indicator">
                        <span className="upcoming-dot" />
                        {i < UPCOMING_DATES.length - 1 && <span className="upcoming-line" />}
                      </div>
                      <div className="upcoming-item-content">
                        <span className="upcoming-date">{concert.date}</span>
                        <span className="upcoming-city">{concert.city}</span>
                        <span className="upcoming-venue">{concert.venue}</span>
                        {i === activeUpcoming && (
                          <span className="upcoming-country-badge">{concert.country}</span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="upcoming-card-footer">
                  <span className="upcoming-footer-label">Ver todas las fechas</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <path d="M7 17L17 7M17 7H7M17 7v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </aside>

            </div>

            {/* Map legend */}
            <div className="map-legend">
              <div className="map-legend-item">
                <span className="legend-dot" />
                <span className="legend-text">+60 países visitados</span>
              </div>
              <div className="map-legend-item">
                <span className="legend-line" />
                <span className="legend-text">Ruta de gira</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Concert Gallery — Editorial bento grid ── */}
        <div className="concerts-gallery-header" data-reveal>
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

        <div className="concerts-gallery" data-reveal-stagger>
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
                data-reveal
                data-reveal-delay={i * 80}
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
