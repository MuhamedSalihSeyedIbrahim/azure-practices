module.exports = function* (context) {
  let vendorName = null;
  if (context.bindings.context.input.params.vendorName)
    vendorName = context.bindings.context.input.params.vendorName;
  try {
    const queryResult = yield context.df.callActivity(
      "queryActivity",
      vendorName
    );

    return yield context.df.callActivity("blobActivity", queryResult);
  } catch (error) {
    // Error handling or compensation goes here.
    return error;
  }
};
