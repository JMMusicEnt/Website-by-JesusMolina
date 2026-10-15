import { useApp } from '../context/AppContext';

// Defaults to Jesus Molina; the MISTER MOLINA home passes its own Spotify artist
export default function SpotifySection({
  artistName = 'Jesus Molina',
  artistId = '7Gl7yiOLDSRr1cZyPwpGv4',
  artistUrl = `https://open.spotify.com/artist/${artistId}`,
  backgroundImage, // optional photo behind the section (path inside public/)
  variant, // 'mister' -> MISTER MOLINA backdrop (grain, burgundy light, giant wordmark)
} = {}) {
  const { t } = useApp();

  return (
    <section
      className={`spotify-sec${backgroundImage ? ' spotify-sec--photo' : ''}${variant === 'mister' ? ' spotify-sec--mm' : ''}`}
      id="spotify"
    >
      {variant === 'mister' && (
        <div className="mm-backdrop" aria-hidden="true">
          <span className="mm-backdrop-word">MOLINA</span>
        </div>
      )}
      {backgroundImage && (
        <div
          className="section-bg-photo"
          style={{ backgroundImage: `url(${import.meta.env.BASE_URL}${backgroundImage})` }}
          aria-hidden="true"
        />
      )}
      {/* Glow effects for Spotify branding */}
      <div className="spotify-glow spotify-glow-1" aria-hidden="true"></div>
      <div className="spotify-glow spotify-glow-2" aria-hidden="true"></div>

      <div className="spotify-container">
        <div className="spotify-header">
          <h2 className="section-title">LISTEN</h2>
          {t.spotifyEyebrow && <span className="section-eyebrow section-eyebrow-light" data-reveal>{t.spotifyEyebrow}</span>}
          {t.spotifyTitle && <h2 className="section-title section-title-light" data-reveal>{t.spotifyTitle}</h2>}
          {t.spotifySub && <p className="spotify-subtitle-text" data-reveal>{t.spotifySub}</p>}
        </div>

        <div className="spotify-grid">
          {/* Card 2: Spotify Embed Player */}
          <div className="spotify-player-card" data-reveal="slide-right" data-reveal-delay="150">

            <iframe
              title={`${artistName} on Spotify`}
              src={`https://open.spotify.com/embed/artist/${artistId}?utm_source=generator&theme=0`}
              frameBorder="0"
              allowFullScreen=""
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
          </div>
          
          <a href={artistUrl} target="_blank" rel="noopener noreferrer" className="spotify-follow-btn" data-reveal="fade-up" data-reveal-delay="300">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.84 14.32c-.17.28-.53.37-.81.2-2.3-1.4-5.2-1.7-8.61-.92-.32.07-.64-.13-.71-.45-.07-.32.13-.64.45-.71 3.73-.85 6.93-.5 9.48 1.06.27.17.37.52.2.82zm1.29-2.7c-.22.35-.68.46-1.02.24-2.63-1.62-6.63-2.09-9.73-1.15-.39.12-.8-.1-.92-.49-.12-.39.1-.8.49-.92 3.55-1.08 7.96-.56 10.94 1.28.34.21.46.67.24 1.04zm.11-2.76C14.73 8.7 8.92 8.5 5.58 9.52c-.51.15-1.05-.14-1.21-.65-.15-.51.14-1.05.65-1.21 3.84-1.16 10.26-.93 14.32 1.48.46.27.61.87.34 1.33-.27.46-.87.61-1.33.34z"/>
            </svg>
            {t.spotifyFollowBtn || 'Follow on Spotify'}
          </a>
        </div>
      </div>
    </section>
  );
}
