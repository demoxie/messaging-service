import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerMiddleware } from './middleware/logging.middleware';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';


const port = process.env.PORT || 3000;
const bootstrap = async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  const configService = app.get(ConfigService);
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [
        `amqp://${configService.get('RABBITMQ_PASSWORD')}:${configService.get(
          'RABBITMQ_USER',
        )}@${configService.get('RABBITMQ_HOST')}:${configService.get(
          'RABBITMQ_PORT',
        )}`,
      ],
      noAck: false,
      queue: configService.get('RABBITMQ_QUEUE'),
      queueOptions: {
        durable: true,
      },
    },
  });
  await app.startAllMicroservices();
  const PORT = configService.get('PORT');
  app.use(loggerMiddleware);
  await app.listen(PORT);
};
bootstrap()
  .then(() => console.log(`Application is listening on port ${port}`))
  .catch((err) => console.error('Application failed to start', err));
