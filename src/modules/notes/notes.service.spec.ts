/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { NotesService } from './notes.service';
import { NotesEntity } from './entity/notes.entity';
import { Notes } from './types/note.interface';

describe('NotesService', () => {
  let service: NotesService;
  let entity: NotesEntity;

  const mockNotes: Notes[] = [
    {
      id: 1,
      name: 'Meeting Notes',
      description: 'Discussion about project milestones',
      created_at: new Date('2025-01-01T08:00:00Z'),
      updated_at: new Date('2025-01-01T08:00:00Z'),
    },
    {
      id: 2,
      name: 'Todo List',
      description: 'Tasks to complete this week',
      created_at: new Date('2025-01-02T09:00:00Z'),
      updated_at: new Date('2025-01-02T09:00:00Z'),
    },
  ];

  const mockNotesEntity = {
    findAll: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotesService,
        {
          provide: NotesEntity,
          useValue: mockNotesEntity,
        },
      ],
    }).compile();

    service = module.get<NotesService>(NotesService);
    entity = module.get<NotesEntity>(NotesEntity);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Definition Tests', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });

    it('should have NotesEntity injected', () => {
      expect(entity).toBeDefined();
    });
  });

  describe('getAll', () => {
    it('should return all notes from entity', async () => {
      mockNotesEntity.findAll.mockResolvedValue(mockNotes);

      const result = await service.getAll();

      expect(result).toEqual(mockNotes);
      expect(result).toHaveLength(2);
      expect(entity.findAll).toHaveBeenCalledTimes(1);
    });

    it('should return empty array when no notes found', async () => {
      mockNotesEntity.findAll.mockResolvedValue([]);

      const result = await service.getAll();

      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
      expect(entity.findAll).toHaveBeenCalledTimes(1);
    });

    it('should call entity.findAll without parameters', async () => {
      mockNotesEntity.findAll.mockResolvedValue(mockNotes);

      await service.getAll();

      expect(entity.findAll).toHaveBeenCalledWith();
    });

    it('should propagate errors from entity layer', async () => {
      const errorMessage = 'Prisma query failed';
      mockNotesEntity.findAll.mockRejectedValue(new Error(errorMessage));

      await expect(service.getAll()).rejects.toThrow(errorMessage);
      expect(entity.findAll).toHaveBeenCalledTimes(1);
    });

    it('should return notes with all required fields', async () => {
      mockNotesEntity.findAll.mockResolvedValue(mockNotes);

      const result = await service.getAll();

      result.forEach((note) => {
        expect(note).toHaveProperty('id');
        expect(note).toHaveProperty('name');
        expect(note).toHaveProperty('description');
        expect(note).toHaveProperty('created_at');
        expect(note).toHaveProperty('updated_at');
      });
    });

    it('should maintain data integrity from entity response', async () => {
      mockNotesEntity.findAll.mockResolvedValue(mockNotes);

      const result = await service.getAll();

      expect(result).toBe(mockNotes);
      expect(result[0].id).toBe(mockNotes[0].id);
      expect(result[0].name).toBe(mockNotes[0].name);
      expect(result[0].description).toBe(mockNotes[0].description);
    });
  });
});
