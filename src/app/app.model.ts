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
  public features: Feature[];
  public languages: Language[];

  public featureId: number;
  public languageId: string;

  public navigationState: boolean;
  public loaded: boolean;

  constructor()
  {
    this.features = [];
    this.languages = [];

    this.languageId = '';
    this.featureId = 0;

    this.navigationState = false;
    this.loaded = false;
  }
}
