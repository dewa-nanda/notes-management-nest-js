import { Test, TestingModule } from '@nestjs/testing';
import { NotesEntity } from './notes.entity';
import { PrismaService } from '@src/database/prisma.service';
import { Notes } from '../types/note.interface';

describe('NotesEntity', () => {
  let entity: NotesEntity;
  let prismaService: PrismaService;

  // Mock data yang sesuai dengan Prisma model 'notes'
  const mockPrismaNotes = [
    {
      id: 1,
      name: 'Shopping List',
      description: 'Groceries to buy this weekend',
      created_at: new Date('2025-01-01T12:00:00Z'),
      updated_at: new Date('2025-01-01T12:00:00Z'),
    },
    {
      id: 2,
      name: 'Project Ideas',
      description: 'Innovative project concepts',
      created_at: new Date('2025-01-02T14:00:00Z'),
      updated_at: new Date('2025-01-02T14:00:00Z'),
    },
    {
      id: 3,
      name: 'Book Recommendations',
      description: 'Must-read books for this year',
      created_at: new Date('2025-01-03T16:00:00Z'),
      updated_at: new Date('2025-01-03T16:00:00Z'),
    },
  ];

  // Mock PrismaService dengan nested notes property
  const mockPrismaService = {
    notes: {
      findMany: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotesEntity,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    entity = module.get<NotesEntity>(NotesEntity);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Definition Tests', () => {
    it('should be defined', () => {
      expect(entity).toBeDefined();
    });

    it('should have PrismaService injected', () => {
      expect(prismaService).toBeDefined();
    });
  });

  describe('findAll', () => {
    it('should return all notes from Prisma', async () => {
      // Arrange
      mockPrismaService.notes.findMany.mockResolvedValue(mockPrismaNotes);

      // Act
      const result = await entity.findAll();

      // Assert
      expect(result).toEqual(mockPrismaNotes);
      expect(result).toHaveLength(3);
      expect(prismaService.notes.findMany).toHaveBeenCalledTimes(1);
    });

    it('should return empty array when database is empty', async () => {
      // Arrange
      mockPrismaService.notes.findMany.mockResolvedValue([]);

      // Act
      const result = await entity.findAll();

      // Assert
      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
      expect(prismaService.notes.findMany).toHaveBeenCalledTimes(1);
    });

    it('should call prisma.notes.findMany without parameters', async () => {
      // Arrange
      mockPrismaService.notes.findMany.mockResolvedValue(mockPrismaNotes);

      // Act
      await entity.findAll();

      // Assert
      expect(prismaService.notes.findMany).toHaveBeenCalledWith();
    });

    it('should return Notes[] type with correct structure', async () => {
      // Arrange
      mockPrismaService.notes.findMany.mockResolvedValue(mockPrismaNotes);

      // Act
      const result: Notes[] = await entity.findAll();

      // Assert
      expect(Array.isArray(result)).toBe(true);
      result.forEach((note) => {
        expect(note).toHaveProperty('id');
        expect(note).toHaveProperty('name');
        expect(note).toHaveProperty('description');
        expect(note).toHaveProperty('created_at');
        expect(note).toHaveProperty('updated_at');
      });
    });

    it('should handle Prisma errors properly', async () => {
      // Arrange
      const prismaError = new Error('P2002: Unique constraint failed');
      mockPrismaService.notes.findMany.mockRejectedValue(prismaError);

      // Act & Assert
      await expect(entity.findAll()).rejects.toThrow(
        'P2002: Unique constraint failed',
      );
      expect(prismaService.notes.findMany).toHaveBeenCalledTimes(1);
    });

    it('should handle database connection errors', async () => {
      // Arrange
      const connectionError = new Error('Connection to database failed');
      mockPrismaService.notes.findMany.mockRejectedValue(connectionError);

      // Act & Assert
      await expect(entity.findAll()).rejects.toThrow(
        'Connection to database failed',
      );
      expect(prismaService.notes.findMany).toHaveBeenCalledTimes(1);
    });

    it('should return data types matching Prisma schema', async () => {
      // Arrange
      mockPrismaService.notes.findMany.mockResolvedValue(mockPrismaNotes);

      // Act
      const result = await entity.findAll();

      // Assert
      result.forEach((note) => {
        expect(typeof note.id).toBe('number');
        expect(typeof note.name).toBe('string');
        expect(typeof note.description).toBe('string');
        expect(note.created_at).toBeInstanceOf(Date);
        expect(note.updated_at).toBeInstanceOf(Date);
      });
    });

    it('should preserve data from Prisma response', async () => {
      // Arrange
      mockPrismaService.notes.findMany.mockResolvedValue(mockPrismaNotes);

      // Act
      const result = await entity.findAll();

      // Assert
      expect(result[0]).toEqual(mockPrismaNotes[0]);
      expect(result[1]).toEqual(mockPrismaNotes[1]);
      expect(result[2]).toEqual(mockPrismaNotes[2]);
    });

    it('should handle single note response', async () => {
      // Arrange
      const singleNote = [mockPrismaNotes[0]];
      mockPrismaService.notes.findMany.mockResolvedValue(singleNote);

      // Act
      const result = await entity.findAll();

      // Assert
      expect(result).toHaveLength(1);
      expect(result[0]).toEqual(mockPrismaNotes[0]);
      expect(prismaService.notes.findMany).toHaveBeenCalledTimes(1);
    });

    it('should handle large dataset response', async () => {
      // Arrange
      const largeDataset = Array.from({ length: 100 }, (_, i) => ({
        id: i + 1,
        name: `Note ${i + 1}`,
        description: `Description for note ${i + 1}`,
        created_at: new Date(),
        updated_at: new Date(),
      }));
      mockPrismaService.notes.findMany.mockResolvedValue(largeDataset);

      // Act
      const result = await entity.findAll();

      // Assert
      expect(result).toHaveLength(100);
      expect(result[0].id).toBe(1);
      expect(result[99].id).toBe(100);
      expect(prismaService.notes.findMany).toHaveBeenCalledTimes(1);
    });
  });
});
