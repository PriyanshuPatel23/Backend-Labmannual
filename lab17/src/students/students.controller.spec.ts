import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { StudentsController } from './students.controller.js';
import { StudentsService } from './students.service.js';

const mockStudent = {
  StudentID: 1,
  StudentName: 'Ali Khan',
  StudentAge: 20,
  StudentGender: 'Male',
  StudentRollNo: 'CS-01',
  StudentSemester: 3,
};

const mockStudentsService = {
  create: vi.fn(),
  findAll: vi.fn(),
  findOne: vi.fn(),
  update: vi.fn(),
  remove: vi.fn(),
};

describe('StudentsController', () => {
  let controller: StudentsController;
  let service: StudentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentsController],
      providers: [
        {
          provide: StudentsService,
          useValue: mockStudentsService,
        },
      ],
    }).compile();

    controller = module.get<StudentsController>(StudentsController);
    service = module.get<StudentsService>(StudentsService);
  });

  afterEach(() => vi.clearAllMocks());

  describe('create()', () => {
    it('should call service.create() and return student', async () => {
      mockStudentsService.create.mockResolvedValue(mockStudent);

      const dto = {
        StudentName: 'Ali Khan',
        StudentAge: 20,
        StudentGender: 'Male',
        StudentRollNo: 'CS-01',
        StudentSemester: 3,
      };

      const result = await controller.create(dto);

      expect(service.create).toHaveBeenCalledWith(dto);
      expect(result).toEqual(mockStudent);
    });
  });

  describe('findAll()', () => {
    it('should return all students', async () => {
      mockStudentsService.findAll.mockResolvedValue([mockStudent]);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual([mockStudent]);
    });
  });

  describe('findOne()', () => {
    it('should return a student by id', async () => {
      mockStudentsService.findOne.mockResolvedValue(mockStudent);

      const result = await controller.findOne('1');

      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockStudent);
    });
  });

  describe('update()', () => {
    it('should update a student', async () => {
      const updated = { ...mockStudent, StudentAge: 25 };
      mockStudentsService.update.mockResolvedValue(updated);

      const result = await controller.update('1', { StudentAge: 25 });

      expect(service.update).toHaveBeenCalledWith(1, { StudentAge: 25 });
      expect(result).toEqual(updated);
    });
  });

  describe('remove()', () => {
    it('should remove a student', async () => {
      mockStudentsService.remove.mockResolvedValue({ affected: 1 });

      const result = await controller.remove('1');

      expect(service.remove).toHaveBeenCalledWith(1);
      expect(result).toEqual({ affected: 1 });
    });
  });
});
