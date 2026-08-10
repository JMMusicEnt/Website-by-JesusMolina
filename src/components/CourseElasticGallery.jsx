import { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function CourseElasticGallery() {
  const { language, t } = useApp();
  const isEs = language === 'es';

  const courses = [
    {
      id: '01',
      title: isEs ? 'Paquete de Cursos' : 'Course Bundle',
      category: isEs ? 'CLAMA • Bundle Especial' : 'CLAMA • Special Bundle',
      rating: 5.0,
      reviews: 1480,
      src: `${import.meta.env.BASE_URL}images/image1.png`,
      alt: 'Course Bundle',
      link: 'https://www.clama.mx/offers/rLLoYagM/checkout',
    },
    {
      id: '02',
      title: isEs ? 'Curso Destreza' : 'Dexterity',
      category: isEs ? 'CLAMA • 30 Días' : 'CLAMA • 30 Days',
      rating: 4.9,
      reviews: 920,
      src: `${import.meta.env.BASE_URL}images/image3.png`,
      alt: 'Dexterity Course',
      link: 'https://www.clama.mx/cursodestreza-jesusmolina',
    },
    {
      id: '03',
      title: 'Piano Essentials I',
      category: isEs ? 'CLAMA • Intermedio' : 'CLAMA • Intermediate',
      rating: 4.9,
      reviews: 810,
      src: `${import.meta.env.BASE_URL}images/image1.png`,
      alt: 'Piano Essentials I',
      link: 'https://www.clama.mx/curso-piano-essentials-I',
    },
    {
      id: '04',
      title: 'Piano Essentials II',
      category: isEs ? 'CLAMA • Avanzado' : 'CLAMA • Advanced',
      rating: 5.0,
      reviews: 740,
      src: `${import.meta.env.BASE_URL}images/image3.png`,
      alt: 'Piano Essentials II',
      link: 'https://www.clama.mx/piano-essentials-ii-con-jesus-molina',
    },
    {
      id: '05',
      title: 'Piano Pro',
      category: isEs ? 'CLAMA • Técnica' : 'CLAMA • Technique',
      rating: 4.8,
      reviews: 650,
      src: `${import.meta.env.BASE_URL}images/image1.png`,
      alt: 'Piano Pro',
      link: 'https://www.clama.mx/pianopro-jesusmolina',
    },
    {
      id: '06',
      title: isEs ? 'Vivir de la Música' : 'Living from Music',
      category: isEs ? 'CLAMA • Industria' : 'CLAMA • Industry',
      rating: 4.9,
      reviews: 1120,
      src: `${import.meta.env.BASE_URL}images/image3.png`,
      alt: 'Vivir de la música',
      link: 'https://www.clama.mx/comovivirdelamusica-jesusmolina',
    },
  ];

  const [activeId, setActiveId] = useState('02');

  return (
    <div className="ceg-wrapper">
      {/* Accordion Container */}
      <div className="ceg-container">
        {courses.map((item) => {
          const isActive = activeId === item.id;
          return (
            <div
              key={item.id}
              onMouseEnter={() => setActiveId(item.id)}
              onClick={() => setActiveId(item.id)}
              className={`ceg-item ${isActive ? 'ceg-item-active' : 'ceg-item-inactive'}`}
            >
              {/* Background Image Layer */}
              <div className="ceg-img-layer">
                <img
                  src={item.src}
                  alt={item.alt}
                  className={`ceg-img ${isActive ? 'ceg-img-active' : 'ceg-img-inactive'}`}
                />
                {/* Gradient Overlay */}
                <div className={`ceg-overlay ${isActive ? 'ceg-overlay-active' : ''}`} />
              </div>

              {/* Content Layer */}
              <div className="ceg-content">
                {/* Active Content: Category, Title, Rating & CTA */}
                <div className={`ceg-active-info ${isActive ? 'ceg-show' : 'ceg-hide'}`}>

                  {/* Title */}
                  <h3 className="ceg-card-title">{item.title}</h3>

                  {/* Rating Stars & Reviews */}
                  <div className="ceg-rating-row">
                    <div className="ceg-stars">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                          key={i}
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill={i < Math.floor(item.rating) ? '#38BDF8' : 'none'}
                          stroke="#38BDF8"
                          strokeWidth="1.5"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ))}
                    </div>
                    <span className="ceg-rating-val">{item.rating}</span>
                    <span className="ceg-reviews-val">({item.reviews})</span>
                  </div>

                  {/* Call to Action Button */}
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ceg-cta-btn"
                  >
                    <span>{isEs ? 'Ver Curso' : 'View Course'}</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                  </a>
                </div>

                {/* Inactive Content: Vertical Text Label */}
                <div className={`ceg-inactive-label ${isActive ? 'ceg-label-hide' : 'ceg-label-show'}`}>
                  <span className="ceg-vert-title">{item.title}</span>
                  <span className="ceg-mob-id">{item.id}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
