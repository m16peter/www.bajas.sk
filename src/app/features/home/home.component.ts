// angular
import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';

// rxjs
import 'rxjs/add/operator/retry';

// app
import { AppCommunicationService } from '@app/app-communication.service';
import { GlobalsService } from '@app/core/globals.service';
import { I18nService } from '@app/core/i18n.service';
import { PageService } from '@app/core/page.service';
import { ScrollService } from '@app/core/scroll.service';

// others
import { Home } from './home.model';
import { Video } from '@app/shared/video/video.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.view.html',
  styleUrls: ['home.style.scss']
})

export class HomeComponent implements OnInit
{
  public home = new Home();
  public video = new Video();

  @ViewChild('scrollEl') el;

  constructor(
    private communication: AppCommunicationService,
    private cdr: ChangeDetectorRef,
    private globals: GlobalsService,
    private i18n: I18nService,
    private page: PageService,
    private scroll: ScrollService
  ) {
    this.communication.onScrollTo$
      .subscribe((section: number) =>
      {
        let position = (this.el.nativeElement.clientHeight * section);

        if (this.globals.app.width < 1024 || this.globals.app.height < 500)
        {
          position *= 2;
        }

        this.scroll.scrollTo(this.el, position);
      }
    );
  }

  ngOnInit()
  {
    // seo
    this.page.updateTitle(this.globals.browserSetup.pageTitle);
    this.page.updateDescription(this.globals.browserSetup.metaDescription);

    // load stored json data
    const home = this.globals.json.home;
    const general = this.globals.json.general;
    const features = this.globals.json.features;

    // initialize home component, use stored json data...
    if (home.loaded && general.loaded && features.loaded)
    {
      this.home.initialize(home['data'], general['data'], features['data']);
      this.video.initialize(this.home.videoArchive.video);
      this.communication.updateFeature('home');
    }
    else
    {
      console.warn('Ooops, something went wrong...', [home, general, features]);
    }
  }

  public route(key: string): string
  {
    const route = this.i18n.translate(this.home.features[key], 'route');

    if (route !== undefined)
    {
      return (this.globals.routes[key] + route);
    }
    return ('/');
  }

  public nextCard(): void
  {
    this.home.box.cardId++;
  }

  public previousCard(): void
  {
    this.home.box.cardId--;
  }

  public cardStatus(i: number): string
  {
    const index = this.home.box.cardId;

    if (i < index)
    {
      return ('card_next');
    }
    if (index === i)
    {
      return ('card_1');
    }
    else if (index + 1 === i)
    {
      return ('card_2');
    }
    else if (index + 2 === i)
    {
      return ('card_3');
    }
    else
    {
      return ('card_previous');
    }
  }

  public toggleVideoState(): void
  {
    this.video.isActive = !this.video.isActive;
  }

  public photoStatus(i: number): string
  {
    const len = this.home.photoArchive.album.length - 1;
    const index = this.home.box.photoId;

    if (index === i)
    {
      return ('img_1');
    }
    else if (i === ((index > 0) ? (index - 1) : len))
    {
      return ('img_previous');
    }
    else if (i === ((index < len) ? (index + 1) : 0))
    {
      return ('img_2');
    }
    else if (i === (((index + 1) < len) ? (index + 2) : (index - len + 1)))
    {
      return ('img_3');
    }
    else
    {
      return ('img_next');
    }
  }

  public nextPhoto(): void
  {
    const index = this.home.box.photoId;
    const len = this.home.photoArchive.album.length - 1;

    this.home.box.photoId = (index < len) ? (index + 1) : 0;
  }

  public scrollTo(): void
  {

  }
}
