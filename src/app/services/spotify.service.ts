import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor() { }

  private clientId = '4d3ca951d1e44b3e8cb4732bfa790f5d';
  private scope = 'playlist-read-private';
  private redirectUri = 'http%3A%2F%2Flocalhost%3A4200%2F';
  private accessToken!: string;

  public authorize(): void{
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${this.clientId}&response_type=token&redirect_uri=${this.redirectUri}&scope=${this.scope}`;
    window.location.href = authUrl;
  }

  public setAccessToken(token: string): void{
    this.accessToken = token;
  }

}
