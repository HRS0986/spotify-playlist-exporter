import { Component, OnInit, OnDestroy  } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatListOption } from '@angular/material/list';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ExportOptionsComponent } from '../export-options/export-options.component';
import { SpotifyService } from '../../services/spotify.service';
import { Playlist } from '../../types';
import { Subscription } from 'rxjs';
import { PLAYLISTS_LIMIT, INITIAL_OFFSET } from '../../constants';
import { HelperService } from '../../services/helper.service';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css']
})
export class PlaylistsComponent implements OnInit, OnDestroy  {

  playlists: Array<Playlist> = [];
  loading = false;
  subscriptions: Array<Subscription> = [];
  playlistsTotal!: number;
  selectedPlaylistIds: Array<MatListOption> = [];

  constructor(
    private dialog: MatDialog,
    private spotifyService: SpotifyService,
    private helperService: HelperService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.getPlaylists(INITIAL_OFFSET);
    const iterationCount: number = this.helperService.getRequestIterationCount(this.playlistsTotal, PLAYLISTS_LIMIT);
    for (let i = 1; i <= iterationCount; i++) {
      this.getPlaylists(i);
    }
    this.loading = false;
  }

  private getPlaylists(offset: number): void {
    const playlistsSubscription: Subscription = this.spotifyService.getAllPlaylists(offset).subscribe(data => {
      this.playlistsTotal = data.total;
      for (const playlist of data.items) {
        const playlistsObject: Playlist = {
          name: playlist.name,
          id: playlist.id,
          publicStatus: playlist.public,
          collaborative: playlist.collaborative,
          tracksCount: playlist.tracks.total,
          href: playlist.external_urls.spotify
        };
        this.playlists.push(playlistsObject);
      }
    });
    this.subscriptions.push(playlistsSubscription);
  }

  displayExportOptionsDialog(playlistId: string = 'multiple'): void {
    if (this.selectedPlaylistIds.length === 0 && playlistId === 'multiple') {
      this.snackBar.open('At least select one playlist', 'OK', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 7000
      });
    } else {
      const dialogRef = this.dialog.open(ExportOptionsComponent, {
        width: '300px'
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result !== undefined && playlistId !== 'multiple') {
          this.spotifyService.playlistToText(playlistId, result.selectedFields, result.separator);
        } else if (result !== undefined && playlistId === 'all') {
          for (const playlist of this.playlists) {
            console.log(playlist.id);
            this.spotifyService.playlistToText(playlist.id, result.selectedFields, result.separator);
          }
        } else if (result !== undefined && playlistId === 'multiple') {
          for (const selectedPlaylistId of this.selectedPlaylistIds) {
            console.log(selectedPlaylistId);
            this.spotifyService.playlistToText(String(selectedPlaylistId), result.selectedFields, result.separator);
          }
        }
      });
    }
  }

  ngOnDestroy(): void {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }
}
