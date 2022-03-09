module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    context.bindings.myQueueItem = context.bindings.req;
    context.done();
};