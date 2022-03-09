/*
 * This function is not intended to be invoked directly. Instead it will be
 * triggered by an orchestrator function.
 *
 * Before running this sample, please:
 * - create a Durable orchestration function
 * - create a Durable HTTP starter function
 * - run 'npm install durable-functions' from the wwwroot folder of your
 *   function app in Kudu
 */

module.exports = async function (context, name) {
  try {
    throw new Error("act");
    return `${name}!`;
  } catch (err) {
    return { code: 500, stack: err.stack, message: err.message };
  }
};
