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
  private scope = 'playlist-read-private';
  private redirectUri = 'http%3A%2F%2Flocalhost%3A4200%2F';
  private accessToken!: string;

  private httpOptions = {
    headers: new HttpHeaders().set('Authorization', `Bearer ${this.accessToken}`)
  };

  public authorize(): void {
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${this.clientId}&response_type=token&redirect_uri=${this.redirectUri}&scope=${this.scope}`;
    window.location.href = authUrl;
  }

  public setAccessToken(token: string): void {
    this.accessToken = token;
  }

  public getUserData(): SpotifyProfileData {
    const endpoint = 'GET https://api.spotify.com/v1/me';
    let userData: {} = {};
    this.http.get<SpotifyRequestUserData>(endpoint, this.httpOptions).subscribe(data => {
      userData = {
        Name: data.display_name,
        Email: data.email,
        Subscription: data.product,
        Id: data.id
      };
    }).unsubscribe();
    return userData as SpotifyProfileData;
  }

}
