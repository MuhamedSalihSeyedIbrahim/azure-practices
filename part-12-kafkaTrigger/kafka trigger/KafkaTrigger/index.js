async function handler(context, event) {
  context.log.info("KafkaTrigger - handler - start");
  //context.log.info(event.toString("utf8"));
  //require("fs").writeFileSync("./file.json", event.toString("utf8"));
  context.bindings.myOutputBlob = event.toString("utf8");
  context.log.info("KafkaTrigger - handler - end.");
  context.done();
}

module.exports = handler;
