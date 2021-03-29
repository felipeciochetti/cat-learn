import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  constructor(private translate: TranslateService) {}

  useLanguage(language: string) {
    this.translate.use(language);
  }
}
