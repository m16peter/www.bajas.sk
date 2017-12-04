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
import { I18nService } from '@app/core/i18n.service';
import { PageService } from '@app/core/page.service';
import { ScrollService } from '@app/core/scroll.service';
import { UrlService } from '@app/core/url.service';

import { News } from './news.model';

const config =
{
  'json': 'assets/news/news.json',
  'err_message': 'Ooops, something went wrong!'
};

@Component({
  selector: 'app-news',
  templateUrl: 'news.view.html',
  styleUrls: ['news.style.scss']
})

export class NewsComponent implements OnInit, OnDestroy
{
  public news: News;
  public languageId: string;

  private subscription: Subscription;

  @ViewChild('scrollEl') scrollEl;

  constructor(
    private appCommunicationService: AppCommunicationService,
    private cdr: ChangeDetectorRef,
    private http: HttpClient,
    private i18nService: I18nService,
    private pageService: PageService,
    private route: ActivatedRoute,
    private router: Router,
    private scrollService: ScrollService,
    private urlService: UrlService
  ) {
    this.news = new News();
    this.languageId = undefined;

    this.subscription = this.appCommunicationService.onChangeLanguage$
      .subscribe((languageId) =>
      {
        if (this.languageId !== languageId)
        {
          console.log('App language:', languageId);
          this.languageId = languageId;

          if (this.news.loaded)
          {
            this.router.navigate(['/01/' + this.news.feature['routeI18n'][this.languageId]]);
          }
        }
      }
    );
  }

  ngOnInit()
  {
    this.appCommunicationService.verifyLanguage();

    this.route.paramMap
      .switchMap((params: ParamMap) =>
      {
        if (this.news.loaded)
        {
          console.log('<!-- url changed::');
          this.news.url = params.get('url');
          this.detectLanguage(this.news.url);
          return of('');
        }
        else
        {
          console.log('<!-- http.get:');
          this.news.url = params.get('url');
          return from(this.http
            .get(config.json)
            .retry(3)
          );
        }
      }
    )
    .subscribe((json) =>
    {
      if (!this.news.loaded)
      {
        this.news.initialize(json);
        this.detectLanguage(this.news.url);
        this.news.loaded = true;
      }

      this.pageService.updateTitle(this.i18n(this.news.feature, 'title'));
      this.pageService.updateDescription(this.i18n(this.news.cards, 'description'));
      console.log('-->');
    },
    (e) =>
    {
      console.log(config.err_message, e);
    });
  }

  private detectLanguage(url: string): void
  {
    const language = this.urlService.detectedUrlLanguage(url, this.news.feature, this.news.languages);

    try
    {
      if (language === '')
      {
        if (this.news.feature['routeI18n'] === undefined)
        {
          this.router.navigate(['/01/' + this.news.feature['route']]);
        }
        else
        {
          this.router.navigate(['/01/' + this.news.feature['routeI18n'][this.languageId]]);
        }
      }
      else
      {
        this.languageId = language;
        this.appCommunicationService.selectLanguage(language);
      }
    }
    catch (e)
    {
      console.log(config.err_message, e);
    }

    this.cdr.detectChanges();
  }

  public i18n(obj: any, key: string): any
  {
    return this.i18nService.tryI18n(obj, key, this.languageId);
  }

  public scrollTo(position: number): void
  {
    this.scrollService.scrollTo(this.scrollEl, position);
  }

  ngOnDestroy()
  {
    this.subscription.unsubscribe();
  }
}
