import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ExportOptionsComponent } from '../export-options/export-options.component';
import { SpotifyService } from '../../services/spotify.service';
import { Subscription } from 'rxjs';
import { PlaylistMetaData, DisplayTrackObject, DialogResult } from '../../types';
import { INITIAL_OFFSET, PLAYLIST_ITEM_LIMIT } from '../../constants';

@Component({
  selector: 'app-playlist-items',
  templateUrl: './playlist-items.component.html',
  styleUrls: ['./playlist-items.component.css']
})
export class PlaylistItemsComponent implements OnInit {

  @Input() playlistId!: string;

  loading = false;
  subscriptions: Subscription[] = [];
  playlistItems: DisplayTrackObject[] = [];
  playlistMetaData!: PlaylistMetaData;
  totalTracksCount = 0;

  constructor(private dialog: MatDialog, private spotifyService: SpotifyService) { }

  ngOnInit(): void {
    this.loading = true;
    this.getPlaylistItems(this.playlistId, INITIAL_OFFSET);
    const playlistItemsRemainder = this.totalTracksCount % PLAYLIST_ITEM_LIMIT;
    const requestsCount = Math.floor(this.totalTracksCount / PLAYLIST_ITEM_LIMIT) + Number(playlistItemsRemainder) - 1;
    for (let i = 1; i <= requestsCount; i++) {
      this.getPlaylistItems(this.playlistId, i);
    }
    const playlistMetaDataSubscription: Subscription = this.spotifyService.getPlaylistMetaData(this.playlistId).subscribe(data => {
      this.playlistMetaData = data;
    });
    this.subscriptions.push(playlistMetaDataSubscription);
    this.loading = false;
  }

  private getPlaylistItems(playlistId: string, offset: number): void {
    const playlistsItemsSubscription: Subscription = this.spotifyService.getPlaylistItemsToDisplay(playlistId, offset).subscribe(data => {
      this.totalTracksCount = data.total;
      for (const track of data.items) {
        const trackObject: DisplayTrackObject = {
          name: track.track.name,
          artists: this.getArtistList(track.track.artists)
        };
        this.playlistItems.push(trackObject);
      }
    });
    this.subscriptions.push(playlistsItemsSubscription);
  }

  displayExportOptionsDialog(): void {
    const dialogRef = this.dialog.open(ExportOptionsComponent, {
      width: '300px'
    });
    dialogRef.afterClosed().subscribe((result: DialogResult) => {
      if (result !== undefined) {
        this.spotifyService.playlistToText(this.playlistId, result.selectedFields);
        console.log('The dialog was closed', result);
      }
    });
    this.spotifyService.unsubscribeAll();
  }

  getArtistList(artists: Array<{name: string}>): string[] {
    const artistsList: string[] = [];
    for (const artist of artists) {
      artistsList.push(artist.name);
    }
    return artistsList;
  }

  private milliSecondsToDuration(milliSeconds: number): string {
    let seconds = milliSeconds / 1000;
    const minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
    return `${minutes}:${seconds}`;
  }
}
