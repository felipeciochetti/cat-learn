import { Injectable } from '@angular/core';
import { UrlsService } from './urls.service';
import { NavigationService } from './navigation.service';
import { MessagesService } from '../services/messages.service';
import { Module } from '../model/module';
import { tap, catchError } from 'rxjs/operators';
import { Course } from '../model/course';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { CourseService } from './course.service';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ModulesService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private httpClient: HttpClient,
    private urlService: UrlsService,
    private courseService: CourseService,
    private navigationService: NavigationService,
    private messageService: MessagesService
  ) {}

  getModuleList(): Observable<Module[]> {
    // need to build URL based on category id
    const moduleListUrl = this.urlService.module;

    return this.httpClient
      .get<Module[]>(moduleListUrl)
      .pipe(tap(_ => console.log('fetched module')));
  }

  editModule() {
    this.navigationService.navigateToModuleEdit(
      this.courseService.courseDetail.id,
      this.courseService.moduleDetail.id
    );
  }

  setDataForm(createModuleForm: FormGroup) {
    createModuleForm.patchValue(this.courseService.moduleDetail);
  }

  saveModule(module: Module) {
    if (module.courseId == null) {
      this.setIdCourse(module);
    }

    console.log('save module ' + module.name);
    return this.httpClient
      .post(this.urlService.module, module, this.httpOptions)
      .pipe(
        tap((newmodule: Module) =>
          console.log(`added module w/ id=${newmodule.id}`)
        ),
        catchError(this.handleError<Module>('addCourse'))
      );
  }

  updateModule(module: Module) {
    return this.httpClient.put(
      this.urlService.module + '/' + module.id,
      module,
      this.httpOptions
    );
  }

  deleteModule() {
    return this.httpClient.delete(
      this.urlService.module + '/' + this.courseService.moduleDetail.id,
      this.httpOptions
    );
  }

  navigationToCourse() {
    this.navigationService.navigateToCourseDetail(
      this.courseService.courseDetail.id
    );
  }

  setIdCourse(module: Module) {
    module.courseId == this.courseService.courseDetail.id;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getModuleDetail(): Module {
    return this.courseService.getModuleDetail();
  }
  setModuleDEtail(module: Module) {
    this.courseService.setModuleDEtail(module);
  }

  getCourseDetail(): Course {
    return this.courseService.getCourseDetail();
  }
}
