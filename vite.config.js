import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { getThemeVariables } from 'antd/dist/theme';
import vitePluginImp from 'vite-plugin-imp';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    vitePluginImp({
      libList: [
        {
          libName: 'antd',
          style: (name) => `antd/es/${name}/style`,
        },
      ],
    }),
  ],
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          // ...getThemeVariables({
          //   dark: true
          // }),
          '@primary-color': '#5F98A9',
          '@font-size-base': '15px',
        },
        // modifyVars: getThemeVariables({
        //   '@primary-color': '#01B636'
        // }),
        javascriptEnabled: true,
      },
    },
  },
})
