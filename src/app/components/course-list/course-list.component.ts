import { CourseService } from './../../services/course.service';
import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/model/course';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  courses: Course[];
  searchMode: boolean = false;

  constructor(
    private couserService: CourseService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // this.route.paramMap.subscribe(() => {});

    this.getCoursesList();
  }

  getCoursesList() {
    this.getAllCourseList();
  }
  getAllCourseList() {
    this.couserService.getCourseList().subscribe(data => {
      this.courses = data;
    });
  }

  searchCourse() {
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword');

    // now search for the products using keyword
    this.couserService.searchCourse(theKeyword).subscribe(data => {
      this.courses = data;
    });
  }
}
