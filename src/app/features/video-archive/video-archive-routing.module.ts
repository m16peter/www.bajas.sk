import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VideoArchiveComponent } from './video-archive.component';

const routes: Routes = [
  {
    path: '',
    component: VideoArchiveComponent
  },
  {
    path: ':url',
    component: VideoArchiveComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class VideoArchiveRoutingModule
{}
