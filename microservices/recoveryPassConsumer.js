import amqplib from "amqplib";

const QUEUE_NAME = "send-recovery-pass-email";

const connection = await amqplib.connect(process.env.RABBITMQ_BROKER_URL);

const channel = await connection.createChannel();

channel.assertQueue(QUEUE_NAME, {
  durable: true,
});

channel.consume(QUEUE_NAME, (msg) => {
  console.log(msg.content.toString());
  channel.ack(msg);
});
