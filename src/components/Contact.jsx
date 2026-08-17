import { useState } from 'react';
import { useApp } from '../context/AppContext';

const SUBJECT_OPTIONS = [
  { value: 'hiring', labelKey: 'contactFormOptionHiring', icon: 'mic', color: 'hsl(38, 72%, 52%)' },
  { value: 'masterclass', labelKey: 'contactFormOptionMasterclass', icon: 'school', color: 'hsl(280, 55%, 55%)' },
  { value: 'lessons', labelKey: 'contactFormOptionLessons', icon: 'piano', color: 'hsl(200, 65%, 50%)' },
  { value: 'other', labelKey: 'contactFormOptionOther', icon: 'chat', color: 'hsl(150, 45%, 45%)' },
];

function SubjectIcon({ type, isSelected }) {
  const baseClass = `subject-icon-svg ${isSelected ? 'selected' : ''}`;

  if (type === 'mic') {
    return (
      <svg className={baseClass} width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" stroke="currentColor" strokeWidth="1.6" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v3M8 22h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }
  if (type === 'school') {
    return (
      <svg className={baseClass} width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M22 10L12 5 2 10l10 5 10-5z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M6 12v5c0 1 3 3 6 3s6-2 6-3v-5" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    );
  }
  if (type === 'piano') {
    return (
      <svg className={baseClass} width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M7 6v12M10 6v12M14 6v12M17 6v12" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    );
  }
  return (
    <svg className={baseClass} width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Contact() {
  const { t } = useApp();
  const [form, setForm] = useState({ name: '', email: '', subject: 'hiring', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    let subjectText = "Hiring";
    if (form.subject === 'masterclass') subjectText = "Masterclass";
    else if (form.subject === 'lessons') subjectText = "Lessons";
    else if (form.subject === 'other') subjectText = "Other";

    const mailtoLink = `mailto:Info@thecolombygroup.com?subject=${encodeURIComponent(`[${subjectText}] Contact from ${form.name}`)}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`)}`;
    
    window.location.href = mailtoLink;

    setSuccess(true);
    setForm({ name: '', email: '', subject: 'hiring', message: '' });
  };

  const handleInputChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <section className="contact-page">
      <div className="contact-glow-orb-1" aria-hidden="true" />
      <div className="contact-glow-orb-2" aria-hidden="true" />

      <div className="contact-container">


        <div className="contact-grid">
          <div className="contact-info-cards" data-reveal="slide-left">
            <div className="contact-directory-card">
              <div className="directory-header">
                <h3 className="directory-title">Management & Booking</h3>
              </div>

              {/* Management Section */}
              <div className="directory-section">
                <div className="directory-section-header">
                  <div className="directory-icon-wrap">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.8" />
                    </svg>
                  </div>
                  <div>
                    <span className="directory-category">Management</span>
                    <h4 className="directory-company">The Colomby Group</h4>
                  </div>
                </div>

                <div className="directory-details">
                  <div className="directory-row">
                    <span className="directory-row-label">Contact</span>
                    <span className="directory-row-val">Bobby Colomby or Archie Castillo</span>
                  </div>

                  <div className="directory-row">
                    <span className="directory-row-label">Address</span>
                    <span className="directory-row-val">
                      4115 Glencoe Avenue, Unit 114<br />
                      Marina Del Rey, CA 90292
                    </span>
                  </div>

                  <div className="directory-row">
                    <span className="directory-row-label">Phone</span>
                    <a href="tel:3103998881" className="directory-link">
                      <span>(310) 399-8881</span>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                        <path d="M7 17L17 7M17 7H7M17 7v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  </div>

                  <div className="directory-row">
                    <span className="directory-row-label">Email</span>
                    <a href="mailto:Info@thecolombygroup.com" className="directory-link">
                      <span>Info@thecolombygroup.com</span>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                        <path d="M7 17L17 7M17 7H7M17 7v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              <div className="directory-divider" />

              {/* Booking Section */}
              <div className="directory-section">
                <div className="directory-section-header">
                  <div className="directory-icon-wrap">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="currentColor" strokeWidth="1.8" />
                      <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.8" />
                    </svg>
                  </div>
                  <div>
                    <span className="directory-category">North American Booking</span>
                    <h4 className="directory-company">Mint Talent Group</h4>
                  </div>
                </div>

                <div className="directory-details">
                  <div className="directory-row">
                    <span className="directory-row-label">Agent</span>
                    <span className="directory-row-val">Michael Morris</span>
                  </div>

                  <div className="directory-row">
                    <span className="directory-row-label">Email</span>
                    <a href="mailto:michael@minttalentgroup.com" className="directory-link">
                      <span>michael@minttalentgroup.com</span>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                        <path d="M7 17L17 7M17 7H7M17 7v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form-side" data-reveal="slide-right">
            {!success ? (
              <form onSubmit={handleSubmit} className="contact-form-card">
                <div className={`form-field ${focusedField === 'name' || form.name ? 'field-active' : ''}`}>
                  <label htmlFor="name">{t.contactFormName}</label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={form.name}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                  />
                  <div className="field-border-line" />
                </div>

                <div className={`form-field ${focusedField === 'email' || form.email ? 'field-active' : ''}`}>
                  <label htmlFor="email">{t.contactFormEmail}</label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={form.email}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                  <div className="field-border-line" />
                </div>

                {/* ── Subject Picker — Elegant Chips ── */}
                <div className="form-subject-picker">
                  <span className="subject-picker-label">{t.contactFormSubject}</span>
                  <div className="subject-chips-row" role="radiogroup" aria-label={t.contactFormSubject}>
                    {SUBJECT_OPTIONS.map((opt) => {
                      const isSelected = form.subject === opt.value;
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          role="radio"
                          aria-checked={isSelected}
                          className={`subject-chip ${isSelected ? 'selected' : ''}`}
                          onClick={() => handleInputChange('subject', opt.value)}
                          style={{ '--subject-accent': opt.color }}
                        >
                          <span className="subject-chip-icon">
                            <SubjectIcon type={opt.icon} isSelected={isSelected} />
                          </span>
                          <span className="subject-chip-text">{t[opt.labelKey]}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className={`form-field form-field-area ${focusedField === 'message' || form.message ? 'field-active' : ''}`}>
                  <label htmlFor="message">{t.contactFormMessage}</label>
                  <textarea
                    id="message"
                    required
                    rows="5"
                    value={form.message}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                  />
                  <div className="field-border-line" />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className={`btn-contact-submit btn btn-primary ${submitting ? 'loading' : ''}`}
                >
                  {submitting ? (
                    <>
                      <span className="spinner" />
                      <span>{t.contactFormSending}</span>
                    </>
                  ) : (
                    <>
                      <span>{t.contactFormSubmit}</span>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="contact-success-card">
                <div className="confetti-container" aria-hidden="true">
                  {[...Array(12)].map((_, i) => (
                    <span key={i} className={`confetti-piece confetti-${i + 1}`} />
                  ))}
                </div>
                <div className="success-icon-wrap">
                  <svg className="success-checkmark-svg" viewBox="0 0 52 52">
                    <circle className="success-checkmark-circle" cx="26" cy="26" r="25" fill="none" />
                    <path className="success-checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                  </svg>
                </div>
                <h3 className="success-title">{t.contactFormSuccess}</h3>
                <p className="success-desc">{t.contactFormSuccessSub}</p>
                <button type="button" onClick={() => setSuccess(false)} className="btn btn-ghost btn-success-back">
                  <span>{t.contactFormBack}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
