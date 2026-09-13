import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Project Pages: https://davidd647.github.io/tax_receipt/
export default defineConfig({
  base: '/tax_receipt/',
  plugins: [react()],
})
