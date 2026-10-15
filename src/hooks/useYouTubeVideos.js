import { useState, useEffect } from 'react';

// Latest public videos of the official channel, served by our /api/youtube proxy
// (worker.js in production, vite.config.js in dev). The proxy caches YouTube results,
// and this module keeps a single request per artist per page load.
// artist: 'jesus' (Jesus Molina home) or 'mister' (MISTER MOLINA home)
const API_VERSION = 5; // bump when the video source changes, to skip stale browser caches
const storageKey = (artist) => `jm-youtube-videos-v${API_VERSION}-${artist}`;

const inflight = new Map();

function isValidVideo(v) {
  return v && typeof v.id === 'string' && typeof v.title === 'string' && typeof v.thumbnail === 'string';
}

function readStored(artist) {
  try {
    const parsed = JSON.parse(localStorage.getItem(storageKey(artist)));
    return Array.isArray(parsed?.videos) ? parsed : null;
  } catch {
    return null;
  }
}

function writeStored(artist, data) {
  try {
    localStorage.setItem(storageKey(artist), JSON.stringify(data));
  } catch { /* storage unavailable (private mode, quota...) */ }
}

function loadVideos(artist) {
  if (!inflight.has(artist)) {
    const request = fetch(`/api/youtube?v=${API_VERSION}&artist=${artist}`)
      .then(async (res) => {
        if (!res.ok) throw new Error(`Failed to fetch videos (${res.status})`);
        const json = await res.json();
        if (!Array.isArray(json?.videos)) throw new Error('Unexpected response from video proxy');
        const seen = new Set();
        const videos = json.videos.filter((v) => isValidVideo(v) && !seen.has(v.id) && seen.add(v.id));
        const data = { videos, channelUrl: json.channelUrl };
        writeStored(artist, data);
        return data;
      })
      .catch((err) => {
        inflight.delete(artist); // allow a retry on the next mount
        throw err;
      });
    inflight.set(artist, request);
  }
  return inflight.get(artist);
}

const initialState = (artist) => {
  const stored = readStored(artist);
  return { videos: stored?.videos || [], channelUrl: stored?.channelUrl || null, loading: true, error: null };
};

export function useYouTubeVideos(artist = 'jesus') {
  const [state, setState] = useState(() => initialState(artist));

  useEffect(() => {
    let cancelled = false;
    setState(initialState(artist));
    loadVideos(artist)
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
  }, [artist]);

  return {
    ...state,
    isEmpty: !state.loading && !state.error && state.videos.length === 0,
  };
}
