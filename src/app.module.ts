import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { RabbitmqModule } from './rabbitmq/rabbitmq.module';
import { EmailSenderModule } from './email-sender/emailsender.module';
import { ClientsModule } from '@nestjs/microservices';
import { RabbitMQService } from './rabbitmq/service/rabbitmq.service';
import { EmailSenderService } from './email-sender/service/email.sender.service';
import { NodemailerConfigService } from './config/nodemailer/nodemailer.config';
import { AppDataSourceModule } from './database/app.datasource.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      cache: true,
    }),
    RabbitmqModule,
    EmailSenderModule,
    ClientsModule,
    AppDataSourceModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    RabbitMQService,
    EmailSenderService,
    NodemailerConfigService,
  ],
})
export class AppModule {}
