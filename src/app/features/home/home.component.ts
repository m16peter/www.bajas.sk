// angular
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// rxjs
import 'rxjs/add/operator/retry';

// app
import { AppCommunicationService } from '@app/app-communication.service';
import { GlobalsService } from '@app/core/globals.service';
import { I18nService } from '@app/core/i18n.service';
import { PageService } from '@app/core/page.service';
import { ScrollService } from '@app/core/scroll.service';

// others
import { Home } from './home.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.view.html',
  styleUrls: ['home.style.scss']
})

export class HomeComponent implements OnInit
{
  public home = new Home();

  constructor(
    private communication: AppCommunicationService,
    private cdr: ChangeDetectorRef,
    private globals: GlobalsService,
    private http: HttpClient,
    private i18n: I18nService,
    private page: PageService,
    private scroll: ScrollService
  ) {}

  ngOnInit()
  {
    // seo
    this.page.updateTitle(this.globals.browserSetup.pageTitle);
    this.page.updateDescription(this.globals.browserSetup.metaDescription);

    // initialize home with json data
    if (this.globals.json.home.loaded)
    {
      // load stored json data
      const home = this.globals.json.home;
      const general = this.globals.json.general;
      const features = this.globals.json.features;

      // initialize home component, instead of http-get, use stored json data...
      if (home.loaded && general.loaded && features.loaded)
      {
        this.home.initialize(home['data'], general['data'], features['data']);
        this.communication.updateFeature('home');
      }
      else
      {
        console.warn('Ooops, something went wrong...', [home, general, features]);
      }
    }
    else
    {
      console.log('<!--');
      this.http.get(this.globals.pathTo.home).retry(3).subscribe((json) =>
      {
        console.log('Json loaded!', [this.globals.pathTo.home, json]);
        try
        {
          // store json data for later use
          this.globals.json.home['data'] = json['data'];
          this.globals.json.home.loaded = true;

          const home = this.globals.json.home;
          const general = this.globals.json.general;
          const features = this.globals.json.features;

          // initialize home component
          if (home.loaded && general.loaded && features.loaded)
          {
            this.home.initialize(home['data'], general['data'], features['data']);
            this.communication.updateFeature('home');
          }
          else
          {
            console.warn('Ooops, something went wrong...', [home, general, features]);
          }
          console.log('-->');
        }
        catch (e)
        {
          console.warn('Ooops, something went wrong...', [e, json]);
        }
      },
      (e) =>
      {
        console.warn('Ooops, something went wrong...', [e]);
      });
    }
  }

  public route(key: string): string
  {
    return (this.globals.routes[key] + this.i18n.translate(this.home.features[key], 'route'));
  }
}
