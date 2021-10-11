import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {SpotifyProfileData, SpotifyRequestUserData} from '../types';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) {
  }

  private clientId = '4d3ca951d1e44b3e8cb4732bfa790f5d';
  private scope = encodeURIComponent('playlist-read-private user-read-private user-read-email');
  private redirectUri = encodeURIComponent('http://localhost:4200/');
  private accessToken!: string;

  private httpOptions = { };

  public authorize(): void {
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${this.clientId}&response_type=token&redirect_uri=${this.redirectUri}&scope=${this.scope}`;
    window.location.href = authUrl;
  }

  public setAccessToken(token: string): void {
    this.accessToken = token;
    this.httpOptions = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.accessToken}`)
    };
  }

  public getUserData(): SpotifyProfileData {
    const endpoint = 'https://api.spotify.com/v1/me';
    let userData: {} = {};
    this.http.get<SpotifyRequestUserData>(endpoint, this.httpOptions).subscribe(data => {
      userData = {
        Name: data.display_name,
        Email: data.email,
        Subscription: data.product,
        Id: data.id,
        ImageUrl: data.images[0].url
      };
    });
    return userData as SpotifyProfileData;
  }

}
