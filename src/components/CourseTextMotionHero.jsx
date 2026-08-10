import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useApp } from '../context/AppContext';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CourseTextMotionHero() {
  const { language, t } = useApp();
  const isEs = language === 'es';
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const videoCardRef = useRef(null);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Clama Header reveal transition
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 50, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 86%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // 2. Clama Video Card reveal transition
      if (videoCardRef.current) {
        gsap.fromTo(
          videoCardRef.current,
          { opacity: 0, y: 60, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: videoCardRef.current,
              start: 'top 84%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div ref={containerRef} className="clama-hero-container">
      {/* Header section */}
      <div ref={headerRef} className="clama-hero-header">
        <span className="clama-eyebrow">
          — {isEs ? 'CLAMA ACADEMY' : 'CLAMA ACADEMY'}
        </span>
        <h2 className="clama-main-title">
          {t.coursesCarouselTitle || 'CLAMA COURSES'}
        </h2>
        <p className="clama-description">
          {t.coursesCarouselSub ||
            'Explore our wide variety of specialized courses designed for all levels. From piano fundamentals and classical technique to advanced harmony, jazz improvisation, and creative composition within the CLAMA platform.'}
        </p>
      </div>

      {/* Video Player Box */}
      <div ref={videoCardRef} className="clama-video-card">
        <iframe
          className="clama-video-element"
          src="https://www.youtube.com/embed/R4gCwrcOUjI"
          title="CLAMA Courses"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ width: '100%', height: '100%', border: 'none', borderRadius: '16px', minHeight: '320px' }}
        ></iframe>
      </div>
    </div>
  );
}
