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

@Controller('faculty')
export class FacultyController {
    @Get('hello')
    helloWorld(): string {
        return 'hello world';
    }

    @Get()
    findAll(): string {
        return 'findAll faculty';
    }

    @Get(':id')
    findOne(@Param('id') id: string): string {
        return `findOne faculty with id ${id}`;
    }

    @Post()
    insert(@Body() createDto: any): string {
        return 'insert faculty';
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateDto: any): string {
        return `update faculty with id ${id}`;
    }

    @Delete(':id')
    delete(@Param('id') id: string): string {
        return `delete faculty with id ${id}`;
    }
}