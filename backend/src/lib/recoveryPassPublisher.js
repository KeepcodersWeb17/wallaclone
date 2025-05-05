import amqplib from "amqplib";

const EXCHANGE_NAME = "recovery-pass";

const connection = await amqplib.connect(process.env.RABBITMQ_BROKER_URL);

const channel = await connection.createChannel();

await channel.assertExchange(EXCHANGE_NAME, "direct", {
  durable: true,
});

export const publishMessage = (email, token) => {
  const message = {
    email,
    token,
  };
  channel.publish(EXCHANGE_NAME, "*", Buffer.from(JSON.stringify(message)));
};
