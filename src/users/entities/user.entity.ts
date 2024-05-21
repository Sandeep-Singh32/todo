import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Todo } from 'src/todo/entities/todo.entity';
import { MinLength } from 'class-validator';
import { UserInfo } from './userInfo.entity';
import { CourseEntity } from 'src/courses/entities/course.entity';

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ select: false })
  @MinLength(6)
  password: string;

  @Column({ default: false })
  isArchive: boolean;

  @Column()
  email: string;

  @Column({ type: 'int' })
  age: number;

  @OneToMany(() => Todo, (todo) => todo.user, { cascade: true, eager: true })
  todos: Todo[];

  @OneToOne(() => UserInfo, (userInfo) => userInfo.user, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  profile: UserInfo;

  @ManyToMany(() => CourseEntity, (courseEntity) => courseEntity.users)
  @JoinTable({ name: 'user_courses' })
  course: CourseEntity[];

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compareSync(password, this.password);
  }
}
