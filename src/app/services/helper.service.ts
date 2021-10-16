import { Injectable } from '@angular/core';
import { ArtistApiObject, Track, TrackApiObject } from '../types';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  public milliSecondsToDuration(milliSeconds: number): string {
    let seconds = milliSeconds / 1000;
    const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
    seconds = Math.floor(seconds % 60);
    return `${minutes}:${seconds}`;
  }

  public getArtistList(artists: Array<{name: string} | ArtistApiObject>): Array<string> {
    const artistsList: Array<string> = [];
    for (const artist of artists) {
      artistsList.push(artist.name);
    }
    return artistsList;
  }

  public createSpotifyFieldsString(fields: string[]): string {
    let fieldSpotifyString = 'total%2C';
    let trackString = 'items(track(';
    if (fields.includes('album')) {
      trackString += 'album(name),';
    }
    if (fields.includes('artist')) {
      trackString += 'artists(name),';
    }
    if (fields.includes('url')) {
      trackString += 'external_urls(spotify),';
    }
    if (fields.includes('duration')) {
      trackString += 'duration_ms,';
    }
    for (const field of fields) {
      if (field === 'name' || field === 'explicit') {
        trackString += `${field},`;
      }
    }
    trackString = trackString.slice(0, -1) + '))';
    fieldSpotifyString += encodeURIComponent(trackString);
    return fieldSpotifyString;
  }

  public trackApiObject2TrackObject(trackApiObject: TrackApiObject): Track {
    const track: Track = {};
    if (trackApiObject.name) {
      track.title = trackApiObject.name;
    }
    if (trackApiObject.album) {
      track.album = trackApiObject.album.name;
    }
    if (trackApiObject.explicit !== undefined) {
      track.explicit = trackApiObject.explicit;
    }
    if (trackApiObject.external_urls) {
      track.url = trackApiObject.external_urls.spotify;
    }
    if (trackApiObject.duration_ms) {
      track.duration = this.milliSecondsToDuration(trackApiObject.duration_ms);
    }
    if (trackApiObject.artists) {
      track.artists = this.getArtistList(trackApiObject.artists).join(' & ');
    }
    return track;
  }

  public getRequestIterationCount(total: number, limit: number): number {
    return Math.floor(total / limit) + +(!!(total % limit)) - 1;
  }
}
