import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity()
export class Item {
  @PrimaryGeneratedColumn({ type: 'int4' })
  _id: number

  @Column()
  name: string

  @CreateDateColumn()
  created_at: string

  @UpdateDateColumn()
  updated_at: string
}
