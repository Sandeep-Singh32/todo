import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Todo } from 'src/todo/entities/todo.entity';
import { MinLength } from 'class-validator';
const SALT = 10;

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column()
  @MinLength(6)
  password: string;

  @Column()
  email: string;

  @Column({ type: 'int' })
  age: number;

  @OneToMany(() => Todo, (todo) => todo.user)
  todos: Todo[];

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, SALT);
    return hash === this.password;
  }
}
