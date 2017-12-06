export class Home
{
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
    this.featureId = undefined;
    this.general = {};
    this.loaded = false;
    this.news =
    {
      'content': {},
      'cards': []
    };
  }

  public initialize(data: any, general: any): void
  {
    try
    {
      this.featureId = data['featureId'];
      this.general = general;
      this.news = data['news'];
      this.loaded = true;
    }
    catch (e)
    {
      console.log("Ooops, something went wrong!");
      this.init();
    }
  }
}
