import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Student {
    @PrimaryGeneratedColumn()
    StudentID: number;

    @Column()
    StudentName: string;

    @Column()
    StudentAge: number;

    @Column()
    StudentGender: string;

    @Column({ unique: true })
    StudentRollNo: string;
    
    @Column()
    StudentSemester: number;
}