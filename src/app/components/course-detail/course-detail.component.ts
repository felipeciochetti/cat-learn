import { Lesson } from './../../model/lesson';
import { Course } from 'src/app/model/course';
import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';

import { CreateModulesComponent } from '../create-modules/create-modules.component';
import { Data } from 'src/app/model/data';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {
  constructor(
    public courseService: CourseService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private _sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    });
  }

  handleProductDetails() {
    // get the "id" param string. convert string to a number using the "+" symbol
    const theCourseId: number = +this.route.snapshot.paramMap.get('id');

    this.courseService
      .getCourse(theCourseId)
      .toPromise()
      .then(res => {
        this.courseService.courseDetail = res;
        this.courseService.modules = res.modules;
      });
  }

  AddOrEditModule(moduleIndex, courseId) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = '50%';
    dialogConfig.data = { moduleIndex, courseId };
    this.dialog
      .open(CreateModulesComponent, dialogConfig)
      .afterClosed()
      .subscribe(res => {
        this.updateCourse();
      });
  }
  updateCourse() {
    //this.handleProductDetails();
  }
  /*
  goToLesson(lesson: Lesson) {
    this.data.storage = lesson;
    this.router.navigate(['lesson/1']);
  }
  */
  getBackground() {
    return this._sanitizer.bypassSecurityTrustStyle(
      `linear-gradient(rgba(29, 29, 29, 0), rgba(16, 16, 23, 0.5)), url(${this.courseService.courseDetail.imageUrl})`
    );
  }
}
