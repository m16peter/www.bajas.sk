import { Injectable } from '@angular/core';

// GLOBAL VARIABLES
@Injectable()
export class GlobalsService
{
  // read-write
  public app =
  {
    'width': 0,
    'height': 0,
    'featureId': 0,
    'languageId': ''
  };

  // read only
  public routes =
  {
    'home': '/',
    'news': '01/'
  };

  // read only
  public pathTo =
  {
    'general': 'assets/app/general.json',
    'features': 'assets/app/features.json',
    'languages': 'assets/app/languages.json',
    'home': 'assets/home/home.json',
    'news': 'assets/news/news.json'
  };

  // read only
  public seo =
  {
    'page-title': 'bajas.sk',
    'meta-description': 'Stretnutie Rumunskych veriacich zijucich na Slovensku'
  };

  // read only
  public json =
  {
    'general':
    {
      'loaded': false
    },
    'languages':
    {
      'loaded': false
    },
    'features':
    {
      'loaded': false
    },
    'home':
    {
      'loaded': false
    },
    'news':
    {
      'loaded': false
    }
  };
}
