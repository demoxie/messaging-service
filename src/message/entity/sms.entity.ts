import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
  name: 'sms_messages',
})
export class SMSMessages {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sendingService: string;

  @Column()
  to: string;

  @Column()
  from: string;

  @Column()
  body: string;

  @Column({ default: false })
  isSent: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
