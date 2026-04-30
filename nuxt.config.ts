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
    // Explicitly set the directory for IPX to ensure it finds images in the public folder
    ipx: {
      dir: './public'
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