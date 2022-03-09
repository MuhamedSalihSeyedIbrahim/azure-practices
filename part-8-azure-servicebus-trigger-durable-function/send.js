// send message to queue

const { ServiceBusClient } = require("@azure/service-bus");
/**
 * @class serviceBusQueue
 */
class ServiceBusQueue {
  /**
   * Creates an instance of serviceBusQueue.
   * @param {object} { connectionString, queueName }
   *
   */
  constructor({ connectionString, queueName }) {
    this._connectionString = connectionString;
    this._queueName = queueName;
    this._sbClient = ServiceBusClient.createFromConnectionString(
      this._connectionString
    );
    this._queueClient = this._sbClient.createQueueClient(queueName);
    this._sender = this._queueClient.createSender();
  }

  /**
   * Send message to Service Bus Queue.
   *
   * @param {any} msg
   *
   */
  async sendMsg(msg) {
    return await this._sender.send(msg);
  }

  /**
   * Close service bus and queue connection.
   *
   */
  async closeConn() {
    await Promise.all([this._queueClient.close(), this._sbClient.close()]);
  }
}

async function main() {
  const serviceBusQueueConfig = {
    connectionString:
      "Endpoint=sb://testing1q.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=POn0F3FUFzgc+NaUdSrNy+o43hmT3uy76OpeyPrxONg=",
    queueName: "testQ",
  };

  const sb = new ServiceBusQueue(serviceBusQueueConfig);
  await sb.sendMsg({ body: { eventId: "data" } });
  await sb.closeConn();
}

main().catch((err) => console.error(err));

module.exports = { ServiceBusQueue };
