import { Component, OnInit, ChangeDetectorRef, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { from } from 'rxjs/observable/from';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/do';

import { AppCommunicationService } from '@app/app-communication.service';
import { GlobalsService } from '@app/core/globals.service';
import { I18nService } from '@app/core/i18n.service';
import { PageService } from '@app/core/page.service';
import { ScrollService } from '@app/core/scroll.service';
import { UrlService } from '@app/core/url.service';

import { Feature } from '@app/app.model';
import { News } from './news.model';

@Component({
  selector: 'app-news',
  templateUrl: 'news.view.html',
  styleUrls: ['news.style.scss']
})

export class NewsComponent implements OnInit, OnDestroy
{
  public news: News;
  private subscription: Subscription;

  @ViewChild('scrollEl') el;

  constructor(
    private appCommunication: AppCommunicationService,
    private cdr: ChangeDetectorRef,
    private globals: GlobalsService,
    private http: HttpClient,
    private i18nService: I18nService,
    private pageService: PageService,
    private route: ActivatedRoute,
    private router: Router,
    private scrollService: ScrollService,
    private urlService: UrlService
  ) {
    this.news = new News();

    this.subscription = this.appCommunication.onChangeAppLanguage$
      .subscribe(() =>
        this.router.navigate([
          this.globals.routes.news + this.i18n(this.globals.app.activeFeature, 'route')
        ])
      );
  }

  ngOnInit()
  {
    this.route.paramMap
      .switchMap((params: ParamMap) =>
      {
        console.log('<!--');

        if (this.news.loaded)
        {
          // on url params change, verify url language
          this.detectLanguage(params.get('url'));
          return of('');
        }
        else if (this.globals.json.news.loaded)
        {
          // in case the http-get already loaded json data,
          // use that data instead of loading it again...
          const news = this.globals.json.news;
          const features = this.globals.json.features;
          const languages = this.globals.json.languages;

          if (features.loaded && languages.loaded)
          {
            this.news.initialize(news['data'], features['data'], languages['data']);
            this.detectLanguage(params.get('url'));
          }

          return of('');
        }
        else
        {
          // first time make an http-get to load json data
          this.news.url = params.get('url');
          return from(this.http.get(this.globals.pathTo.news).retry(3));
        }
      })
      .subscribe((json) =>
      {
        if (this.news.loaded === false)
        {
          console.log('Json loaded!', json);

          try
          {
            // store json content globally (http-get once per refresh)
            this.globals.json.news['data'] = json['data'];
            this.globals.json.news.loaded = true;

            const news = this.globals.json.news;
            const features = this.globals.json.features;
            const languages = this.globals.json.languages;

            if (features.loaded && languages.loaded)
            {
              this.news.initialize(news['data'], features['data'], languages['data']);
              this.detectLanguage(this.news.url);
            }
          }
          catch (e)
          {
            console.log('Ooops, something went wrong...', e);
          }

          // this.detectLanguage(this.news.url);
        }

        // seo
        this.pageService.updateTitle(this.i18n(this.globals.app.activeFeature, 'title'));
        this.pageService.updateDescription(this.i18n(this.news.content, 'description'));

        console.log('-->');
      },
      (e) =>
      {
        console.log('Ooops, something went wrong...', e);
      }
    );
  }

  private detectLanguage(url: string): void
  {
    // activate feature
    this.globals.app.activeFeature = this.getFeatureById(this.news.featureId);
    this.appCommunication.updateAppFeature();

    const feature = this.globals.app.activeFeature;
    const languages = this.news.languages;
    const languageId = this.urlService.detectedUrlLanguage(url, feature, languages);

    if (languageId === '')
    {
      this.router.navigate([this.globals.routes.news + this.i18n(feature, 'route')]);
    }
    else
    {
      this.globals.app.activeLanguageId = languageId;
      this.appCommunication.updateAppLanguage();
    }

    // this.cdr.detectChanges();
  }

  private getFeatureById(featureId: number): Feature
  {
    for (let i = 0; i < this.news.features.length; i++)
    {
      if (this.news.features[i].id === featureId)
      {
        return (this.news.features[i]);
      }
    }
    return (this.news.features[0]);
  }

  public i18n(obj: any, key: string): any
  {
    return this.i18nService.tryI18n(obj, key, this.globals.app.activeLanguageId);
  }

  public scrollTo(position: number): void
  {
    this.scrollService.scrollTo(this.el, position);
  }

  ngOnDestroy()
  {
    this.subscription.unsubscribe();
  }
}
