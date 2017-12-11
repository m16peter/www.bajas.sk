export class App
{
  public features: any;
  public languages: any[];

  public featureKey: string;
  public languageId: string;

  public navigationState: boolean;
  public loaded: boolean;

  constructor()
  {
    this.features = {};
    this.languages = [];

    this.navigationState = false;
    this.loaded = false;
  }
}
