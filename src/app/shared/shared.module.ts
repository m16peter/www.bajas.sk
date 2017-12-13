import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material';
import { YoutubePlayerModule } from 'ngx-youtube-player';

import { VideoComponent } from './video/video.component';

@NgModule({
  imports: [
    CommonModule,

    MatButtonModule,
    YoutubePlayerModule
  ],
  declarations:
  [
    VideoComponent
  ],
  exports: [
    CommonModule,

    MatButtonModule,
    YoutubePlayerModule,

    VideoComponent
  ]
})

export class SharedModule
{}
