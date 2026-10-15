import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useApp } from '../context/AppContext';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// title / backgroundImage are optional overrides (the MISTER MOLINA home shows BOOKING over a photo)
export default function FinalCTA({ title, backgroundImage } = {}) {
  const { t } = useApp();
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          { opacity: 0, y: 40, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleSignup = (e) => {
    e.preventDefault();
    if (!email) return;

    const subject = encodeURIComponent('Contact from jesusmolina.com');
    const body = encodeURIComponent(`Email: ${email}\n\nMessage:\n`);
    const mailtoLink = `mailto:Info@thecolombygroup.com?subject=${subject}&body=${body}`;

    window.location.href = mailtoLink;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section ref={containerRef} className="final-cta newsletter-layout" id="contacto">
      {backgroundImage && (
        <div
          className="section-bg-photo"
          style={{ backgroundImage: `url(${import.meta.env.BASE_URL}${backgroundImage})` }}
          aria-hidden="true"
        />
      )}
      <div className="newsletter-container">
        <header className="newsletter-header" data-reveal>
          <h1 className="newsletter-title">{title || t.connectTitle || 'CONNECT'}</h1>
        </header>

        <div ref={cardRef} className="newsletter-card">
          <form className="newsletter-form" onSubmit={handleSignup}>

            <div className="newsletter-field">
              <label htmlFor="newsletter-input">
                {t.connectSignupLabel || 'Email Address'} <span className="required">(Required)</span>
              </label>

              <div className="newsletter-input-wrapper">
                <input
                  type="email"
                  id="newsletter-input"
                  name="email"
                  placeholder={t.connectSignupPlaceholder || 'your@email.com'}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="newsletter-submit-btn">
              {submitted
                ? (t.connectSignupDone || "You're on the list!")
                : (t.connectSignupBtn || 'Sign Up')}
            </button>

          </form>
        </div>
      </div>
    </section>
  );
}
