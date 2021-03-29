import { UrlsService } from './../../services/urls.service';
import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(
    private urlService: UrlsService,
    private settingsService: SettingsService
  ) {}

  ngOnInit(): void {}

  useLanguage(language: string) {
    this.settingsService.useLanguage(language);
  }
}
