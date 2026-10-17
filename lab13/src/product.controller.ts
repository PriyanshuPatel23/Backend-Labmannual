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

@Controller('product')
export class ProductController {
    @Get('hello')
    helloWorld(): string {
        return 'hello world';
    }

    @Get()
    findAll(): string {
        return 'findAll product';
    }

    @Get(':id')
    findOne(@Param('id') id: string): string {
        return `findOne product with id ${id}`;
    }

    @Post()
    insert(@Body() createDto: any): string {
        return 'insert product';
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateDto: any): string {
        return `update product with id ${id}`;
    }

    @Delete(':id')
    delete(@Param('id') id: string): string {
        return `delete product with id ${id}`;
    }
}