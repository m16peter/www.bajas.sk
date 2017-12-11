// angular
import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from '@angular/common/http';

// rxjs
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { from } from 'rxjs/observable/from';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/do';

// app
import { AppCommunicationService } from '@app/app-communication.service';
import { GlobalsService } from '@app/core/globals.service';
import { I18nService } from '@app/core/i18n.service';
import { PageService } from '@app/core/page.service';
import { UrlService } from '@app/core/url.service';

// others
import { News } from './news.model';

@Component({
  selector: 'app-news',
  templateUrl: 'news.view.html',
  styleUrls: ['news.style.scss']
})

export class NewsComponent implements OnInit, OnDestroy
{
  public news = new News();
  private subscription: Subscription;

  constructor(
    private communication: AppCommunicationService,
    private cdr: ChangeDetectorRef,
    private globals: GlobalsService,
    private http: HttpClient,
    private i18n: I18nService,
    private page: PageService,
    private route: ActivatedRoute,
    private router: Router,
    private url: UrlService
  ) {
    this.subscription = this.communication.onLanguageChanged$.subscribe(() => this.navigateToNews());
  }

  ngOnInit()
  {
    let url: any;

    this.route.paramMap
      .switchMap((params: ParamMap) =>
      {
        console.log('<!--');

        if (this.news.loaded)
        {
          // on url params change, validate & verify url language
          this.detectUrlLanguage(params.get('url'));
          return of('');
        }
        else if (this.globals.json.news.loaded)
        {
          // in case the http-get already loaded json data, use that data...
          const news = this.globals.json.news;
          const features = this.globals.json.features;
          const languages = this.globals.json.languages;

          if (news.loaded && features.loaded && languages.loaded)
          {
            this.news.initialize(news['data'], features['data']['news'], languages['data']);
            this.communication.updateFeature('news');
            this.detectUrlLanguage(params.get('url'));
          }
          else
          {
            console.warn('Ooops, something went wrong...', [news, features, languages]);
            this.news.loaded = false;
          }
          return of('');
        }
        else
        {
          // first time make an http-get to load data from json
          url = params.get('url');
          return from(this.http.get(this.globals.pathTo.news).retry(3));
        }
      })
      .subscribe((json) =>
      {
        if (this.news.loaded === false)
        {
          console.log('Json loaded!', [this.globals.pathTo.news, json]);
          try
          {
            // store json content globally
            this.globals.json.news['data'] = json['data'];
            this.globals.json.news.loaded = true;

            const news = this.globals.json.news;
            const features = this.globals.json.features;
            const languages = this.globals.json.languages;

            if (features.loaded && languages.loaded)
            {
              this.news.initialize(news['data'], features['data']['news'], languages['data']);
              this.communication.updateFeature('news');
              this.detectUrlLanguage(url);
            }
          }
          catch (e)
          {
            console.warn('Ooops, something went wrong...', [e]);
            this.news.loaded = false;
          }
        }

        // seo
        this.page.updateTitle(this.i18n.translate(this.news.feature, 'title'));
        this.page.updateDescription(this.i18n.translate(this.news.content, 'title'));

        console.log('-->');
      },
      (e) =>
      {
        console.warn('Ooops, something went wrong...', [e]);
        this.news.loaded = false;
      }
    );
  }

  private detectUrlLanguage(url: string): void
  {
    const id = this.url.detectedUrlLanguage(url, this.news.feature, this.news.languages);

    // if the url language isn't detected, redirect to default url, otherwise update language...
    (id === '') ? this.navigateToNews() : this.communication.updateLanguage(id);
  }

  private navigateToNews(): void
  {
    this.router.navigate([this.globals.routes.news + this.i18n.translate(this.news.feature, 'route')]);
  }

  ngOnDestroy()
  {
    this.subscription.unsubscribe();
  }
}
