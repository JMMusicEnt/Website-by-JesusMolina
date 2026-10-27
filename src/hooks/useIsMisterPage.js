import { useLocation } from 'react-router-dom';
import { IS_MISTER_SITE, isMisterPath } from '../data/sites';

/**
 * True on every MISTER MOLINA page: the whole mistermolinamusic.com domain, or the
 * '/mister-molina...' pages when both artists share one domain (GitHub Pages, workers.dev).
 */
export function useIsMisterPage() {
  const { pathname } = useLocation();
  return IS_MISTER_SITE || isMisterPath(pathname);
}
