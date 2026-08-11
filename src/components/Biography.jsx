import { useApp } from '../context/AppContext';
import { PLACEHOLDER_PORTRAIT } from '../data/collaborators';

const INSTRUMENTS = [
  { id: 1, name: 'Steinway & Sons D-274', type: 'Piano de Cola Acústico', desc: 'El piano insignia del concertista clásico y del jazz moderno.', specs: '88 teclas · Madera de abeto · 2.74 m' },
  { id: 2, name: 'Nord Stage 4', type: 'Teclado de Escenario', desc: 'Central de síntesis y pianos eléctricos para giras mundiales.', specs: 'Teclas triple sensor · Motor Wave 2' },
  { id: 3, name: 'Moog Subsequent 37', type: 'Sintetizador Analógico', desc: 'Líneas de bajo analógicas y solos expresivos con calidez inconfundible.', specs: 'Monofónico/Duo · 37 teclas' },
];

export default function Biography() {
  const { t } = useApp();

  return (
    <section className="biography-page">
      <div className="bio-grain-overlay" aria-hidden="true" />
      <div className="bio-ambient-glow-1" aria-hidden="true" />
      <div className="bio-ambient-glow-2" aria-hidden="true" />

      <div className="bio-container">
        <header className="bio-header" data-reveal>
          <span className="section-eyebrow">{t.aboutEyebrow || t.bioEyebrow2}</span>
          <h1 className="section-title">
            Jesús Molina <em>{t.aboutLabel || 'About'}</em>
          </h1>
        </header>

        {/* Hero portrait + story */}
        <div className="bio-hero-grid">
          <div className="bio-portrait-wrap" data-reveal="slide-left">
            <div className="bio-portrait-frame">
              <img src={PLACEHOLDER_PORTRAIT} alt="Jesús Molina" className="bio-portrait-img" />
              <div className="bio-portrait-accent" aria-hidden="true" />
              <div className="bio-portrait-accent-2" aria-hidden="true" />
            </div>
            <div className="bio-portrait-caption">
              <span className="bio-caption-label">{t.bioPortraitLabel}</span>
              <span className="bio-caption-value">Jesús Molina · Pianista</span>
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

        {/* Instruments */}
        <div className="bio-instruments-section" data-reveal>
          <div className="section-header-compact">
            <div className="section-header-left">
              <h3 className="section-subtitle-editorial">{t.bioInstrumentsTitle}</h3>
              <p className="section-desc-editorial">{t.bioInstrumentsDesc}</p>
            </div>
          </div>

          <div className="instruments-list">
            {INSTRUMENTS.map((inst, index) => (
              <div className="instrument-row" data-reveal data-reveal-delay={index * 90} key={inst.id}>
                <div className="instrument-num"><span>0{index + 1}</span></div>
                <div className="instrument-details">
                  <span className="instrument-type">{inst.type}</span>
                  <h4 className="instrument-name">{inst.name}</h4>
                  <p className="instrument-desc">{inst.desc}</p>
                </div>
                <div className="instrument-specs">
                  <span className="specs-label">{t.bioSpecsLabel}</span>
                  <span className="specs-value">{inst.specs}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
