const momentRandom = require("moment-random");
const { v4: uuidv4 } = require("uuid");
const { duration } = require("moment");

const between = (min = 0, max = 9999999999999) => {
  return Math.floor(Math.random() * (max - min) + min);
};

module.exports = () => {
  const items = [2,3,4];
  let dt = momentRandom().format("YYYY-MM-DD"),
    str = uuidv4(),
    num = between(0,3),
    vendorCode = Math.floor(Math.random() * items.length);

  const randomData = {
    a: str,b:num,c:vendorCode,d:dt
  };
  return randomData;
};
