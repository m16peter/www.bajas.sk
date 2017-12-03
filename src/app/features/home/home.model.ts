import { Feature } from '@app/features.model';

export class Home
{
  public feature: Feature;
  public height: number;
  public loaded: boolean;

  constructor()
  {
    this.init();
  }

  private init(): void
  {
    this.feature = new Feature();
    this.height = 0;
    this.loaded = false;
  }

  public initialize(json: any): void
  {
    try
    {
      this.feature = json['data']['feature'];
      this.loaded = true;
    }
    catch (e)
    {
      console.log("Ooops, something went wrong!");
      this.init();
    }
  }
}
