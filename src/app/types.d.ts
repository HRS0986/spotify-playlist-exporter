export interface SpotifyRequestUserData {
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

export interface SpotifyPlaylistsApiObject {
  href: string;
  items: Array<SpotifyPlaylistApiObject>;
  limit: number;
  next: null;
  offset: number;
  previous: null;
  total: number;
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

export interface SpotifyPlaylist {
  collaborative: boolean;
  id: string;
  name: string;
  publicStatus: boolean;
  tracksCount: number;
}
