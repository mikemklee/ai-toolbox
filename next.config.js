/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/smart-regex-input',
        permanent: true,
      }
    ]
  }
}

module.exports = nextConfig
