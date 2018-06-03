import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { YoutubePlayerModule } from 'ngx-youtube-player';
import { VideoComponent } from './video/video.component';

@NgModule({
  imports: [
    CommonModule,
    YoutubePlayerModule
  ],
  declarations: [
    VideoComponent
  ],
  exports: [
    CommonModule,
    YoutubePlayerModule,
    VideoComponent
  ]
})

export class SharedModule {}
