export class PhotoArchive
{
  public album: any;
  public content: any;

  public feature: any;
  public languages: any[];

  public loaded: boolean;

  constructor()
  {
    this.init();
  }

  private init(): void
  {
    this.album = {};
    this.content =
    {
      title: undefined,
      description: undefined
    };

    this.loaded = false;
  }

  public initialize(data: any, feature: any, languages: any[]): void
  {
    try
    {
      this.album = data['album'];
      this.content = data['content'];

      this.feature = feature;
      this.languages = languages;

      this.loaded = true;
    }
    catch (e)
    {
      console.warn('Ooops, something went wrong...', [e]);
      this.init();
    }
  }
}
