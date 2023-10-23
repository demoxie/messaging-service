import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { RabbitMQService } from './service/rabbitmq.service';
import { EmailSenderModule } from "../email-sender/emailsender.module";
import { EmailSenderService } from "../email-sender/service/email.sender.service";
import { NodemailerConfigService } from "../config/nodemailer/nodemailer.config";

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'RABBITMQ_SERVICE',
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [
              `amqp://${configService.get(
                'RABBITMQ_PASSWORD',
              )}:${configService.get('RABBITMQ_USER')}@${configService.get(
                'RABBITMQ_HOST',
              )}:${configService.get('RABBITMQ_PORT')}`,
            ],
            queue: configService.get('RABBITMQ_QUEUE'),
            persistent: true,
            queueOptions: {
              durable: true,
            },
          },
        }),
        inject: [ConfigService],
      },
    ]),
    EmailSenderModule,
  ],
  controllers: [],
  exports: [RabbitMQService, ClientsModule],
  providers: [RabbitMQService, EmailSenderService, NodemailerConfigService],
})
export class RabbitmqModule {}
