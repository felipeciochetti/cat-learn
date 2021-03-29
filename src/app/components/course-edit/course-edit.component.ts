import { Module } from './../../model/module';
import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CreateModulesComponent } from '../create-modules/create-modules.component';
import { NavigationService } from 'src/app/services/navigation.service';
import {
  ConfirmDialogModel,
  ConfirmDialogComponent
} from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.css']
})
export class CourseEditComponent implements OnInit {
  constructor(
    public courseService: CourseService,
    private route: ActivatedRoute,
    private navigationService: NavigationService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    });
  }

  handleProductDetails() {
    // get the "id" param string. convert string to a number using the "+" symbol
    const theCourseId: number = +this.route.snapshot.paramMap.get('id');

    this.courseService.getCourse(theCourseId);
  }

  setModuleDetail(moduleDetail: Module) {
    this.courseService.setModuleDEtail(moduleDetail);
    this.navigationService.navigateToModuleDetail(
      moduleDetail.courseId,
      moduleDetail.id
    );
  }

  editCourse() {
    this.courseService.editCourse();
  }

  confirmDialogDelete(): void {
    const message = `Deseja deletar o curso?`;

    const dialogData = new ConfirmDialogModel('Confirmar', message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.deleteCourse();
        console.log('');
      }
    });
  }
  deleteCourse() {
    this.courseService.deleteCourse().subscribe();
    this.navigationService.navigateToCourses();
  }
}
