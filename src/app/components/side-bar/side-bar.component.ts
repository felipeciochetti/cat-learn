import { Component, OnInit } from '@angular/core';
import { UrlsService } from 'src/app/services/urls.service';
import { SideBarService } from 'src/app/services/side-bar.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  menus;

  constructor(
    private urlService: UrlsService,
    private sideBarService: SideBarService,
    private translate: TranslateService
  ) {
    translate.setDefaultLang('en');
    translate.use('en');
  }

  ngOnInit(): void {
    this.getMenus();
  }

  getImageLogo() {
    return this.urlService.imageLogo;
  }

  getMenus() {
    this.menus = this.sideBarService.nav;
  }
}
