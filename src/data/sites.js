// Two sites served by the same app: Jesus Molina (main) and MISTER MOLINA (its own domain).
// On jesusmolina.org / mistermolinamusic.com (and their *.localhost twins for local testing)
// MISTER MOLINA lives at the root of its own domain; anywhere else (GitHub Pages, workers.dev)
// it stays at MISTER_MOLINA_PATH inside the single site.
import { MISTER_MOLINA_PATH } from './misterMolina';

export const JESUS_SITE_URL = 'https://jesusmolina.org';
export const MISTER_SITE_URL = 'https://mistermolinamusic.com';

const { protocol, hostname, port } = typeof window !== 'undefined'
  ? window.location
  : { protocol: 'https:', hostname: '', port: '' };

const isLocal = hostname === 'localhost' || hostname.endsWith('.localhost');
const portPart = port ? `:${port}` : '';

export const IS_MISTER_SITE = /^(www\.)?mistermolinamusic\.(com|localhost)$/.test(hostname);
export const SPLIT_DOMAINS = IS_MISTER_SITE || isLocal || /^(www\.)?jesusmolina\.org$/.test(hostname);

// Router basename: '/' on Cloudflare, '/Website-by-JesusMolina' on GitHub Pages and in `vite dev`
export const BASENAME = import.meta.env.BASE_URL.replace(/\/$/, '');

const JESUS_ORIGIN = isLocal ? `${protocol}//localhost${portPart}` : JESUS_SITE_URL;
const MISTER_ORIGIN = isLocal ? `${protocol}//mistermolinamusic.localhost${portPart}` : MISTER_SITE_URL;

/** True for '/mister-molina', '/mister-molina#x' and '/mister-molina/concerts'. */
export function isMisterPath(path) {
  return path.startsWith(MISTER_MOLINA_PATH) && /^([#/]|$)/.test(path.slice(MISTER_MOLINA_PATH.length));
}

/** '/mister-molina/concerts' -> '/concerts', '/mister-molina#x' -> '/#x' (path on the MISTER MOLINA domain). */
export function toMisterDomainPath(path) {
  const rest = path.slice(MISTER_MOLINA_PATH.length);
  return rest.startsWith('/') ? rest : `/${rest}`;
}

/**
 * Resolves an in-app path ('/concerts', '/mister-molina/biography', '/mister-molina#spotify'...) for the current domain.
 * Returns { to } for a router link on this site, or { href } for a full URL on the other site.
 */
export function resolveSitePath(path) {
  if (!SPLIT_DOMAINS) return { to: path };

  if (isMisterPath(path)) {
    const misterPath = toMisterDomainPath(path);
    return IS_MISTER_SITE ? { to: misterPath } : { href: `${MISTER_ORIGIN}${BASENAME}${misterPath}` };
  }
  return IS_MISTER_SITE ? { href: `${JESUS_ORIGIN}${BASENAME}${path}` } : { to: path };
}

