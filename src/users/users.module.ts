import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserInfo } from './entities/userInfo.entity';
import { CourseEntity } from 'src/courses/entities/course.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserInfo, CourseEntity]),
    JwtModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, JwtService],
})
export class UsersModule {}
