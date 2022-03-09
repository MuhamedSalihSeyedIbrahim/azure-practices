const df = require("durable-functions");

module.exports = df.orchestrator(function* (context) {
    const taskTeamCaptain = context.df.waitForExternalEvent("TeamCaptain");
    const taskThor = context.df.waitForExternalEvent("TeamThor");
    const taskBlackWidow = context.df.waitForExternalEvent("TeamBlackWidow");

    yield context.df.Task.all([taskTeamCaptain, taskThor, taskBlackWidow]);

    const result = yield context.df.callActivity("Resnap");

    return result;
});