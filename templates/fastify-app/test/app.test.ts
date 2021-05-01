import build from '../src/app';

describe.each([
  ['GET', '/ping', 200, "pong"],
  ['POST', '/ping', 404, "Route POST:/ping not found"],
  ['PUT', '/ping', 404, "Route PUT:/ping not found"],
  ['PATCH', '/ping', 404, "Route PATCH:/ping not found"],
  ['DELETE', '/ping', 404, "Route DELETE:/ping not found"],
])('[%s] %s', (method: any, url, code, expected) => {
  const server = build({ logger: false });
  beforeEach(async () => { await server.ready() });
  afterAll(() => server.close());

  test(`${code} ${expected}`, async () => {
    expect.assertions(2)
    const res = await server.inject({ method, url })
    expect(res.statusCode).toBe(code);
    expect(JSON.parse(res.payload)).toMatchObject({ message: expected });
  });
});
