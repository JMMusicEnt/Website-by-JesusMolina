import { useApp } from '../context/AppContext';

const CARD_IMAGES = {
  clama: `${import.meta.env.BASE_URL}images/klamaFoto.png`,
  pianote: `${import.meta.env.BASE_URL}images/pianoteFoto.png`,
};

function LearnPathArt({ imageUrl }) {
  return (
    <div className="learn-art" aria-hidden="true">
      <div
        className="learn-art__photo"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
    </div>
  );
}

function LearnPathCard({
  variant,
  badge,
  logoUrl,
  btnLabel,
  href,
  btnClass,
}) {
  return (
    <div className={`learn-path__glass learn-path--${variant}`}>
      <div className="learn-path__glass-content">
        <div className="learn-path__glass-brand">
          <img src={logoUrl} alt={`${variant} logo`} className="learn-path-logo" />
          <div className="learn-path__glass-text">
            <span className="learn-path-badge">{badge}</span>
          </div>
        </div>
      </div>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`learn-path-btn ${btnClass}`}
      >
        {btnLabel}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M7 17L17 7M17 7H7M17 7v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </div>
  );
}

export default function CoursesCarousel() {
  const { t } = useApp();

  return (
    <section className="learn-section" id="cursos-disponibles">
      <div className="learn-container">
        <div className="learn-header" data-reveal>
          <h2 className="section-title">{t.learnTitle || 'Learn'}</h2>
        </div>

        <div className="learn-composition" data-reveal>
          <div 
            className="learn-composition-bg" 
            style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/coursesPhoto.jpeg)` }} 
          />
          
          <div className="learn-paths-overlay">
            <LearnPathCard
              variant="clama"
              badge={t.learnClamaBadge || t.learnPrimaryBadge || 'English & Spanish'}
              logoUrl={`${import.meta.env.BASE_URL}images/Nett-Clama logo-blanco.png`}
              btnLabel={t.learnClamaBtn || 'Explore CLAMA'}
              href="https://www.clama.mx/cursos-jesusmolina"
              btnClass="learn-path-btn--clama"
            />

            <LearnPathCard
              variant="pianote"
              badge={t.learnPianoteBadge || t.learnSecondaryBadge || 'English & Spanish'}
              logoUrl={`${import.meta.env.BASE_URL}images/pianote-logo-white.png`}
              btnLabel={t.learnPianoteBtn || 'Explore Pianote'}
              href="https://www.pianote.com/jesusmolina/"
              btnClass="learn-path-btn--pianote"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
