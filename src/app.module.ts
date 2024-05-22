import { Module, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TodoModule } from './todo/todo.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants/constant';
import { PassportModule } from '@nestjs/passport';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { JwtAuthGuard } from './guards/JwtAuthGuard';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CourseModule } from './courses/courses.module';
import { TestModule } from './mytest/mytest.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env.dev'] }),
    DatabaseModule,
    PassportModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '6h' },
    }),
    AuthModule,
    UsersModule,
    TodoModule,
    CourseModule,
    TestModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    JwtService,
    // {
    //   provide: APP_PIPE,
    //   useClass: ValidationPipe,
    // },  //register global pipe
  ],
})
export class AppModule {}
