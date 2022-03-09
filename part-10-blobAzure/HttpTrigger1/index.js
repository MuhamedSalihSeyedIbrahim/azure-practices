module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
 if(req.body){
    context.bindings.myOutputBlob = req.body;//send any bin file through body
    
 }
};