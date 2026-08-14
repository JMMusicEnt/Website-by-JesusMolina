import { useApp } from '../context/AppContext';
import { PLACEHOLDER_PORTRAIT } from '../data/collaborators';

export default function Biography() {
  const { t } = useApp();

  return (
    <section className="biography-page">
      <div className="bio-grain-overlay" aria-hidden="true" />
      <div className="bio-ambient-glow-1" aria-hidden="true" />
      <div className="bio-ambient-glow-2" aria-hidden="true" />

      <div className="bio-container">
        <header className="bio-header" data-reveal>
          
          <h1 className="section-title">
            Jesus Molina <em>{t.aboutLabel || 'About'}</em>
          </h1>
        </header>

        {/* Hero portrait + story */}
        <div className="bio-hero-grid">
          <div className="bio-portrait-wrap" data-reveal="slide-left">
            <div className="bio-portrait-frame">
              <img src={PLACEHOLDER_PORTRAIT} alt="Jesus Molina" className="bio-portrait-img" />
              <div className="bio-portrait-accent" aria-hidden="true" />
              <div className="bio-portrait-accent-2" aria-hidden="true" />
            </div>
            <div className="bio-portrait-caption">
              <span className="bio-caption-label">{t.bioPortraitLabel}</span>
              <span className="bio-caption-value">Jesus Molina · Pianista</span>
            </div>
          </div>

          <div className="bio-story-text" data-reveal="slide-right">
            <h2 className="bio-subtitle">{t.bioTitle1}</h2>
            <p className="bio-lead">{t.bioP1}</p>
            <p>{t.bioP2}</p>
            <p>{t.bioP3}</p>
            <p>{t.bioP4}</p>
            <p>{t.bioP5}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
