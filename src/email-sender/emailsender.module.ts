import { Module } from '@nestjs/common';
import { NodemailerConfigService } from '../config/nodemailer/nodemailer.config';

@Module({
  imports: [],
  controllers: [],
  providers: [NodemailerConfigService],
})
export class EmailSenderModule {}
