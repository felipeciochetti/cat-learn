import { Course } from 'src/app/model/course';
import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Module } from '../model/module';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const module = [];
    const courses = [
      {
        id: 1,
        name: 'COURSE 1',
        description:
          'I am happy with the course. I have been developing in Java language for seven years. The lessons have helped me a lot. Especially the order of the chapters is well thought. So I gave five stars, it deserves it. Cheers',
        unitPrice: 25.0,
        imageUrl:
          'https://img-a.udemycdn.com/course/240x135/2241936_2ceb.jpg?u4lky8j6U7tBmegOxF_78j3jLN8QhurKt8bUo9ngQoyw5DmzyFuRPTWKBk5COpg-pw5PRmONde7Qtz1Y1B6y2iZVlHrkPSOfVssPm2ZQg3rtp6PVK2Zfw4v8mhQ8qQ',
        dateCreated: '09/12/1987',
        lastUpdate: null,
        createdBy: 'Ciochetti',
        modules: [
          {
            id: 1,
            courseId: 1,
            name: 'Module 1',
            description: ' description',
            number: 1,
            lessons: [
              {
                id: 1,
                name: 'Lesson 1',
                description: 'description',
                number: 1,
                url: 'EBnTZwr0RSs',
                content: 'https://www.youtube.com/watch?v=92DHCXitqcY&t=924s'
              },
              {
                id: 2,
                name: 'Lesson 2',
                description: 'description',
                number: 1,
                url: 'BmznD0BNCzE',
                content: 'https://www.youtube.com/watch?v=92DHCXitqcY&t=924s'
              }
            ]
          },
          {
            id: 2,
            name: 'Module 2',
            description: ' description 2',
            number: 2
          }
        ]
      },
      {
        id: 2,
        name: 'COURSE 2',
        description:
          'I am happy with the course. I have been developing in Java language for seven years. The lessons have helped me a lot. Especially the order of the chapters is well thought. So I gave five stars, it deserves it. Cheers',
        unitPrice: 25.0,
        imageUrl:
          'https://img-a.udemycdn.com/course/240x135/1132057_1266_4.jpg?YLuQacJQ9oh3W3KuJf2OQIXRhQx2WAXnt7rPm6RdTeR5YxILXUlpOYIPXelArHu4pQJln7mReLK-xC1UsvOZAFBjgIZbmxwBlTlScfNGfyxVZMwYKOrJd6yHt14OOIvR',
        dateCreated: null,
        lastUpdate: null,
        createdBy: 'ciochetti'
      },
      {
        id: 3,
        name: 'COURSE 3',
        description:
          'I am happy with the course. I have been developing in Java language for seven years. The lessons have helped me a lot. Especially the order of the chapters is well thought. So I gave five stars, it deserves it. Cheers',
        unitPrice: 25.0,
        imageUrl:
          'https://img-a.udemycdn.com/course/240x135/1132057_1266_4.jpg?YLuQacJQ9oh3W3KuJf2OQIXRhQx2WAXnt7rPm6RdTeR5YxILXUlpOYIPXelArHu4pQJln7mReLK-xC1UsvOZAFBjgIZbmxwBlTlScfNGfyxVZMwYKOrJd6yHt14OOIvR',
        dateCreated: null,
        lastUpdate: null,
        createdBy: 'ciochetti'
      },
      {
        id: 4,
        name: 'COURSE 4',
        description:
          'I am happy with the course. I have been developing in Java language for seven years. The lessons have helped me a lot. Especially the order of the chapters is well thought. So I gave five stars, it deserves it. Cheers',
        unitPrice: 25.0,
        imageUrl:
          'https://img-a.udemycdn.com/course/240x135/1132057_1266_4.jpg?YLuQacJQ9oh3W3KuJf2OQIXRhQx2WAXnt7rPm6RdTeR5YxILXUlpOYIPXelArHu4pQJln7mReLK-xC1UsvOZAFBjgIZbmxwBlTlScfNGfyxVZMwYKOrJd6yHt14OOIvR',
        dateCreated: null,
        lastUpdate: null,
        createdBy: 'ciochetti'
      },
      {
        id: 5,
        name: 'COURSE 5',
        description:
          'I am happy with the course. I have been developing in Java language for seven years. The lessons have helped me a lot. Especially the order of the chapters is well thought. So I gave five stars, it deserves it. Cheers',
        unitPrice: 25.0,
        imageUrl:
          'https://img-a.udemycdn.com/course/240x135/1132057_1266_4.jpg?YLuQacJQ9oh3W3KuJf2OQIXRhQx2WAXnt7rPm6RdTeR5YxILXUlpOYIPXelArHu4pQJln7mReLK-xC1UsvOZAFBjgIZbmxwBlTlScfNGfyxVZMwYKOrJd6yHt14OOIvR',
        dateCreated: null,
        lastUpdate: null,
        createdBy: 'ciochetti'
      },
      {
        id: 6,
        name: 'COURSE 6',
        description:
          'I am happy with the course. I have been developing in Java language for seven years. The lessons have helped me a lot. Especially the order of the chapters is well thought. So I gave five stars, it deserves it. Cheers',
        unitPrice: 25.0,
        imageUrl:
          'https://img-a.udemycdn.com/course/240x135/1132057_1266_4.jpg?YLuQacJQ9oh3W3KuJf2OQIXRhQx2WAXnt7rPm6RdTeR5YxILXUlpOYIPXelArHu4pQJln7mReLK-xC1UsvOZAFBjgIZbmxwBlTlScfNGfyxVZMwYKOrJd6yHt14OOIvR',
        dateCreated: null,
        lastUpdate: null,
        createdBy: 'ciochetti'
      },
      {
        id: 7,
        name: 'COURSE 7',
        description:
          'I am happy with the course. I have been developing in Java language for seven years. The lessons have helped me a lot. Especially the order of the chapters is well thought. So I gave five stars, it deserves it. Cheers',
        unitPrice: 25.0,
        imageUrl:
          'https://img-a.udemycdn.com/course/240x135/1132057_1266_4.jpg?YLuQacJQ9oh3W3KuJf2OQIXRhQx2WAXnt7rPm6RdTeR5YxILXUlpOYIPXelArHu4pQJln7mReLK-xC1UsvOZAFBjgIZbmxwBlTlScfNGfyxVZMwYKOrJd6yHt14OOIvR',
        dateCreated: null,
        lastUpdate: null,
        createdBy: 'ciochetti'
      },
      {
        id: 8,
        name: 'COURSE 8',
        description:
          'I am happy with the course. I have been developing in Java language for seven years. The lessons have helped me a lot. Especially the order of the chapters is well thought. So I gave five stars, it deserves it. Cheers',
        unitPrice: 25.0,
        imageUrl:
          'https://img-a.udemycdn.com/course/240x135/1132057_1266_4.jpg?YLuQacJQ9oh3W3KuJf2OQIXRhQx2WAXnt7rPm6RdTeR5YxILXUlpOYIPXelArHu4pQJln7mReLK-xC1UsvOZAFBjgIZbmxwBlTlScfNGfyxVZMwYKOrJd6yHt14OOIvR',
        dateCreated: null,
        lastUpdate: null,
        createdBy: 'ciochetti'
      },
      {
        id: 9,
        name: 'COURSE 9',
        description:
          'I am happy with the course. I have been developing in Java language for seven years. The lessons have helped me a lot. Especially the order of the chapters is well thought. So I gave five stars, it deserves it. Cheers',
        unitPrice: 25.0,
        imageUrl:
          'https://img-a.udemycdn.com/course/240x135/1132057_1266_4.jpg?YLuQacJQ9oh3W3KuJf2OQIXRhQx2WAXnt7rPm6RdTeR5YxILXUlpOYIPXelArHu4pQJln7mReLK-xC1UsvOZAFBjgIZbmxwBlTlScfNGfyxVZMwYKOrJd6yHt14OOIvR',
        dateCreated: null,
        lastUpdate: null,
        createdBy: 'ciochetti'
      }
    ];
    return { courses, module };
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(course: Course[]): number {
    return course.length > 0
      ? Math.max(...course.map(course => course.id)) + 1
      : 11;
  }
}
