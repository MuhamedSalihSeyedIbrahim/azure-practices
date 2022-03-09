import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    if(req.body){
        context.log("VAIDEHI");
    }
    context.log('HTTP trigger function processed a request.',req.body);
    //const name = (req.query.name || (req.body && req.body.name));
    context.log('asfaf',req.body)
   // context.bindings.myOutputBlob = req.body;
    //context.done();
   
};

export default httpTrigger;
