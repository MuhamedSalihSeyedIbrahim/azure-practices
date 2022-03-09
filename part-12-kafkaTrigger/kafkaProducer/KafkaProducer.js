var kafka = require("kafka-node"),
  Producer = kafka.Producer,
  client = new kafka.KafkaClient({ kafkaHost: "localhost:9092" }),
  producer = new Producer(client),
  payloads = [
    {
      topic: "testTopic",
      messages: "Hi",
      partition: 0,
    },
  ];

producer.on("ready", function () {
  producer.send(payloads, function (err, data) {
    err ? console.error(err) : "";
    console.log(data);
  });
});

producer.on("error", function (err) {
  err ? console.error(err) : "";
});

producer.close();
