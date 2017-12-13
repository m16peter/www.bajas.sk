import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'bnb-youtube-player',
  templateUrl: './youtube-player.view.html',
  styleUrls: ['./youtube-player.style.scss']
})

export class YoutubePlayerComponent
{
  public yt: any;

  public playStatus: boolean;

  @Input() id;
  @Input() img;
  @Input() title;
  @Input() topic;
  @Input() state;

  @Output() onPlay = new EventEmitter();
  @Output() onPause = new EventEmitter();
  @Output() onStop = new EventEmitter();

  public savePlayer(player): void
  {
    console.log('player', player);
    this.yt = player;
    this.play();
  }

  public onStateChange(ev): void
  {
    console.log('state', ev.data);
    this.state = ev.data;

    if (this.state === 0)
    {
      this.stop();
    }
  }

  public play(): void
  {
    this.yt.playVideo();
  }

  public pause(): void
  {
    this.yt.pauseVideo();
  }

  public stop(): void
  {
    this.state = 0;
    this.id = '';
    this.playStatus = false;
  }

  // public selectID(id: string): void
  // {
  //   if (this.id !== id)
  //   {
  //     this.state = -2;
  //     this.id = '';
  //
  //     setTimeout(() =>
  //     {
  //       this.id = id;
  //     }, 20);
  //   }
  // }
}
