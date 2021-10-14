import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PLAYLISTS_LIMIT, PLAYLIST_ITEM_LIMIT, BASE_API_URL } from '../constants';
import { SpotifyUserDataApiObject, SpotifyPlaylistsApiObject, SpotifyTrackListApiObject } from '../types';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) {
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

  public getUserData(): Observable<SpotifyUserDataApiObject> {
    const endpoint = `${BASE_API_URL}me`;
    return this.http.get<SpotifyUserDataApiObject>(endpoint);
  }

  public getAllPlaylists(offset: number): Observable<SpotifyPlaylistsApiObject> {
    const endpoint = `${BASE_API_URL}me/playlists?limit=${PLAYLISTS_LIMIT}&offset=${offset}`;
    return this.http.get<SpotifyPlaylistsApiObject>(endpoint);
  }

  public getPlaylistItems(playlistId: string, offset: number): Observable<SpotifyTrackListApiObject> {
    const fieldString = 'limit%2Ctotal%2Citems(track(name%2Chref%2Cduration_ms%2Cexplicit%2Calbum(name)%2Cartists(name)))';
    const endpoint = `${BASE_API_URL}playlists/${playlistId}/tracks?limit=${PLAYLIST_ITEM_LIMIT}&offset=${offset}&fields=${fieldString}`;
    return this.http.get<SpotifyTrackListApiObject>(endpoint);
  }

}
