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
  name,
  btnLabel,
  href,
  btnClass,
}) {
  return (
    <article className={`learn-path learn-path--${variant}`}>
      <div className="learn-path__frame">
        <div className="learn-path__art">
          <LearnPathArt imageUrl={CARD_IMAGES[variant]} />
        </div>
      </div>
      <div className="learn-path__body">
        <div className="learn-path__glass">
          <div className="learn-path__glass-content">
            <div className="learn-path__glass-brand">
              <div className="learn-path-icon" aria-hidden="true">
                {variant === 'clama' ? (
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="9" width="18" height="9" rx="1" stroke="currentColor" strokeWidth="1.2" />
                    <path d="M7 9V6a5 5 0 0110 0v3" stroke="currentColor" strokeWidth="1.2" />
                  </svg>
                ) : (
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                    <path d="M9 18V5l12-2v13" stroke="currentColor" strokeWidth="1.2" />
                    <circle cx="6" cy="18" r="3" stroke="currentColor" strokeWidth="1.2" />
                    <circle cx="18" cy="16" r="3" stroke="currentColor" strokeWidth="1.2" />
                  </svg>
                )}
              </div>
              <div className="learn-path__glass-text">
                <h3 className="learn-path-name">{name}</h3>
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
      </div>
    </article>
  );
}

export default function CoursesCarousel() {
  const { t } = useApp();

  return (
    <section className="learn-section" id="cursos-disponibles">
      <div className="learn-container">
        <div className="learn-header" data-reveal>
          <span className="section-eyebrow">— {t.learnEyebrow || 'Online Courses'}</span>
          <h2 className="section-title">{t.learnTitle || 'Learn'}</h2>
          <p className="learn-sub">
            {t.learnSub || 'Two world-class platforms to master piano, composition, and harmony — available in English and Spanish.'}
          </p>
        </div>

        <div className="learn-paths" data-reveal>
          <LearnPathCard
            variant="clama"
            badge={t.learnClamaBadge || t.learnPrimaryBadge || 'English & Spanish'}
            name="CLAMA"
            btnLabel={t.learnClamaBtn || 'Explorar CLAMA'}
            href="https://www.clama.mx/cursos-jesusmolina"
            btnClass="learn-path-btn--clama"
          />

          <LearnPathCard
            variant="pianote"
            badge={t.learnPianoteBadge || t.learnSecondaryBadge || 'English & Spanish'}
            name="Pianote"
            btnLabel={t.learnPianoteBtn || 'Explore Pianote'}
            href="https://www.pianote.com/jesusmolina/"
            btnClass="learn-path-btn--pianote"
          />
        </div>
      </div>
    </section>
  );
}
