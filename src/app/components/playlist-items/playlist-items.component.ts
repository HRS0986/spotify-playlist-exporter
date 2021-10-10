import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-playlist-items',
  templateUrl: './playlist-items.component.html',
  styleUrls: ['./playlist-items.component.css']
})
export class PlaylistItemsComponent implements OnInit {

  @Input() playlistName: string | null = 'Playlist Name';

  constructor() { }

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

}
