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
            Jesus Molina
          </h1>
        </header>

        {/* Hero portrait + story */}
        <div className="bio-hero-grid">
          <div className="bio-portrait-wrap" data-reveal="slide-left">
            <div className="bio-portrait-frame">
              <img src={`${import.meta.env.BASE_URL}images/bioPhoto.jpeg`} alt="Jesus Molina" className="bio-portrait-img" />
              <div className="bio-portrait-accent" aria-hidden="true" />
              <div className="bio-portrait-accent-2" aria-hidden="true" />
            </div>
            <div className="bio-portrait-caption">
              <span className="bio-caption-label">{t.bioPortraitLabel}</span>
              <span className="bio-caption-value">Jesus Molina · Pianista</span>
            </div>
          </div>

          <div className="bio-story-text" data-reveal="slide-right">
            <p className="bio-lead">Jesus Molina is a Colombian pianist, composer, producer, vocalist, and multi-instrumentalist whose fearless musicianship has made him one of the most versatile artists of his generation — equally at home in jazz, Latin music, pop, and electronic production. With a global audience of over one million followers, Molina has built a career defined by technical brilliance, emotional depth, and a relentless drive to explore new musical territory.</p>
            <p>A graduate of Berklee College of Music and a recipient of the Latin Grammy Cultural Foundation Scholarship, Molina drew early inspiration from masters including Oscar Peterson, Chick Corea, Art Tatum, Bill Evans, and Erroll Garner, channeling that foundation into a rapidly expanding career.</p>
            <p>Molina's breakthrough came with 2020's Departing, his fifth album and a set that reimagined eight jazz standards alongside two original compositions. Praised by outlets including El País — which called him "the Colombian musician who triumphs alongside great artists" — Departing introduced Molina to a global jazz audience and established the technical command and emotional depth that would define his sound.</p>
            <p>That foundation deepened with 2024's Selah, produced by Blood, Sweat & Tears co-founder Bobby Colomby, which showcased Molina's original compositions alongside collaborations with Hubert Laws, Noel Schajris, and Lucia Micarelli — raising his profile further and cementing his reputation as one of contemporary jazz's most distinctive voices.</p>
            <p>"The piano is home for me — that's where everything I am comes from," Molina says. It's a foundation he's never left, even as his curiosity has pulled him toward new territory: composing at the guitar, building tracks layer by layer, letting a groove take shape the way a jazz solo does — by instinct, not formula. "People ask me if I'm abandoning my jazz roots," he says, "but the truth is I'm just turning the volume up."</p>
            <p>That instinct now has a name: MISTER MOLINA, the electronic alter ego Molina has built as a home base for this side of his artistry — a space to chase energy and production without asking his jazz work to make room for it.</p>
            <p>That vision debuted with "Chika I Funk," MISTER MOLINA's first single, a collaboration with Grammy-winning producer Julio Reyes Copello featuring Paola Guanche and Pablo Larrañaga — a record that blends live instrumentation, infectious groove, and modern electronic production, and points toward Molina's next chapter: music built to move as naturally through festival stages and streaming playlists as it does through concert halls.</p>
            <p>Beyond performing and recording, Molina has built a worldwide community of musicians through masterclasses, online education, and live clinics, extending his influence well past the stage. As his catalog continues to expand across genres and formats, Jesus Molina stands at the intersection of virtuosity and innovation — an artist committed to honoring musical tradition while pushing past its boundaries.</p>
          </div>
        </div>
      </div>

      <div className="bio-carousel-section">
        <div className="bio-marquee-wrapper">
          <div className="bio-marquee-track">
            {[...Array(4)].flatMap(() => [
              { src: 'image2.png', alt: 'Reves Productions 1', pos: 'center' },
              { src: 'image3.png', alt: 'Reves Productions 2', pos: 'center' },
              { src: 'pianoteFoto.png', alt: 'Reves Productions 3', pos: '85% center' },
              { src: 'biography-portrait.jpg', alt: 'Reves Productions 4', pos: 'center top' }
            ]).map((img, idx) => (
              <div key={idx} className="bio-carousel-item">
                <div className="bio-carousel-img-wrap">
                  <img 
                    src={`${import.meta.env.BASE_URL}images/${img.src}`} 
                    alt={img.alt} 
                    className="bio-carousel-img"
                    style={{ objectPosition: img.pos }}
                  />
                </div>
                <div className="bio-carousel-caption">
                  <span>Photo Credit: Carlos Montes</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
