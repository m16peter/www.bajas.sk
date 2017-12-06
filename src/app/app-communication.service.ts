import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AppCommunicationService
{
  private onChangeAppLanguage = new Subject<void>();
  private onUpdateAppFeature = new Subject<void>();
  private onUpdateAppLanguage = new Subject<void>();

  onChangeAppLanguage$ = this.onChangeAppLanguage.asObservable();
  onUpdateAppFeature$ = this.onUpdateAppFeature.asObservable();
  onUpdateAppLanguage$ = this.onUpdateAppLanguage.asObservable();

  public changeAppLanguage(): void
  {
    this.onChangeAppLanguage.next();
  }

  public updateAppFeature(): void
  {
    this.onUpdateAppFeature.next();
  }

  public updateAppLanguage(): void
  {
    this.onUpdateAppLanguage.next();
  }
}
