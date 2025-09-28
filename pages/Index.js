import cookie from 'cookie';

export default function Page({ html }) {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

export async function getServerSideProps({ req }) {
  const cookies = cookie.parse(req.headers.cookie || '');
  if (!cookies.auth) {
    return { redirect: { destination: '/login', permanent: false } };
  }

  const NOTION_URL = process.env.NOTION_URL;
  const SITE_URL = process.env.SITE_URL || `https://${process.env.VERCEL_URL}`;

  const resp = await fetch(NOTION_URL, { headers: { 'User-Agent': 'Mozilla/5.0' }});
  let html = await resp.text();

  const proxy = (u) => `${SITE_URL}/api/proxy?u=${encodeURIComponent(u)}`;
  html = html.replace(/https?:\/\/(?:www\.)?notion\.so[^\s"'<>)]*/g, (m) => proxy(m));
  html = html.replace(/https?:\/\/secure\.notion-static\.com[^\s"'<>)]*/g, (m) => proxy(m));

  return { props: { html } };
}
