/*
 * This function is intended to be directly by http.
 *
 */

const df = require("durable-functions");

const Trigger = async function (context) {
  const client = df.getClient(context);
  console.log("from trigger-----------", context.bindings.msg);
  return await client.startNew(
    "DurableFunctionsOrchestratorJS1",
    undefined,
    context.bindings.msg
  );
};

module.exports = Trigger;
