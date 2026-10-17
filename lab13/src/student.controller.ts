import {
    Controller,
    Get,
    Post,
    Put,
    Patch,
    Delete,
    Param,
    Body,
} from '@nestjs/common'

@Controller('student')
export class StudentController {
    @Get('hello')
    helloWorld(): string {
        return 'hello world';
    }

    @Get()
    findAll(): string {
        return 'findAll students';
    }

    @Get(':id')
    findOne(@Param('id') id: string): string {
        return `findOne student with id ${id}`;
    }

    @Post()
    insert(@Body() createDto: any): string {
        return 'insert student';
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateDto: any): string {
        return `update student with id ${id}`;
    }

    @Delete(':id')
    delete(@Param('id') id: string): string {
        return `delete student with id ${id}`;
    }
}


