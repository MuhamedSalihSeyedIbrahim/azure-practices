const queryActivityModel = require("./queryActivityModel");

module.exports = async function (context) {
  return queryActivityModel(context);
};
