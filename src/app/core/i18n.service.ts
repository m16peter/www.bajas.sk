import { Injectable } from '@angular/core';
import { GlobalsService } from '@app/core/globals.service';

@Injectable()

export class I18nService {

  constructor(private globals: GlobalsService) {}

  /**
   * Translate - example: { 'obj-i18n': { 'key': 'value' } }
   *
   * @param {*} obj - 'obj-i18n'
   * @param {string} key - 'key'
   * @returns {string} - 'value'
   * @memberof I18nService
   */
  public translate(obj: any, key: string): string {
    try {
      if (obj[key] === undefined) {
        return obj[key + '-i18n'][this.globals.app.languageId];
      } else {
        return obj[key];
      }
    } catch (e) {
      console.warn('Error: ', [e]);
    }
    return '';
  }
}
