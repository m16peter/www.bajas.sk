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
import { VideoArchive } from './video-archive.model';

@Component({
  selector: 'app-video-archive',
  templateUrl: 'video-archive.view.html',
  styleUrls: ['video-archive.style.scss']
})
export class VideoArchiveComponent implements OnInit, OnDestroy {
  public videoArchive = new VideoArchive();
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
    this.subscription = this.communication.onLanguageChanged$.subscribe(() => this.navigate());
  }

  ngOnInit() {
    let languageId: string;

    this.route.paramMap
      .switchMap((params: ParamMap) => {
        // console.log('<!--');

        if (this.videoArchive.loaded) {
          // on languageId params change, validate & verify languageId language
          this.detectLanguageId(params.get('languageId'));
          return of('');
        } else if (this.globals.json.videoArchive.loaded) {
          // in case the http-get already loaded json data, use that data...
          const videoArchive = this.globals.json.videoArchive;
          const features = this.globals.json.features;
          const languages = this.globals.json.languages;

          if (videoArchive.loaded && features.loaded && languages.loaded) {
            this.videoArchive.initialize(videoArchive.data, features.data, languages.data);
            this.communication.updateFeature('videoArchive');
            this.detectLanguageId(params.get('languageId'));
          } else {
            console.warn('Error.');
            this.videoArchive.loaded = false;
          }
          return of('');
        } else {
          // first time make an http-get to load data from json
          languageId = params.get('languageId');
          return from(this.http.get(this.globals.pathTo.videoArchive).retry(3));
        }
      })
      .subscribe(
        json => {
          if (this.videoArchive.loaded === false) {
            // console.log('Json loaded!', [this.globals.pathTo.videoArchive, json]);
            try {
              // store json content globally
              this.globals.json.videoArchive.data = json['data'];
              this.globals.json.videoArchive.loaded = true;

              const videoArchive = this.globals.json.videoArchive;
              const features = this.globals.json.features;
              const languages = this.globals.json.languages;

              if (features.loaded && languages.loaded) {
                this.videoArchive.initialize(videoArchive.data, features.data, languages.data);
                this.communication.updateFeature('videoArchive');
                this.detectLanguageId(languageId);
              }
            } catch (e) {
              console.warn('Error: ', [e]);
              this.videoArchive.loaded = false;
            }
          }

          // seo
          this.page.updateTitle(this.i18n.translate(this.videoArchive.feature, 'title'));
          this.page.updateDescription(this.i18n.translate(this.videoArchive.content, 'title'));

          // console.log('-->');
        },
        e => {
          console.warn('Error: ', [e]);
          this.videoArchive.loaded = false;
        }
      );
  }

  private detectLanguageId(languageId: string): void {
    const id = this.url.detectedUrlLanguage(languageId, this.videoArchive.feature, this.videoArchive.languages);

    // if the url language isn't detected, redirect to default url, otherwise update default language...
    id === '' ? this.navigate() : this.communication.updateLanguage(id);
  }

  private navigate(): void {
    this.router.navigate([this.globals.routes.videoArchive + this.i18n.translate(this.videoArchive.feature, 'route')]);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
