import {collectDefaultMetrics, Counter, register} from 'prom-client';
import {NextApiRequest} from 'next';

collectDefaultMetrics();
const httpRequestCount = new Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'statusCode'],
});

export async function GET(req: NextApiRequest) {
  try {
    httpRequestCount.inc({
      method: req.method,
      route: req.url,
      statusCode: 200,
    });
    const metrics = await register.metrics();
    return new Response(metrics);
  } catch (e) {
    return new Response(null, {status: 500});
  }
}
