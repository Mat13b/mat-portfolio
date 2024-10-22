export default function RobotsTxt() {
  return null;
}

export async function getServerSideProps({ res }) {
  res.setHeader('Content-Type', 'text/plain');
  res.write(`User-agent: *
Allow: /

# Sitemap sera ajouté ultérieurement
# Sitemap: https://www.votresite.com/sitemap.xml`);
  res.end();

  return { props: {} };
}
