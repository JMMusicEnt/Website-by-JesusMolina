import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function Footer() {
  const { t } = useApp();

  const channels = [
    {
      id: 'instagram',
      label: 'Instagram',
      href: 'https://www.instagram.com/jesusmolinamusic?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
    },
    {
      id: 'youtube',
      label: 'YouTube',
      href: 'https://www.youtube.com/@Jesusmolinamusic',
      path: 'M35.5 19.4a2.8 2.8 0 0 0-1.9-2c-1.7-.5-8.6-.5-8.6-.5s-6.9 0-8.6.5a2.8 2.8 0 0 0-1.9 2A29 29 0 0 0 14 25a29 29 0 0 0 .5 5.6 2.8 2.8 0 0 0 1.9 2c1.7.4 8.6.4 8.6.4s6.9 0 8.6-.4a2.8 2.8 0 0 0 1.9-2 29 29 0 0 0 .5-5.6 29 29 0 0 0-.5-5.6zM22.7 28.5v-7l6.2 3.5-6.2 3.5z',
    },
    {
      id: 'spotify',
      label: 'Spotify',
      href: 'https://open.spotify.com/artist/7Gl7yiOLDSRr1cZyPwpGv4',
      path: 'M25 14a11 11 0 1 0 11 11A11 11 0 0 0 25 14zm5 15.8a.7.7 0 0 1-1 .2c-2.7-1.7-6.2-2.1-10.2-1.1a.7.7 0 0 1-.3-1.3c4.5-1 8.3-.6 11.3 1.3a.7.7 0 0 1 .2.9zm1.6-3a.9.9 0 0 1-1.2.3c-3.1-1.9-7.9-2.5-11.6-1.3a.9.9 0 0 1-.5-1.7c4.3-1.3 9.5-.7 13 1.5a.9.9 0 0 1 .3 1.2zm.1-3.3c-3.7-2.2-9.9-2.4-13.4-1.3a1 1 0 1 1-.6-2c4.2-1.3 10.9-1 15.2 1.6a1 1 0 0 1-1.2 1.7z',
    },
    {
      id: 'apple',
      label: 'Apple Music',
      href: 'https://music.apple.com/us/artist/jesus-molina/1463155327',
    },
    {
      id: 'tiktok',
      label: 'TikTok',
      href: 'https://www.tiktok.com/t/ZTkpSxHP7',
    },
    {
      id: 'facebook',
      label: 'Facebook',
      href: 'https://www.facebook.com/saxofonologo',
      path: 'M30 15h-3a4 4 0 0 0-4 4v3h-3v5h3v10h5V27h4l1-5h-5v-3a1 1 0 0 1 1-1h3z',
    },
    {
      id: 'soundcloud',
      label: 'SoundCloud',
      href: 'https://soundcloud.com/mistermolinamusic?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing',
    }
  ];

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand-block">
          <div className="footer-brand">
            <span className="nav-logo-mark">JM</span>
            <span className="footer-brand-text">Jesus Molina</span>
          </div>

          {/* Animated Social Icons */}
          <div className="footer-socials">
            {channels.map((channel) => (
              <a
                key={channel.label}
                href={channel.href}
                className={`social-link social-link--${channel.id}`}
                target="_blank"
                rel="noopener noreferrer"
                title={channel.label}
                aria-label={channel.label}
              >
                <svg className="social-svg" viewBox="0 0 50 50">
                  <g className="social-group">
                    <circle className="social-group__outline" cx="25" cy="25" r="23" />
                    <circle className="social-group__inner-circle" cx="25" cy="25" r="23" />
                    {channel.path && (
                      <path
                        className="social-group__icon"
                        d={channel.path}
                      />
                    )}
                    {channel.id === 'instagram' && (
                      <g className="social-group__icon">
                        <rect x="15" y="15" width="20" height="20" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
                        <circle cx="25" cy="25" r="4.5" fill="none" stroke="currentColor" strokeWidth="2" />
                        <circle cx="30.5" cy="19.5" r="1.2" fill="currentColor" />
                      </g>
                    )}
                    {channel.id === 'apple' && (
                      <g className="social-group__icon" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 31V17l10-2v13" />
                        <circle cx="18" cy="31" r="3" fill="currentColor" />
                        <circle cx="28" cy="28" r="3" fill="currentColor" />
                      </g>
                    )}
                    {channel.id === 'tiktok' && (
                      <g className="social-group__icon" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 27a4 4 0 1 0 4 4V16a5 5 0 0 0 5 5" />
                      </g>
                    )}
                    {channel.id === 'soundcloud' && (
                      <g className="social-group__icon" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <line x1="14" y1="24" x2="14" y2="28" />
                        <line x1="18" y1="21" x2="18" y2="29" />
                        <line x1="22" y1="18" x2="22" y2="30" />
                        <line x1="26" y1="16" x2="26" y2="30" />
                        <path d="M29 18a5 5 0 0 1 5 5 4 4 0 0 1-4 4H29" fill="none" />
                      </g>
                    )}
                  </g>
                </svg>
                <span className="social-link-name">{channel.label}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="footer-links">
          <div className="footer-column">
            <h3>{t.footerNav}</h3>
            <ul className="footer-link-list">
              {(t.footerNavLinks || []).map((link) => (
                <li key={link.href}>
                  <Link to={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-column">
            <h3>{t.footerExplore || 'Explorar'}</h3>
            <ul className="footer-link-list">
              {(t.footerExploreLinks || []).map((link) => (
                <li key={link.href}>
                  <Link to={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>{t.footerCopyright}</span>
      </div>
    </footer>
  );
}
