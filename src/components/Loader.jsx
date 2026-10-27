import { useEffect, useState } from 'react';
import { useLoader } from '../hooks/useLoader';
import { useIsMisterPage } from '../hooks/useIsMisterPage';

export default function Loader() {
  const { done, progress } = useLoader();
  const isMister = useIsMisterPage();
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    if (!done) return;
    const t = setTimeout(() => setRemoved(true), 900);
    return () => clearTimeout(t);
  }, [done]);

  if (removed) return null;

  return (
    <div className={`loader${done ? ' done' : ''}`} id="loader">
      <div className="loader-scene">
        {/* Logo only — no piano or music notes. MISTER MOLINA shows its own wordmark */}
        <div className="loader-logo-wrap">
          {isMister ? (
            <img
              src={`${import.meta.env.BASE_URL}images/logomistermolina-web.png`}
              alt="MISTER MOLINA"
              className="loader-logo-img loader-logo-img--wordmark"
            />
          ) : (
            <img
              src={`${import.meta.env.BASE_URL}images/logo.png`}
              alt="JM Music logo"
              className="loader-logo-img"
            />
          )}
        </div>

        <div className="loader-info">
          <div className="loader-progress">
            <div className="loader-progress-track">
              <div className="loader-progress-fill" style={{ width: progress + '%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
