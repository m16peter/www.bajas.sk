export class VideoArchive
{
  public content: any;
  public video: any;

  public feature: any;
  public languages: any[];

  public loaded: boolean;

  constructor()
  {
    this.init();
  }

  private init(): void
  {
    this.content =
    {
      title: undefined,
      description: undefined
    };
    this.video =
    {
      id: undefined,
      img: undefined,
      title: undefined,
      topic: undefined
    };

    this.loaded = false;
  }

  public initialize(data: any, feature: any, languages: any[]): void
  {
    try
    {
      this.content = data['content'];
      this.video = data['video'];

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
