export class Home
{
  public features: any;
  public general: any;
  public news: any;
  public videoAlbum: any;
  public photoAlbum: any;
  public contact: any;

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
    this.videoAlbum = {};
    this.photoAlbum = {};
    this.contact = {};

    this.loaded = false;
  }

  public initialize(data: any, general: any, features: any): void
  {
    console.log(data);
    try
    {
      this.features = features;
      this.general = general;
      this.news = data['news'];
      this.videoAlbum = data['video-album'];
      this.photoAlbum = data['photo-album'];
      this.contact = data['contact'];

      this.loaded = true;
    }
    catch (e)
    {
      console.warn('Ooops, something went wrong...', [e]);
      this.init();
    }
  }
}
