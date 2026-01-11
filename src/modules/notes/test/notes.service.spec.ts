/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { NotesService } from '../notes.service';
import { NotesRepository } from '../repositories/notes.repository';
import { listNotes, mockPaginatedNotes } from './mock/note.mock';

describe('NotesService', () => {
  let service: NotesService;
  let repository: NotesRepository;

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
      const notes = mockPaginatedNotes(listNotes());
      mockNotesRepository.findAll.mockResolvedValue(notes);

      const result = await service.getAll({ userId: 'test' });

      expect(result).toEqual(notes);
      expect(result.items).toHaveLength(1);
    });

    it('should return empty array when no notes found', async () => {
      const notes = mockPaginatedNotes([]);
      mockNotesRepository.findAll.mockResolvedValue(notes);

      const result = await service.getAll({ userId: 'test' });

      expect(result.items).toEqual([]);
      expect(result.items).toHaveLength(0);
    });
  });
});
