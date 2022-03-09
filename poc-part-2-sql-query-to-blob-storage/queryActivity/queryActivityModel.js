//@ts-check
const CosmosClient = require("@azure/cosmos").CosmosClient;

const { endpoint, key, databaseId, containerId } = require("./config");
const url = require("url");
const https = require("https");

const connection = () => {
  const options = {
    endpoint,
    key,
    userAgentSuffix: "CosmosDBJavascriptQuickstart",
    agent: new https.Agent({
      rejectUnauthorized: false,
    }),
  };

  const client = new CosmosClient(options);
  const database = client.database(databaseId);
  const container = database.container(containerId);

  return container;
};

module.exports = async function (context) {
  const container = connection();
  let SQL_QUERY;
  if (context.bindings.name) {
    SQL_QUERY = {
      query: `SELECT * FROM c WHERE c.vendorName= @vendorName`,
      parameters: [
        {
          name: "@vendorName",
          value: context.bindings.name,
        },
      ],
    };
  } else {
    SQL_QUERY = `SELECT * FROM c
    WHERE c.vendorName= "xxxx"`;
  }
  const { resources: items } = await container.items
    .query(SQL_QUERY)
    .fetchAll();
  return items;
};
