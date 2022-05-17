export default {
  head: {
    title: 'palest-theme',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: []
  },
  // target: 'server',
  css: [
    '~/assets/css/icons.css',
    '~/assets/css/main.css'
  ],
  plugins: [
    '~/plugins/tools.js',
    '~/plugins/http.js',
    '~/plugins/storeino.js',
    '~/plugins/init.js',
    '~/plugins/events.js',
  ],
  components: true,
  buildModules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/fontawesome'
  ],
  fontawesome: {
    component: "fa",
    icons: {
      solid: true,
      brands: true,
      regular: true
    }
  },
  modules: [
    '@nuxtjs/axios',
    'storeino-theme-modulevx00',
  ],
  axios: {},
  pwa: {
    manifest: {
      lang: 'en'
    }
  },
  serverMiddleware: ['~/server/index'],
  server: {
    host: '0.0.0.0'
  },
  build: {
  }
}
