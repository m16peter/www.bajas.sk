import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CoreModule } from '@app/core/core.module';

import { YoutubePlayerModule } from 'ngx-youtube-player';
import { VideoComponent } from '@app/features/home/video/video.component';
import { HomeComponent } from '@app/features/home/home.component';

import { AppCommunicationService } from './app-communication.service';
import { AppService } from './app.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    YoutubePlayerModule,
    CoreModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    VideoComponent,
    HomeComponent
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
    AppCommunicationService,
    AppService
  ]
})

export class AppModule
{}
