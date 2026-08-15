import { useState, useEffect } from 'react';

// Utility to convert month index to short string (matches the design format)
const getShortMonth = (date) => {
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  return months[date.getMonth()];
};

// Utility to pad single digit days
const padZero = (num) => num.toString().padStart(2, '0');

// Mapping country name to a reasonable country code if needed
const getCountryCode = (countryName) => {
  const codes = {
    'United States': 'USA',
    'Mexico': 'MX',
    'Spain': 'ES',
    'Colombia': 'CO',
    'Argentina': 'AR',
    'United Kingdom': 'UK',
    // add more if necessary or default to first 2-3 letters
  };
  if (codes[countryName]) return codes[countryName];
  return countryName.substring(0, 3).toUpperCase();
};

export function useBandsintownEvents() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchEvents() {
      try {
        setLoading(true);
        // Calls our secure proxy endpoint
        const response = await fetch('/api/events');
        
        if (!response.ok) {
          throw new Error('Failed to fetch events from proxy');
        }

        const json = await response.json();
        
        // Ensure json is an array
        if (!Array.isArray(json)) {
          console.error("Expected array from bandsintown, got:", json);
          setData([]);
          return;
        }

        const mappedEvents = json.map(event => {
          const d = new Date(event.datetime);
          const day = padZero(d.getDate());
          const month = getShortMonth(d);
          const year = String(d.getFullYear());

          let status = 'available';
          let ticketUrl = event.url;

          if (event.offers && event.offers.length > 0) {
            ticketUrl = event.offers[0].url || ticketUrl;
            if (event.offers.some(o => o.status === 'sold out')) {
              status = 'soldout';
            }
          } else {
            // Some events might just not have offers yet or use default url
            if (event.sold_out) status = 'soldout';
          }

          return {
            id: event.id,
            day,
            month,
            year,
            dateLabel: `${day} ${month} ${year}`,
            targetDate: event.datetime, // For live countdown
            city: event.venue.city?.toUpperCase() || '',
            country: event.venue.country || '',
            countryCode: getCountryCode(event.venue.country || ''),
            venue: event.venue.name,
            ticketUrl,
            status,
            // Additional info for main concerts gallery
            title: event.title || 'Jesus Molina Live',
            youtubeId: '', // We don't get youtube links from bandsintown easily, fallback
          };
        });

        setData(mappedEvents);
      } catch (err) {
        console.error("Error fetching Bandsintown events:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  return {
    events: data,
    loading,
    error,
    isEmpty: !loading && !error && data.length === 0,
  };
}
