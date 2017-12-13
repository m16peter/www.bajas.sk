import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideoArchiveRoutingModule } from './video-archive-routing.module';
import { VideoArchiveComponent } from './video-archive.component';

@NgModule({
  imports: [
    CommonModule,
    VideoArchiveRoutingModule
  ],
  declarations: [
    VideoArchiveComponent
  ]
})

export class VideoArchiveModule
{}
