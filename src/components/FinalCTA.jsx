import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { useApp } from '../context/AppContext';

// Configuración de EmailJS — Reemplaza con tus claves de EmailJS:
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';

export default function FinalCTA() {
  const { t } = useApp();
  const [formState, setFormState] = useState('idle'); // idle | sending | sent
  const [focusedField, setFocusedField] = useState(null);
  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormState('sending');

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      );
      setFormState('sent');
      formRef.current.reset();
      setTimeout(() => setFormState('idle'), 4000);
    } catch (error) {
      console.error('EmailJS Error:', error);
      setFormState('idle');
      alert('Hubo un error al enviar el mensaje. Asegúrate de configurar tus claves de EmailJS.');
    }
  };

  return (
    <section className="final-cta" id="contacto">
      {/* Animated background elements */}
      <div className="contact-bg-elements" aria-hidden="true">
        <div className="contact-glow contact-glow-1"></div>
        <div className="contact-glow contact-glow-2"></div>
        <div className="contact-float-notes">
          <span className="contact-note contact-note-1">♪</span>
          <span className="contact-note contact-note-2">♫</span>
          <span className="contact-note contact-note-3">♩</span>
          <span className="contact-note contact-note-4">♬</span>
          <span className="contact-note contact-note-5">♪</span>
        </div>
        {/* Staff lines */}
        <svg className="contact-staff-svg" viewBox="0 0 1600 160" preserveAspectRatio="none">
          <line x1="0" y1="20" x2="1600" y2="20"></line>
          <line x1="0" y1="55" x2="1600" y2="55"></line>
          <line x1="0" y1="90" x2="1600" y2="90"></line>
          <line x1="0" y1="125" x2="1600" y2="125"></line>
          <line x1="0" y1="160" x2="1600" y2="160"></line>
        </svg>
      </div>

      <div className="contact-container">
        {/* Left side — Text & info */}
        <div className="contact-info" data-reveal>
          <div className="section-eyebrow section-eyebrow-light">{t.ctaEyebrow}</div>
          <h2 className="contact-title">{t.ctaTitle}</h2>
          <p className="contact-desc">{t.ctaSub}</p>

          <div className="contact-details">
            <div className="contact-detail-item">
              <div className="contact-detail-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                  <path d="M22 4L12 13L2 4"></path>
                </svg>
              </div>
              <span>Info@thecolombygroup.com</span>
            </div>
            <div className="contact-detail-item">
              <div className="contact-detail-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1 4-10z"></path>
                </svg>
              </div>
              <span>{t.ctaWorldwide || 'Worldwide'}</span>
            </div>
          </div>
        </div>

        {/* Right side — Contact form */}
        <div className="contact-form-wrapper" data-reveal>
          <form
            ref={formRef}
            className={`contact-form ${focusedField ? 'contact-form-active' : ''}`}
            onSubmit={handleSubmit}
          >
            <div className="contact-form-grid">
              <div className={`contact-field ${focusedField === 'name' ? 'contact-field-focus' : ''}`}>
                <label htmlFor="contact-name">{t.ctaLabelName || 'Name'}</label>
                <input
                  type="text"
                  id="contact-name"
                  name="user_name"
                  required
                  placeholder={t.ctaPlaceholderName || 'Your name'}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                />
              </div>
              <div className={`contact-field ${focusedField === 'email' ? 'contact-field-focus' : ''}`}>
                <label htmlFor="contact-email">{t.ctaLabelEmail || 'Email'}</label>
                <input
                  type="email"
                  id="contact-email"
                  name="user_email"
                  required
                  placeholder={t.ctaPlaceholderEmail || 'your@email.com'}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                />
              </div>
            </div>

            <div className={`contact-field ${focusedField === 'subject' ? 'contact-field-focus' : ''}`}>
              <label htmlFor="contact-subject">{t.ctaLabelSubject || 'Subject'}</label>
              <input
                type="text"
                id="contact-subject"
                name="subject"
                required
                placeholder={t.ctaPlaceholderSubject || 'What is this about?'}
                onFocus={() => setFocusedField('subject')}
                onBlur={() => setFocusedField(null)}
              />
            </div>

            <div className={`contact-field ${focusedField === 'message' ? 'contact-field-focus' : ''}`}>
              <label htmlFor="contact-message">{t.ctaLabelMessage || 'Message'}</label>
              <textarea
                id="contact-message"
                name="message"
                rows="5"
                required
                placeholder={t.ctaPlaceholderMessage || 'Tell me what you have in mind...'}
                onFocus={() => setFocusedField('message')}
                onBlur={() => setFocusedField(null)}
              ></textarea>
            </div>

            <button
              type="submit"
              className={`contact-submit ${formState !== 'idle' ? `contact-submit-${formState}` : ''}`}
              disabled={formState !== 'idle'}
            >
              <span className="contact-submit-content">
                {formState === 'idle' && (
                  <>
                    <span>{t.ctaBtn}</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 2L11 13"></path>
                      <path d="M22 2L15 22L11 13L2 9L22 2Z"></path>
                    </svg>
                  </>
                )}
                {formState === 'sending' && (
                  <span className="contact-spinner"></span>
                )}
                {formState === 'sent' && (
                  <>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17L4 12"></path>
                    </svg>
                    <span>{t.ctaSent || 'Sent!'}</span>
                  </>
                )}
              </span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
