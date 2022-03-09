const df = require("durable-functions");

module.exports = async function (context, req) {
  context.log('Avenger EndGame member arrival');

  const { who, instanceId }  = req.query;

  const client = df.getClient(context);

  const avengersMembers = ['TeamCaptain', 'TeamThor', 'TeamBlackWidow'];
  const found = avengersMembers.find(m => who);

  if(!found)  {
      context.res = {
          status: 400,
          body: `Someone unknown called ${who} just entered TeamThor!`
      };
  } else {
      await client.raiseEvent(instanceId, who, true);
      context.res = {
          // status: 200, /* Defaults to 200 */
          body: `Another Avengers member ${who} entered TeamThor!!`
      };
  }
};