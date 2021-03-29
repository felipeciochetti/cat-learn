import { ModulesService } from './../../services/modules.service';
import { CourseService } from './../../services/course.service';
import { Component, OnInit } from '@angular/core';
import { Module } from 'src/app/model/module';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/model/course';

@Component({
  selector: 'app-module-detail',
  templateUrl: './module-detail.component.html',
  styleUrls: ['./module-detail.component.css']
})
export class ModuleDetailComponent implements OnInit {
  moduleDetail: Module;
  courseDetail: Course;
  constructor(
    public courseService: CourseService,
    public modulesService: ModulesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleModuleDetails();
    });
  }

  handleModuleDetails() {
    this.moduleDetail = this.modulesService.getModuleDetail();
    this.courseDetail = this.modulesService.getCourseDetail();
  }
}
