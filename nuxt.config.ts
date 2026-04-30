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
    // We use 'static' provider for GitHub Pages to ensure reliability.
    // IPX can fail to pre-render images that are selected dynamically (like hero images).
    provider: 'static'
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