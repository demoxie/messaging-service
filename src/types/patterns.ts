import { EmailDto } from "../message/dto/email.dto";

export enum Patterns {
  PAYMENT_QUEUE = 'payment_queue',
  EMAIL_QUEUE = 'email_queue',
}

export type EmailMessage = {
  from: string;
  to: string;
  subject: string;
  body: string;
  sendingService: string;
};

export class EmailResponse{
  private pattern: string;
  private data: EmailDto;
  getPattern(): string {
    return this.pattern;
  }
  getData(): EmailDto {
    return this.data;
  }
}
