import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: 'Hello,Fischl',
  },
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: 'Home Page',
      path: '/home',
      component: './Home',
    },
  ],
  npmClient: 'pnpm',
  // extraBabelPlugins: process.env.NODE_ENV === 'production' ? ['babel-plugin-dynamic-import-node'] : [],
  // @ts-ignore
  // https://github.com/umijs/umi/discussions/8541
  chainWebpack(config) {
    config.set('experiments', {
      ...config.get('experiments'),
      asyncWebAssembly: true
    })

    const REG = /\.wasm$/

    config.module.rule('asset').exclude.add(REG).end();

    config.module
        .rule('wasm')
        .test(REG)
        .exclude.add(/node_modules/)
        .end()
        .type('webassembly/async')
        .end()
  },
});

