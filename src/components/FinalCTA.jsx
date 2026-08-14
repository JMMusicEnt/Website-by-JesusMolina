import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useApp } from '../context/AppContext';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function FinalCTA() {
  const { t } = useApp();
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const [contactMethod, setContactMethod] = useState('email');

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
    // Preparado para integración futura con Cobrand
  };

  return (
    <section ref={containerRef} className="final-cta newsletter-layout" id="contacto">
      <div className="newsletter-container">
        <header className="newsletter-header" data-reveal>
          <h1 className="newsletter-title">{t.connectTitle || 'CONNECT'}</h1>
        </header>

        <div ref={cardRef} className="newsletter-card">
          <form className="newsletter-form" onSubmit={handleSignup}>
            
            <div className="newsletter-field">
              <label htmlFor="newsletter-input">
                {contactMethod === 'email' ? 'Email Address' : 'Phone Number'} <span className="required">(Required)</span>
              </label>

              <div className="newsletter-toggle-group">
                <button 
                  type="button" 
                  className={`newsletter-toggle-btn ${contactMethod === 'email' ? 'active' : ''}`}
                  onClick={() => setContactMethod('email')}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect>
                    <path d="M22 4l-10 8L2 4"></path>
                  </svg>
                </button>
                <button 
                  type="button"
                  className={`newsletter-toggle-btn ${contactMethod === 'phone' ? 'active' : ''}`}
                  onClick={() => setContactMethod('phone')}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="5" y="2" width="14" height="20" rx="4" ry="4"></rect>
                    <path d="M12 18h.01"></path>
                  </svg>
                </button>
              </div>

              {contactMethod === 'email' ? (
                <div className="newsletter-input-wrapper">
                  <input
                    type="email"
                    id="newsletter-input"
                    name="email"
                    placeholder="ramiro@gmail.com"
                    required
                  />
                </div>
              ) : (
                <div className="newsletter-phone-input-wrapper">
                  <div className="newsletter-country-code">
                    <span className="flag">🇨🇴</span>
                    <svg className="dropdown-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                    <span className="code">+57</span>
                  </div>
                  <input
                    type="tel"
                    id="newsletter-input"
                    name="phone"
                    required
                  />
                </div>
              )}
            </div>
            
            <button type="submit" className="newsletter-submit-btn">
              Sign Up
            </button>
            <p className="newsletter-disclaimer">
              By submitting my info, I consent to receive recurring automated marketing messages from Elderbrook. Msg & Data rates may apply. Msg frequency varies. Reply STOP to cancel, HELP for help. SMS will be sent by Elderbrook, via co:brand. See co:brand's Terms of Service and Privacy Policy.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
