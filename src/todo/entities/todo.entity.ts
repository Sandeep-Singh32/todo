import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Todo extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  publisher: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdOn: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.todos)
  @JoinColumn()
  user: User;

  @Column({ default: false })
  isArchive: boolean;

  @Column({
    enum: ['completed', 'pending', 'new', 'in-progress'],
    default: 'new',
  })
  status: string;

  @Column()
  userId: string;
}
