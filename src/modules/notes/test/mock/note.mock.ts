import { PaginatedData } from '@src/common/interfaces/api-response';
import { NoteResponse } from '../../interfaces/note.interface';

export function listNotes(): NoteResponse[] {
  return [
    {
      id: '7e775465-5568-48a2-9dc7-dba6518f8aae',
      title: 'percobaan navaya 123',
      content: 'lorem ipsum dear diary 123',
      createdAt: new Date('2026-01-10T07:12:18.208Z'),
      updatedAt: new Date('2026-01-10T07:39:20.535Z'),
    },
  ];
}

export function mockPaginatedNotes(
  items: NoteResponse[],
): PaginatedData<NoteResponse> {
  return {
    items,
    meta: {
      currentPage: 1,
      perPage: 1,
      total: 1,
      totalPages: 1,
    },
  };
}
