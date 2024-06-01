/* eslint-disable no-undef */
// vite.config.js

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.REACT_APP_OKTA_URL_BASE': JSON.stringify(process.env.REACT_APP_OKTA_URL_BASE),
    'process.env.REACT_APP_OKTA_CLIENTID': JSON.stringify(process.env.REACT_APP_OKTA_CLIENTID),
    'process.env.REACT_APP_OKTA_APP_BASE_URL': JSON.stringify(process.env.REACT_APP_OKTA_APP_BASE_URL),
  },
});
