import { Component, OnInit, OnDestroy  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';
import { SpotifyProfileData } from '../../types';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-basic-layout',
  templateUrl: './basic-layout.component.html',
  styleUrls: ['./basic-layout.component.css']
})
export class BasicLayoutComponent implements OnInit, OnDestroy  {

  playlistsStatus: string | null = 'all';
  playlistId!: string;
  userData!: SpotifyProfileData;
  loading = false;
  private subscriptions: Subscription[] = [];

  constructor(private route: ActivatedRoute, private spotifyService: SpotifyService) {
    const routeParams = this.route.snapshot.paramMap;
    this.playlistsStatus = routeParams.get('playlistsStatus') ? routeParams.get('playlistsStatus') : 'all';
    this.route.params.subscribe(params => {
      this.playlistsStatus = params.playlistsStatus;
      if (this.playlistsStatus !== 'all') {
        this.playlistId = this.playlistsStatus as string;
      }
    });
  }

  ngOnInit(): void {
    this.loading = true;
    const userDataSubscription: Subscription = this.spotifyService.getUserData().subscribe(data => {
      this.userData = data;
    });
    this.loading = false;
    this.subscriptions.push(userDataSubscription);
  }


  ngOnDestroy(): void {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

}
