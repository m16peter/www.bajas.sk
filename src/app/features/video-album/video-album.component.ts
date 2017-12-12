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
import { VideoAlbum } from './video-album.model';

@Component({
  selector: 'app-video-album',
  templateUrl: 'video-album.view.html',
  styleUrls: ['video-album.style.scss']
})

export class VideoAlbumComponent implements OnInit, OnDestroy
{
  public videoAlbum = new VideoAlbum();
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
    this.subscription = this.communication.onLanguageChanged$.subscribe(() => this.navigateToVideoAlbum());
  }

  ngOnInit()
  {
    let url: any;

    this.route.paramMap
      .switchMap((params: ParamMap) =>
      {
        console.log('<!--');

        if (this.videoAlbum.loaded)
        {
          // on url params change, validate & verify url language
          this.detectUrlLanguage(params.get('url'));
          return of('');
        }
        else if (this.globals.json.videoAlbum.loaded)
        {
          // in case the http-get already loaded json data, use that data...
          const videoAlbum = this.globals.json.videoAlbum;
          const features = this.globals.json.features;
          const languages = this.globals.json.languages;

          if (videoAlbum.loaded && features.loaded && languages.loaded)
          {
            this.videoAlbum.initialize(videoAlbum['data'], features['data']['videoAlbum'], languages['data']);
            this.communication.updateFeature('videoAlbum');
            this.detectUrlLanguage(params.get('url'));
          }
          else
          {
            console.warn('Ooops, something went wrong...', [videoAlbum, features, languages]);
            this.videoAlbum.loaded = false;
          }
          return of('');
        }
        else
        {
          // first time make an http-get to load data from json
          url = params.get('url');
          return from(this.http.get(this.globals.pathTo.videoAlbum).retry(3));
        }
      })
      .subscribe((json) =>
      {
        if (this.videoAlbum.loaded === false)
        {
          console.log('Json loaded!', [this.globals.pathTo.videoAlbum, json]);
          try
          {
            // store json content globally
            this.globals.json.videoAlbum['data'] = json['data'];
            this.globals.json.videoAlbum.loaded = true;

            const videoAlbum = this.globals.json.videoAlbum;
            const features = this.globals.json.features;
            const languages = this.globals.json.languages;

            if (features.loaded && languages.loaded)
            {
              this.videoAlbum.initialize(videoAlbum['data'], features['data']['videoAlbum'], languages['data']);
              this.communication.updateFeature('videoAlbum');
              this.detectUrlLanguage(url);
            }
          }
          catch (e)
          {
            console.warn('Ooops, something went wrong...', [e]);
            this.videoAlbum.loaded = false;
          }
        }

        // seo
        this.page.updateTitle(this.i18n.translate(this.videoAlbum.feature, 'title'));
        this.page.updateDescription(this.i18n.translate(this.videoAlbum.content, 'title'));

        console.log('-->');
      },
      (e) =>
      {
        console.warn('Ooops, something went wrong...', [e]);
        this.videoAlbum.loaded = false;
      }
    );
  }

  private detectUrlLanguage(url: string): void
  {
    const id = this.url.detectedUrlLanguage(url, this.videoAlbum.feature, this.videoAlbum.languages);

    // if the url language isn't detected, redirect to default url, otherwise update language...
    (id === '') ? this.navigateToVideoAlbum() : this.communication.updateLanguage(id);
  }

  private navigateToVideoAlbum(): void
  {
    this.router.navigate([this.globals.routes.videoAlbum + this.i18n.translate(this.videoAlbum.feature, 'route')]);
  }

  ngOnDestroy()
  {
    this.subscription.unsubscribe();
  }
}
