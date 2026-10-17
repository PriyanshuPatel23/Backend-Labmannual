import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { StudentsModule } from './students/students.module.js';
import { CourseModule } from './course/course.module.js';
import { TeacherModule } from './teacher/teacher.module.js';
import { TeacherModule } from './teacher/teacher.module.js';

@Module({
  imports: [StudentsModule, CourseModule, TeacherModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
