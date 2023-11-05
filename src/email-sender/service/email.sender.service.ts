import { Inject, Injectable } from '@nestjs/common';
import { NodemailerConfigService } from '../../config/nodemailer/nodemailer.config';
import { Transporter } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { EmailDto } from '../../message/dto/email.dto';
import * as fs from 'fs';
import * as handlebars from 'handlebars';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class EmailSenderService {
  private nodemailerSender: Transporter<SMTPTransport.SentMessageInfo>;
  constructor(
    private readonly nodemailerConfigService: NodemailerConfigService,
    @Inject('RABBITMQ_SERVICE')
    private readonly client: ClientProxy,
  ) {}
  sendEmail = async (templateName: string, email: EmailDto) => {
    this.nodemailerSender = this.nodemailerConfigService.getEmailConfig();
    const source = fs.readFileSync(
      `/home/shadrach/Desktop/Projects/GAMESTAR/messaging-service/views/${templateName}.hbs`,
      'utf8',
    );
    const template = handlebars.compile(source);
    const senderService = email.sendingService;
    const htmlEmail = template(email.body);
    const mailOptions = {
      from: 'hello@gamestar.exchange',
      to: email.to,
      subject: email.subject,
      html: htmlEmail,
    };
    console.log('Sending email...');
    switch (senderService) {
      case 'nodemailer':
        return this.nodemailerSender
          .sendMail(mailOptions)
          .then((res) => {
            console.log('Email sent successfully');
            return res;
          })
          .catch((err) => {
            console.log('Error sending email');
            return err;
          });
      default:
        return await this.nodemailerSender
          .sendMail(mailOptions)
          .then((res) => {
            console.log('Email sent successfully');
            return res;
          })
          .catch((err) => {
            console.log('Error sending email');
            return err;
          });
    }
  };
}
