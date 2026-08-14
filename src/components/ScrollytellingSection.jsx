import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useApp } from '../context/AppContext';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollytellingSection() {
  const { language } = useApp();

  const wrapperRef = useRef(null);
  const pinnedRef = useRef(null);
  const maskLayerRef = useRef(null);
  const bgImage1Ref = useRef(null);
  const bgImage2Ref = useRef(null);
  const words1Ref = useRef([]);
  const words2Ref = useRef([]);

  const isEs = language === 'es';

  // Quotes for Large Kinetic Typography (60px - 120px)
  const quote1 = isEs
    ? 'LA MÚSICA ES LA ENERGÍA QUE TRANSFORMA CADA VIBRACIÓN'
    : 'MUSIC IS THE ENERGY THAT TRANSFORMS EVERY VIBRATION';

  const quote2 = isEs
    ? 'EL VIRTUOSISMO NO ES TÉCNICA, ES PASIÓN REVELADA EN CADA NOTA'
    : 'VIRTUOSITY IS NOT TECHNIQUE, IT IS PASSION REVEALED IN EVERY NOTE';

  const words1 = quote1.split(' ');
  const words2 = quote2.split(' ');

  useEffect(() => {
    // Ensure GSAP context cleanup to prevent duplicate triggers on hot reload / re-renders
    const ctx = gsap.context(() => {
      // Master Pinned ScrollTrigger Timeline (scrub: 1 for smooth scroll link)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top top',
          end: 'bottom bottom',
          pin: pinnedRef.current,
          pinSpacing: true,
          scrub: 1, // 100% linked to scroll progress
          invalidateOnRefresh: true,
        },
      });

      // -------------------------------------------------------------
      // SCENE 1: Initial Kinetic Typography & Background Reveal
      // -------------------------------------------------------------
      gsap.set(pinnedRef.current, { backgroundColor: '#090812' });
      gsap.set(maskLayerRef.current, {
        clipPath: 'circle(0% at 50% 50%)', // Technique 2: Mask transition starts at 0%
      });
      gsap.set(bgImage1Ref.current, {
        scale: 1.25,
        yPercent: -10,
        clipPath: 'inset(100% 0% 0% 0%)', // Technique 3: Image reveal bottom-up
      });
      gsap.set(bgImage2Ref.current, {
        scale: 1.2,
        yPercent: 10,
      });

      // Stage 1 Entrance: Parallax image reveal + kinetic text line-by-line
      tl.to(
        bgImage1Ref.current,
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          scale: 1.05,
          yPercent: 5,
          duration: 1.5,
          ease: 'power2.out',
        },
        0
      ).fromTo(
        words1Ref.current,
        {
          opacity: 0,
          y: 80,
          rotateX: -50,
          filter: 'blur(12px)',
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          filter: 'blur(0px)',
          stagger: 0.12,
          duration: 1.5,
          ease: 'power3.out',
        },
        0.2
      );

      // Hold Scene 1 briefly during scroll progress
      tl.to({}, { duration: 1 });

      // Exit Scene 1 text
      tl.to(
        words1Ref.current,
        {
          opacity: 0,
          y: -80,
          rotateX: 45,
          filter: 'blur(10px)',
          stagger: 0.05,
          duration: 1,
          ease: 'power2.in',
        },
        'transitionStart'
      );

      // -------------------------------------------------------------
      // SCENE 2: CLIP-PATH SHAPE WIPE (Technique 2 & 5)
      // Circle shape expands to reveal Stage 2 + Background Color Morph
      // -------------------------------------------------------------
      tl.to(
        maskLayerRef.current,
        {
          clipPath: 'circle(145% at 50% 50%)', // Shape curtain expands over viewport
          duration: 2.5,
          ease: 'power2.inOut',
        },
        'transitionStart'
      )
        // Technique 5: Smooth background color change
        .to(
          pinnedRef.current,
          {
            backgroundColor: '#04161a',
            duration: 2.5,
            ease: 'power2.inOut',
          },
          'transitionStart'
        )
        // Technique 3: Parallax scrub on Stage 2 image
        .to(
          bgImage2Ref.current,
          {
            scale: 1.0,
            yPercent: -8,
            duration: 2.5,
            ease: 'none',
          },
          'transitionStart'
        );

      // -------------------------------------------------------------
      // SCENE 2 KINETIC TYPOGRAPHY ENTRANCE (Technique 4)
      // -------------------------------------------------------------
      tl.fromTo(
        words2Ref.current,
        {
          opacity: 0,
          y: 90,
          rotateX: -60,
          scale: 0.9,
          filter: 'blur(16px)',
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          filter: 'blur(0px)',
          stagger: 0.14,
          duration: 1.8,
          ease: 'power3.out',
        },
        '+=0.3'
      );

      // Final Parallax floating shift linked to remaining scroll
      tl.to(
        bgImage2Ref.current,
        {
          yPercent: -18,
          scale: 1.08,
          duration: 1.5,
        },
        '+=0.2'
      );
    }, wrapperRef);

    return () => ctx.revert();
  }, [language]);

  return (
    <section
      ref={wrapperRef}
      className="scrollytelling-wrapper"
      id="scrollytelling"
      aria-label="Experiencia de Scrollytelling - Jesus Molina"
    >
      {/* Pinned Viewport Container (Technique 1) */}
      <div ref={pinnedRef} className="scrollytelling-pinned">
        {/* Ambient Noise / Grain overlay */}
        <div className="scrolly-noise-overlay" aria-hidden="true" />

        {/* ---------------- SCENE 1 LAYER ---------------- */}
        <div className="scrolly-scene scene-1">
          {/* Background Full-Bleed Image with Parallax & Reveal (Technique 3) */}
          <div className="scrolly-bg-wrap">
            <img
              ref={bgImage1Ref}
              src={`${import.meta.env.BASE_URL}images/concert-hero.png`}
              alt="Jesus Molina en Vivo"
              className="scrolly-bg-img"
            />
            <div className="scrolly-vignette" />
          </div>

          {/* Foreground Kinetic Typography Content (Technique 4) */}
          <div className="scrolly-content-box">
            <h2 className="scrolly-kinetic-title">
              {words1.map((word, idx) => (
                <span
                  key={idx}
                  ref={(el) => (words1Ref.current[idx] = el)}
                  className="scrolly-word"
                >
                  {word}&nbsp;
                </span>
              ))}
            </h2>
          </div>
        </div>

        {/* ---------------- SCENE 2 MASK REVEAL LAYER (Technique 2) ---------------- */}
        <div ref={maskLayerRef} className="scrolly-scene scene-2-mask">
          {/* Background Full-Bleed Image Stage 2 */}
          <div className="scrolly-bg-wrap">
            <img
              ref={bgImage2Ref}
              src={`${import.meta.env.BASE_URL}images/image1.png`}
              alt="Jesus Molina Virtuosismo"
              className="scrolly-bg-img"
            />
            <div className="scrolly-vignette vignette-emerald" />
          </div>

          {/* Foreground Kinetic Typography Content Stage 2 (Technique 4) */}
          <div className="scrolly-content-box">
            <h2 className="scrolly-kinetic-title title-gold">
              {words2.map((word, idx) => (
                <span
                  key={idx}
                  ref={(el) => (words2Ref.current[idx] = el)}
                  className="scrolly-word"
                >
                  {word}&nbsp;
                </span>
              ))}
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}
