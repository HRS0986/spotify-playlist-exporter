import { Component, OnInit, OnDestroy  } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ExportOptionsComponent } from '../export-options/export-options.component';
import { SpotifyService } from '../../services/spotify.service';
import { SpotifyPlaylist } from '../../types';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css']
})
export class PlaylistsComponent implements OnInit, OnDestroy  {

  playlists: SpotifyPlaylist[] = [];
  loading = false;
  subscriptions: Subscription[] = [];

  constructor(private dialog: MatDialog, private spotifyService: SpotifyService) { }

  ngOnInit(): void {
    this.loading = true;
    const playlistsSubscription: Subscription = this.spotifyService.getAllPlaylists().subscribe(data => {
      for (const playlist of data.items) {
        const playlistsObject: SpotifyPlaylist = {
          name: playlist.name,
          id: playlist.id,
          publicStatus: playlist.public,
          collaborative: playlist.collaborative,
          tracksCount: playlist.tracks.total
        };
        this.playlists.push(playlistsObject);
      }
    });
    this.loading = false;
    this.subscriptions.push(playlistsSubscription);
  }

  displayExportOptionsDialog(): void {
    const dialogRef = this.dialog.open(ExportOptionsComponent, {
      width: '300px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }

  ngOnDestroy(): void {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }
}
