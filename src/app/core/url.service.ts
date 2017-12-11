import { Injectable } from '@angular/core';

@Injectable()
export class UrlService
{
  public detectedUrlLanguage(url: string, feature: any, languages: any[]): string
  {
    try
    {
      console.log('Url detection:', [url, feature, languages]);

      if (feature['route-i18n'] !== undefined)
      {
        for (let i = 0; i < languages.length; i++)
        {
          if (feature['route-i18n'][languages[i].id] === url)
          {
            console.log('Url language:', [languages[i].id]);
            return (languages[i].id);
          }
        }
      }
      else if (feature['route'] !== url)
      {
        throw 'undefined';
      }
    }
    catch (e)
    {
      console.log('Ooops, something went wrong...', [e]);
      return ('');
    }

    console.log('Url language not detected', ['redirecting']);
    return ('');
  }
}
