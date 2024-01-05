import { Injectable } from '@nestjs/common';
import { MessageVO } from './lib/vo/message.vo';

@Injectable()
export class AppService {
  getHello(): MessageVO {
    return {
      message: 'Hello World!'
    };
  }
}
