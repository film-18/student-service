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
          '@primary-color': '#08979c',
          '@font-size-base': '15px',
          '@link-color':'#1890ff',
          // '@button-color': '#1DC9A1',
          '@success-color': '#52c41a',
          '@warning-color': '#faad14',
          '@error-color': '#f5222d',
          '@heading-color': 'rgba(0, 0, 0, 0.85)',
          '@text-color': '#595959',
          '@disabled-color': '#8c8c8c',
          '@box-shadow-base': '0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08) 0 9px 28px 8px rgba(0, 0, 0, 0.05)',
        },
        // modifyVars: getThemeVariables({
        //   '@primary-color': '#01B636'
        // }),
        javascriptEnabled: true,
      },
    },
  },
})
