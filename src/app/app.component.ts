// angular
import { Component, ChangeDetectorRef, OnInit, AfterViewInit, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@app/../environments/environment';

// rxjs
import 'rxjs/add/operator/retry';

// app
import { AppCommunicationService } from '@app/app-communication.service';
import { AppService } from '@app/app.service';
import { GlobalsService } from '@app/core/globals.service';
import { I18nService } from '@app/core/i18n.service';

// others
import { routerTransition } from './router.transition';
import { App } from './app.model';

@Component({
  selector: 'app-root',
  templateUrl: 'app.view.html',
  styleUrls: ['app.style.scss'],
  animations: [routerTransition],
  providers: [AppCommunicationService]
})
export class AppComponent implements OnInit, AfterViewInit {

  public app = new App();

  @HostListener('window:resize') onResize() {
    this.handleResize();
  }

  constructor(
    private communication: AppCommunicationService,
    private appService: AppService,
    private cdr: ChangeDetectorRef,
    private globals: GlobalsService,
    private http: HttpClient,
    public i18n: I18nService
  ) {
    this.communication.onUpdateLanguage$.subscribe(languageId => this.selectLanguage(languageId));
    this.communication.onUpdateFeature$.subscribe(featureKey => this.selectFeature(featureKey));
  }

  ngOnInit() {
    this.initLanguages();
    this.initFeatures();
    this.initGeneral();
    this.initHome();
  }

  ngAfterViewInit() {
    this.handleResize();
    this.cdr.detectChanges();
  }

  private initFeatures(): void {
    this.http
      .get(this.globals.pathTo.features)
      .retry(3)
      .subscribe(
        json => {
          try {
            !environment.production ? console.log('Json loaded!', [this.globals.pathTo.features, json]) : (function() {})();
            this.globals.json.features.data = json['data']['features'];
            this.globals.json.features.loaded = true;
            this.initialize();
          } catch (e) {
            !environment.production ? console.warn('Error: ', [e]) : (function() {})();
          }
        },
        e => {
          !environment.production ? console.warn('Error: ', [e]) : (function() {})();
        }
      );
  }

  private initLanguages(): void {
    this.http
      .get(this.globals.pathTo.languages)
      .retry(3)
      .subscribe(
        json => {
          try {
            !environment.production ? console.log('Json loaded!', [this.globals.pathTo.languages, json]) : (function() {})();
            this.globals.json.languages.data = json['data']['languages'];
            this.globals.json.languages.loaded = true;
            this.initialize();
          } catch (e) {
            !environment.production ? console.warn('Error: ', [e]) : (function() {})();
          }
        },
        e => {
          !environment.production ? console.warn('Error: ', [e]) : (function() {})();
        }
      );
  }

  private initGeneral(): void {
    this.http
      .get(this.globals.pathTo.general)
      .retry(3)
      .subscribe(
        json => {
          try {
            !environment.production ? console.log('Json loaded!', [this.globals.pathTo.general, json]) : (function() {})();
            this.globals.json.general.data = json['data']['general'];
            this.globals.json.general.loaded = true;
            this.initialize();
          } catch (e) {
            !environment.production ? console.warn('Error: ', [e]) : (function() {})();
          }
        },
        e => {
          !environment.production ? console.warn('Error: ', [e]) : (function() {})();
        }
      );
  }

  private initHome(): void {
    this.http
      .get(this.globals.pathTo.home)
      .retry(3)
      .subscribe(
        json => {
          try {
            !environment.production ? console.log('Json loaded!', [this.globals.pathTo.home, json]) : (function() {})();
            this.globals.json.home.data = json['data'];
            this.globals.json.home.loaded = true;
            this.initialize();
          } catch (e) {
            !environment.production ? console.warn('Error: ', [e]) : (function() {})();
          }
        },
        e => {
          !environment.production ? console.warn('Error: ', [e]) : (function() {})();
        }
      );
  }

  private initialize(): void {
    if (this.globals.json.languages.loaded) {
      if (this.globals.json.features.loaded) {
        if (this.globals.json.general.loaded) {
          if (this.globals.json.home.loaded) {
            // initialize from stored json data
            this.app.features = this.globals.json.features.data;
            this.app.languages = this.globals.json.languages.data;

            this.selectLanguage(this.appService.initLanguage(this.app.languages));
            this.selectFeature('home');
            this.app.loaded = true;
          }
        }
      }
    }
  }

  private handleResize(): void {
    this.globals.app.width = window.innerWidth;
    this.globals.app.height = window.innerHeight;
    this.globals.app.boxSize = this.globals.app.width < 1024 ? this.globals.app.width : this.globals.app.width / 2;
    this.globals.app.cardSize.w = cardWidth(this.globals.app.width);
    this.globals.app.cardSize.h = cardHeight(this.globals.app.width, this.globals.app.height);

    function cardWidth(w) {
      return w < 1024 ? w - 75 : (w - 200) / 2;
    }
    function cardHeight(w, h) {
      return w < 1024 && h < 500 ? h - 100 : w < 1024 ? h - 200 : h - 100;
    }
  }

  public selectLanguage(languageId: string): void {
    if (this.app.languageId !== languageId) {
      !environment.production ? console.log('Language changed:', [this.app.languageId, '->', languageId]) : (function() {})();
      this.globals.app.languageId = this.app.languageId = languageId;
      this.appService.updateLanguage(languageId);
      this.communication.languageChanged();
      this.cdr.detectChanges();
    }
  }

  public selectFeature(featureKey: string): void {
    if (this.app.featureKey !== featureKey) {
      !environment.production
        ? console.log('Feature changed:', [this.app.featureKey, '->', featureKey])
        : (function() {})();
      this.globals.app.featureKey = this.app.featureKey = featureKey;
      this.cdr.detectChanges();
    }
  }

  public toggleMenu(): void {
    this.app.navigationState = !this.app.navigationState;
  }

  public languageStatus(id: string): string {
    return id === this.app.languageId ? 'language_active' : '';
  }

  public getState(outlet): any {
    return outlet.activatedRouteData.state;
  }

  public scrollTo(section: number): void {
    this.toggleMenu();
    setTimeout(() => this.communication.scrollTo(section), 100);
  }
}
