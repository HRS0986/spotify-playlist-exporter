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
  playlistName: string | null = 'Playlist Name';
  userData!: SpotifyProfileData;
  loading = false;
  subscriptions: Subscription[] = [];
  constructor(private route: ActivatedRoute, private spotifyService: SpotifyService) {
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
    this.loading = true;
    const userDataSubscription: Subscription = this.spotifyService.getUserData().subscribe(data => {
      this.userData = {
        name: data.display_name,
        email: data.email,
        id: data.id,
        imageUrl: data.images[0].url,
        subscription: data.product
      };
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
