import { useEffect, useState } from 'react';
import { useLoader } from '../hooks/useLoader';

export default function Loader() {
  const { done, progress } = useLoader();
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
        {/* JM Logo only — no piano or music notes */}
        <div className="loader-logo-wrap">
          <img
            src={`${import.meta.env.BASE_URL}images/logo.png`}
            alt="JM Music logo"
            className="loader-logo-img"
          />
          <div className="loader-logo-name">JM MUSIC</div>
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
