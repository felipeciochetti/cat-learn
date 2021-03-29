import { MessagesService } from './../../services/messages.service';
import { CreateModulesComponent } from './../create-modules/create-modules.component';
import { CourseService } from 'src/app/services/course.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Course } from 'src/app/model/course';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { UploadService } from 'src/app/services/upload.service';
import { HttpEventType } from '@angular/common/http';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})
export class CreateCourseComponent implements OnInit {
  today: number = Date.now();
  course: Course;

  selectedFile = null;
  previewUrl: any = null;
  isEdit: boolean;

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private router: Router,
    private route: ActivatedRoute,
    private uploadService: UploadService,
    private messagesService: MessagesService,
    private navigationService: NavigationService
  ) {}

  createCourseForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(6)]],
    image: ['', ''],

    description: ['', [Validators.required, Validators.minLength(10)]],
    createdby: ['', [Validators.required, Validators.minLength(2)]],
    dateRelease: ['', [Validators.required, Validators.minLength(1)]]
  });

  ngOnInit(): void {
    // check is editing...
    if (this.router.url.indexOf('edit') >= 0) {
      this.isEdit = true;
      this.createCourseForm.patchValue(this.courseService.courseDetail);
      this.previewUrl = this.courseService.courseDetail.imageUrl;
    }
  }

  createCourse() {
    if (!this.createCourseForm.valid) {
      return;
    }

    // Make sure to create a deep copy of the form-model
    this.course = Object.assign({}, this.createCourseForm.value);

    if (this.isEdit) {
      this.saveEditCourse();
    } else {
      this.saveNewCourse();
    }

    //this.uploadService.uploadImage(this.selectedFile);
  }
  saveNewCourse() {
    this.courseService.saveCourse(this.course, this.selectedFile).subscribe(
      (newHero: Course) => {
        if (this.selectedFile != null) {
          this.uploadService.uploadImage(newHero.code, this.selectedFile);
        }

        this.messagesService.success('Salvo com Sucesso', null);
        this.navigationService.navigateToCourseDetail(newHero.id);
      },
      error => {
        this.messagesService.error(error.error, null);
        console.log(error);
      }
    );
  }
  saveEditCourse() {
    this.courseService
      .updateCourse()

      .subscribe(
        (newHero: Course) => {
          if (this.selectedFile != null) {
            this.uploadService.uploadImage(newHero.code, this.selectedFile);
          }

          this.messagesService.success('Salvo com Sucesso', null);
          this.navigationService.navigateToCourseDetail(newHero.id);
        },
        error => {
          this.messagesService.error(error.error, null);
          console.log(error);
        }
      );
  }

  onFileSelected(event) {
    console.log(event);
    this.selectedFile = event.target.files[0];
    this.preview();
  }

  preview() {
    // Show preview
    var mimeType = this.selectedFile.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = _event => {
      this.previewUrl = reader.result;
    };
  }
}
