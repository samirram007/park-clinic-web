import { resolve } from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import tanstackRouter from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import sitemap from 'vite-plugin-sitemap'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // const isProd = mode === 'production'
  const env = loadEnv(mode, process.cwd())
  return {
    // base: isProd ? '/frontend/' : '/',
    base: env.VITE_BASE_URL,
    server: {
      // port: 3000,
      proxy: {
        '/api': {
          target: env.VITE_API_BASE_URL, // Your Laravel backend URL
          changeOrigin: true, // Ensures the host header is rewritten to the target
          secure: env.VITE_API_SECURE === 'true', // For local HTTP servers (set to true for HTTPS in production)
          rewrite: (path) => path.replace(/^\/api/, ''), // Optional: removes /api prefix if needed
        },
        '/storage': {
          target: env.VITE_API_BASE_URL, // Proxy storage files to Laravel backend
          changeOrigin: true,
          secure: env.VITE_API_SECURE === 'true',
        },
      },
    },
    build: {
      // ssr: 'src/entry-server.tsx', // for server rendering
      // outDir: 'dist-ssr',
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks(id) {
            // if (id.includes('src/features/accounts/settings')) {
            //   return 'accounts-settings'
            // }

            if (id.includes('src/features/masters/accounts')) {
              return 'accounts'
            }
          },
        },
      },
    },
    plugins: [
      tanstackRouter({
        target: 'react',
        autoCodeSplitting: true,
      }),
      react(),
      tailwindcss(),
      sitemap({
        hostname: env.VITE_SITE_URL || 'https://parkclinickolkata.in',
        dynamicRoutes: [
          '/about',
          '/career',
          '/contact',
          '/departments',
          '/doctors',
          '/frontend',
          '/gallery',
          '/pharmacy',
          '/privacy-policy',
          '/terms-of-service',
          '/sitemap',
          '/services/Indoor%20Services',
          '/services/Diagnostic%20Services',
          '/services/Outdoor%20Services',
          '/services/Brain%20%26%20Spine%20Surgery%20%28Neurosciences%29',
          '/services/Orthopaedics%20%26%20Spine%20Surgery',
          '/services/Paediatrics%20%26%20Childcare',
          '/services/ENT%20%26%20Maxillofacial%20Surgery',
          '/services/General%2C%20Uro%20%26%20Laparoscopic%20Surgery',
          '/services/Laboratory%20Testing',
        ],
        exclude: ['/login', '/admin/**'],
        changefreq: 'weekly',
        priority: 0.7,
        lastmod: new Date(),
      }),
    ],
    optimizeDeps: {
      include: ['react-is'],
    },
    test: {
      globals: true,
      environment: 'jsdom',
    },

    resolve: {
      tsconfigPaths: true,
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
  }
})
