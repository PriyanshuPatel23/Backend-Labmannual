import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto.js';
import { UpdateCourseDto } from './dto/update-course.dto.js';

export interface Course {
  id: number;
  name: string;
}

@Injectable()
export class CourseService {
  private course: Course[] = []
  create(payload: any) {
    const newCourse = {
      id: Date.now(),
      name: payload.name || 'Demo Course'
    }
    this.course.push(newCourse);
    return newCourse;
  }

  findAll() {
    return this.course;
  }

  findOne(id: number) {
    return this.course.find((c) => c.id === id);
  }

  update(id: number, payload: Partial<Course>): Course | undefined {
    const idx = this.course.findIndex((t) => t.id === id);
    if (idx === -1) {
      return undefined;
    }
    const updated: Course = { ...this.course[idx], ...payload, id };
    this.course[idx] = updated;
    return updated;
  }

  remove(id: number) {
    const before = this.course.length;
    this.course = this.course.filter((c) => c.id !== id);
    return this.course.length < before;
  }
}
