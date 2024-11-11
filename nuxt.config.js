// nuxt.config.js

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Frontend",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/main.css',
    'quasar/dist/quasar.min.css' // Update path for Quasar v1
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/axios.js',
    { src: '~/plugins/quasar.js', mode: 'client' }
  ],

  // Backend Connectivity
  axios: {
    baseURL: "http://localhost:8000", // replace with your Django backend URL
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['quasar'], // Ensure Quasar is transpiled by Webpack
    extend(config, { isDev, isHMR }) {
      // Ensure babel-loader is applied to JavaScript files in node_modules
      const babelLoader = config.module.rules.find(
        (rule) => rule.loader === "babel-loader"
      );
      if (babelLoader) {
        // Exclude node_modules except for chart.js and vue-chartjs
        babelLoader.exclude = /node_modules\/(!chart\.js|vue-chartjs)/;
      }
    },
  },
};
