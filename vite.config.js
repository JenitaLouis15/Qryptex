import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // 1. Development Plugins
  plugins: [
    react(),
    tailwindcss(),
  ],
  
  // 2. API Proxying for Local Development
  server: {
    proxy: {
      "/api": "http://localhost:3000",
    },
  },
  // 3. Production Build Optimizations
  build: {
    target: 'esnext', 
    chunkSizeWarningLimit: 1500, // Suppress warnings for heavy 3D libraries
    
    rollupOptions: {
      output: {
     
        manualChunks: (id) => {
          // Isolate Three.js so the browser caches it permanently
          if (id.includes('node_modules/three')) {
            return 'vendor_three';
          }
   
          if (id.includes('node_modules/react') || 
              id.includes('node_modules/react-dom') || 
              id.includes('node_modules/react-router-dom')) {
            return 'vendor_react';
          }
        
          if (id.includes('node_modules')) {
            return 'vendor_utils';
          }
        }
      }
    }
  },

  // 4. Dev Server Pre-bundling (Speeds up Vite start time)
  optimizeDeps: {
    include: ['three', 'react', 'react-dom']
  }
})