import { CourseService } from 'src/app/services/course.service';
import { Lesson } from './../../model/lesson';
import { Component, OnInit } from '@angular/core';
import { LessonsService } from 'src/app/services/lessons.service';
import { ActivatedRoute } from '@angular/router';
import { Data } from 'src/app/model/data';
import { Course } from 'src/app/model/course';
import { Module } from 'src/app/model/module';
import { UrlsService } from 'src/app/services/urls.service';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.css']
})
export class LessonComponent implements OnInit {
  constructor(
    public lessonService: LessonsService,
    public courseService: CourseService,
    public navigationService: NavigationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const theCourseId: number = +this.route.snapshot.paramMap.get('idCourse');
    const theModuleId: number = +this.route.snapshot.paramMap.get('idModule');
    const theLessonId: number = +this.route.snapshot.paramMap.get('idLesson');

    this.courseService.handleCourseModuleLessonDetails(
      theCourseId,
      theModuleId,
      theLessonId
    );
  }

  setLessonDetail(lessonDetail: Lesson) {
    this.courseService.setLessonDetail(lessonDetail);
    this.navigationService.navigateToLessonDetail(
      this.courseService.courseDetail.id,
      this.courseService.moduleDetail.id,
      lessonDetail.id
    );
  }

  editLesson() {
    this.lessonService.editLesson();
  }
  deleteLesson() {
    this.lessonService.deleteLesson();
  }
}
