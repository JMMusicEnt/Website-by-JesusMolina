// YouTube Data API v3 — latest public videos of the official channel.
// Shared by worker.js (production) and vite.config.js (local dev) so the API key
// never reaches the browser.
//
// Source: the channel's long-form playlist ("UULF" + channel id without "UC"), which
// YouTube keeps without Shorts. If it's ever unavailable we fall back to the full
// uploads playlist so the section never goes empty.
//
// Quota per refresh: playlistItems.list (1 per page) + videos.list (1).
// Never uses search.list (100 units).

export const DEFAULT_YOUTUBE_CHANNEL_ID = 'UCunKKpBXDHlVb4uqCko_-FA'; // youtube.com/@Jesusmolinamusic
export const YOUTUBE_CHANNEL_URL = 'https://www.youtube.com/@Jesusmolinamusic';

const API = 'https://www.googleapis.com/youtube/v3';
const MAX_VIDEOS = 12;
const FETCH_POOL = 50; // API max per call (same 1-unit cost); extra room so filtered-out videos don't shrink the carousel

// MISTER MOLINA (Jesus's electronic alter ego) releases that still live on Jesus's channel
// are kept out of his WATCH section by title ("MISTER MOLINA", "Mister Molina"...).
const MISTER_MOLINA_TITLE = /mister\s*molina/i;

// artist -> source channel, which titles to keep, and how many playlist pages (50 each) to scan
export const ARTISTS = {
  jesus: {
    channelId: DEFAULT_YOUTUBE_CHANNEL_ID,
    channelUrl: YOUTUBE_CHANNEL_URL,
    keep: (title) => !MISTER_MOLINA_TITLE.test(title),
    maxPages: 1,
  },
  mister: {
    channelId: 'UCXiQDFMQW5hCwLNBZtTg_DA', // youtube.com/@MISTERMOLINAMUSIC — everything there is MISTER MOLINA
    channelUrl: 'https://www.youtube.com/@MISTERMOLINAMUSIC',
    keep: () => true,
    maxPages: 1,
  },
};

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

// Walks the playlist (newest first) collecting ids whose title passes `keep`
async function collectIds(playlistId, { keep, maxPages }, apiKey) {
  const ids = [];
  let pageToken;
  for (let page = 0; page < maxPages; page++) {
    const data = await ytGet('playlistItems', {
      part: 'snippet,contentDetails',
      playlistId,
      maxResults: String(FETCH_POOL),
      ...(pageToken ? { pageToken } : {}),
    }, apiKey);
    for (const item of data.items || []) {
      const id = item.contentDetails?.videoId;
      if (id && !ids.includes(id) && keep(item.snippet?.title || '')) ids.push(id);
    }
    pageToken = data.nextPageToken;
    if (!pageToken || ids.length >= FETCH_POOL) break;
  }
  return ids.slice(0, FETCH_POOL); // videos.list accepts at most 50 ids
}

// channelId optionally overrides the artist's default channel (YOUTUBE_CHANNEL_ID env, Jesus only)
export async function fetchChannelVideos({ apiKey, channelId: channelOverride, artist = 'jesus' }) {
  if (!apiKey) throw new Error('Missing YouTube API key');
  const rules = Object.hasOwn(ARTISTS, artist) ? ARTISTS[artist] : ARTISTS.jesus;
  const channelId = channelOverride || rules.channelId;
  const channelUrl = rules.channelUrl;

  let ids;
  const longFormId = getLongFormPlaylistId(channelId);
  try {
    if (!longFormId) throw new Error('No long-form playlist for this channel id');
    ids = await collectIds(longFormId, rules, apiKey);
  } catch (e) {
    console.warn('Long-form playlist unavailable, falling back to all uploads:', e.message);
    ids = await collectIds(await getUploadsPlaylistId(channelId, apiKey), rules, apiKey);
  }
  if (ids.length === 0) {
    return { channelId, channelUrl, fetchedAt: new Date().toISOString(), videos: [] };
  }

  // videos.list only returns videos that still exist; private/deleted ones are simply absent
  const details = await ytGet('videos', { part: 'snippet,status', id: ids.join(',') }, apiKey);

  const seen = new Set();
  const videos = (details.items || [])
    .filter((v) =>
      v.status?.privacyStatus === 'public' &&
      v.status?.uploadStatus === 'processed' &&
      v.snippet?.liveBroadcastContent === 'none' && // skip upcoming/ongoing live placeholders
      rules.keep(v.snippet?.title || '') && // re-check: the title may have changed
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

  return { channelId, channelUrl, fetchedAt: new Date().toISOString(), videos };
}
