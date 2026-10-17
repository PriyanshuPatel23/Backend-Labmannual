import { Injectable } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto.js';
import { UpdateTeacherDto } from './dto/update-teacher.dto.js';

export interface Teacher {
  id: number;
  name: string;
  age?: number;
}

@Injectable()
export class TeacherService {
  private teachers: Teacher[] = [];

  create(payload: any) {
    const newTeacher: Teacher = {
      id: Date.now(),
      name: payload.name || "anything",
      age: payload.age
    }
    this.teachers.push(newTeacher);
    return newTeacher;
  }

  findAll() {
    return this.teachers;
  }

  findOne(id: number) {
    return this.teachers.find((t) => t.id === id);
  }

  update(id: number, payload: Partial<Teacher>): Teacher | undefined {
    const idx = this.teachers.findIndex((t) => t.id === id);
    if (idx === -1) {
      return undefined;
    }
    const updated: Teacher = { ...this.teachers[idx], ...payload, id };
    this.teachers[idx] = updated;
    return updated;
  }

  remove(id: number) {
    const before = this.teachers.length;
    this.teachers = this.teachers.filter((s) => s.id !== id);
    return this.teachers.length < before;
  }
}
