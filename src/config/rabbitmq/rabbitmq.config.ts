// import * as amqp from 'amqplib';
// import { config } from 'dotenv';
// config();
// const { RABBITMQ_USER, RABBITMQ_PASSWORD, RABBITMQ_HOST, RABBITMQ_PORT } =
//   process.env;
//
// const rabbitmqUrl = `amqp://${RABBITMQ_USER}:${RABBITMQ_PASSWORD}@${RABBITMQ_HOST}:${RABBITMQ_PORT}`;
//
// const rabbitmqClient = async () => {
//   const connection = await amqp.connect(rabbitmqUrl);
//   const channel = await connection.createChannel();
//   await channel.assertQueue('payment_queue');
//   await channel.assertQueue('email_queue');
//   return channel;
// };
//
// export default rabbitmqClient;
