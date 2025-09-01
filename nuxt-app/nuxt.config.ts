// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },

  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxtjs/tailwindcss',
    '@primevue/nuxt-module',
    '@nuxtjs/color-mode',
  ],
  postcss: {
    plugins: {
      'postcss-import': {},
      tailwindcss: {},
      autoprefixer: {},
    }
  },
  css: [ 'assets/css/styles.css', 'assets/css/tailwind.css', 'primeicons/primeicons.css' ],
  tailwindcss: { cssPath: false },
  primevue: {
    importTheme: { from: '@/theme.js' },
    options: {
      ripple: true
    },
    autoImport: true,
    components: {
      include: '*',
      exclude: [ 'Editor', 'Chart' ]
    }
  },
  colorMode: {
    preference: 'light',
    fallback: 'light',
    storage: 'cookie',
    storageKey: 'color-mode'
  },
})
