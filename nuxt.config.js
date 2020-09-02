const package = require('./package')

module.exports = {
  srcDir: 'client/',
  buildDir: 'dist/client/',
  cachettl: 60 * 60 * 24,
  // loading: '~components/loading.vue',
  generalfile:false,
  proxyUrl: {
    dev: "",
    test: "",
    production: ""
  },
  mode: 'universal',
  head: {
    title: "外销商城",
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no' },
      { hid: 'description', name: 'description', content: package.description }
    ],
    link: [
      { rel: 'icon', type: 'img/x-icon', href: '/favicon.ico' },
    ],
    script: [
      { src: '/js/flexible.js', type: 'text/javascript'},
    ]
  },
  loading: { 
    color: '#fff',
  },
  css: [
    '~/assets/common.css',
    '~/assets/reset-vant-theme.css',
  ],
  plugins: [
    '../config/plugins/vant-ui.js',
    '../config/plugins/axios',
  ],
  render:{
    static:{
      maxAge:31536001
    }
  },
  modules: [
    '../config/modules/typescript',
    '@nuxtjs/axios',
    '@nuxtjs/style-resources'
  ],
  styleResources:{
    sass: './assets/style.rule.scss',
  },
  router: {
    middleware: ['authlogin'],
  },
  buildDir: 'dist',
  build: {
    extractCSS: true,
    postcss: {
      plugins: {
        'postcss-pxtorem': {
          rootValue: 37.5,
          propList: ['*']
        }
      },
      preset: {
        autoprefixer: true
      }
    }
  }
  
}
