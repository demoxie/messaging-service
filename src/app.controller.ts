import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import {
  ClientProxy,
  Ctx,
  EventPattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { EmailDto } from './message/dto/email.dto';
import { EmailSenderService } from './email-sender/service/email.sender.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('RABBITMQ_SERVICE')
    private readonly client: ClientProxy,
    private readonly emailSenderService: EmailSenderService,
  ) {}

  @EventPattern()
  async handlePaymentQueue(@Payload() data: EmailDto, @Ctx() context: RmqContext) {
    console.log('Message received: ', data);
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    try {
      channel.ack(originalMsg);
      return await this.emailSenderService.sendEmail(data.templateName, data);
    } catch (e) {
      console.log(e);
      channel.nack(originalMsg);
    }
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
