import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class notes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  title: string;

  @Column('text')
  description: string;

  @Column('date')
  createdAt: Date;

  @Column('date')
  updatedAt: Date;

  @Column('int')
  views: number;

  @Column('boolean')
  isPublished: boolean;
}
