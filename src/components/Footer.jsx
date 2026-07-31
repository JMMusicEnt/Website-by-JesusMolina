import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function Footer() {
  const { t } = useApp();

  const channels = [
    {
      label: 'Instagram',
      href: 'https://www.instagram.com/jesusmolinamusic?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      )
    },
    {
      label: 'YouTube',
      href: 'https://www.youtube.com/@Jesusmolinamusic',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path>
          <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
        </svg>
      )
    },
    {
      label: 'Spotify',
      href: 'https://open.spotify.com/artist/7Gl7yiOLDSRr1cZyPwpGv4',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M8 11.8c2.8-1 6.5-.8 9.2.5"></path>
          <path d="M9 15.5c2.1-.7 4.9-.5 7.1.3"></path>
          <path d="M7 8c3.5-1.5 8.2-1.2 12 1"></path>
        </svg>
      )
    },
    {
      label: 'Apple Music',
      href: 'https://music.apple.com/us/artist/jesus-molina/1463155327',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18V5l12-2v13"></path>
          <circle cx="6" cy="18" r="3"></circle>
          <circle cx="18" cy="16" r="3"></circle>
        </svg>
      )
    },
    {
      label: 'TikTok',
      href: 'https://www.tiktok.com/t/ZTkpSxHP7',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
        </svg>
      )
    },
    {
      label: 'Facebook',
      href: 'https://www.facebook.com/saxofonologo',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
        </svg>
      )
    },
    {
      label: 'SoundCloud',
      href: 'https://on.soundcloud.com/m22tPEah8lVmQLRFTe',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 13v3M5 10v6M8 8v8M11 6v10M14 8a4 4 0 0 1 4 4 3 3 0 0 1-3 3H14"></path>
        </svg>
      )
    }
  ];

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand-block">
          <div className="footer-brand">
            <span className="nav-logo-mark">JM</span>
            <span className="footer-brand-text">Jesús Molina</span>
          </div>
          <p className="footer-intro">{t.footerIntro}</p>
          <div className="footer-socials">
            {channels.map((channel) => (
              <a
                key={channel.label}
                href={channel.href}
                className="footer-social-pill"
                target="_blank"
                rel="noopener noreferrer"
              >
                {channel.icon}
                <span>{channel.label}</span>
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
        <span>{t.footerTagline}</span>
      </div>
    </footer>
  );
}
