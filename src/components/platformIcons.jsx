export function PlatformIcon({ id, size = 20, className = "" }) {
  switch (id) {
    case 'spotify':
      return (
        <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.84 14.32c-.17.28-.53.37-.81.2-2.3-1.4-5.2-1.7-8.61-.92-.32.07-.64-.13-.71-.45-.07-.32.13-.64.45-.71 3.73-.85 6.93-.5 9.48 1.06.27.17.37.52.2.82zm1.29-2.7c-.22.35-.68.46-1.02.24-2.63-1.62-6.63-2.09-9.73-1.15-.39.12-.8-.1-.92-.49-.12-.39.1-.8.49-.92 3.55-1.08 7.96-.56 10.94 1.28.34.21.46.67.24 1.04zm.11-2.76C14.73 8.7 8.92 8.5 5.58 9.52c-.51.15-1.05-.14-1.21-.65-.15-.51.14-1.05.65-1.21 3.84-1.16 10.26-.93 14.32 1.48.46.27.61.87.34 1.33-.27.46-.87.61-1.33.34z"/>
        </svg>
      );
    case 'apple':
      return (
        <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
          <path d="M16.32 12.06c-.03-2.5 2.05-3.72 2.14-3.78-1.17-1.71-2.98-1.94-3.6-1.97-1.53-.15-3.01.9-3.79.9-.78 0-1.99-.88-3.25-.86-1.61.02-3.1 .94-3.94 2.39-1.71 2.96-.44 7.34 1.22 9.74.82 1.18 1.78 2.5 3.03 2.45 1.22-.05 1.68-.79 3.16-.79 1.46 0 1.88.79 3.16.77 1.3-.02 2.12-1.18 2.93-2.36 1.01-1.46 1.42-2.88 1.44-2.96-.03-.02-2.46-.94-2.5-3.54zm-2.18-5.32c.67-.81 1.11-1.94.99-3.07-1 .04-2.17.67-2.86 1.48-.6.73-1.12 1.89-.98 3 1.1.08 2.19-.59 2.85-1.41z"/>
        </svg>
      );
    case 'amazon':
      return (
        <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
          <path d="M14.65 18.06c-1.32.91-3.32 1.32-4.99 1.32-3.21 0-6.19-1.17-8.32-3.29-.44-.44-.38-.96.06-1.29l.71-.53c.41-.31.85-.22 1.29.13 1.5 1.23 3.61 2.08 5.76 2.08 1.41 0 2.82-.29 3.88-.85.47-.23 1-.03 1.2.47l.41 1.06c.21.56.09 1.05-.41 1.4zM22.01 15.65c-.09.32-.41.44-.73.23l-3.23-2.11c-.26-.18-.23-.47.03-.67l2.85-2.29c.26-.2.59-.09.67.23l1.17 4.14c.09.29-.06.67-.32.74L22.01 15.65zm-9.37-3.91c-.06 1.76-1.35 2.5-2.91 2.5-1.5 0-2.47-.94-2.47-2.44 0-1.85 1.32-2.56 2.91-2.56 1.56 0 2.53.68 2.53 2.18.03.11-.06.32-.06.32zm-2.44-1.26c-.44 0-.82.29-.82.94 0 .62.29.94.73.94.47 0 .82-.29.82-.94 0-.59-.32-.94-.73-.94z"/>
        </svg>
      );
    case 'tidal':
      return (
        <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 8.441L8.358 4.8 4.717 8.441l3.642 3.641L12 8.441zm0 7.283l-3.642 3.641L12 23l3.642-3.641L12 15.724zm7.283-7.283L15.642 4.8 12 8.441l3.642 3.641L19.283 8.441z"/>
        </svg>
      );
    case 'youtube':
      return (
        <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-2 14.5v-9l8 4.5-8 4.5z"/>
        </svg>
      );
    case 'youtube-logo': // classic rounded-rectangle YouTube mark
      return (
        <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.07 0 12 0 12s0 3.93.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.81zM9.55 15.57V8.43L15.82 12l-6.27 3.57z"/>
        </svg>
      );
    case 'soundcloud':
    case 'soundcloud-logo': // cloud + bars, readable at small sizes
      return (
        <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
          <path d="M10.6 8.3a5.2 5.2 0 0 1 2.1-.45c2.62 0 4.78 1.98 5.02 4.55.32-.11.66-.17 1.02-.17A3.38 3.38 0 0 1 22.1 15.6a3.38 3.38 0 0 1-3.36 3.4H10.6V8.3z"/>
          <rect x="8.7" y="9.4" width="1.1" height="9.6" rx=".55"/>
          <rect x="6.8" y="10.8" width="1.1" height="8.2" rx=".55"/>
          <rect x="4.9" y="12" width="1.1" height="7" rx=".55"/>
          <rect x="3" y="13.4" width="1.1" height="5.6" rx=".55"/>
          <rect x="1.1" y="15" width="1.1" height="4" rx=".55"/>
        </svg>
      );
    case 'deezer':
      return (
        <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
          <path d="M5.89 19.34H1.27v-3.79h4.62v3.79zm5.95 0h-4.6v-3.79h4.6v3.79zm5.94 0h-4.6v-3.79h4.6v3.79zm5.95 0H19.1v-3.79h4.63v3.79zM11.84 14.1h-4.6v-3.78h4.6v3.78zm5.94 0h-4.6v-3.78h4.6v3.78zm5.95 0H19.1v-3.78h4.63v3.78zm0-5.26H19.1V5.06h4.63v3.78zm-5.95 0h-4.6V5.06h4.6v3.78z"/>
        </svg>
      );
    case 'audiomack':
      return (
        <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 7.77v8.46L12 22l10-5.77V7.77L12 2zm4.33 11.23h-8.66v-2.5h8.66v2.5z"/>
        </svg>
      );
    case 'itunes':
      return (
        <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm2.96 14.65c-1.4 0-2.54-1.04-2.54-2.31 0-1.28 1.14-2.31 2.54-2.31s2.54 1.04 2.54 2.31c0 1.28-1.14 2.31-2.54 2.31zm.41-6.14l-4.11 1.06v5.8c-1.4 0-2.54-1.04-2.54-2.31 0-1.28 1.14-2.31 2.54-2.31s2.54 1.04 2.54 2.31v-2.79l3.57-.92v-1.63z"/>
        </svg>
      );
    case 'instagram':
      return (
        <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
          <path d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4A5.8 5.8 0 0 1 16.2 22H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2zm0 2A3.8 3.8 0 0 0 4 7.8v8.4A3.8 3.8 0 0 0 7.8 20h8.4a3.8 3.8 0 0 0 3.8-3.8V7.8A3.8 3.8 0 0 0 16.2 4H7.8zm9.65 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"/>
        </svg>
      );
    case 'tiktok':
      return (
        <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
          <path d="M16.6 5.82s.51.5 0 0A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3a4.1 4.1 0 0 1-1-.48z"/>
        </svg>
      );
    case 'facebook':
      return (
        <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
          <path d="M13.5 22v-8.2h2.8l.42-3.3H13.5V8.9c0-.95.26-1.6 1.63-1.6h1.74V4.14c-.3-.04-1.33-.13-2.53-.13-2.5 0-4.21 1.53-4.21 4.33V10.5H7.5v3.3h2.63V22h3.37z"/>
        </svg>
      );
    default:
      return (
        <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2a10 10 0 100 20 10 10 0 000-20zM8 8l8 4-8 4V8z"/>
        </svg>
      );
  }
}
