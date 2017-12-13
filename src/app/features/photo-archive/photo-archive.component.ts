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
import { PhotoArchive } from './photo-archive.model';

@Component({
  selector: 'app-photo-archive',
  templateUrl: 'photo-archive.view.html',
  styleUrls: ['photo-archive.style.scss']
})

export class PhotoArchiveComponent implements OnInit, OnDestroy
{
  public photoArchive = new PhotoArchive();
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
    this.subscription = this.communication.onLanguageChanged$.subscribe(() => this.navigateToPhotoArchive());
  }

  ngOnInit()
  {
    let url: any;

    this.route.paramMap
      .switchMap((params: ParamMap) =>
      {
        console.log('<!--');

        if (this.photoArchive.loaded)
        {
          // on url params change, validate & verify url language
          this.detectUrlLanguage(params.get('url'));
          return of('');
        }
        else if (this.globals.json.photoArchive.loaded)
        {
          // in case the http-get already loaded json data, use that data...
          const photoArchive = this.globals.json.photoArchive;
          const features = this.globals.json.features;
          const languages = this.globals.json.languages;

          if (photoArchive.loaded && features.loaded && languages.loaded)
          {
            this.photoArchive.initialize(photoArchive['data'], features['data']['photoArchive'], languages['data']);
            this.communication.updateFeature('photoArchive');
            this.detectUrlLanguage(params.get('url'));
          }
          else
          {
            console.warn('Ooops, something went wrong...', [photoArchive, features, languages]);
            this.photoArchive.loaded = false;
          }
          return of('');
        }
        else
        {
          // first time make an http-get to load data from json
          url = params.get('url');
          return from(this.http.get(this.globals.pathTo.photoArchive).retry(3));
        }
      })
      .subscribe((json) =>
      {
        if (this.photoArchive.loaded === false)
        {
          console.log('Json loaded!', [this.globals.pathTo.photoArchive, json]);
          try
          {
            // store json content globally
            this.globals.json.photoArchive['data'] = json['data'];
            this.globals.json.photoArchive.loaded = true;

            const photoArchive = this.globals.json.photoArchive;
            const features = this.globals.json.features;
            const languages = this.globals.json.languages;

            if (features.loaded && languages.loaded)
            {
              this.photoArchive.initialize(photoArchive['data'], features['data']['photoArchive'], languages['data']);
              this.communication.updateFeature('photoArchive');
              this.detectUrlLanguage(url);
            }
          }
          catch (e)
          {
            console.warn('Ooops, something went wrong...', [e]);
            this.photoArchive.loaded = false;
          }
        }

        // seo
        this.page.updateTitle(this.i18n.translate(this.photoArchive.feature, 'title'));
        this.page.updateDescription(this.i18n.translate(this.photoArchive.content, 'title'));

        console.log('-->');
      },
      (e) =>
      {
        console.warn('Ooops, something went wrong...', [e]);
        this.photoArchive.loaded = false;
      }
    );
  }

  private detectUrlLanguage(url: string): void
  {
    const id = this.url.detectedUrlLanguage(url, this.photoArchive.feature, this.photoArchive.languages);

    // if the url language isn't detected, redirect to default url, otherwise update language...
    (id === '') ? this.navigateToPhotoArchive() : this.communication.updateLanguage(id);
  }

  private navigateToPhotoArchive(): void
  {
    this.router.navigate([this.globals.routes.photoArchive + this.i18n.translate(this.photoArchive.feature, 'route')]);
  }

  ngOnDestroy()
  {
    this.subscription.unsubscribe();
  }
}
