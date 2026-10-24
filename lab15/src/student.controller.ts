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

// PART B
@Controller('student')
export class StudentController {
    constructor(private readonly studentService: StudentService) { }
    @Get()
    findAll(): string {
        return this.studentService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): string {
        return this.studentService.findOne(id);
    }

    @Post()
    insert(@Body() payload: any): string {
        return this.studentService.insert(payload);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() payload: any): string {
        return this.studentService.update(id, payload);
    }

    @Delete(':id')
    delete(@Param('id') id: string): string {
        return this.studentService.delete(id);
    }

    @Patch(':id')
    partialUpdate(@Param('id') id: string, @Body() payload: any): string {
        return `Hello world – partial update with id ${id}`;
    }
}
