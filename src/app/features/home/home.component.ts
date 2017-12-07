import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/retry';

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
    private http: HttpClient,
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

    if (this.globals.json.home.loaded)
    {
      const home = this.globals.json.home;
      const general = this.globals.json.general;
      const features = this.globals.json.features;

      if (home.loaded && general.loaded && features.loaded)
      {
        // initialize home component,
        // instead of http-get, use stored json data...
        this.home.initialize(home['data'], general['data'], features['data']);

        // activate feature
        this.globals.app.featureId = this.home.featureId;
        this.appCommunication.updateAppFeature();
      }
      else
      {
        console.log('Ooops, something went wrong...', this.globals.json.home);
      }
    }
    else
    {
      console.log('<!--');
      this.http.get(this.globals.pathTo.home).retry(3).subscribe((json) =>
      {
        console.log('Json loaded!', json);
        try
        {
          this.globals.json.home['data'] = json['data']['home'];
          this.globals.json.home.loaded = true;

          const home = this.globals.json.home;
          const general = this.globals.json.general;
          const features = this.globals.json.features;

          if (home.loaded && general.loaded && features.loaded)
          {
            // initialize home component,
            // instead of http-get, use stored json data...
            this.home.initialize(home['data'], general['data'], features['data']);

            // activate feature
            this.globals.app.featureId = this.home.featureId;
            this.appCommunication.updateAppFeature();
          }
          else
          {
            console.log('Ooops, something went wrong...', this.globals.json.home);
          }
          console.log('-->');
        }
        catch (e)
        {
          console.log('Ooops, something went wrong...', e);
        }
      },
      (e) =>
      {
        console.log('Ooops, something went wrong...', e);
      });
    }
  }

  public i18n(obj: any, key: string): any
  {
    return this.i18nService.tryI18n(obj, key, this.globals.app.languageId);
  }

  public homeTitle(): string
  {
    return (this.i18n(this.home.features[this.globals.app.featureId], 'title'));
  }

  public newsRoute(): string
  {
    for (let i = 0; i < this.home.features.length; i++)
    {
      if (this.home.features[i].module === 'news')
      {
        return (this.globals.routes.news + this.i18n(this.home.features[i], 'route'));
      }
    }
    return (undefined);
  }
}
