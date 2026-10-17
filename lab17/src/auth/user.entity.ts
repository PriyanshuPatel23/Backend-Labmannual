import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({ nullable: true })
    resetToken: string;
    
    @Column({ nullable: true, type: 'timestamp' })
    resetTokenExpiry: Date;
}