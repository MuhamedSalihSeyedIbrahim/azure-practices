const template = require("./template.ignore");

function DummyDataGenrator() {
  const dummyData = template();
  return dummyData;
}

module.exports = DummyDataGenrator;
