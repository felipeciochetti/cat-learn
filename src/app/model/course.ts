import { Module } from './module';

export class Course {
  id: number;
  name: string;
  description: string;
  unitPrice: number;
  imageUrl: string;
  dateCreated: Date;
  lastUpdate: Date;
  createdBy: string;
  category: string;
  code: string;
  dateRelease: Date;
  modules: Module[];
}
