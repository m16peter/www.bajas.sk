export class Home
{
  public features: any;
  public general: any;
  public news: any;

  public loaded: boolean;

  constructor()
  {
    this.init();
  }

  private init(): void
  {
    this.features = [];
    this.general = {};
    this.news = {};

    this.loaded = false;
  }

  public initialize(data: any, general: any, features: any): void
  {
    try
    {
      this.features = features;
      this.general = general;
      this.news = data['news'];

      this.loaded = true;
    }
    catch (e)
    {
      console.warn('Ooops, something went wrong...', [e]);
      this.init();
    }
  }
}
