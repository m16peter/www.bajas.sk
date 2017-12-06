import { Feature, Language } from '@app/app.model';

export class News
{
  public cards: any;
  public content: any;
  public features: Feature[];
  public featureId: number;
  public languages: Language[];
  public loaded: boolean;
  public url: string;

  constructor()
  {
    this.init();
  }

  private init(): void
  {
    this.cards =
    {
      'list': []
    };
    this.content =
    {
      'description': undefined
    };
    this.featureId = undefined;
    this.loaded = false;
  }

  public initialize(data: any, features: Feature[], languages: Language[]): void
  {
    try
    {
      this.cards = data['cards'];
      this.content = data['content'];
      this.features = features;
      this.featureId = data['featureId'];
      this.languages = languages;
      this.loaded = true;
    }
    catch (e)
    {
      console.log('Ooops, something went wrong...');
      this.init();
    }
  }
}
