import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { viteMockServe } from 'vite-plugin-mock'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({command, mode}) => {
  const localEnabled = command === 'serve';
  let mockPath: string = ''
  if(localEnabled) mockPath = 'mock'
  // 根据当前工作目录中的 `mode` 加载 .env 文件
  // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
  const env = loadEnv(mode, process.cwd(), '');
  return {
    server: {
      port: 9999,
      host: true,
      proxy: {// 跨域代理
        [env.VITE_APP_PROXY]: {
          target: env.VITE_APP_BASE_API,
          changeOrigin: true, //需要代理跨域
          rewrite: (path) => path.replace(/^\/api/, '') //路径重写
          // pathRewrite: {
          //   [`^${env.VITE_APP_PROXY}`]: ''
          // }
        },
      },
      open: true
    },
    plugins: [
      vue(),
      //配置svg插件
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        symbolId: 'icon-[dir]-[name]',
      }),
      //配置mock
      viteMockServe({
        mockPath,
      }),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
    resolve: {
      dynamicImport: true,
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: `
            @import "./src/styles/variable.scss";
          `,
        },
      },
    },
  }
})
