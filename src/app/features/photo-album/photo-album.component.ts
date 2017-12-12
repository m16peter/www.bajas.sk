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
import { PhotoAlbum } from './photo-album.model';

@Component({
  selector: 'app-photo-album',
  templateUrl: 'photo-album.view.html',
  styleUrls: ['photo-album.style.scss']
})

export class PhotoAlbumComponent implements OnInit, OnDestroy
{
  public photoAlbum = new PhotoAlbum();
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
    this.subscription = this.communication.onLanguageChanged$.subscribe(() => this.navigateToPhotoAlbum());
  }

  ngOnInit()
  {
    let url: any;

    this.route.paramMap
      .switchMap((params: ParamMap) =>
      {
        console.log('<!--');

        if (this.photoAlbum.loaded)
        {
          // on url params change, validate & verify url language
          this.detectUrlLanguage(params.get('url'));
          return of('');
        }
        else if (this.globals.json.photoAlbum.loaded)
        {
          // in case the http-get already loaded json data, use that data...
          const photoAlbum = this.globals.json.photoAlbum;
          const features = this.globals.json.features;
          const languages = this.globals.json.languages;

          if (photoAlbum.loaded && features.loaded && languages.loaded)
          {
            this.photoAlbum.initialize(photoAlbum['data'], features['data']['photoAlbum'], languages['data']);
            this.communication.updateFeature('photoAlbum');
            this.detectUrlLanguage(params.get('url'));
          }
          else
          {
            console.warn('Ooops, something went wrong...', [photoAlbum, features, languages]);
            this.photoAlbum.loaded = false;
          }
          return of('');
        }
        else
        {
          // first time make an http-get to load data from json
          url = params.get('url');
          return from(this.http.get(this.globals.pathTo.photoAlbum).retry(3));
        }
      })
      .subscribe((json) =>
      {
        if (this.photoAlbum.loaded === false)
        {
          console.log('Json loaded!', [this.globals.pathTo.photoAlbum, json]);
          try
          {
            // store json content globally
            this.globals.json.photoAlbum['data'] = json['data'];
            this.globals.json.photoAlbum.loaded = true;

            const photoAlbum = this.globals.json.photoAlbum;
            const features = this.globals.json.features;
            const languages = this.globals.json.languages;

            if (features.loaded && languages.loaded)
            {
              this.photoAlbum.initialize(photoAlbum['data'], features['data']['photoAlbum'], languages['data']);
              this.communication.updateFeature('photoAlbum');
              this.detectUrlLanguage(url);
            }
          }
          catch (e)
          {
            console.warn('Ooops, something went wrong...', [e]);
            this.photoAlbum.loaded = false;
          }
        }

        // seo
        this.page.updateTitle(this.i18n.translate(this.photoAlbum.feature, 'title'));
        this.page.updateDescription(this.i18n.translate(this.photoAlbum.content, 'title'));

        console.log('-->');
      },
      (e) =>
      {
        console.warn('Ooops, something went wrong...', [e]);
        this.photoAlbum.loaded = false;
      }
    );
  }

  private detectUrlLanguage(url: string): void
  {
    const id = this.url.detectedUrlLanguage(url, this.photoAlbum.feature, this.photoAlbum.languages);

    // if the url language isn't detected, redirect to default url, otherwise update language...
    (id === '') ? this.navigateToPhotoAlbum() : this.communication.updateLanguage(id);
  }

  private navigateToPhotoAlbum(): void
  {
    this.router.navigate([this.globals.routes.photoAlbum + this.i18n.translate(this.photoAlbum.feature, 'route')]);
  }

  ngOnDestroy()
  {
    this.subscription.unsubscribe();
  }
}
