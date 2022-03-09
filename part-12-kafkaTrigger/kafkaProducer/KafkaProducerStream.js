const { Transform, pipeline } = require("stream");
const ProducerStream = require("kafka-node").ProducerStream;
const { promisify } = require("util");
const pipelineAsync = promisify(pipeline);

async function main() {
  const producer = new ProducerStream();
  const transform = new Transform({
    objectMode: true,
    decodeStrings: true,
    transform(text, encoding, callback) {
      console.log(`pushing message to testTopic`);
      callback(null, {
        topic: "testTopic",
        messages: text,
      });
    },
  });

  const readStream = require("fs")
    .createReadStream("./data/10.json", { highWaterMark: 104857600 })
    .setEncoding("utf8");
  console.log("pipeline started.");

  await pipelineAsync(readStream, transform, producer);
  readStream.close();
  producer.close();
  console.log("pipeline accomplished.");
}
main();
