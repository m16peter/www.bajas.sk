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
export class PhotoArchiveComponent implements OnInit, OnDestroy {
  public photoArchive = new PhotoArchive();
  private subscription: Subscription;

  constructor(
    private communication: AppCommunicationService,
    private cdr: ChangeDetectorRef,
    private globals: GlobalsService,
    private http: HttpClient,
    public i18n: I18nService,
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

        if (this.photoArchive.loaded) {
          // on languageId params change, validate & verify languageId language
          this.detectLanguageId(params.get('languageId'));
          return of('');
        } else if (this.globals.json.photoArchive.loaded) {
          // in case the http-get already loaded json data, use that data...
          const photoArchive = this.globals.json.photoArchive;
          const features = this.globals.json.features;
          const languages = this.globals.json.languages;

          if (photoArchive.loaded && features.loaded && languages.loaded) {
            this.photoArchive.initialize(photoArchive.data, features.data, languages.data);
            this.communication.updateFeature('photoArchive');
            this.detectLanguageId(params.get('languageId'));
          } else {
            console.warn('Error.');
            this.photoArchive.loaded = false;
          }
          return of('');
        } else {
          // first time make an http-get to load data from json
          languageId = params.get('languageId');
          return from(this.http.get(this.globals.pathTo.photoArchive).retry(3));
        }
      })
      .subscribe(
        json => {
          if (this.photoArchive.loaded === false) {
            // console.log('Json loaded!', [this.globals.pathTo.photoArchive, json]);
            try {
              // store json content globally
              this.globals.json.photoArchive.data = json['data'];
              this.globals.json.photoArchive.loaded = true;

              const photoArchive = this.globals.json.photoArchive;
              const features = this.globals.json.features;
              const languages = this.globals.json.languages;

              if (features.loaded && languages.loaded) {
                this.photoArchive.initialize(photoArchive.data, features.data, languages.data);
                this.communication.updateFeature('photoArchive');
                this.detectLanguageId(languageId);
              }
            } catch (e) {
              console.warn('Error: ', [e]);
              this.photoArchive.loaded = false;
            }
          }

          // seo
          this.page.updateTitle(this.i18n.translate(this.photoArchive.feature, 'title'));
          this.page.updateDescription(this.i18n.translate(this.photoArchive.content, 'title'));

          // console.log('-->');
        },
        e => {
          console.warn('Error: ', [e]);
          this.photoArchive.loaded = false;
        }
      );
  }

  private detectLanguageId(languageId: string): void {
    const id = this.url.detectedUrlLanguage(languageId, this.photoArchive.feature, this.photoArchive.languages);

    // if the url language isn't detected, redirect to default url, otherwise update default language...
    id === '' ? this.navigate() : this.communication.updateLanguage(id);
  }

  private navigate(): void {
    this.router.navigate([this.globals.routes.photoArchive + this.i18n.translate(this.photoArchive.feature, 'route')]);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
