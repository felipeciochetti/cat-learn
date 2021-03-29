import { Lesson } from './lesson';

export class Module {
  id: number;
  name: string;
  description: string;
  number: number;
  courseId: number;
  dateRelease: Date;
  lessons: Lesson[];
}
