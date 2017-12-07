import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoreModule } from '@app/core/core.module';
import { SharedModule } from '@app/shared/shared.module';

import { HomeComponent } from '@app/features/home/home.component';

import { AppCommunicationService } from './app-communication.service';
import { AppService } from './app.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
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
