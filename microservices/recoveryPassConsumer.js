import amqplib from "amqplib";
import sendResetEmail from "./sendEmail.js";

const QUEUE_NAME = "send-recovery-pass-email";

const connection = await amqplib.connect(process.env.RABBITMQ_BROKER_URL);

const channel = await connection.createChannel();

channel.assertQueue(QUEUE_NAME, {
  durable: true,
});

channel.consume(QUEUE_NAME, async (msg) => {
  const payload = msg.content.toString();
  const { email, token } = JSON.parse(payload);
  await sendResetEmail(email, token);
  channel.ack(msg);
});
