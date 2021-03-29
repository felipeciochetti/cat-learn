import { NavigationService } from 'src/app/services/navigation.service';
import { Component, OnInit, Inject } from '@angular/core';
import { Module } from 'src/app/model/module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModulesService } from 'src/app/services/modules.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CreateModulesComponent } from '../create-modules/create-modules.component';
import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/app/model/course';
import { ActivatedRoute } from '@angular/router';
import { Lesson } from 'src/app/model/lesson';

@Component({
  selector: 'app-module-edit',
  templateUrl: './module-edit.component.html',
  styleUrls: ['./module-edit.component.css']
})
export class ModuleEditComponent implements OnInit {
  constructor(
    public courseService: CourseService,
    public modulesService: ModulesService,
    public navigationService: NavigationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const theCourseId: number = +this.route.snapshot.paramMap.get('idCourse');
    const theModuleId: number = +this.route.snapshot.paramMap.get('idModule');

    this.courseService.handleCourseModuleDetails(theCourseId, theModuleId);
  }

  setLessonDetail(lessonDetail: Lesson) {
    this.courseService.setLessonDetail(lessonDetail);
    this.navigationService.navigateToLessonDetail(
      this.courseService.courseDetail.id,
      this.courseService.moduleDetail.id,
      lessonDetail.id
    );
  }

  editModule() {
    this.modulesService.editModule();
  }
  deleteModule() {
    this.modulesService.deleteModule();
  }
}
