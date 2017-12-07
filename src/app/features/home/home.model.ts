import { Feature } from '@app/app.model';

export class Home
{
  public features: Feature[];
  public featureId: number;
  public general: Object;
  public loaded: boolean;
  public news: any;

  constructor()
  {
    this.init();
  }

  private init(): void
  {
    this.features = [];
    this.featureId = 0;
    this.general = {};
    this.loaded = false;
    this.news =
    {
      'content': {},
      'cards': []
    };
  }

  public initialize(data: any, general: any, features: Feature[]): void
  {
    try
    {
      this.features = features;
      this.featureId = data['featureId'];
      this.general = general;
      this.news = data['news'];
      this.loaded = true;
    }
    catch (e)
    {
      console.log('Ooops, something went wrong...');
      this.init();
    }
  }
}
