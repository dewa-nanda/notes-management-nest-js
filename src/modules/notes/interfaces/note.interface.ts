import { Note } from '@prisma/client';

export type NoteResponse = Omit<Note, 'userId'>;

export interface NoteFilterRequest {
  userId?: string;
  page?: number;
  limit?: number;
}

export type NoteAllQueryRequest = Omit<NoteFilterRequest, 'userId'>;

export type NoteCreateRequest = Pick<Note, 'title' | 'content' | 'userId'>;
export interface NoteUpdateRequest extends Pick<Note, 'id'> {
  title?: string;
  content?: string;
}
