import { TrackField } from './types';

export const SPOTIFY_TOKEN = 'SpotifyAccessToken';

export const BIG_TITLE = 'Spotify Playlist Exporter';

export const PLAYLISTS_LIMIT = 50;

export const INITIAL_OFFSET = 0;

export const PLAYLIST_ITEM_LIMIT = 100;

export const BASE_API_URL = 'https://api.spotify.com/v1/';

export const DEFAULT_SEPARATOR = ',';

export const TRACK_FIELDS: TrackField[] = [
  { field: 'name', checked: true },
  { field: 'artist', checked: false },
  { field: 'album', checked: false },
  { field: 'url', checked: false },
  { field: 'duration', checked: false },
  { field: 'explicit', checked: false }
];
