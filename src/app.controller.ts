import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessageVO } from './lib/vo/message.vo';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): MessageVO {
    return this.appService.getHello();
  }
}
