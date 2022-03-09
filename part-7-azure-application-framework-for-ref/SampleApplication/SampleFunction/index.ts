import Middleware from '../lib/middleware';
import * as log from '../lib/logger';
import handler from './handler';
import validate from './validate';

const func = new Middleware()
    .use(async (ctx, req) => {
        log.info('Validate middleware');
        await validate(ctx, req);
        if (ctx.res.body == undefined) {
            ctx.next();
        }
    })
    .use(async (ctx, req) => {
        log.info('Handler middleware');
        await handler(ctx, req);
        ctx.next();
    })
    .listen();

export default func;
