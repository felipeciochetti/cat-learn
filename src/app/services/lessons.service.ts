import { FormGroup } from '@angular/forms';
import { Lesson } from './../model/lesson';
import { ModulesService } from './../services/modules.service';
import { Injectable } from '@angular/core';
import { UrlsService } from '../services/urls.service';
import { NavigationService } from '../services/navigation.service';
import { MessagesService } from './messages.service';
import { CourseService } from '../services/course.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Module } from '../model/module';
import { Course } from '../model/course';

@Injectable({
  providedIn: 'root'
})
export class LessonsService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  currentLesson: Lesson;

  constructor(
    private httpClient: HttpClient,
    private urlService: UrlsService,
    private navigationService: NavigationService,
    private courseService: CourseService,
    private moduleService: ModulesService,
    private messageService: MessagesService
  ) {}

  getCurrrentCourse() {
    return this.courseService.getCourseDetail();
  }

  saveLesson(lesson: Lesson): Observable<Lesson> {
    if (lesson.moduleId == null) {
      this.setIdModule(lesson);
    }

    return this.httpClient
      .post(this.urlService.lesson, lesson, this.httpOptions)
      .pipe(
        tap((newmodule: Lesson) =>
          console.log(`added lesson w/ id=${newmodule.id}`)
        ),
        catchError(this.handleError<Lesson>('addCourse'))
      );
  }

  updateLesson(lesson: Lesson) {
    return this.httpClient.put(
      this.urlService.lesson + '/' + lesson.id,
      lesson,
      this.httpOptions
    );
  }

  deleteLesson() {
    return this.httpClient.delete(
      this.urlService.lesson + '/' + this.courseService.lessonDetail.id,
      this.httpOptions
    );
  }

  setIdModule(lesson: Lesson) {
    lesson.moduleId == this.courseService.getModuleDetail().id;
  }

  editLesson() {
    this.navigationService.navigateToLessonEdit(
      this.courseService.courseDetail.id,
      this.courseService.moduleDetail.id,
      this.courseService.lessonDetail.id
    );
  }

  setDataForm(createLessonForm: FormGroup) {
    createLessonForm.patchValue(this.courseService.lessonDetail);
  }

  navigationToModule(idCourse: number, idModule: number) {
    this.navigationService.navigateToModuleDetail(idCourse, idModule);
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
}
