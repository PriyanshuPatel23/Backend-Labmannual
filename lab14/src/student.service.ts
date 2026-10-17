import { Injectable } from '@nestjs/common';

@Injectable()
export class StudentService {
    findAll(): string {
        return 'Hello world – findAll';
    }

    findOne(id: string): string {
        return `Hello world – findOne with id ${id}`;
    }

    insert(payload: any): string {
        return 'Hello world – insert';
    }

    update(id: string, payload: any): string {
        return `Hello world – update with id ${id}`;
    }

    delete(id: string): string {
        return `Hello world – delete with id ${id}`;
    }
}
