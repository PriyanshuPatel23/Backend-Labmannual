import { Injectable } from "@nestjs/common";

// PART A
@Injectable()
export class StudentService {
    findAll(): string {
        return 'Find All'
    }

    findOne(id: string): string {
        return `Hello world – findOne with id ${id}`;
    }

    insert(payload: any) {
        return 'insert'
    }

    delete(id: string): string {
        return `Hello world – delete with id ${id}`;
    }

    update(id: string, payload: any): string {
        return `Hello world – update with id ${id}`;
    }
}