import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto.js';
import { UpdateStudentDto } from './dto/update-student.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity.js';

@Injectable()
export class StudentsService {
  constructor(@InjectRepository(Student) private repo: Repository<Student>) { }

  create(dto: CreateStudentDto) { return this.repo.save(dto); }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOneBy({ StudentID: id });
  }

  update(id: number, dto: UpdateStudentDto) {
    return this.repo.update(id, dto);
  }

  remove(id: number) { return this.repo.delete(id); }
}
