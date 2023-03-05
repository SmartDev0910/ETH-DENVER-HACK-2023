// next.config.js
const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

// const { withSentryConfig } = require('@sentry/nextjs')

// const nextConfig = {

module.exports = withBundleAnalyzer(
  withPWA({
    // webpack: (config, { isServer }) => {
    //   if (!isServer) {
    //     config.resolve.fallback.fs = false
    //   }
    //   config.module.rules = [
    //     ...config.module.rules,
    //     {
    //       type: 'javascript/auto',
    //     },
    //   ]

    //   return config
    // },
    // webpack5: true,
    // experimental: { esmExternals: true },
    pwa: {
      dest: 'public',
      runtimeCaching,
      disable: process.env.NODE_ENV === 'development',
    },
    images: {
      domains: [
        'res.cloudinary.com',
        'raw.githubusercontent.com',
        'logos.covalenthq.com',
        'cloudflare-ipfs.com',
        'zonulet.io',
      ],
    },
    reactStrictMode: true,
    async redirects() {
      return [
        // {
        //   source: '/',
        //   destination: '/',
        //   permanent: true,
        // },

        {
          source: '/zap',
          destination: '/',
          permanent: true,
        },
      ]
    },
    async rewrites() {
      return [
        {
          source: '/',
          destination: '/index',
        },
        {
          source: '/add/:token*',
          destination: '/exchange/add/:token*',
        },
        {
          source: '/remove/:token*',
          destination: '/exchange/remove/:token*',
        },
        {
          source: '/create/:token*',
          destination: '/exchange/add/:token*',
        },
        {
          source: '/swap',
          destination: '/exchange/swap',
        },
        {
          source: '/swap/:token*',
          destination: '/exchange/swap/:token*',
        },
      ]
    },
  }),
)

// const SentryWebpackPluginOptions = {
//   // Additional config options for the Sentry Webpack plugin. Keep in mind that
//   // the following options are set automatically, and overriding them is not
//   // recommended:
//   //   release, url, org, project, authToken, configFile, stripPrefix,
//   //   urlPrefix, include, ignore

//   silent: true, // Suppresses all logs
//   // For all available options, see:
//   // https://github.com/getsentry/sentry-webpack-plugin#options.
// }

// // Make sure adding Sentry options is the last code to run before exporting, to
// // ensure that your source maps include changes from all other Webpack plugins
// module.exports = withSentryConfig(withPWA(withBundleAnalyzer(nextConfig)), SentryWebpackPluginOptions)

// Don't delete this console log, useful to see the config in Vercel deployments
console.log('next.config.js', JSON.stringify(module.exports, null, 2))
