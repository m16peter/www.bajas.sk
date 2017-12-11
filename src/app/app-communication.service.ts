import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AppCommunicationService
{
  private onLanguageChanged = new Subject<void>();
  private onUpdateFeature = new Subject<string>();
  private onUpdateLanguage = new Subject<string>();

  onLanguageChanged$ = this.onLanguageChanged.asObservable();
  onUpdateFeature$ = this.onUpdateFeature.asObservable();
  onUpdateLanguage$ = this.onUpdateLanguage.asObservable();

  public languageChanged(): void
  {
    this.onLanguageChanged.next();
  }

  public updateFeature(featureKey: string): void
  {
    this.onUpdateFeature.next(featureKey);
  }

  public updateLanguage(languageId: string): void
  {
    this.onUpdateLanguage.next(languageId);
  }
}
