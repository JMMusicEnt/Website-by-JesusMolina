// MISTER MOLINA (Jesus Molina's electronic alter ego) — shared by its pages, the nav and the footer

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

// Platforms menu (PlatformsModal): same links as the socials, listening platforms first
export const MISTER_MOLINA_PLATFORMS = ['spotify', 'youtube', 'soundcloud', 'instagram', 'tiktok', 'facebook']
  .map((id) => MISTER_MOLINA_SOCIALS.find((social) => social.id === id))
  .map((social) => ({ platformName: social.label, iconId: social.id, url: social.href, isDownload: false }));

// MISTER MOLINA's own pages (Home, Tour, About, Contact). In-app paths live under
// MISTER_MOLINA_PATH; on mistermolinamusic.com they are served at the root ('/concerts'...)
export const MISTER_MOLINA_PAGES = [
  { path: MISTER_MOLINA_PATH, label: 'Home', labelKey: 'home' },
  { path: `${MISTER_MOLINA_PATH}/concerts`, label: 'Tour', labelKey: 'tourNav' },
  { path: `${MISTER_MOLINA_PATH}/biography`, label: 'About', labelKey: 'aboutNav' },
  { path: `${MISTER_MOLINA_PATH}/contact`, label: 'Contact' },
];

export const MISTER_MOLINA_BIO = [
  'MISTER MOLINA is the electronic alter ego of Jesus Molina, the internationally acclaimed Colombian pianist, producer, vocalist, and multi-instrumentalist with a global following of over one million. It’s where that musicianship gets loud. His new single, “Higher Than Heaven,” featuring Grace Kinstler, is a peak-hour house track built for the dance floor. Kinstler’s vocal soars over a driving groove, while producers Lenno and Bobby Colomby helped sharpen the production into something massive without losing its warmth. Live musicianship sits at the center, and it’s made to hold up in a room full of people.',
  'Molina’s process starts with a feeling, not a plan. “I become a passenger and stay out of the way of inspiration,” he says. He chases melodies at the piano or guitar, then builds each record layer by layer with Maschine, Serum, and his Nord keyboards before testing it on the CDJs, because the music isn’t finished until it’s been played where it’s meant to live. The sound draws on house, funk, disco, and Latin rhythm, filtered through jazz-trained harmonic instincts. Even at full volume, the influence of Take 6, Chick Corea, and Bill Evans runs beneath the groove.',
  'The project debuted with “Chika I Funk,” made with longtime mentor and manager Bobby Colomby and Grammy-winning producer Julio Reyes Copello.',
  '“No matter how big the sound gets, the music always comes first,” Molina says. “This is my sound, this is my world. And this is just the beginning.”',
];

// About page photo carousel (stills from MISTER MOLINA's videos); `pos` is the crop focus
export const MISTER_MOLINA_GALLERY = [
  { src: 'mistermolinaphoto.jpeg', alt: 'MISTER MOLINA live at the keys', pos: '52% center', credit: 'Carlos Montes' },
  { src: 'videoposterhomepageMISTER.jpg', alt: 'MISTER MOLINA on the subway', pos: '65% center', credit: 'Carlos Montes' },
  { src: 'mrmolinavideoposter-web.jpg', alt: 'MISTER MOLINA behind the decks', pos: '45% center', credit: 'Carlos Montes' },
];

// Footer "Explore" column on the MISTER MOLINA site: its own home sections
export const MISTER_MOLINA_EXPLORE_LINKS = [
  { href: `${MISTER_MOLINA_PATH}#destacados`, label: 'Watch' },
  { href: `${MISTER_MOLINA_PATH}#spotify`, label: 'Listen' },
  { href: `${MISTER_MOLINA_PATH}#contacto`, label: 'Booking' },
];
