import { MessagesService } from 'src/app/services/messages.service';
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
  isChangeFile = false;

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
    private route: ActivatedRoute,
    private messagesService: MessagesService
  ) {}

  createLessonForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(4)]],
    number: ['', [Validators.required, Validators.minLength(1)]],
    duration: ['', [Validators.required, Validators.minLength(1)]],
    description: ['', [Validators.required, Validators.minLength(5)]],
    dateRelease: [],
    contentFilePath: [],
    createdBy: []
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

    this.lesson.contentFileName =
      this.selectedFiles == null ? '' : this.selectedFiles.name;

    if (this.isEdit) {
      this.updateLesson();
    } else {
      this.saveNewLesson();
    }

    this.lessonService.navigationToModule(
      this.courseService.courseDetail.id,
      this.courseService.moduleDetail.id
    );
  }

  selectFile(event): void {
    this.selectedFiles = event.target.files[0];
    this.isChangeFile = true;
  }

  upload(codeLesson: string): void {
    this.progress = 0;

    this.uploadService
      .uploadContentLesson(
        this.courseService.courseDetail.code,
        this.courseService.moduleDetail.code,
        codeLesson,
        this.selectedFiles,
        this.selectedFiles.name
      )
      .subscribe(
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

  updateLesson() {
    this.lessonService.updateLesson(this.lesson).subscribe(res => {
      if (this.isChangeFile != null) {
        // this.upload(res.code);
      }
    });
  }

  saveNewLesson() {
    this.lessonService.saveLesson(this.lesson).subscribe(
      (newHero: Lesson) => {
        if (this.selectedFiles != null) {
          this.upload(newHero.code);
        }

        this.messagesService.success('Salvo com Sucesso', null);
      },
      error => {
        this.messagesService.error(error.error, null);
        console.log(error);
      }
    );
    //
  }
}
