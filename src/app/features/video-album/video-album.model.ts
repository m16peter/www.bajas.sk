export class VideoAlbum
{
  public albums: any[];
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
    this.albums = [];
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
      this.albums = data['albums'];
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
