import { Lesson } from './lesson';
import { Course } from './course';

export class Module {
  id: number;
  code: string;
  name: string;
  description: string;
  duration: string;
  createdBy: string;
  number: string;
  idCourse: number;
  dateRelease: Date;
  dateCreated: Date;
  course: Course;
  lessons: Lesson[];
}
