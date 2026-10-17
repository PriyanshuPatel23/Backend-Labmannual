import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from './user.entity.js';
import { randomBytes } from 'crypto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private userRepo: Repository<User>,
        private jwtService: JwtService,
    ) { }

    async register(email: string, password: string) {
        const exists = await this.userRepo.findOneBy({
            email
        })
        if (exists) {
            throw new BadRequestException('Email already registered');
        }
        const hash = await bcrypt.hash(password, 10);
        const user = this.userRepo.create({
            email,
            password: hash
        })
        await this.userRepo.save(user);
        return { message: 'Registered successfully' };
    }

    async login(email: string, password: string) {
        const user = await this.userRepo.findOneBy({ email });
        if (!user) throw new UnauthorizedException('Invalid credentials');
        const match = await bcrypt.compare(password, user.password);
        if (!match) throw new UnauthorizedException('Invalid credentials');
        const token = this.jwtService.sign({ sub: user.id, email: user.email });
        return { access_token: token };
    }

    async forgotPassword(email: string) {
        const user = await this.userRepo.findOneBy({ email });
        if (!user) throw new BadRequestException('Email not found');
        const token = randomBytes(32).toString('hex');
        user.resetToken = token;
        user.resetTokenExpiry = new Date(Date.now() + 3600000);
        await this.userRepo.save(user);
        console.log(`Reset link: http://localhost:3000/auth/reset-password?token=${token}`);
        return { message: 'Password reset link sent to email' };
    }

    async resetPassword(token: string, newPassword: string) {
        const user = await this.userRepo.findOneBy({ resetToken: token });
        if (!user || user.resetTokenExpiry < new Date()) {
            throw new BadRequestException('Invalid or expired token');
        }
        user.password = await bcrypt.hash(newPassword, 10);
        user.resetToken = null!;
        user.resetTokenExpiry = null!;
        await this.userRepo.save(user);
        return { message: 'Password reset successful' };
    }
}
