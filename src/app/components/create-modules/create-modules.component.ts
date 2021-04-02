import { NavigationService } from 'src/app/services/navigation.service';
import { UrlsService } from './../../services/urls.service';
import { MessagesService } from './../../services/messages.service';
import { ModulesService } from './../../services/modules.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Module } from 'src/app/model/module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CourseService } from 'src/app/services/course.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-modules',
  templateUrl: './create-modules.component.html',
  styleUrls: ['./create-modules.component.css']
})
export class CreateModulesComponent implements OnInit {
  module: Module;
  moduleList: Module[];

  isEdit: boolean = false;

  constructor(
    private fb: FormBuilder,
    private moduleService: ModulesService,
    public courseService: CourseService,
    private router: Router,
    private route: ActivatedRoute,
    private messagesService: MessagesService,
    private navigationService: NavigationService
  ) {}

  createModuleForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(4)]],
    number: ['', [Validators.required, Validators.minLength(1)]],
    duration: ['', [Validators.required, Validators.minLength(1)]],
    description: ['', [Validators.required, Validators.minLength(5)]],
    dateRelease: [],
    createdby: []
  });

  ngOnInit() {
    // check is editing...
    if (this.router.url.indexOf('edit') >= 0) {
      this.isEdit = true;
      this.handleCourseModuleEdit();
    } else {
      this.handleCourseModuleNew();
    }
  }

  createModule() {
    if (!this.createModuleForm.valid) {
      return;
    }

    this.module = Object.assign({}, this.createModuleForm.value);

    if (this.module.id > 0) {
      this.moduleService.updateModule(this.module);
    } else {
      this.saveNewModule();
    }

    this.moduleService.navigationToCourse();
  }

  saveNewModule() {
    this.moduleService.saveModule(this.module).subscribe(
      (newHero: Module) => {
        this.messagesService.success('Salvo com Sucesso', null);
        this.courseService.courseDetail.modules.push(newHero);
      },
      error => {
        this.messagesService.error(error.error, null);
        console.log(error);
      }
    );
   }

  handleCourseModuleEdit() {
    const theCourseId: number = +this.route.snapshot.paramMap.get('idCourse');
    const theModuleId: number = +this.route.snapshot.paramMap.get('idModule');

    this.courseService.handleCourseModuleEdit(
      theCourseId,
      theModuleId,
      this.createModuleForm
    );
  }
  handleCourseModuleNew() {
    const theCourseId: number = +this.route.snapshot.paramMap.get('idCourse');

    this.courseService.handleCourseModuleNew(theCourseId);
  }
}
