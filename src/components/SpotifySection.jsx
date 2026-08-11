import { useApp } from '../context/AppContext';

export default function SpotifySection() {
  const { t } = useApp();
  const artistUrl = 'https://open.spotify.com/artist/7Gl7yiOLDSRr1cZyPwpGv4';

  return (
    <section className="spotify-sec" id="spotify">
      {/* Glow effects for Spotify branding */}
      <div className="spotify-glow spotify-glow-1" aria-hidden="true"></div>
      <div className="spotify-glow spotify-glow-2" aria-hidden="true"></div>

      <div className="spotify-container">
        <div className="spotify-header">
          {t.spotifyEyebrow && <span className="section-eyebrow section-eyebrow-light" data-reveal>{t.spotifyEyebrow}</span>}
          {t.spotifyTitle && <h2 className="section-title section-title-light" data-reveal>{t.spotifyTitle}</h2>}
          {t.spotifySub && <p className="spotify-subtitle-text" data-reveal>{t.spotifySub}</p>}
        </div>

        <div className="spotify-grid">
          {/* Card 1: Artist Profile Widget */}
          <div className="spotify-profile-card" data-reveal="slide-left">
            <div className="spotify-badge-verified">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
              <span>{t.spotifyVerifiedArtist || "Verified Artist"}</span>
            </div>

            <div className="spotify-profile-header">
              <div className="spotify-avatar">
                <img src={`${import.meta.env.BASE_URL}images/image3.png`} alt="Jesús Molina" />
              </div>
              <div className="spotify-name-wrap">
                <h3 className="spotify-artist-name">Jesús Molina</h3>
                <span className="spotify-artist-genre">Jazz Fusion / Solo Piano</span>
              </div>
            </div>

            <div className="spotify-stats">
              <div className="spotify-stat-item">
                <span className="spotify-stat-num">394,761</span>
                <span className="spotify-stat-label">{t.spotifyMonthlyListeners}</span>
              </div>
            </div>

            <div className="spotify-featured-quote">
              <p>{t.spotifyQuote || '"One of the most creative pianists and multi-instrumentalists in the international modern jazz scene."'}</p>
            </div>

            <a
              href={artistUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="spotify-follow-btn"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.84 14.32c-.17.28-.53.37-.81.2-2.3-1.4-5.2-1.7-8.61-.92-.32.07-.64-.13-.71-.45-.07-.32.13-.64.45-.71 3.73-.85 6.93-.5 9.48 1.06.27.17.37.52.2.82zm1.29-2.7c-.22.35-.68.46-1.02.24-2.63-1.62-6.63-2.09-9.73-1.15-.39.12-.8-.1-.92-.49-.12-.39.1-.8.49-.92 3.55-1.08 7.96-.56 10.94 1.28.34.21.46.67.24 1.04zm.11-2.76C14.73 8.7 8.92 8.5 5.58 9.52c-.51.15-1.05-.14-1.21-.65-.15-.51.14-1.05.65-1.21 3.84-1.16 10.26-.93 14.32 1.48.46.27.61.87.34 1.33-.27.46-.87.61-1.33.34z" />
              </svg>
              <span>{t.spotifyFollowBtn}</span>
            </a>
          </div>

          {/* Card 2: Spotify Embed Player */}
          <div className="spotify-player-card" data-reveal="slide-right" data-reveal-delay="150">

            <iframe
              title="Jesús Molina on Spotify"
              src="https://open.spotify.com/embed/artist/7Gl7yiOLDSRr1cZyPwpGv4?utm_source=generator&theme=0"
              frameBorder="0"
              allowFullScreen=""
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
