import { useState, useEffect } from 'react';

// Latest public videos of the official channel, served by our /api/youtube proxy
// (worker.js in production, vite.config.js in dev). The proxy caches YouTube results,
// and this module keeps a single request per page load.
const STORAGE_KEY = 'jm-youtube-videos-v2';

let inflight = null;

function isValidVideo(v) {
  return v && typeof v.id === 'string' && typeof v.title === 'string' && typeof v.thumbnail === 'string';
}

function readStored() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(parsed?.videos) ? parsed : null;
  } catch {
    return null;
  }
}

function writeStored(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch { /* storage unavailable (private mode, quota...) */ }
}

function loadVideos() {
  if (!inflight) {
    inflight = fetch('/api/youtube?v=2') // bump when the video source changes, to skip stale browser caches
      .then(async (res) => {
        if (!res.ok) throw new Error(`Failed to fetch videos (${res.status})`);
        const json = await res.json();
        if (!Array.isArray(json?.videos)) throw new Error('Unexpected response from video proxy');
        const seen = new Set();
        const videos = json.videos.filter((v) => isValidVideo(v) && !seen.has(v.id) && seen.add(v.id));
        const data = { videos, channelUrl: json.channelUrl };
        writeStored(data);
        return data;
      })
      .catch((err) => {
        inflight = null; // allow a retry on the next mount
        throw err;
      });
  }
  return inflight;
}

export function useYouTubeVideos() {
  const [state, setState] = useState(() => {
    const stored = readStored();
    return { videos: stored?.videos || [], channelUrl: stored?.channelUrl || null, loading: true, error: null };
  });

  useEffect(() => {
    let cancelled = false;
    loadVideos()
      .then((data) => {
        if (!cancelled) setState({ ...data, loading: false, error: null });
      })
      .catch((err) => {
        console.error('Error fetching YouTube videos:', err);
        // Keep the last good list (from localStorage) if there is one
        if (!cancelled) setState((s) => ({ ...s, loading: false, error: err.message }));
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return {
    ...state,
    isEmpty: !state.loading && !state.error && state.videos.length === 0,
  };
}
