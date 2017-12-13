import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PhotoArchiveComponent } from './photo-archive.component';

const routes: Routes = [
  {
    path: '',
    component: PhotoArchiveComponent
  },
  {
    path: ':url',
    component: PhotoArchiveComponent
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

export class PhotoArchiveRoutingModule
{}
