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
    languageId: ''
  };

  // base routes (read only)
  public routes =
  {
    home: '/',
    news: '01/'
  };

  // path to jsons (read only)
  public pathTo =
  {
    general: 'assets/app/general.json',
    features: 'assets/app/features.json',
    languages: 'assets/app/languages.json',
    home: 'assets/home/home.json',
    news: 'assets/news/news.json'
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
    general:
    {
      loaded: false
    },
    languages:
    {
      loaded: false
    },
    features:
    {
      loaded: false
    },
    home:
    {
      loaded: false
    },
    news:
    {
      loaded: false
    }
  };
}
