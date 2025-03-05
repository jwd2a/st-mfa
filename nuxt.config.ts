// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  
  modules: [
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    'nuxt-icon',
  ],
  
  // Tailwind CSS configuration
  tailwindcss: {
    cssPath: '~/assets/css/main.css',
    configPath: 'tailwind.config.ts',
    exposeConfig: {
      level: 2, // Expose the tailwind config on runtime
    },
  },
  
  // Shadcn UI configuration
  shadcn: {
    prefix: '', // Use no prefix for component names
    componentDir: './components/ui' // Where shadcn components will be created
  },
  
  // Set up TypeScript
  typescript: {
    strict: true,
    typeCheck: false, // Disable type checking during development to prevent #imports errors
    shim: false,
  },
  
  // App configuration
  app: {
    head: {
      title: 'MFA App',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'MFA management app for service providers' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },
  
  // CSS global imports
  css: ['~/assets/css/main.css'],
  
  // Runtime config for environment variables
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || '/api',
    },
    twilio: {
      accountSid: process.env.TWILIO_ACCOUNT_SID,
      authToken: process.env.TWILIO_AUTH_TOKEN,
    }
  },
  
  // Additional build options
  build: {
    transpile: ['vue-sonner']
  },
  
  // Experimental features
  experimental: {
    componentIslands: true,
  },
  
  // Set compatibility date to address warnings
  compatibilityDate: '2025-03-05'
}) 