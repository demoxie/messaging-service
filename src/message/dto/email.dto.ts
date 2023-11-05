export class EmailDto {
  to: string;
  subject: string;
  body: object;
  sendingService: string;
  templateName: string;
  constructor(
    to: string,
    subject: string,
    body: object,
    sendingService: string,
    templateName: string,
  ) {
    this.to = to;
    this.subject = subject;
    this.body = body;
    this.sendingService = sendingService;
    this.templateName = templateName;
  }
}
