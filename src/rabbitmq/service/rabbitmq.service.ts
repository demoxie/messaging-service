
import { EmailSenderService } from '../../email-sender/service/email.sender.service';


export class RabbitMQService {
  constructor(private readonly emailSenderService: EmailSenderService) {}
}
