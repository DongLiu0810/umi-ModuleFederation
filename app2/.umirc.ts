import { defineConfig } from 'umi';
import CompressionWebpackPlugin from 'compression-webpack-plugin';
//引入模块联邦
const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');
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
  qiankun: {
    slave: {},
  },
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
  chainWebpack: function (config, { webpack }) {

    config.output.publicPath('auto');

    config.plugin('mf').use(ModuleFederationPlugin, [
      {
        name: 'app2',
        library: { type: 'umd', name: 'app2' }, //不管在commonjs、AMD、CMD 引入，都能引入到,编译内部代码适配
        filename: 'testChildren123.js',
        exposes: {
          './testChildren': './src/components/testChildren/index',
        },
        shared: { react: { eager: true }, 'react-dom': { eager: true } },
      },
    ]);

    if (process.env.NODE_ENV === 'production') {
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
