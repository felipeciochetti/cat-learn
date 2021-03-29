import { UrlsService } from './urls.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  constructor(
    private httpClient: HttpClient,
    private urlService: UrlsService
  ) {}

  uploadImage(code: string, selectedFile: string) {
    const fd = new FormData();
    fd.append('file', selectedFile);
    return this.httpClient
      .post(this.urlService.uploadImage + '/' + code, fd)
      .subscribe(res => {
        console.log(res);
      });
  }

  upload(code: string, selectedFile: string): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', selectedFile);

    const req = new HttpRequest(
      'POST',
      this.urlService.uploadImage + '/' + code,
      formData,
      {
        reportProgress: true,
        responseType: 'json'
      }
    );

    return this.httpClient.request(req);
  }
}
