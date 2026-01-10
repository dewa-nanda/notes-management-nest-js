/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { NotesController } from '../notes.controller';
import { NotesService } from '../notes.service';
import { Notes } from '../interfaces/note.interface';
import { NotesRepository } from '../repositories/notes.repository';

describe('NotesController', () => {
  let controller: NotesController;
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
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Definition Tests', () => {
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });
  });
});
