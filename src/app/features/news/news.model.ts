import { Feature } from '@app/features.model';

export class NewsCards
{
  public description: string;
  public descriptionI18n: any;
  public list: any[];

  constructor()
  {
    this.description = undefined;
    this.descriptionI18n = undefined;
    this.list = [];
  }
}

export class News
{
  public feature: Feature;
  public languages: string[];
  public loaded: boolean;
  public cards: NewsCards;
  public url: string;

  constructor()
  {
    this.init();
  }

  private init(): void
  {
    this.feature = new Feature();
    this.languages = [];
    this.loaded = false;
    this.cards = new NewsCards();
  }

  public initialize(json: any): void
  {
    try
    {
      console.log("Json loaded!", json);
      this.feature = json['data']['feature'];
      this.languages = json['data']['languages'];
      this.cards = json['data']['cards'];
    }
    catch (e)
    {
      console.log("Ooops, something went wrong!");
      this.init();
    }
  }
}
