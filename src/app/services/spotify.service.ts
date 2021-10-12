import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SpotifyRequestUserData } from '../types';
import { TokenStorageService } from './token-storage.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) {
  }

  private clientId = '4d3ca951d1e44b3e8cb4732bfa790f5d';
  private scope = encodeURIComponent('playlist-read-private user-read-private user-read-email playlist-read-collaborative');
  private redirectUri = encodeURIComponent('http://localhost:4200/');
  private okToPlaylists = false;

  public authorize(): void {
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${this.clientId}&response_type=token&redirect_uri=${this.redirectUri}&scope=${this.scope}`;
    window.location.href = authUrl;
  }

  public getPlaylistsRouteStatus(): boolean {
    return this.okToPlaylists;
  }

  public setPlaylistsRouteStatus(status: boolean): void {
    this.okToPlaylists = status;
  }

  public getUserData(): Observable<SpotifyRequestUserData> {
    const accessToken = this.tokenStorageService.getFromSessionStorage('SpotifyAccessToken');
    const httpOptions = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${accessToken}`)
    };
    const endpoint = 'https://api.spotify.com/v1/me';
    return this.http.get<SpotifyRequestUserData>(endpoint, httpOptions);
  }

}
