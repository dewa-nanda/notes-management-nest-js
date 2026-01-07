/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import { Notes } from './types/note.interface';

describe('NotesController', () => {
  let controller: NotesController;
  let service: NotesService;

  const mockNotes: Notes[] = [
    {
      id: 1,
      name: 'First Note',
      description: 'This is the first note description',
      created_at: new Date('2025-01-01T10:00:00Z'),
      updated_at: new Date('2025-01-01T10:00:00Z'),
    },
    {
      id: 2,
      name: 'Second Note',
      description: 'This is the second note description',
      created_at: new Date('2025-01-02T10:00:00Z'),
      updated_at: new Date('2025-01-02T10:00:00Z'),
    },
    {
      id: 3,
      name: 'Third Note',
      description: 'This is the third note description',
      created_at: new Date('2025-01-03T10:00:00Z'),
      updated_at: new Date('2025-01-03T10:00:00Z'),
    },
  ];

  const mockNotesService = {
    getAll: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotesController],
      providers: [
        {
          provide: NotesService,
          useValue: mockNotesService,
        },
      ],
    }).compile();

    controller = module.get<NotesController>(NotesController);
    service = module.get<NotesService>(NotesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Definition Tests', () => {
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });

    it('should have NotesService injected', () => {
      expect(service).toBeDefined();
    });
  });

  // describe('getAllNotes', () => {
  //   it('should return an array of notes', async () => {
  //     mockNotesService.getAll.mockResolvedValue(mockNotes);

  //     const result = await controller.getAllNotes();

  //     expect(result).toEqual(mockNotes);
  //     expect(result).toHaveLength(3);
  //     expect(service.getAll).toHaveBeenCalledTimes(1);
  //   });

  //   it('should return empty array when no notes exist', async () => {
  //     mockNotesService.getAll.mockResolvedValue([]);

  //     const result = await controller.getAllNotes();

  //     expect(result).toEqual([]);
  //     expect(result).toHaveLength(0);
  //     expect(service.getAll).toHaveBeenCalledTimes(1);
  //   });

  //   it('should return notes with correct data structure', async () => {
  //     mockNotesService.getAll.mockResolvedValue(mockNotes);
  //     const result = await controller.getAllNotes();

  //     expect(result[0]).toHaveProperty('id');
  //     expect(result[0]).toHaveProperty('name');
  //     expect(result[0]).toHaveProperty('description');
  //     expect(result[0]).toHaveProperty('created_at');
  //     expect(result[0]).toHaveProperty('updated_at');
  //     expect(typeof result[0].id).toBe('number');
  //     expect(typeof result[0].name).toBe('string');
  //     expect(typeof result[0].description).toBe('string');
  //     expect(result[0].created_at).toBeInstanceOf(Date);
  //     expect(result[0].updated_at).toBeInstanceOf(Date);
  //   });

  //   it('should handle service errors properly', async () => {
  //     const errorMessage = 'Database connection failed';
  //     mockNotesService.getAll.mockRejectedValue(new Error(errorMessage));

  //     await expect(controller.getAllNotes()).rejects.toThrow(errorMessage);
  //     expect(service.getAll).toHaveBeenCalledTimes(1);
  //   });

  //   it('should call service.getAll without any parameters', async () => {
  //     mockNotesService.getAll.mockResolvedValue(mockNotes);

  //     await controller.getAllNotes();

  //     expect(service.getAll).toHaveBeenCalledWith();
  //   });

  //   it('should return notes with valid date objects', async () => {
  //     mockNotesService.getAll.mockResolvedValue(mockNotes);

  //     const result = await controller.getAllNotes();

  //     result.forEach((note) => {
  //       expect(note.created_at).toBeInstanceOf(Date);
  //       expect(note.updated_at).toBeInstanceOf(Date);
  //       expect(note.created_at.getTime()).not.toBeNaN();
  //       expect(note.updated_at.getTime()).not.toBeNaN();
  //     });
  //   });
  // });
});
