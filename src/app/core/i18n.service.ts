import { Injectable } from '@angular/core';
import { GlobalsService } from '@app/core/globals.service';

@Injectable()
export class I18nService
{
  constructor(private globals: GlobalsService)
  {}

  public translate(obj: any, key: string): any
  {
    try
    {
      if (obj[key] === undefined)
      {
        return (obj[key + '-i18n'][this.globals.app.languageId]);
      }
      else
      {
        return (obj[key]);
      }
    }
    catch (e)
    {
      console.warn('Ooops, something went wrong...', [obj, key, this.globals.app.languageId, e]);
      return ('');
    }
  }
}
