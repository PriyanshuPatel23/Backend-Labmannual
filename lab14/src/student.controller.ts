import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Patch,
  Param,
  Body,
} from '@nestjs/common';
import { StudentService } from './student.service.js';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) { }

  // GET /student
  @Get()
  findAll(): string {
    return this.studentService.findAll();
  }

  // GET /student/:id
  @Get(':id')
  findOne(@Param('id') id: string): string {
    return this.studentService.findOne(id);
  }

  // POST /student
  @Post()
  insert(@Body() payload: any): string {
    return this.studentService.insert(payload);
  }

  // PUT /student/:id
  @Put(':id')
  update(@Param('id') id: string, @Body() payload: any): string {
    return this.studentService.update(id, payload);
  }

  // DELETE /student/:id
  @Delete(':id')
  delete(@Param('id') id: string): string {
    return this.studentService.delete(id);
  }

  // (optional) PATCH – just to illustrate another HTTP verb
  @Patch(':id')
  partialUpdate(@Param('id') id: string, @Body() payload: any): string {
    // reuse the same update logic for brevity
    return `Hello world – partial update with id ${id}`;
  }
}
