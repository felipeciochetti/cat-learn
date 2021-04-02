import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlsService {
  private urlServer = 'http://10.0.0.3:8080/cbg/';
  //private urlServer = '';
  public courseListUrl = this.urlServer + 'api/course';
  public courseListUrlByName = this.urlServer + 'api/course';

  public module = this.urlServer + 'api/module';

  public lesson = this.urlServer + 'api/lesson';

  public searchCoursesUrl = this.urlServer + 'api/course/';

  public uploadImage = this.urlServer + 'api/upload/image';

  public uploadContentLesson = this.urlServer + 'api/upload/lessonfile';

  public imageLogo = 'assets/images/logo/header-logo.jpg';

  constructor() {}
}
