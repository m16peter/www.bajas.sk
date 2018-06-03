export class Home {
  public features: any;
  public general: any;

  public announcements: any;
  public videoArchive: any;
  public photoArchive: any;
  public contact: any;

  public box: any;
  public loaded: boolean;

  constructor() {
    this.init();
  }

  private init(): void {
    this.features = [];
    this.general = {};

    this.announcements = {};
    this.videoArchive = {};
    this.photoArchive = {};
    this.contact = {};

    this.box = {
      cardId: 0,
      photoId: 0
    };
    this.loaded = false;
  }

  public initialize(data: any, general: any, features: any): void {
    try {
      this.features = features;
      this.general = general;

      this.announcements = data['announcements'];
      this.videoArchive = data['video-archive'];
      this.photoArchive = data['photo-archive'];
      this.contact = data['contact'];

      this.loaded = true;
    } catch (e) {
      console.warn('Ooops, something went wrong...', [e]);
      this.init();
    }
  }
}
