import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VideoAlbumComponent } from './video-album.component';

const routes: Routes = [
  {
    path: '',
    component: VideoAlbumComponent
  },
  {
    path: ':url',
    component: VideoAlbumComponent
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

export class VideoAlbumRoutingModule
{}
