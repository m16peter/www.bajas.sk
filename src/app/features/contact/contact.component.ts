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
import { Contact } from './contact.model';

@Component({
  selector: 'app-contact',
  templateUrl: 'contact.view.html',
  styleUrls: ['contact.style.scss']
})

export class ContactComponent implements OnInit, OnDestroy
{
  public contact = new Contact();
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
    this.subscription = this.communication.onLanguageChanged$.subscribe(() => this.navigateToContact());
  }

  ngOnInit()
  {
    let url: any;

    this.route.paramMap
      .switchMap((params: ParamMap) =>
      {
        console.log('<!--');

        if (this.contact.loaded)
        {
          // on url params change, validate & verify url language
          this.detectUrlLanguage(params.get('url'));
          return of('');
        }
        else if (this.globals.json.contact.loaded)
        {
          // in case the http-get already loaded json data, use that data...
          const contact = this.globals.json.contact;
          const features = this.globals.json.features;
          const languages = this.globals.json.languages;

          if (contact.loaded && features.loaded && languages.loaded)
          {
            this.contact.initialize(contact['data'], features['data']['contact'], languages['data']);
            this.communication.updateFeature('contact');
            this.detectUrlLanguage(params.get('url'));
          }
          else
          {
            console.warn('Ooops, something went wrong...', [contact, features, languages]);
            this.contact.loaded = false;
          }
          return of('');
        }
        else
        {
          // first time make an http-get to load data from json
          url = params.get('url');
          return from(this.http.get(this.globals.pathTo.contact).retry(3));
        }
      })
      .subscribe((json) =>
      {
        if (this.contact.loaded === false)
        {
          console.log('Json loaded!', [this.globals.pathTo.contact, json]);
          try
          {
            // store json content globally
            this.globals.json.contact['data'] = json['data'];
            this.globals.json.contact.loaded = true;

            const contact = this.globals.json.contact;
            const features = this.globals.json.features;
            const languages = this.globals.json.languages;

            if (features.loaded && languages.loaded)
            {
              this.contact.initialize(contact['data'], features['data']['contact'], languages['data']);
              this.communication.updateFeature('contact');
              this.detectUrlLanguage(url);
            }
          }
          catch (e)
          {
            console.warn('Ooops, something went wrong...', [e]);
            this.contact.loaded = false;
          }
        }

        // seo
        this.page.updateTitle(this.i18n.translate(this.contact.feature, 'title'));
        this.page.updateDescription(this.i18n.translate(this.contact.content, 'title'));

        console.log('-->');
      },
      (e) =>
      {
        console.warn('Ooops, something went wrong...', [e]);
        this.contact.loaded = false;
      }
    );
  }

  private detectUrlLanguage(url: string): void
  {
    const id = this.url.detectedUrlLanguage(url, this.contact.feature, this.contact.languages);

    // if the url language isn't detected, redirect to default url, otherwise update language...
    (id === '') ? this.navigateToContact() : this.communication.updateLanguage(id);
  }

  private navigateToContact(): void
  {
    this.router.navigate([this.globals.routes.contact + this.i18n.translate(this.contact.feature, 'route')]);
  }

  ngOnDestroy()
  {
    this.subscription.unsubscribe();
  }
}
