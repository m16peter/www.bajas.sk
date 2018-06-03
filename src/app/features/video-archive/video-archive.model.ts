export class VideoArchive {
  public content: any;
  public videos: any[];
  public feature: any;
  public languages: any[];
  public loaded: boolean;

  constructor() {
    this.init();
  }

  private init(): void {
    this.content = {
      title: undefined,
      description: undefined
    };
    this.videos = [];
    this.loaded = false;
  }

  public initialize(data: any, features: any, languages: any[]): void {
    try {
      this.content = data['content'];
      this.videos = data['videos'];
      this.feature = features['videoArchive'];
      this.languages = languages;
      this.loaded = true;
    } catch (e) {
      console.warn('Error: ', [e]);
      this.init();
    }
  }
}
