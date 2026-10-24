import { describe, it, expect, beforeEach, afterEach, vi } from '../../node_modules/vitest/index.cjs';
import { Test, TestingModule } from '@nestjs/testing';
import { StudentsService } from './students.service.js';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Student } from './student.entity.js';
import { Repository } from 'typeorm';

const mockStudent: Student = {
  StudentID: 1,
  StudentName: 'Ali Khan',
  StudentAge: 20,
  StudentGender: 'Male',
  StudentRollNo: 'CS-01',
  StudentSemester: 3,
};

const mockRepository = {
  save: vi.fn(),
  find: vi.fn(),
  findOneBy: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

describe('StudentsService', () => {
  let service: StudentsService;
  let repo: Repository<Student>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentsService,
        {
          provide: getRepositoryToken(Student),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<StudentsService>(StudentsService);
    repo = module.get<Repository<Student>>(getRepositoryToken(Student));
  });

  afterEach(() => vi.clearAllMocks());

  describe('create()', () => {
    it('should save and return a new student', async () => {
      mockRepository.save.mockResolvedValue(mockStudent);

      const dto = {
        StudentName: 'Ali Khan',
        StudentAge: 20,
        StudentGender: 'Male',
        StudentRollNo: 'CS-01',
        StudentSemester: 3,
      };

      const result = await service.create(dto);

      expect(repo.save).toHaveBeenCalledWith(dto);
      expect(result).toEqual(mockStudent);
    });
  });

  describe('findAll()', () => {
    it('should return an array of students', async () => {
      mockRepository.find.mockResolvedValue([mockStudent]);

      const result = await service.findAll();

      expect(repo.find).toHaveBeenCalled();
      expect(result).toEqual([mockStudent]);
    });

    it('should return empty array when no students exist', async () => {
      mockRepository.find.mockResolvedValue([]);

      const result = await service.findAll();

      expect(result).toEqual([]);
    });
  });

  describe('findOne()', () => {
    it('should return a student by ID', async () => {
      mockRepository.findOneBy.mockResolvedValue(mockStudent);

      const result = await service.findOne(1);

      expect(repo.findOneBy).toHaveBeenCalledWith({ StudentID: 1 });
      expect(result).toEqual(mockStudent);
    });

    it('should return null if student not found', async () => {
      mockRepository.findOneBy.mockResolvedValue(null);

      const result = await service.findOne(999);

      expect(result).toBeNull();
    });
  });

  describe('update()', () => {
    it('should update and return update result', async () => {
      const updateResult = { affected: 1 };
      mockRepository.update.mockResolvedValue(updateResult);

      const result = await service.update(1, { StudentAge: 22 });

      expect(repo.update).toHaveBeenCalledWith(1, { StudentAge: 22 });
      expect(result).toEqual(updateResult);
    });
  });

  describe('remove()', () => {
    it('should delete a student by ID', async () => {
      const deleteResult = { affected: 1 };
      mockRepository.delete.mockResolvedValue(deleteResult);

      const result = await service.remove(1);

      expect(repo.delete).toHaveBeenCalledWith(1);
      expect(result).toEqual(deleteResult);
    });
  });
});
