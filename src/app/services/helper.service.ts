import { Injectable } from '@angular/core';
import { ArtistApiObject, Track, TrackApiObject } from '../types';
import { Observable } from 'rxjs';

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

  public createTrackString(track: Track, separator: string): string {
    let trackString = '';
    trackString += track.title ? track.title + separator : '';
    trackString += track.artists ? track.artists + separator : '';
    trackString += track.album ? track.album + separator : '';
    trackString += track.duration ? track.duration + separator : '';
    trackString += track.url ? track.url + separator : '';
    if (track.explicit !== undefined){
      trackString += (track.explicit ? 'Explicit' : 'Not Explicit') + separator;
    }
    return trackString.slice(0, -1);
  }

  public createHeaderString(headers: Array<string>, separator: string): string {
    console.log(headers);
    let headerString = `Number${separator}`;
    headerString += headers.includes('name') ? `Title${separator}` : '';
    headerString += headers.includes('artists') ? `Artists${separator}` : '';
    headerString += headers.includes('album') ? `Album${separator}` : '';
    headerString += headers.includes('duration') ? `Duration${separator}` : '';
    headerString += headers.includes('url') ? `URL${separator}` : '';
    headerString += headers.includes('explicit') ? `ExplicitStatus${separator}` : '';
    return headerString.slice(0, -1);
  }

  public trackListToCSV(trackStringList: Array<string>, separator: string, headers: Array<string>): string {
    let csvString = '';
    const headerString = this.createHeaderString(headers, separator);
    csvString += headerString + '\n';
    const tracksString = trackStringList.join('\n');
    csvString += tracksString;
    return csvString;
  }
}
