import { describe, it, expect, beforeEach, afterEach, vi } from '../../node_modules/vitest/index.cjs';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';

const mockAuthService = {
  register: vi.fn(),
  login: vi.fn(),
  forgotPassword: vi.fn(),
  resetPassword: vi.fn(),
};

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  afterEach(() => vi.clearAllMocks());

  describe('register()', () => {
    it('should call authService.register() with correct args', async () => {
      mockAuthService.register.mockResolvedValue({ message: 'Registered successfully' });

      const result = await controller.register({ email: 'a@a.com', password: '123' });

      expect(service.register).toHaveBeenCalledWith('a@a.com', '123');
      expect(result).toEqual({ message: 'Registered successfully' });
    });
  });

  describe('login()', () => {
    it('should call authService.login() and return token', async () => {
      mockAuthService.login.mockResolvedValue({ access_token: 'jwt-token' });

      const result = await controller.login({ email: 'a@a.com', password: '123' });

      expect(service.login).toHaveBeenCalledWith('a@a.com', '123');
      expect(result).toEqual({ access_token: 'jwt-token' });
    });
  });

  describe('forgotPassword()', () => {
    it('should call authService.forgotPassword()', async () => {
      mockAuthService.forgotPassword.mockResolvedValue({ message: 'Password reset link sent to email' });

      const result = await controller.forgotPassword({ email: 'a@a.com' });

      expect(service.forgotPassword).toHaveBeenCalledWith('a@a.com');
      expect(result).toEqual({ message: 'Password reset link sent to email' });
    });
  });

  describe('resetPassword()', () => {
    it('should call authService.resetPassword()', async () => {
      mockAuthService.resetPassword.mockResolvedValue({ message: 'Password reset successful' });

      const result = await controller.resetPassword({ token: 'abc123', newPassword: 'newpass' });

      expect(service.resetPassword).toHaveBeenCalledWith('abc123', 'newpass');
      expect(result).toEqual({ message: 'Password reset successful' });
    });
  });
});
