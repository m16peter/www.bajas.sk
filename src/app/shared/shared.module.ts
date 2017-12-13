import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material';

// import { YoutubePlayerModule } from 'ngx-youtube-player';

import{ YoutubePlayerComponent } from './youtube-player/youtube-player.component';

@NgModule({
  imports: [
    CommonModule,

    MatButtonModule,

    // YoutubePlayerModule,

    YoutubePlayerComponent
  ],
  declarations:
  [],
  exports: [
    CommonModule,

    MatButtonModule,

    // YoutubePlayerModule,

    YoutubePlayerComponent
  ]
})

export class SharedModule
{}
