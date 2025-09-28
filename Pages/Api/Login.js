import { serialize } from 'cookie';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const body = await new Promise((r) => {
    let data = '';
    req.on('data', chunk => (data += chunk));
    req.on('end', () => r(new URLSearchParams(data)));
  });
  const password = body.get('password') || '';

  if (password === process.env.PAGE_PASSWORD) {
    const cookie = serialize('auth', '1', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24
    });
    res.setHeader('Set-Cookie', cookie);
    res.writeHead(302, { Location: '/' });
    return res.end();
  } else {
    res.writeHead(302, { Location: '/login?error=1' });
    return res.end();
  }
}
