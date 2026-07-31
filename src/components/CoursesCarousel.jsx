import { useRef, useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';

export default function CoursesCarousel() {
  const { language, t } = useApp();
  const scrollRef = useRef(null);
  const videoRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  const isEs = language === 'es';

  const courses = [
    {
      id: 1,
      title: isEs ? 'Paquete de cursos' : 'Course Bundle',
      platform: 'CLAMA',
      platformColor: '#C9A227',
      rating: 5.0,
      reviews: 1480,
      duration: null,
      level: isEs ? 'Todos los niveles' : 'All levels',
      image: 'images/image1.png',
      link: 'https://www.clama.mx/offers/rLLoYagM/checkout',
      badge: isEs ? 'Bundle Especial' : 'Special Bundle'
    },
    {
      id: 2,
      title: isEs ? 'Destreza' : 'Dexterity',
      platform: 'CLAMA',
      platformColor: '#C9A227',
      rating: 4.9,
      reviews: 920,
      duration: isEs ? '30 días' : '30 days',
      level: isEs ? 'Todos los niveles' : 'All levels',
      image: 'images/image3.png',
      link: 'https://www.clama.mx/cursodestreza-jesusmolina',
      badge: 'Popular'
    },
    {
      id: 3,
      title: 'PIANO ESSENTIALS I',
      platform: 'CLAMA',
      platformColor: '#C9A227',
      rating: 4.9,
      reviews: 810,
      duration: isEs ? '20 días' : '20 days',
      level: isEs ? 'Intermedio - Avanzado' : 'Intermediate - Advanced',
      image: 'images/image1.png',
      link: 'https://www.clama.mx/curso-piano-essentials-I',
      badge: isEs ? 'Destacado' : 'Featured'
    },
    {
      id: 4,
      title: 'PIANO ESSENTIALS II',
      platform: 'CLAMA',
      platformColor: '#C9A227',
      rating: 5.0,
      reviews: 740,
      duration: isEs ? '37 días' : '37 days',
      level: isEs ? 'Intermedio - Avanzado' : 'Intermediate - Advanced',
      image: 'images/image3.png',
      link: 'https://www.clama.mx/piano-essentials-ii-con-jesus-molina',
      badge: isEs ? 'Avanzado' : 'Advanced'
    },
    {
      id: 5,
      title: 'Piano Pro',
      platform: 'CLAMA',
      platformColor: '#C9A227',
      rating: 4.8,
      reviews: 650,
      duration: isEs ? '20 días' : '20 days',
      level: isEs ? 'Intermedio' : 'Intermediate',
      image: 'images/image1.png',
      link: 'https://www.clama.mx/pianopro-jesusmolina',
      badge: null
    },
    {
      id: 6,
      title: isEs ? 'Cómo vivir de la música' : 'How to Make a Living from Music',
      platform: 'CLAMA',
      platformColor: '#C9A227',
      rating: 4.9,
      reviews: 1120,
      duration: isEs ? '25 días' : '25 days',
      level: isEs ? 'Todos los niveles' : 'All levels',
      image: 'images/image3.png',
      link: 'https://www.clama.mx/comovivirdelamusica-jesusmolina',
      badge: isEs ? 'Recommended' : 'Recommended'
    }
  ];

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.muted = false;
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const checkScrollLimits = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 5);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 5);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', checkScrollLimits);
      checkScrollLimits();
      window.addEventListener('resize', checkScrollLimits);
    }
    return () => {
      if (el) el.removeEventListener('scroll', checkScrollLimits);
      window.removeEventListener('resize', checkScrollLimits);
    };
  }, []);

  const scroll = (direction) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector('.course-card')?.clientWidth || 320;
    const scrollAmount = (cardWidth + 24) * 2;
    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <section className="courses-carousel-sec" id="cursos-disponibles">
      <div className="carousel-container">
        <div className="carousel-header">
          <div className="carousel-header-info">
            <span className="section-eyebrow" data-reveal>{t.coursesCarouselEyebrow || "— Clama Academy"}</span>
            <h2 className="section-title" data-reveal>CLAMA COURSES</h2>
            <p className="carousel-subtitle-text" data-reveal>
              {t.coursesCarouselSub || "Explora nuestra amplia variedad de cursos especializados diseñados para todos los niveles. Desde fundamentos del piano y técnica clásica hasta armonía avanzada, improvisación de jazz y composición creativa dentro de la plataforma CLAMA."}
            </p>
          </div>
        </div>

        {/* Video informativo de la plataforma / cursos */}
        <div className="courses-video-container" data-reveal onClick={togglePlay}>
          <video
            ref={videoRef}
            className="courses-intro-video"
            src={`${import.meta.env.BASE_URL}video/klamavideo.mp4`}
            playsInline
            preload="metadata"
            onEnded={() => setIsPlaying(false)}
          ></video>
          <button
            className={`courses-video-play-btn ${isPlaying ? 'is-playing' : ''}`}
            aria-label={isPlaying ? 'Pausar video' : 'Reproducir video'}
            onClick={(e) => {
              e.stopPropagation();
              togglePlay();
            }}
          >
            {isPlaying ? (
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5.14v13.72a1 1 0 0 0 1.5.86l11.04-6.86a1 1 0 0 0 0-1.72L9.5 4.28A1 1 0 0 0 8 5.14z" />
              </svg>
            )}
          </button>
          <div className="courses-video-badge">{t.clamaVideoBadge || "Discover the CLAMA platform"}</div>
        </div>

        {/* Barra de navegación de tarjetas de cursos (debajo del video) */}
        <div className="carousel-cards-header">
          <h3 className="carousel-cards-title">{t.coursesCatalogTitle || "Course Catalog"}</h3>
          <div className="carousel-controls">
            <button 
              className={`carousel-btn prev-btn ${!canScrollLeft ? 'disabled' : ''}`}
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              aria-label="Anterior"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button 
              className={`carousel-btn next-btn ${!canScrollRight ? 'disabled' : ''}`}
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              aria-label="Siguiente"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        <div className="carousel-track-wrapper" data-reveal>
          <div className="carousel-track" ref={scrollRef}>
            {courses.map((course) => (
              <div className="course-card" key={course.id}>
                {course.badge && <span className="course-card-badge">{course.badge}</span>}
                <div className="course-card-image">
                  <img src={`${import.meta.env.BASE_URL}${course.image}`} alt={course.title} />
                  <div className="course-card-platform" style={{ '--platform-color': course.platformColor }}>
                    {course.platform}
                  </div>
                </div>
                
                <div className="course-card-content">
                  <div className="course-card-meta">
                    <span className="course-level">{course.level}</span>
                    {course.duration && <span className="course-duration">{course.duration}</span>}
                  </div>
                  
                  <h3 className="course-card-title">{course.title}</h3>
                  
                  <div className="course-card-rating">
                    <div className="stars">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg 
                          key={i} 
                          width="14" 
                          height="14" 
                          viewBox="0 0 24 24" 
                          fill={i < Math.floor(course.rating) ? 'var(--bronce)' : 'none'}
                          stroke="var(--bronce)"
                          strokeWidth="1.5"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ))}
                    </div>
                    <span className="rating-value">{course.rating}</span>
                    <span className="reviews-count">({course.reviews})</span>
                  </div>
                  
                  <a href={course.link} target="_blank" rel="noopener noreferrer" className="course-card-link">
                    <span>{t.viewCourse || "View course"}</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
