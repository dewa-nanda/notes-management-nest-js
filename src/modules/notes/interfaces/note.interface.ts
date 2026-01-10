import { Note } from '@prisma/client';

export type NoteResponse = Omit<Note, 'userId'>;

export interface NoteParams {
  id: string;
}

export interface NoteFilterRequest {
  userId?: string;
}

export type NoteCreateRequest = Pick<Note, 'title' | 'content' | 'userId'>;
export interface NoteUpdateRequest extends Pick<Note, 'id'> {
  title?: string;
  content?: string;
}
