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

import { About } from './about.model';

const config =
{
  'json': 'assets/about/about.json',
  'title': 'About | bajas.sk',
  'description': '...',
  'err_message': 'Ooops, something went wrong!'
};

@Component({
  selector: 'app-about',
  templateUrl: 'about.view.html',
  styleUrls: ['about.style.scss']
})

export class AboutComponent implements OnInit, OnDestroy
{
  public about: About;
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
    this.about = new About();
    this.languageId = undefined;

    this.pageService.updateTitle(config.title);
    this.pageService.updateDescription(config.description);

    this.subscription = this.appCommunicationService.onChangeLanguage$
      .subscribe((languageId) =>
      {
        console.log('App language:', languageId);
        this.languageId = languageId;
      }
    );
  }

  ngOnInit()
  {
    this.appCommunicationService.verifyLanguage();

    this.route.paramMap
      .do(() =>
      {
        console.log('<!--');
        this.about.loaded = false;
      })
      .switchMap((params: ParamMap) =>
      {
        if (this.about.loaded)
        {
          this.detectLanguage(params.get('url'));
          return of(this.languageId);
        }
        else
        {
          this.about.url = params.get('url');
          return from(this.http
            .get(config.json)
            .retry(3)
          );
        }
      }
    )
    .subscribe((json) =>
    {
      this.about.initialize(json);
      this.detectLanguage(this.about.url);
      this.about.loaded = true;
      console.log('-->');
    },
    (e) =>
    {
      console.log(config.err_message, e);
    });
  }

  private detectLanguage(url: string): void
  {
    const language = this.urlService.detectedUrlLanguage(url, this.about.feature, this.about.languages);

    try
    {
      if (language === '')
      {
        if (this.about.feature['routeI18n'] === undefined)
        {
          this.router.navigate(['/01/' + this.about.feature['route']]);
        }
        else
        {
          this.router.navigate(['/01/' + this.about.feature['routeI18n'][this.languageId]]);
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
