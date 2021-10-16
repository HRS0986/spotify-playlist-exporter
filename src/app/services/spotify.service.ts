import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { PLAYLISTS_LIMIT, PLAYLIST_ITEM_LIMIT, BASE_API_URL, INITIAL_OFFSET } from '../constants';
import {
  SpotifyPlaylistsList,
  SpotifyTrackList,
  PlaylistMetaData,
  SpotifyUserDataApiObject,
  Track,
  WritableTrackList, ArtistApiObject,
} from '../types';

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
  private subscriptions: Subscription[] = [];

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

  public getAllPlaylists(offset: number): Observable<SpotifyPlaylistsList> {
    const endpoint = `${BASE_API_URL}me/playlists?limit=${PLAYLISTS_LIMIT}&offset=${offset}`;
    return this.http.get<SpotifyPlaylistsList>(endpoint);
  }

  public getPlaylistItemsToDisplay(playlistId: string, offset: number): Observable<SpotifyTrackList> {
    const fieldString = 'limit%2Ctotal%2Citems(track(name%2Cartists(name)))';
    const endpoint = `${BASE_API_URL}playlists/${playlistId}/tracks?limit=${PLAYLIST_ITEM_LIMIT}&offset=${offset}&fields=${fieldString}`;
    return this.http.get<SpotifyTrackList>(endpoint);
  }

  public getPlaylistMetaData(playlistId: string): Observable<PlaylistMetaData> {
    const fieldString = 'collaborative%2Cdescription%2Cfollowers(total)%2Cid%2Cname%2Cpublic';
    const endpoint = `${BASE_API_URL}playlists/${playlistId}?fields=${fieldString}`;
    return this.http.get<PlaylistMetaData>(endpoint);
  }

  public playlistToText(playlistId: string, fields: string[], filetype: string = 'csv'): void {
    let total = 0;
    const playlist: { tracks: Array<Track> } = { tracks: [] };
    const fieldString = this.createFieldsString(fields);
    console.log(fieldString);
    const endpoint = `${BASE_API_URL}playlists/${playlistId}/tracks?limit=${PLAYLIST_ITEM_LIMIT}&offset=${INITIAL_OFFSET}&fields=${fieldString}`;
    console.log(endpoint);
    const subscriptionFirst: Subscription = this.http.get<WritableTrackList>(endpoint).subscribe(data => {
      total = data.total;
      console.log(data.items);
      for (const item of data.items) {
        const track: Track = {
          title: item.track.name
        };
        playlist.tracks.push(track);
      }
    });
    this.subscriptions.push(subscriptionFirst);

    const iterationCount = Math.floor(total / PLAYLISTS_LIMIT) + +(!!(total % PLAYLISTS_LIMIT)) - 1;
    for (let i = 1; i <= iterationCount; i++) {
      const endpointX = `${BASE_API_URL}playlists/${playlistId}/tracks?limit=${PLAYLIST_ITEM_LIMIT}&offset=${i}&fields=${fieldString}`;
      const subscription: Subscription = this.http.get<WritableTrackList>(endpointX).subscribe(data => {
        for (const item of data.items) {
          const track: Track = {
            title: item.track.name
          };
          playlist.tracks.push(track);
        }
      });
      this.subscriptions.push(subscription);
    }
    console.log(playlist);
  }

  private createFieldsString(fields: string[]): string {
    let fieldString = 'total%2C';
    let trackString = 'items(track(';
    if (fields.includes('album')) {
      trackString += 'album(name),';
    }
    if (fields.includes('artist')) {
      trackString += 'artists(name)';
    }
    for (const field of fields) {
      if (field !== 'album' && field !== 'artist') {
        trackString += `${field},`;
      }
    }
    trackString = trackString.slice(0, -1);
    trackString += '))';
    fieldString += encodeURIComponent(trackString);
    return fieldString;
  }

  public getArtistList(artists: Array<ArtistApiObject>): string[] {
    const artistsList: string[] = [];
    for (const artist of artists) {
      artistsList.push(artist.name);
    }
    return artistsList;
  }

  public unsubscribeAll(): void {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

}
