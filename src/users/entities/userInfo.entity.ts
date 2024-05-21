// user-info.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserInfo {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  profilename: string;

  @Column({ nullable: true })
  profileImage: string;

  @Column()
  hobby: string;

  @Column({ enum: ['single', 'married'] })
  status: string;

  @Column({ enum: ['male', 'female'] })
  sex: string;

  @OneToOne(() => User, (user) => user.profile)
  @JoinColumn()
  user: User;
}
