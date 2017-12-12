import { Injectable } from '@angular/core';

// GLOBAL VARIABLES
@Injectable()
export class GlobalsService
{
  public app =
  {
    width: 0,
    height: 0,
    featureKey: '',
    languageId: '',
    boxSize: 0,
    cardSize: 0
  };

  // base routes (read only)
  public routes =
  {
    home: '/',
    news: '01/',
    videoAlbum: '02/',
    photoAlbum: '03/',
    contact: '04/'
  };

  // path to jsons (read only)
  public pathTo =
  {
    general: 'assets/app/general.json',
    features: 'assets/app/features.json',
    languages: 'assets/app/languages.json',
    home: 'assets/home/home.json',
    news: 'assets/news/news.json',
    videoAlbum: 'assets/video-album/video-album.json',
    photoAlbum: 'assets/photo-album/photo-album.json',
    contact: 'assets/contact/contact.json'
  };

  // browser setup (read only)
  public browserSetup =
  {
    localStorageId: 'app-language',
    pageTitle: 'bajas.sk',
    metaDescription: 'Stretnutie Rumunskych veriacich zijucich na Slovensku'
  };

  // json data (read only)
  public json =
  {
    general: { loaded: false },
    languages: { loaded: false },
    features: { loaded: false },
    home: { loaded: false },
    news: { loaded: false },
    videoAlbum: { loaded: false },
    photoAlbum: { loaded: false },
    contact: { loaded: false }
  };
}
