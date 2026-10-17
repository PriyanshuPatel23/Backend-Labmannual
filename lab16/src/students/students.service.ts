import { Injectable } from '@nestjs/common';

export interface Student {
  id: number;
  name: string;
  age?: number;
}

@Injectable()
export class StudentsService {
  private students: Student[] = [];

  create(payload: any): Student {
    const newStudent: Student = {
      id: Date.now(),
      name: payload.name || "anything",
      age: payload.age
    }
    this.students.push(newStudent);
    return newStudent;
  }

  findAll() {
    return this.students;
  }

  findOne(id: number) {
    const student = this.students.find((s) => s.id === id)
    return student;
  }

  update(id: number, payload: any): Student | undefined {
    const idx = this.students.findIndex((s) => s.id === id);
    if (idx === -1) return undefined;
    const updated = { ...this.students[idx], ...payload, id: id }
    this.students[idx] = updated;
    return updated;
  }

  remove(id: number): boolean {
    const before = this.students.length;
    this.students = this.students.filter((s) => s.id !== id);
    return this.students.length < before;
  }
}
