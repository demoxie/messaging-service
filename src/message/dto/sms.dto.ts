export class SmsDto {
  private to: string;
  private from: string;
  private body: string;
  private sendingService: string;
  constructor(to: string, from: string, body: string, sendingService: string) {
    this.to = to;
    this.from = from;
    this.body = body;
    this.sendingService = sendingService;
  }
}
