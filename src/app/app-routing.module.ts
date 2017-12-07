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
