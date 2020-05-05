import supertest from 'supertest';
import { app, db } from '../index';

const request = supertest(app);

describe('Testing Metrics Route', () => {
  // close mongoose connection not to keep jest open for a long time
  afterAll(async () => {
    await db.close();
  });

  it('should create a metric', async done => {
    const res = await request
      .post('/metrics')
      .set('Content-Type', 'text/plain;charset=UTF-8')
      .send(
        '{"networkTimings":{"css":[111.640,138.80499999504536],"font":[402.83],"img":[567,314,2855,234.790],"script":[2309,96.919,36.61,111.1400,131.76,141.61999999487307]},"TTFB":1571.2899,"DCL":2481.255,"LOAD":4655.57,"FCP":2149}'
      );
    expect(res.statusCode).toEqual(204);
    expect(JSON.stringify(res.body)).toBe(JSON.stringify({}));

    done();
  });

  it('should fetch all metrics', async done => {
    const res = await request.get('/metrics');

    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);

    done();
  });

  it('should respond with status code 404 if resource is not found', async done => {
    const res = await request.get(`/metrics/missing_url`);

    expect(res.statusCode).toEqual(404);

    done();
  });
});
