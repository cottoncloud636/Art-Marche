import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy: {
      '/api': {
        target: 'http://localhost:3000', //any request made to /api will be redirected to http://localhost:3000.
                  //and backend are in different port#, we want to go server and fetch the data
        secure: false, // Setting it to false means SSL certificate verification is disabled.
      },
    },
  },


  plugins: [react()],
});

