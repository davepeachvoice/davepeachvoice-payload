/** @type {import("next").NextConfig} */
const config = {
  images: {
    loader: 'cloudinary',
    path: 'https://res.cloudinary.com/prestocloud/image/upload/',
    formats: ['image/avif', 'image/webp']
  },
  experimental: {
    appDir: true
  },
  webpack: (cfg) => {
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

    return cfg;
  }
}

export default config
