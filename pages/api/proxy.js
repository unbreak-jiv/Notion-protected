export default async function handler(req, res) {
  const { u } = req.query;
  if (!u) return res.status(400).send('Missing u parameter');
  const target = decodeURIComponent(u);

  try {
    const remote = await fetch(target, { headers: { 'User-Agent': req.headers['user-agent'] || 'Mozilla/5.0' }});
    const buffer = Buffer.from(await remote.arrayBuffer());
    const contentType = remote.headers.get('content-type') || 'application/octet-stream';
    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(remote.status).send(buffer);
  } catch (err) {
    res.status(502).send('Proxy error');
  }
}
