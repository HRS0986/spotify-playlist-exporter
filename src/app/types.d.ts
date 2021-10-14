export interface SpotifyUserDataApiObject {
  country: string;
  display_name: string;
  email: string;
  external_urls: object;
  followers: object;
  href: string;
  id: string;
  images: Array<{ height: null | number; url: string; width: null | string; }>;
  product: string;
  type: string;
  uri: string;
}

export interface SpotifyProfileData {
  name: string;
  email: string;
  subscription: string;
  id: string;
  imageUrl: string;
}

export interface SpotifyPlaylistsApiObject extends SpotifyApiObject {
  items: Array<SpotifyPlaylistApiObject>;
}

export interface SpotifyPlaylist {
  collaborative: boolean;
  id: string;
  name: string;
  publicStatus: boolean;
  tracksCount: number;
}

export interface SpotifyTrackListApiObject extends SpotifyApiObject{
  items: Array<SpotifyTrackApiObject>;
}

export interface PlaylistMetaData {
  collaborative: boolean;
  description: string;
  followers: {
    total: number;
  };
  id: string;
  name: string;
  public: boolean;
}

interface SpotifyTrackApiObject {
  added_at: string;
  added_by: {
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    type: string;
    uri: string;
  };
  is_local: boolean;
  primary_color: null;
  track: TrackApiObject;
  video_thumbnail: {
    url: string | null;
  };
}

interface TrackApiObject {
  album: AlbumApiObject;
  artists: Array<ArtistApiObject>;
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  episode: boolean;
  explicit: boolean;
  external_ids: {
    isrc: string;
  };
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: string;
  track: boolean;
  track_number: number;
  type: string;
  uri: string;
}

interface AlbumApiObject {
  album_type: string;
  artists: Array<ArtistApiObject>;
  available_markets: string[];
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: Array<{ height: number; url: string; width: string; }>;
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
}

interface ArtistApiObject {
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

interface SpotifyPlaylistApiObject {
  collaborative: boolean;
  external_urls: object;
  href: string;
  id: string;
  images: [];
  name: string;
  owner: {
    external_urls: object;
    href: string;
    id: string;
    type: string;
    uri: string;
  };
  public: boolean;
  snapshot_id: string;
  tracks: {
    href: string;
    total: number;
  };
  type: string;
  uri: string;
}

interface SpotifyApiObject {
  href: string;
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
}

export interface SpotifyTrack {
  title: string;
  album: string;
  artists: string[];
  duration: string;
  explicit: boolean;
  url: string;
}
