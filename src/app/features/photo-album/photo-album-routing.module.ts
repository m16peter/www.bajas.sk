import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PhotoAlbumComponent } from './photo-album.component';

const routes: Routes = [
  {
    path: '',
    component: PhotoAlbumComponent
  },
  {
    path: ':url',
    component: PhotoAlbumComponent
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

export class PhotoAlbumRoutingModule
{}
