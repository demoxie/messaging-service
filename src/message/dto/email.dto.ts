export class EmailDto {
  to: string;
  from: string;
  subject: string;
  body: object;
  sendingService: string;
  constructor(
    to: string,
    from: string,
    subject: string,
    body: object,
    sendingService: string,
  ) {
    this.to = to;
    this.from = from;
    this.subject = subject;
    this.body = body;
    this.sendingService = sendingService;
  }
}
