// YouTube Data API v3 — latest public videos of the official channel.
// Shared by worker.js (production) and vite.config.js (local dev) so the API key
// never reaches the browser.
//
// Source: the channel's long-form playlist ("UULF" + channel id without "UC"), which
// YouTube keeps without Shorts. If it's ever unavailable we fall back to the full
// uploads playlist so the section never goes empty.
//
// Quota per refresh: playlistItems.list (1) + videos.list (1).
// Never uses search.list (100 units).

export const DEFAULT_YOUTUBE_CHANNEL_ID = 'UCunKKpBXDHlVb4uqCko_-FA'; // youtube.com/@Jesusmolinamusic
export const YOUTUBE_CHANNEL_URL = 'https://www.youtube.com/@Jesusmolinamusic';

const API = 'https://www.googleapis.com/youtube/v3';
const MAX_VIDEOS = 12;
const FETCH_POOL = 25; // fetch a few extra so filtered-out videos don't shrink the carousel

const uploadsPlaylistCache = new Map();

async function ytGet(path, params, apiKey) {
  const qs = new URLSearchParams({ ...params, key: apiKey });
  const res = await fetch(`${API}/${path}?${qs}`);
  if (!res.ok) {
    let reason = '';
    try {
      const body = await res.json();
      reason = body?.error?.errors?.[0]?.reason || body?.error?.message || '';
    } catch { /* ignore */ }
    // Never include the request URL here: it contains the API key
    throw new Error(`YouTube API ${path} failed (${res.status}${reason ? `: ${reason}` : ''})`);
  }
  return res.json();
}

// Long-form videos only (no Shorts). Not part of the documented API surface, hence the fallback.
function getLongFormPlaylistId(channelId) {
  return channelId.startsWith('UC') ? `UULF${channelId.slice(2)}` : null;
}

async function getUploadsPlaylistId(channelId, apiKey) {
  if (uploadsPlaylistCache.has(channelId)) return uploadsPlaylistCache.get(channelId);
  const data = await ytGet('channels', { part: 'contentDetails', id: channelId }, apiKey);
  const playlistId = data.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;
  if (!playlistId) throw new Error('YouTube channel not found');
  uploadsPlaylistCache.set(channelId, playlistId);
  return playlistId;
}

function pickThumbnail(thumbnails = {}) {
  // maxres/medium are 16:9; high/standard/default are 4:3 with black bars
  const t = thumbnails.maxres || thumbnails.medium || thumbnails.high || thumbnails.standard || thumbnails.default;
  return t?.url || null;
}

export async function fetchChannelVideos({ apiKey, channelId = DEFAULT_YOUTUBE_CHANNEL_ID }) {
  if (!apiKey) throw new Error('Missing YouTube API key');

  const listItems = (playlistId) => ytGet('playlistItems', {
    part: 'contentDetails',
    playlistId,
    maxResults: String(FETCH_POOL),
  }, apiKey);

  let playlist;
  const longFormId = getLongFormPlaylistId(channelId);
  try {
    if (!longFormId) throw new Error('No long-form playlist for this channel id');
    playlist = await listItems(longFormId);
  } catch (e) {
    console.warn('Long-form playlist unavailable, falling back to all uploads:', e.message);
    playlist = await listItems(await getUploadsPlaylistId(channelId, apiKey));
  }

  const ids = [...new Set((playlist.items || []).map((i) => i.contentDetails?.videoId).filter(Boolean))];
  if (ids.length === 0) {
    return { channelId, channelUrl: YOUTUBE_CHANNEL_URL, fetchedAt: new Date().toISOString(), videos: [] };
  }

  // videos.list only returns videos that still exist; private/deleted ones are simply absent
  const details = await ytGet('videos', { part: 'snippet,status', id: ids.join(',') }, apiKey);

  const seen = new Set();
  const videos = (details.items || [])
    .filter((v) =>
      v.status?.privacyStatus === 'public' &&
      v.status?.uploadStatus === 'processed' &&
      v.snippet?.liveBroadcastContent === 'none' && // skip upcoming/ongoing live placeholders
      !seen.has(v.id) && seen.add(v.id)
    )
    .map((v) => ({
      id: v.id,
      title: v.snippet.title,
      publishedAt: v.snippet.publishedAt,
      thumbnail: pickThumbnail(v.snippet.thumbnails) || `https://i.ytimg.com/vi/${v.id}/mqdefault.jpg`,
      url: `https://www.youtube.com/watch?v=${v.id}`,
      embeddable: v.status.embeddable !== false,
    }))
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
    .slice(0, MAX_VIDEOS);

  return { channelId, channelUrl: YOUTUBE_CHANNEL_URL, fetchedAt: new Date().toISOString(), videos };
}
