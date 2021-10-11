import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-basic-layout',
  templateUrl: './basic-layout.component.html',
  styleUrls: ['./basic-layout.component.css']
})
export class BasicLayoutComponent implements OnInit {

  playlistsStatus: string | null = 'all';
  playlistName: string | null = 'Playlist Name';
  public loading = true;

  constructor(private route: ActivatedRoute) {
    const routeParams = this.route.snapshot.paramMap;
    this.playlistsStatus = routeParams.get('playlistsStatus') ? routeParams.get('playlistsStatus') : 'all';
    this.route.params.subscribe(params => {
      this.playlistsStatus = params.playlistsStatus;
      if (this.playlistsStatus !== 'all') {
        this.playlistName = this.playlistsStatus;
      }
    });
  }

  ngOnInit(): void {
  }

}
