const df = require("durable-functions");
const queryToBlobService = require("./queryToBlobService");

module.exports = df.orchestrator(queryToBlobService);
