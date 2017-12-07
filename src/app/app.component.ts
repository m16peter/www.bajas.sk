import { Component, ChangeDetectorRef, OnInit, AfterViewInit, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/retry';

import { routerTransition } from './router.transition';

import { AppCommunicationService } from '@app/app-communication.service';
import { AppService } from '@app/app.service';
import { GlobalsService } from '@app/core/globals.service';
import { I18nService } from '@app/core/i18n.service';

import { App, Language, Feature } from './app.model';

@Component({
  selector: 'app-root',
  templateUrl: 'app.view.html',
  styleUrls: ['app.style.scss'],
  animations: [
    routerTransition
  ],
  providers: [
    AppCommunicationService
  ]
})

export class AppComponent implements OnInit, AfterViewInit
{
  public app: App;

  @HostListener('window:resize') onResize() {
    this.handleResize();
  }

  constructor(
    private appCommunication: AppCommunicationService,
    private appService: AppService,
    private cdr: ChangeDetectorRef,
    private globals: GlobalsService,
    private http: HttpClient,
    private i18nService: I18nService
  ) {
    this.app = new App();

    this.appCommunication.onUpdateAppLanguage$
      .subscribe(() => this.selectLanguage(this.globals.app.languageId)
    );
    this.appCommunication.onUpdateAppFeature$
      .subscribe(() => this.selectFeature(this.globals.app.featureId)
    );
  }

  ngOnInit()
  {
    this.http.get(this.globals.pathTo.app).retry(3).subscribe((json) =>
    {
      try
      {
        this.globals.json.app['data'] = json['data']['app'];
        this.globals.json.app.loaded = true;

        this.globals.json.features['data'] = json['data']['features'];
        this.globals.json.features.loaded = true;

        this.globals.json.languages['data'] = json['data']['languages'];
        this.globals.json.languages.loaded = true;

        this.globals.json.home['data'] = json['data']['home'];
        this.globals.json.home.loaded = true;

        this.app.languages = this.globals.json.languages['data'];
        this.app.features = this.globals.json.features['data'];

        if (this.app.languages.length > 0 && this.app.features.length > 0)
        {
           // initialize language
          this.selectLanguage(this.appService.initLanguage(this.app.languages));

           // initialize feature
          this.selectFeature(0);

          this.app.loaded = true;
          this.cdr.detectChanges();
        }
        else
        {
          console.log('Ooops, something went wrong...');
        }
      }
      catch (e)
      {
        console.log('Ooops, something went wrong...', e);
      }
    },
    (e) =>
    {
      console.log('Ooops, something went wrong...', e);
    });
  }

  ngAfterViewInit()
  {
    this.handleResize();
    this.cdr.detectChanges();
  }

  private handleResize(): void
  {
    this.globals.app.width = window.innerWidth;
    this.globals.app.height = window.innerHeight;
  }

  public i18n(obj: any, key: string): any
  {
    return this.i18nService.tryI18n(obj, key, this.globals.app.languageId);
  }

  public selectLanguage(languageId: string): void
  {
    if (this.app.languageId !== languageId)
    {
      console.log('Language changed:', this.app.languageId, '->', languageId);
      this.globals.app.languageId = this.app.languageId = languageId;
      this.appService.updateLanguage(languageId);
      this.appCommunication.changeAppLanguage();
      this.cdr.detectChanges();
    }
  }

  public selectFeature(featureId: number): void
  {
    if (this.app.featureId !== featureId)
    {
      console.log('Feature changed:', this.app.featureId, '->', featureId);
      this.globals.app.featureId = this.app.featureId = featureId;
      this.cdr.detectChanges();
    }
  }

  public parseRoute(feature: Feature): string
  {
    return (this.appService.getRoute(feature.module) + this.i18n(feature, 'route'));
  }

  public toggleMenu(): void
  {
    this.app.navigationState = !this.app.navigationState;
  }

  public featureStatus(id: number): string
  {
    return ((id === this.app.featureId) ? 'feature_active' : '');
  }

  public languageStatus(id: string): string
  {
    return ((id === this.app.languageId) ? 'language_active' : '');
  }

  public getState(outlet)
  {
    return outlet.activatedRouteData.state;
  }
}
