import { useApp } from '../context/AppContext';

export default function CoursesCarousel() {
  const { t } = useApp();

  return (
    <section className="learn-section" id="cursos-disponibles">
      <div className="learn-container">
        {/* Section Header */}
        <div className="learn-header" data-reveal>
          <span className="section-eyebrow">— {t.learnEyebrow || 'Online Courses'}</span>
          <h2 className="section-title">{t.learnTitle || 'Learn'}</h2>
          <p className="learn-sub">
            {t.learnSub || 'Choose your learning path — whether you prefer Spanish or English instruction, there\'s a world-class platform waiting for you.'}
          </p>
        </div>

        {/* Two paths */}
        <div className="learn-paths" data-reveal>
          {/* CLAMA — Primary Spanish path */}
          <div className="learn-path learn-path--primary">
            <div className="learn-path-badge">{t.learnPrimaryBadge || 'En Español · Primary'}</div>
            <div className="learn-path-icon" aria-hidden="true">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="9" width="18" height="9" rx="1" stroke="currentColor" strokeWidth="1.2" />
                <path d="M7 9V6a5 5 0 0110 0v3" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            </div>
            <h3 className="learn-path-name">CLAMA</h3>
            <p className="learn-path-desc">
              {t.learnClamaDesc || 'Piano, composición y armonía en español. La plataforma educativa de Jesús Molina para estudiantes de habla hispana.'}
            </p>
            <a
              href="https://www.clama.mx/cursos-jesusmolina"
              target="_blank"
              rel="noopener noreferrer"
              className="learn-path-btn learn-path-btn--primary"
            >
              {t.learnClamaBtn || 'Explorar CLAMA'}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M7 17L17 7M17 7H7M17 7v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>

          {/* Pianote — English path */}
          <div className="learn-path learn-path--secondary">
            <div className="learn-path-badge">{t.learnSecondaryBadge || 'In English'}</div>
            <div className="learn-path-icon" aria-hidden="true">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                <path d="M9 18V5l12-2v13" stroke="currentColor" strokeWidth="1.2" />
                <circle cx="6" cy="18" r="3" stroke="currentColor" strokeWidth="1.2" />
                <circle cx="18" cy="16" r="3" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            </div>
            <h3 className="learn-path-name">Pianote</h3>
            <p className="learn-path-desc">
              {t.learnPianoteDesc || 'World-class piano lessons in English. Learn at your own pace with Jesús Molina on Pianote.'}
            </p>
            <a
              href="https://www.pianote.com/jesusmolina/"
              target="_blank"
              rel="noopener noreferrer"
              className="learn-path-btn learn-path-btn--secondary"
            >
              {t.learnPianoteBtn || 'Explore Pianote'}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M7 17L17 7M17 7H7M17 7v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
