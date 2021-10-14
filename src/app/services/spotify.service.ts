import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PLAYLISTS_LIMIT } from '../constants';
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
  private baseUrl = 'https://api.spotify.com/v1/';

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
    const endpoint = `${this.baseUrl}me`;
    return this.http.get<SpotifyUserDataApiObject>(endpoint);
  }

  public getAllPlaylists(offset: number): Observable<SpotifyPlaylistsApiObject> {
    const endpoint = `${this.baseUrl}me/playlists?limit=${PLAYLISTS_LIMIT}&offset=${offset}`;
    return this.http.get<SpotifyPlaylistsApiObject>(endpoint);
  }

  public getPlaylistItems(playlistId: string, fields: string[], offset: number): Observable<SpotifyTrackListApiObject> {
    const fieldString = this.createFieldsString(fields);
    const endpoint = `${this.baseUrl}me/playlists/${playlistId}/tracks?limit==${PLAYLISTS_LIMIT}&offset=${offset}&${fieldString}`;
    return this.http.get<SpotifyTrackListApiObject>(endpoint);
  }

  private createFieldsString(fields: string[]): string {
    let fieldString = 'fields=limit%2Ctotal%2C';
    let trackString = 'items(track(';
    for (const field of fields) {
      if (field !== 'album' && field !== 'artist') {
        trackString += `${field},`;
      }
    }
    if (fields.includes('album')) {
      trackString += 'album(name),';
    }
    if (fields.includes('artist')) {
      trackString += 'artists(name)';
    }
    trackString += '))';
    fieldString += encodeURIComponent(trackString);
    return fieldString;
  }

}
