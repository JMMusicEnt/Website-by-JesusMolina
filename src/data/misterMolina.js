// MISTER MOLINA (Jesus Molina's electronic alter ego) — shared by its home page and the footer

export const MISTER_MOLINA_PATH = '/mister-molina';

export const MISTER_MOLINA_SPOTIFY_ID = '6teIt9cbhgw6voaoJRGLPy';
export const MISTER_MOLINA_SPOTIFY_URL = 'https://open.spotify.com/intl-es/artist/6teIt9cbhgw6voaoJRGLPy?si=nohfOxNPQAm4AOUszPExuQ';

// `icon` overrides the PlatformIcon id used by the hero rail (clearer marks at small sizes)
export const MISTER_MOLINA_SOCIALS = [
  { id: 'spotify', label: 'Spotify', href: MISTER_MOLINA_SPOTIFY_URL },
  { id: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/mistermolinamusic' },
  { id: 'youtube', icon: 'youtube-logo', label: 'YouTube', href: 'https://www.youtube.com/@MISTERMOLINAMUSIC' },
  { id: 'tiktok', label: 'TikTok', href: 'https://www.tiktok.com/@mistermolinamusic' },
  { id: 'soundcloud', icon: 'soundcloud-logo', label: 'SoundCloud', href: 'https://soundcloud.com/mistermolinamusic' },
  { id: 'facebook', label: 'Facebook', href: 'https://www.facebook.com/Mistermolinamusic1' },
];

// Footer "Explore" column on the MISTER MOLINA page: its own sections
export const MISTER_MOLINA_EXPLORE_LINKS = [
  { href: `${MISTER_MOLINA_PATH}#destacados`, label: 'Watch' },
  { href: `${MISTER_MOLINA_PATH}#spotify`, label: 'Listen' },
  { href: `${MISTER_MOLINA_PATH}#contacto`, label: 'Booking' },
];
