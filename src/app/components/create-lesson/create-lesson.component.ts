import { UploadService } from './../../services/upload.service';
import { Lesson } from 'src/app/model/lesson';
import { LessonsService } from 'src/app/services/lessons.service';
import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-create-lesson',
  templateUrl: './create-lesson.component.html',
  styleUrls: ['./create-lesson.component.css']
})
export class CreateLessonComponent implements OnInit {
  lesson: Lesson;

  isEdit = false;

  selectedFiles = null;
  currentFile: File;
  progress = 0;
  message = '';

  constructor(
    private fb: FormBuilder,
    public courseService: CourseService,
    public lessonService: LessonsService,
    public navigationService: NavigationService,
    public uploadService: UploadService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  createLessonForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(4)]],
    number: ['', [Validators.required, Validators.minLength(1)]],
    duration: ['', [Validators.required, Validators.minLength(1)]],
    description: ['', [Validators.required, Validators.minLength(5)]],
    dateRelease: [],
    fileLesson: [],
    createdby: []
  });

  ngOnInit(): void {
    // check is editing...
    if (this.router.url.indexOf('edit') >= 0) {
      this.isEdit = true;
      this.handleCourseModuleLessonEdit();
    } else {
      this.handleCourseModuleLessonNew();
    }
  }

  createLesson() {
    if (!this.createLessonForm.valid) {
      return;
    }

    this.lesson = Object.assign({}, this.createLessonForm.value);

    if (this.lesson.id > 0) {
      this.lessonService.updateLesson(this.lesson);
    } else {
      this.lessonService.saveLesson(this.lesson).subscribe(res => {
        this.upload(res.code);
      });
    }

    this.lessonService.navigationToModule(
      this.courseService.courseDetail.id,
      this.courseService.moduleDetail.id
    );
  }

  selectFile(event): void {
    this.selectedFiles = event.target.files[0];
  }

  upload(codeLesson: string): void {
    this.progress = 0;

    this.uploadService.upload(codeLesson, this.selectedFiles).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round((100 * event.loaded) / event.total);
        } else if (event instanceof HttpResponse) {
          this.message = event.body.message;
        }
      },
      err => {
        this.progress = 0;
        this.message = 'Could not upload the file!';
        this.currentFile = undefined;
      }
    );
    this.selectedFiles = undefined;
  }

  handleCourseModuleLessonEdit() {
    const theCourseId: number = +this.route.snapshot.paramMap.get('idCourse');
    const theModuleId: number = +this.route.snapshot.paramMap.get('idModule');
    const theLessonId: number = +this.route.snapshot.paramMap.get('idLesson');

    this.courseService.handleCourseModuleLessonEditDetails(
      theCourseId,
      theModuleId,
      theLessonId,
      this.createLessonForm
    );
  }

  handleCourseModuleLessonNew() {
    const theCourseId: number = +this.route.snapshot.paramMap.get('idCourse');
    const theModuleId: number = +this.route.snapshot.paramMap.get('idModule');

    this.courseService.handleCourseModuleLessonNew(theCourseId, theModuleId);
  }
}
