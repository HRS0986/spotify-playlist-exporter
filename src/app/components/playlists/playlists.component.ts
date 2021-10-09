import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css']
})
export class PlaylistsComponent implements OnInit {

  constructor() { }
  userTestStatus: Array<{ count: number, name: string }> = Array(
    { count: 0, name: 'Available' },
    { count: 1, name: 'Ready' },
    { count: 2, name: 'Started' }
  );

  ngOnInit(): void {
  }
}
