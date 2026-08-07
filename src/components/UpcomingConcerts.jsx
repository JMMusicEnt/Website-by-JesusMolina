import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const concerts = [
  {
    id: 1,
    date: { day: '23', month: 'AUG', year: '2025' },
    venue: 'Blue Note Jazz Club',
    city: 'New York, USA',
    type: 'Solo Piano',
    status: 'available',
    ticketUrl: '#',
  },
  {
    id: 2,
    date: { day: '05', month: 'SEP', year: '2025' },
    venue: 'Palacio de Bellas Artes',
    city: 'Ciudad de México, MX',
    type: 'Orquesta',
    status: 'available',
    ticketUrl: '#',
  },
  {
    id: 3,
    date: { day: '18', month: 'SEP', year: '2025' },
    venue: 'Ronnie Scott\'s',
    city: 'London, UK',
    type: 'Jazz Trio',
    status: 'few',
    ticketUrl: '#',
  },
  {
    id: 4,
    date: { day: '02', month: 'OCT', year: '2025' },
    venue: 'Sala Metronòm',
    city: 'Barcelona, ES',
    type: 'Solo Piano',
    status: 'soldout',
    ticketUrl: null,
  },
  {
    id: 5,
    date: { day: '14', month: 'OCT', year: '2025' },
    venue: 'Festival Internacional de Jazz',
    city: 'Buenos Aires, AR',
    type: 'Jazz Fusión',
    status: 'available',
    ticketUrl: '#',
  },
];

const statusLabels = {
  available: { text: 'Tickets available', cls: 'uc-status--available' },
  few: { text: 'Last tickets', cls: 'uc-status--few' },
  soldout: { text: 'Sold out', cls: 'uc-status--soldout' },
};

export default function UpcomingConcerts() {
  const { t } = useApp();

  return (
    <section className="uc-sec" id="concerts-home">
      {/* Background accent */}
      <div className="uc-bg-accent" aria-hidden="true" />

      <div className="uc-container">
        {/* Header */}
        <div className="uc-header" data-reveal>
          <span className="section-eyebrow">— Upcoming Concerts</span>
          <h2 className="section-title">Live on stage</h2>
        </div>

        {/* Concert list */}
        <ul className="uc-list">
          {concerts.map((c, i) => {
            const st = statusLabels[c.status];
            return (
              <li key={c.id} className="uc-row" data-reveal style={{ '--i': i }}>
                {/* Date */}
                <div className="uc-date">
                  <span className="uc-date-day">{c.date.day}</span>
                  <span className="uc-date-month">{c.date.month} {c.date.year}</span>
                </div>

                {/* Divider */}
                <div className="uc-divider" aria-hidden="true" />

                {/* Info */}
                <div className="uc-info">
                  <span className="uc-venue">{c.venue}</span>
                  <span className="uc-city">{c.city}</span>
                </div>

                {/* Type badge */}
                <span className="uc-type">{c.type}</span>

                {/* Status + CTA */}
                <div className="uc-action">
                  <span className={`uc-status ${st.cls}`}>{st.text}</span>
                  {c.status !== 'soldout' && c.ticketUrl ? (
                    <a
                      href={c.ticketUrl}
                      className="uc-ticket-btn"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Get tickets
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d="M7 17L17 7M17 7H7M17 7v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  ) : (
                    <span className="uc-ticket-btn uc-ticket-btn--disabled">Sold out</span>
                  )}
                </div>
              </li>
            );
          })}
        </ul>

        {/* Footer CTA */}
        <div className="uc-footer-cta" data-reveal>
          <Link to="/concerts" className="btn btn-outline-dark uc-all-btn">
            View all concerts
          </Link>
        </div>
      </div>
    </section>
  );
}
