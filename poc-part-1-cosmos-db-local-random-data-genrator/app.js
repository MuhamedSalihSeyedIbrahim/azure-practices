//@ts-check
const CosmosClient = require("@azure/cosmos").CosmosClient;

const config = require("./config");
const url = require("url");
const https = require("https");
const randomDataGenrator = require("./randomDataGenrator");

const endpoint = config.endpoint;
const key = config.key;

const databaseId = config.database.id;
const containerId = config.container.id;
const partitionKey = { kind: "Hash", paths: ["/poNumber"] };

const options = {
  endpoint: endpoint,
  key: key,
  userAgentSuffix: "CosmosDBJavascriptQuickstart",
  agent: new https.Agent({
    rejectUnauthorized: false,
  }),
};

const client = new CosmosClient(options);

/**
 * Create family item if it does not exist
 */
async function createFamilyItem(itemBody) {
  const { item } = await client
    .database(databaseId)
    .container(containerId)
    .items.upsert(itemBody);
  console.log(`Created family item with id:\n${itemBody.id}\n`);
}

for (let _ = 0; _ < 4; _++) createFamilyItem(randomDataGenrator());

