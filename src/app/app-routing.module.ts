import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from '@app/features/home/home.component';

const routes: Routes =
[
  {
    path: '',
    component: HomeComponent,
    data: {
      state: 'home'
    }
  },
  {
    path: '01',
    loadChildren: 'app/features/news/news.module#NewsModule',
    data: {
      state: 'news'
    }
  },
  {
    path: '02',
    loadChildren: 'app/features/video-album/video-album.module#VideoAlbumModule',
    data: {
      state: 'video-album'
    }
  },
  {
    path: '03',
    loadChildren: 'app/features/photo-album/photo-album.module#PhotoAlbumModule',
    data: {
      state: 'photo-album'
    }
  },
  {
    path: '04',
    loadChildren: 'app/features/contact/contact.module#ContactModule',
    data: {
      state: 'contact'
    }
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: ''
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {useHash: true})
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule
{}
