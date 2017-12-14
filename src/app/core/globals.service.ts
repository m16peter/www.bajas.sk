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
    home: '/'
  };

  // path to jsons (read only)
  public pathTo =
  {
    general: 'assets/app/general.json',
    features: 'assets/app/features.json',
    languages: 'assets/app/languages.json',
    home: 'assets/home/home.json'
  };

  // browser setup (read only)
  public browserSetup =
  {
    localStorageId: 'app-language',
    pageTitle: 'Angular 5',
    metaDescription: 'Angular - one framework to rule them all!'
  };

  // json data (read only)
  public json =
  {
    general: { loaded: false },
    languages: { loaded: false },
    features: { loaded: false },
    home: { loaded: false }
  };
}
