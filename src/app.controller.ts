import { Controller, Get, Inject, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy, Ctx, EventPattern, Payload, RmqContext } from "@nestjs/microservices";
import { EmailDto } from './message/dto/email.dto';
import { Patterns } from './types/patterns';
import { EmailSenderService } from './email-sender/service/email.sender.service';
import { timeout } from 'rxjs';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('RABBITMQ_SERVICE')
    private readonly client: ClientProxy,
    private readonly emailSenderService: EmailSenderService,
  ) {}

  @EventPattern(Patterns.PAYMENT_QUEUE)
  async handlePaymentQueue(
    @Payload() data: EmailDto,
    @Ctx() context: RmqContext,
  ) {
    console.log('Message received: ', data);
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    try {
      channel.ack(originalMsg);
      await this.emailSenderService.sendEmail('index', data);
    } catch (e) {
      console.log(e);
      channel.nack(originalMsg);
    }
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  async postHello(): Promise<string> {
    const email: EmailDto = {
      from: 'hello@gamestar.exchange',
      to: 'shadrachadamuul@gmail.com',
      subject: 'Hello World RabbitMQ!',
      body: {
        salutation: 'Hello Shadrach',
        message: 'This is a test message',
      },
      sendingService: 'nodemailer',
    };
    this.client
      .emit(Patterns.PAYMENT_QUEUE, email)
      .pipe(timeout(1000))
      .subscribe((res) => {
        console.log(res);
      });
    return this.appService.postHello();
  }
}
