import { Injectable } from '@angular/core'

import { Feature } from '@app/app.model';

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
    'app': 'assets/app/app.json',
    'news': 'assets/app/news.json'
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
    'app':
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
    },
    'video-album':
    {
      'loaded': false
    },
    'photo-album':
    {
      'loaded': false
    },
    'contact':
    {
      'loaded': false
    }
  };
}
