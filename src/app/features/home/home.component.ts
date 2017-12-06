import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { AppCommunicationService } from '@app/app-communication.service';
import { GlobalsService } from '@app/core/globals.service';
import { I18nService } from '@app/core/i18n.service';
import { PageService } from '@app/core/page.service';

import { Home } from './home.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.view.html',
  styleUrls: ['home.style.scss']
})

export class HomeComponent implements OnInit
{
  public home: Home;

  constructor(
    private appCommunication: AppCommunicationService,
    private cdr: ChangeDetectorRef,
    private globals: GlobalsService,
    private i18nService: I18nService,
    private pageService: PageService
  ) {
    this.home = new Home();
  }

  ngOnInit()
  {
    // seo
    this.pageService.updateTitle(this.globals.seo['page-title']);
    this.pageService.updateDescription(this.globals.seo['meta-description']);

    if (this.globals.json.home.loaded && this.globals.json.app.loaded)
    {
      // initialize home component, instead of http-get,
      // used stored json data...
      this.home.initialize(this.globals.json.home['data'], this.globals.json.app['data']);

      // optimized for faster load,
      // therefore we assume this is the feature with id of 0
      this.globals.app.activeFeature = this.globals.json.features['data'][0];
      this.appCommunication.updateAppFeature();

      // this.cdr.detectChanges();
    }
    else
    {
      console.log('Ooops, something went wrong...', this.globals.json.home);
    }
  }

  public i18n(obj: any, key: string): any
  {
    // i18n
    return this.i18nService.tryI18n(obj, key, this.globals.app.activeLanguageId);
  }
}
