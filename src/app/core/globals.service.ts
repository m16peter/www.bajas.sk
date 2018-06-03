import { Injectable } from '@angular/core';

// GLOBAL VARIABLES
@Injectable()
export class GlobalsService {
  public app = {
    width: 0,
    height: 0,
    featureKey: '',
    languageId: '',
    boxSize: 0,
    cardSize: { w: 0, h: 0 }
  };

  // base routes
  public routes = {
    home: '/',
    videoArchive: 'video-archive/',
    photoArchive: 'photo-archive/'
  };

  // path to jsons
  public pathTo = {
    general: 'assets/app/general.json',
    features: 'assets/app/features.json',
    languages: 'assets/app/languages.json',
    home: 'assets/home/home.json',
    videoArchive: 'assets/video-archive/video-archive.json',
    photoArchive: 'assets/photo-archive/photo-archive.json'
  };

  // browser setup
  public browserSetup = {
    localStorageId: 'app-language',
    'title-i18n': {
      sk: 'bajas.sk',
      ro: 'bajas.sk'
    },
    'description-i18n': {
      sk: 'Stretnutie Slovákov z Rumunska žijúcich na Slovensku',
      ro: 'Întâlnirea creștinilor Romăni în Slovacia'
    }
  };

  // json data
  public json = {
    general: {
      loaded: false,
      data: {}
    },
    languages: {
      loaded: false,
      data: []
    },
    features: {
      loaded: false,
      data: []
    },
    home: {
      loaded: false,
      data: {}
    },
    videoArchive: {
      loaded: false,
      data: {
        videoArchive: []
      }
    },
    photoArchive: {
      loaded: false,
      data: {
        photoArchive: []
      }
    }
  };

  /**
   * Image source path
   *
   * @param {string} filename
   * @returns {string}
   * @memberof GlobalsService
   */
  public src(filename: string): string {
    return 'assets/app/img/' + filename;
  }

  /**
   * Image source path in url format
   *
   * @param {string} filename
   * @returns {string}
   * @memberof GlobalsService
   */
  public url(filename: string): string {
    return 'url("assets/app/img/' + filename + '")';
  }

  /**
   * Route
   *
   * @param {string} key
   * @returns {string}
   * @memberof GlobalsService
   */
  public route(key: string): string {
    return this.routes[key] + this.app.languageId;
  }
}
