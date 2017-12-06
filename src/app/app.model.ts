export class Language
{
  public id: string;
  public icon: string;
  public title: string;

  constructor()
  {
    this.id = undefined;
    this.icon = undefined;
    this.title = undefined;
  }
}

export class Feature
{
  public id: number;
  public module: string;
  public route: string;
  public title: string;

  constructor()
  {
    this.id = undefined;
    this.module = undefined;
    this.route = undefined;
    this.title = undefined;
  }
}

export class App
{
  public languages: Language[];
  public languageId: string;
  public loaded: boolean;
  public features: Feature[];
  public featureId: number;
  public navigationState: boolean;

  constructor()
  {
    this.languages = [];
    this.languageId = undefined;
    this.loaded = false;
    this.features = [];
    this.featureId = 0;
    this.navigationState = false;
  }
}
