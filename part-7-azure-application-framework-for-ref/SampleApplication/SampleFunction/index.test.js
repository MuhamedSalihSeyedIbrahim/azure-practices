import func from './index';

const context = require('../testing/defaultContext');

jest.mock('../lib/cosmoDB');

test('Sample test case ', async () => {
    const request = {};

    await httpTrigger(context, request);

    expect(context.res.status).toBe(200);
    expect(context.log.mock.calls.length).toBe(1);
});
