import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideoAlbumRoutingModule } from './video-album-routing.module';
import { VideoAlbumComponent } from './video-album.component';

@NgModule({
  imports: [
    CommonModule,
    VideoAlbumRoutingModule
  ],
  declarations: [
    VideoAlbumComponent
  ]
})

export class VideoAlbumModule
{}
