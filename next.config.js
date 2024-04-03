/** @type {import('next').NextConfig} */
const nextConfig = {

  reactStrictMode: false,

  async redirects() {
    return [
      {
        source: '/news',
        destination: '/news/metro_vancouver',
        permanent: true
      },
      {
        source: '/rezonings',
        destination: '/rezonings/map',
        permanent: true
      },
      {
        source: '/development-permits',
        destination: '/development-permits/map',
        permanent: true
      }
    ]
  },

  // Have to add these to get Ant Design to work with Next.js
  // https://github.com/vercel/next.js/issues/58817
  transpilePackages: [
    'antd',
    '@ant-design',
    'rc-util',
    'rc-pagination',
    'rc-picker',
    'rc-notification',
    'rc-tooltip'
  ]
}

module.exports = nextConfig
