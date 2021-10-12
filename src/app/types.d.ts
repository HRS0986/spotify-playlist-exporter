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
  Name: string;
  Email: string;
  Subscription: string;
  Id: string;
  ImageUrl: string;
}
