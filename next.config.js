const resolveTsconfigPathsToAlias = require('./resolve-tsconfig-path-to-webpack-alias')

module.exports = {
  target: 'serverless',
  images: {
    loader: 'cloudinary',
    path: 'https://res.cloudinary.com/prestocloud/image/upload/'
  },
  webpack: (cfg) => {
    cfg.plugins = cfg.plugins || []

    cfg.resolve.alias = {
      ...cfg.resolve.alias,
      ...resolveTsconfigPathsToAlias(),
    }

    cfg.plugins = [
      ...cfg.plugins,]

    cfg.module.rules.push(
      {
        test: /\.md$/,
        loader: 'frontmatter-markdown-loader',
        options: { mode: ['react-component'] }
      }
    )

    cfg.module.rules.push({
      test: /\.(jpe?g|png|svg|gif|ico|eot|ttf|woff|woff2|mp4|mp3|pdf|webm|txt)$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/chunks/[path][name].[hash][ext]'
      },
    });

    cfg.plugins = cfg.plugins.filter(plugin => plugin.constructor.name !== 'ForkTsCheckerWebpackPlugin')

    return cfg;
  }
}
