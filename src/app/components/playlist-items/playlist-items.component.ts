import {Component, Input, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ExportOptionsComponent } from '../export-options/export-options.component';

@Component({
  selector: 'app-playlist-items',
  templateUrl: './playlist-items.component.html',
  styleUrls: ['./playlist-items.component.css']
})
export class PlaylistItemsComponent implements OnInit {

  @Input() playlistName: string | null = 'Playlist Name';

  constructor(private dialog: MatDialog) { }

  userTestStatus: Array<{ artist: string, title: string }> = Array(
    { artist: 'Artist Name', title: 'Available' },
    { artist: 'Artist Name', title: 'Ready' },
    { artist: 'Artist Name', title: 'Started' },
    { artist: 'Artist Name', title: 'Started' },
    { artist: 'Artist Name', title: 'Started' },
    { artist: 'Artist Name', title: 'Started' },
    { artist: 'Artist Name', title: 'Started' },
    { artist: 'Artist Name', title: 'Started' },
    { artist: 'Artist Name', title: 'Started' },
    { artist: 'Artist Name', title: 'Started' },
    { artist: 'Artist Name', title: 'Started' },
    { artist: 'Artist Name', title: 'Started' },
    { artist: 'Artist Name', title: 'Started' },
    { artist: 'Artist Name', title: 'Started' },
    { artist: 'Artist Name', title: 'Started' },
    { artist: 'Artist Name', title: 'Started' },
    { artist: 'Artist Name', title: 'Started' },
    { artist: 'Artist Name', title: 'Started' },
    { artist: 'Artist Name', title: 'Started' },
    { artist: 'Artist Name', title: 'Started' },
    { artist: 'Artist Name', title: 'Started' },
    { artist: 'Artist Name', title: 'Started' },
    { artist: 'Artist Name', title: 'Started' },
    { artist: 'Artist Name', title: 'Started' },
    { artist: 'Artist Name', title: 'Started' },
    { artist: 'Artist Name', title: 'Started' },
    { artist: 'Artist Name', title: 'Started' },
    { artist: 'Artist Name', title: 'Started' },
  );

  ngOnInit(): void {
  }

  displayExportOptionsDialog(): void {
    const dialogRef = this.dialog.open(ExportOptionsComponent, {
      width: '300px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }
}
