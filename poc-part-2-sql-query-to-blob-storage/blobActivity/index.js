const blobActivityService = require("./blobActivityService");

module.exports = async function (context, queryResult) {
  return blobActivityService(queryResult);
};
