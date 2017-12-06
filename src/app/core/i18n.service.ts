import { Injectable } from '@angular/core';

@Injectable()
export class I18nService
{
  public tryI18n(obj: any, key: string, language: string): any
  {
    try
    {
      if (obj[key] === undefined)
      {
        return (obj[key + '-i18n'][language]);
      }
      else
      {
        return (obj[key]);
      }
    }
    catch (e)
    {
      console.log('Ooops, something went wrong...');
      // console.log(obj);
      // console.log(key);
      // console.log(language);
      // console.log(e);
      return (undefined);
    }
  }
}
