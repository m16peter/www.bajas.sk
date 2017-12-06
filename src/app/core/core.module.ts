import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { GlobalsService } from './globals.service';
import { I18nService } from './i18n.service';
import { LocalStorageService } from './local-storage.service';
import { PageService } from './page.service';
import { ScrollService } from './scroll.service';
import { UrlService } from './url.service';

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    GlobalsService,
    I18nService,
    LocalStorageService,
    PageService,
    ScrollService,
    UrlService
  ],
  declarations: []
})

export class CoreModule
{}
