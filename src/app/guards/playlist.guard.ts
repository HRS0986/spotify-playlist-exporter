import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SpotifyService } from '../services/spotify.service';

@Injectable({
  providedIn: 'root'
})
export class PlaylistGuard implements CanActivate {

  constructor(private spotifyService: SpotifyService, private router: Router) {
  }

  canActivate(): boolean {
    const isPlaylistsUnlocked = this.spotifyService.getPlaylistsRouteStatus();
    if (isPlaylistsUnlocked) {
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }
}
