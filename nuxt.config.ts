// https://nuxt.com/docs/api/configuration/nuxt-config

import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  app: {
    baseURL: '/works/',
    pageTransition: { name: 'page', mode: 'out-in' },
    viewTransition: true
  },

  modules: ['@nuxt/content', '@nuxt/image', '@nuxt/ui'],

  image: {
    provider: 'ipx',
    ipx: {
      // Relative to the project root, 'public' is the default.
      // Ensuring it's set correctly for all environments.
      dir: 'public'
    }
  },

  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'light',
    modes: {
      light: 'light',
      dark: 'dark',
      doux: 'doux'
    }
  },

  devtools: { enabled: true },

  compatibilityDate: '2024-04-03',

  css: ['./app/assets/css/main.css'],
  
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
})