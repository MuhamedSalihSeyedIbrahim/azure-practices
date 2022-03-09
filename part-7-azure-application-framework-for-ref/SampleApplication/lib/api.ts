import request from 'axios';
import * as log from './logger';

/**
 * Function to make  request.
 *
 * @param {object} options
 */
function call(options: object): Promise<unknown> {
    return request(options);
}

/**
 * Function to make http request using axios.
 *
 * @param {string} methodType
 * @param {string} url
 * @param {object} data
 */
export async function req(methodType: string, url: string, data: object): Promise<unknown> {
    const header = {
        'content-type': 'application/json',
    };

    const options = {
        uri: url,
        method: methodType.toUpperCase(),
        body: data,
        headers: header,
        json: true,
        // Have to check do we need cancelToken
        // cancelToken:new cancelToken(function executor(cancelFunc){})
    };

    //log.info(JSON.stringify(options));
    const response = await call(options);

    return response;
}
