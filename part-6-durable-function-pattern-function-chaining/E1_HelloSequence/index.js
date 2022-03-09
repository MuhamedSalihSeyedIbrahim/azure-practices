/*
 * This function is not intended to be invoked directly. Instead it will be
 * triggered by an HTTP starter function.
 *
 * Before running this sample, please:
 * - create a Durable activity function (default name is "Hello")
 * - create a Durable HTTP starter function
 * - run 'npm install durable-functions' from the wwwroot folder of your
 *    function app in Kudu
 */

const df = require("durable-functions");

module.exports = df.orchestrator(function* (context) {
  try {
    const x = yield context.df.callActivity("E1_SayHello", "Hello Tokyo ");
    context.log(x);
    if (x.code !== 200) throw x;
    return x;
  } catch (err) {
    return err.message + JSON.stringify(err.stack);
  }
});
