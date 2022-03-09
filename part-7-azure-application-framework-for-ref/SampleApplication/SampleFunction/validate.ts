import * as Joi from '@hapi/joi';
import { Context, HttpRequest } from '@azure/functions';

const validate = (ctx: Context, req: HttpRequest): void => {
    const schema = Joi.object({
       
    });

    const validtionResult = schema.validate(req.query);
    if (validtionResult.error != undefined) {
        ctx.res = {
            status: 400,

            body: validtionResult.error.details.map((error) => (): unknown => {
                return {
                    feild: error,
                    message: error.message,
                };
            }),
        };
        ctx.done();
    }
    
};

export default validate;
