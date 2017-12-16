// angular
import { Component, ChangeDetectorRef, OnInit, AfterViewInit, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// rxjs
import 'rxjs/add/operator/retry';

// app
import { AppCommunicationService } from '@app/app-communication.service';
import { AppService } from '@app/app.service';
import { GlobalsService } from '@app/core/globals.service';
import { I18nService } from '@app/core/i18n.service';

// others
import { App } from './app.model';

@Component({
  selector: 'app-root',
  templateUrl: 'app.view.html',
  styleUrls: ['app.style.scss'],
  providers: [ AppCommunicationService ]
})

export class AppComponent implements OnInit, AfterViewInit
{
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
    private i18n: I18nService
  ) {
    this.communication.onUpdateLanguage$
      .subscribe((languageId) => this.selectLanguage(languageId));

    this.communication.onUpdateFeature$
      .subscribe((featureKey) => this.selectFeature(featureKey));
  }

  ngOnInit()
  {
    this.initLanguages();
    this.initFeatures();
    this.initGeneral();
    this.initHome();
  }

  ngAfterViewInit()
  {
    this.handleResize();
    this.cdr.detectChanges();
  }

  private initFeatures(): void
  {
    this.http.get(this.globals.pathTo.features).retry(3).subscribe((json) =>
    {
      try
      {
        console.log('Json loaded!', [this.globals.pathTo.features, json]);
        this.globals.json.features['data'] = json['data']['features'];
        this.globals.json.features.loaded = true;
        this.initialize();
      }
      catch (e)
      {
        console.warn('Ooops, something went wrong...', [e, json]);
      }
    },
    (e) =>
    {
      console.warn('Ooops, something went wrong...', [e]);
    });
  }

  private initLanguages(): void
  {
    this.http.get(this.globals.pathTo.languages).retry(3).subscribe((json) =>
    {
      try
      {
        console.log('Json loaded!', [this.globals.pathTo.languages, json]);
        this.globals.json.languages['data'] = json['data']['languages'];
        this.globals.json.languages.loaded = true;
        this.initialize();
      }
      catch (e)
      {
        console.log('Ooops, something went wrong...', [e, json]);
      }
    },
    (e) =>
    {
      console.log('Ooops, something went wrong...', [e]);
    });
  }

  private initGeneral(): void
  {
    this.http.get(this.globals.pathTo.general).retry(3).subscribe((json) =>
    {
      try
      {
        console.log('Json loaded!', [this.globals.pathTo.general, json]);
        this.globals.json.general['data'] = json['data']['general'];
        this.globals.json.general.loaded = true;
        this.initialize();
      }
      catch (e)
      {
        console.warn('Ooops, something went wrong...', [e, json]);
      }
    },
    (e) =>
    {
      console.warn('Ooops, something went wrong...', [e]);
    });
  }

  private initHome(): void
  {
    this.http.get(this.globals.pathTo.home).retry(3).subscribe((json) =>
    {
      try
      {
        console.log('Json loaded!', [this.globals.pathTo.home, json]);
        this.globals.json.home['data'] = json['data'];
        this.globals.json.home.loaded = true;
        this.initialize();
      }
      catch (e)
      {
        console.warn('Ooops, something went wrong...', [e, json]);
      }
    },
    (e) =>
    {
      console.warn('Ooops, something went wrong...', [e]);
    });
  }

  private initialize(): void
  {
    if (this.globals.json.languages.loaded)
    {
      if (this.globals.json.features.loaded)
      {
        if (this.globals.json.general.loaded)
        {
          if (this.globals.json.home.loaded)
          {
            // initialize from stored json data
            this.app.features = this.globals.json.features['data'];
            this.app.languages = this.globals.json.languages['data'];

            this.selectLanguage(this.appService.initLanguage(this.app.languages));
            this.selectFeature('home');
            this.app.loaded = true;
          }
        }
      }
    }
  }

  private handleResize(): void
  {
    this.globals.app.width = window.innerWidth;
    this.globals.app.height = window.innerHeight;
    this.globals.app.boxSize = box(this.globals.app.width, this.globals.app.height);
    this.globals.app.cardSize.w = cardW(this.globals.app.width, this.globals.app.height);
    this.globals.app.cardSize.h = cardH(this.globals.app.width, this.globals.app.height);

    function box(w, h)
    {
      return ((w < 1024 || h < 500) ? (w) : (w / 2));
    }

    function cardW(w, h)
    {
      if (w < 1024 || h < 500) {
        return (w - 100);
      }
      return((w - 200) / 2);
    }

    function cardH(w, h)
    {
      if (w < 1024 && h >= 500) {
        return (h - 200);
      }
      return (h - 100);
    }
  }

  public selectLanguage(languageId: string): void
  {
    if (this.app.languageId !== languageId)
    {
      console.log('Language changed:', [this.app.languageId, '->', languageId]);
      this.globals.app.languageId = this.app.languageId = languageId;
      this.appService.updateLanguage(languageId);
      this.communication.languageChanged();
      this.cdr.detectChanges();
    }
  }

  public selectFeature(featureKey: string): void
  {
    if (this.app.featureKey !== featureKey)
    {
      console.log('Feature changed:', [this.app.featureKey, '->', featureKey]);
      this.globals.app.featureKey = this.app.featureKey = featureKey;
      this.cdr.detectChanges();
    }
  }

  public toggleMenu(): void
  {
    this.app.navigationState = !this.app.navigationState;
  }

  public languageStatus(id: string): string
  {
    return ((id === this.app.languageId) ? 'language_active' : '');
  }

  public route(key: string): string
  {
    const route = this.i18n.translate(this.app.features[key], 'route');

    if (route !== undefined)
    {
      return (this.globals.routes[key] + route);
    }
    return ('/');
  }

  public scrollTo(section: number): void
  {
    this.toggleMenu();
    this.communication.scrollTo(section);
  }
}
