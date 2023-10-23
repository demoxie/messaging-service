import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'emails',
})
export class Email {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sendingService: string;

  @Column()
  to: string;

  @Column()
  from: string;

  @Column()
  subject: string;

  @Column()
  body: string;

  @Column({ default: false })
  isSent: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
