export class Video
{
  public id: string;
  public image: string;
  public title: string;
  public topic: string;
  public state: number;
  public isActive: boolean;
  public isLoading: boolean;

  constructor()
  {
    this.id = '';
    this.image = '';
    this.title = '';
    this.topic = '';
    this.state = 0;
    this.isActive = false;
    this.isLoading = false;
  }

  public initialize(data: any): void
  {
    try
    {
      this.id = data.id;
      this.image = data.image;
      this.title = data.title;
      this.topic = data.topic;
    }
    catch (e)
    {
      // console.warn('Ooops, something went wrong...', [data]);
    }
  }
}
