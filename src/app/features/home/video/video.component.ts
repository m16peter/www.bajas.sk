import { Component, Input } from '@angular/core';

import { Video } from './video.model';

@Component({
  selector: 'bnb-video',
  templateUrl: './video.view.html',
  styleUrls: ['./video.style.scss']
})

export class VideoComponent
{
  public yt: any;

  @Input() video: Video;

  public savePlayer(player): void
  {
    console.log('player', player);
    this.yt = player;
    this.play();
  }

  public onStateChange(ev): void
  {
    console.log('state', ev.data);
    this.video.state = ev.data;

    if (this.video.state === 0)
    {
      this.video.isActive = false;
      this.video.isLoading = false;
    }
    else if (this.video.state < 0)
    {
      this.video.isActive = true;
      this.video.isLoading = true;
    }
    else
    {
      this.video.isActive = true;
      this.video.isLoading = false;
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
    this.video.state = 0;
    this.video.isActive = false;
  }
}
