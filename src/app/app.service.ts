import { Injectable } from '@angular/core';

import { LocalStorageService } from '@app/core/local-storage.service';
import { GlobalsService } from '@app/core/globals.service';

import { Language } from '@app/app.model';

const config =
{
  'local-storage-id': 'app-language'
};

@Injectable()
export class AppService
{
  constructor(
    private globals: GlobalsService,
    private localStorage: LocalStorageService
  ) {}

  public initLanguage(languages: Language[]): string
  {
    // Check the Local Storage for language
    const localStorageLanguage = this.localStorage.getItem(config['local-storage-id']);

    if (localStorageLanguage)
    {
      const language = this.selectLanguage(localStorageLanguage, languages);

      if (language !== undefined)
      {
        console.log('lang (source: local-storage):', language);
        this.updateLanguage(language);
        return (language);
      }
    }

    // Initialize default language
    return (this.getDefaultLanguage(languages));
  }

  private getDefaultLanguage(languages: Language[]): string
  {
    // Check users browser language preferences
    const browserLanguage = window.navigator.language;

    if (browserLanguage)
    {
      const language = this.selectLanguage(browserLanguage, languages);

      if (language !== undefined)
      {
        console.log('(source: browser) language:', language);
        this.updateLanguage(language);
        return (language);
      }
    }

    // Just set the first available language as default
    console.log('(source: json) language:', languages[0].id);
    this.updateLanguage(languages[0].id);
    return (languages[0].id);
  }

  private selectLanguage(language: string, languages: Language[]): string
  {
    for (let i = 0; i < languages.length; i++)
    {
      if (language === languages[i].id)
      {
        return (language);
      }
    }
    return (undefined);
  }

  public updateLanguage(language: string): void
  {
    this.localStorage.setItem(config['local-storage-id'], language);
    window.document.documentElement.lang = language;
  }

  public getRoute(module: string): string
  {
    switch (module)
    {
      case 'home': return (this.globals.routes.home);
      case 'news': return (this.globals.routes.news);
      default: return (this.globals.routes.home);
    }
  }
}
