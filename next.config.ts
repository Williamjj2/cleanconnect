import { withAxiom } from 'next-axiom'
import type { NextConfig } from 'next'
import type { Configuration } from 'webpack'

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  webpack: (config: Configuration, { dev }) => {
    if (!config.module) config.module = { rules: [] }
    if (!config.module.rules) config.module.rules = []

    config.module.rules.push({
      test: /\.(mp3)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/sounds/',
          outputPath: 'static/sounds/',
          name: '[name].[hash].[ext]',
          esModule: false,
        },
      },
    })

    if (dev) {
      config.module.rules.push({
        test: /\.(js|ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve('@axe-core/react/loader'),
          },
        ],
      })
    }

    return config
  },
}

export default withAxiom(nextConfig)
