import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlsService {
  private urlServer = 'http://localhost:8080/cbg/';
  //private urlServer = '';
  public courseListUrl = this.urlServer + 'api/course';
  public courseListUrlByName = 'api/course';

  public module = 'api/module';

  public lesson = 'api/lesson';

  public searchCoursesUrl = 'api/course/';

  public uploadImage = this.urlServer + 'upload/image';

  public imageLogo = 'assets/images/logo/header-logo.jpg';

  constructor() {}
}
