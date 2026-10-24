import { Module } from '@nestjs/common';
import { StudentController } from './student.controller.js';
import { StudentService } from './student.service.js';

// PART C
@Module({
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}