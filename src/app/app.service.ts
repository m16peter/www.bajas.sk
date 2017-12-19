// angular
import { Injectable } from '@angular/core';

// app
import { LocalStorageService } from '@app/core/local-storage.service';
import { GlobalsService } from '@app/core/globals.service';

@Injectable()
export class AppService
{
  constructor(
    private localStorage: LocalStorageService,
    private globals: GlobalsService
  ) {}

  public initLanguage(languages: any[]): string
  {
    // Check the Local Storage for language
    const localStorageLanguage = this.localStorage.getItem(this.globals.browserSetup.localStorageId);

    if (localStorageLanguage)
    {
      const language = this.selectLanguage(localStorageLanguage, languages);

      if (language !== undefined)
      {
        // console.log('language:', [language, 'source: local-storage']);
        this.updateLanguage(language);
        return (language);
      }
    }

    // Initialize default language
    return (this.getDefaultLanguage(languages));
  }

  private getDefaultLanguage(languages: any[]): string
  {
    // Check users browser language preferences
    const browserLanguage = window.navigator.language;

    if (browserLanguage)
    {
      const language = this.selectLanguage(browserLanguage, languages);

      if (language !== undefined)
      {
        // console.log('language:', [language, 'source: browser']);
        this.updateLanguage(language);
        return (language);
      }
    }

    // Just set the first available language as default
    // console.log('language:', [languages[0].id, 'source: json']);
    this.updateLanguage(languages[0].id);
    return (languages[0].id);
  }

  private selectLanguage(language: string, languages: any[]): string
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
    this.localStorage.setItem(this.globals.browserSetup.localStorageId, language);
    window.document.documentElement.lang = language;
  }
}
