const mylogger = require('./logger')

module.exports = async function (context, req) {
    // context.log('JavaScript HTTP trigger function processed a request.');
    // console.log("LOGGING WORKS!!!")
   // var operationIdOverride = {"ai.operation.id":context.traceContext.traceparent};
   console.log("CONSOLE LOG")
    mylogger.warn("LOGGING WARN");
     
    if (req.query.name || (req.body && req.body.name)) {
        mylogger.info("LOGGING INFO");
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: "Hello " + (req.query.name || req.body.name)
        };
    }
    else {
         mylogger.error("LOGGINF ERROR");
        context.res = {
            status: 400,
            body: "Please pass a name on the query string or in the request body"
        };
    }
};
