import { defineConfig } from 'umi';
import CompressionWebpackPlugin from 'compression-webpack-plugin';
//引入模块联邦
const { ModuleFederationPlugin } = require('webpack').container;
const prodGzipList = ['js', 'css'];

let httpServer = 'xxxxxxx';
if (process.env.SERVERHTTP) {
  httpServer = process.env.SERVERHTTP;
}

export default defineConfig({
  title: '模块联邦',
  nodeModulesTransform: {
    type: 'none',
  },
  webpack5: {},
  hash: true,
  routes: [
    { path: '/login', component: '@/pages/login' },
    {
      path: '/',
      component: '@/layout',
      wrappers: ['@/wrappers/auth'],
      routes: [
        {
          path: '/',
          component: '@/pages/home',
          exact: true 
        },
      ],
    },
  ],
  fastRefresh: {},
  ignoreMomentLocale: true,
  dynamicImport: {
    loading: '@/Loading',
  },
  chunks:
    process.env.NODE_ENV === 'production'
      ? ['react', 'vendors', 'umi']
      : ['umi'],
  chainWebpack: function (config, { webpack }) {

    config.plugin('mf').use(ModuleFederationPlugin, [
      {
        name: 'app1',
        remotes: {
          app2: 'app2@//localhost:8001/testChildren123.js',
        },
        shared: { react: { eager: true }, 'react-dom': { eager: true } },
      },
    ]);
    if (process.env.NODE_ENV === 'production') {
      config.optimization.splitChunks({
        chunks: 'all',
        minSize: 30000,
        minChunks: 1,
        automaticNameDelimiter: '.',
        cacheGroups: {
          react: {
            chunks: 'all',
            name: 'react',
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            priority: 20,
          },
          vendors: {
            chunks: 'all',
            name: 'vendors',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
          },
        },
      });
      // 生产模式开启
      config.plugin('compression-webpack-plugin').use(
        new CompressionWebpackPlugin({
          algorithm: 'gzip',
          test: new RegExp('\\.(' + prodGzipList.join('|') + ')$'),
          threshold: 10240,
          minRatio: 0.6,
        }),
      );
    }
  },
  outputPath: 'dist',
  proxy: {
    '/xxxxxxx/': {
      target: `http://${httpServer}/`,
      changeOrigin: true,
    },
  },
});
