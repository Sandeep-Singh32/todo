import { Module } from '@nestjs/common';
import { TestController } from './mytest.controller';

@Module({
  controllers: [TestController],
  providers: [
    {
      provide: 'USER_NAME',
      useFactory: (limit: number = 4) => {
        return { limit };
      },
    },
    {
      provide: 'Test',
      useFactory: (limit: number = 4) => {
        return limit;
      },
      //   inject: [{ token: 'LIMITS', optional: true }],
      inject: ['LIMIT'],
    },
    {
      provide: 'LIMIT',
      useValue: 800,
    },
  ],
})
export class TestModule {}
