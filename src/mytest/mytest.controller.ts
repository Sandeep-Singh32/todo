import { Controller, Inject } from '@nestjs/common';

@Controller('mytest')
export class TestController {
  constructor(@Inject('Test') private username: string) {
    console.log({ value: username });
  }
}
