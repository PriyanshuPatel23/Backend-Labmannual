import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service.js';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity.js';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

const mockUser: Partial<User> = {
  id: 1,
  email: 'test@gmail.com',
  password: '',  
  resetToken: null!,
  resetTokenExpiry: null!,
};

const mockUserRepo = {
  findOneBy: vi.fn(),
  create: vi.fn(),
  save: vi.fn(),
};

const mockJwtService = {
  sign: vi.fn().mockReturnValue('mock-jwt-token'),
};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    mockUser.password = await bcrypt.hash('123456', 10);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: getRepositoryToken(User), useValue: mockUserRepo },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  afterEach(() => vi.clearAllMocks());

  describe('register()', () => {
    it('should register a new user successfully', async () => {
      mockUserRepo.findOneBy.mockResolvedValue(null); 
      mockUserRepo.create.mockReturnValue(mockUser);
      mockUserRepo.save.mockResolvedValue(mockUser);

      const result = await service.register('test@gmail.com', '123456');

      expect(result).toEqual({ message: 'Registered successfully' });
      expect(mockUserRepo.save).toHaveBeenCalled();
    });

    it('should throw BadRequestException if email already registered', async () => {
      mockUserRepo.findOneBy.mockResolvedValue(mockUser); 

      await expect(service.register('test@gmail.com', '123456'))
        .rejects.toThrow(BadRequestException);
    });
  });

  describe('login()', () => {
    it('should return access_token on valid credentials', async () => {
      mockUserRepo.findOneBy.mockResolvedValue(mockUser);

      const result = await service.login('test@gmail.com', '123456');

      expect(result).toHaveProperty('access_token', 'mock-jwt-token');
    });

    it('should throw UnauthorizedException if user not found', async () => {
      mockUserRepo.findOneBy.mockResolvedValue(null);

      await expect(service.login('wrong@gmail.com', '123456'))
        .rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException if password is wrong', async () => {
      mockUserRepo.findOneBy.mockResolvedValue(mockUser);

      await expect(service.login('test@gmail.com', 'wrongpassword'))
        .rejects.toThrow(UnauthorizedException);
    });
  });

  describe('forgotPassword()', () => {
    it('should generate reset token and return success message', async () => {
      mockUserRepo.findOneBy.mockResolvedValue({ ...mockUser });
      mockUserRepo.save.mockResolvedValue({});

      const result = await service.forgotPassword('test@gmail.com');

      expect(result).toEqual({ message: 'Password reset link sent to email' });
      expect(mockUserRepo.save).toHaveBeenCalled();
    });

    it('should throw BadRequestException if email not found', async () => {
      mockUserRepo.findOneBy.mockResolvedValue(null);

      await expect(service.forgotPassword('noone@gmail.com'))
        .rejects.toThrow(BadRequestException);
    });
  });

  describe('resetPassword()', () => {
    it('should reset password successfully with valid token', async () => {
      const futureDate = new Date(Date.now() + 3600000);
      mockUserRepo.findOneBy.mockResolvedValue({
        ...mockUser,
        resetToken: 'valid-token',
        resetTokenExpiry: futureDate,
      });
      mockUserRepo.save.mockResolvedValue({});

      const result = await service.resetPassword('valid-token', 'newpass123');

      expect(result).toEqual({ message: 'Password reset successful' });
    });

    it('should throw BadRequestException if token is expired', async () => {
      const pastDate = new Date(Date.now() - 1000); 
      mockUserRepo.findOneBy.mockResolvedValue({
        ...mockUser,
        resetToken: 'expired-token',
        resetTokenExpiry: pastDate,
      });

      await expect(service.resetPassword('expired-token', 'newpass'))
        .rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException if token is invalid', async () => {
      mockUserRepo.findOneBy.mockResolvedValue(null);

      await expect(service.resetPassword('bad-token', 'newpass'))
        .rejects.toThrow(BadRequestException);
    });
  });
});
