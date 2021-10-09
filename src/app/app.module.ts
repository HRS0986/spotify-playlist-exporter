import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PlaylistsComponent } from './components/playlists/playlists.component';
import { PlaylistItemsComponent } from './components/playlist-items/playlist-items.component';
import { BasicLayoutComponent } from './components/basic-layout/basic-layout.component';
import { StartupComponent } from './components/startup/startup.component';

import { MaterialModule } from './material.module';


@NgModule({
  declarations: [
    AppComponent,
    PlaylistsComponent,
    PlaylistItemsComponent,
    BasicLayoutComponent,
    StartupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
