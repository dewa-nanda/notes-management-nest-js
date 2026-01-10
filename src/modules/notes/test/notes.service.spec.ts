/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { NotesService } from '../notes.service';
import { NotesRepository } from '../repositories/notes.repository';
import { Notes } from '../interfaces/note.interface';

describe('NotesService', () => {
  let service: NotesService;
  let repository: NotesRepository;

  const mockNotes: Notes[] = [
    {
      id: 'uuid-note-example-1',
      title: 'Meeting Notes',
      content: 'Discussion about project milestones',
      userId: 'uuid-user-example-1',
      createdAt: new Date('2025-01-01T08:00:00Z'),
      updatedAt: new Date('2025-01-01T08:00:00Z'),
    },
    {
      id: 'uuid-note-example-2',
      title: 'Todo List',
      content: 'Tasks to complete this week',
      userId: 'uuid-user-example-2',
      createdAt: new Date('2025-01-02T09:00:00Z'),
      updatedAt: new Date('2025-01-02T09:00:00Z'),
    },
  ];

  const mockNotesRepository = {
    findAll: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotesService,
        {
          provide: NotesRepository,
          useValue: mockNotesRepository,
        },
      ],
    }).compile();

    service = module.get<NotesService>(NotesService);
    repository = module.get<NotesRepository>(NotesRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Definition Tests', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });

    it('should have NotesEntity injected', () => {
      expect(repository).toBeDefined();
    });
  });

  describe('getAll', () => {
    it('should return all notes from entity', async () => {
      mockNotesRepository.findAll.mockResolvedValue(mockNotes);

      const result = await service.getAll();

      expect(result).toEqual(mockNotes);
      expect(result).toHaveLength(2);
    });

    it('should return empty array when no notes found', async () => {
      mockNotesRepository.findAll.mockResolvedValue([]);

      const result = await service.getAll();

      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });
  });
});
