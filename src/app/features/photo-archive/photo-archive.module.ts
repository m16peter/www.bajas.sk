import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhotoArchiveRoutingModule } from './photo-archive-routing.module';
import { PhotoArchiveComponent } from './photo-archive.component';

@NgModule({
  imports: [
    CommonModule,
    PhotoArchiveRoutingModule
  ],
  declarations: [
    PhotoArchiveComponent
  ]
})

export class PhotoArchiveModule
{}
