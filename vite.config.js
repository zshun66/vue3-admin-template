import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ command, mode, ssrBuild }) => {
  const env = loadEnv(mode, process.cwd() + '/env')
  console.log(env)

  return {
    // 应用类型
    appType: 'spa',
    // 环境配置文件目录
    envDir: 'env',
    // 环境变量前缀
    envPrefix: 'VITE_APP_',
    // 项目基路径
    base: env.VITE_APP_BASE_URL,
    // 公共资源目录
    publicDir: 'public',
    // 缓存目录
    cacheDir: 'node_modules/.vite',
    // 插件集成
    plugins: [
      vue()
    ],
    resolve: {
      
    },
    json: {
      // 是否支持从 .json 文件中进行按名导入
      namedExports: true,
      // 开启此项，则会禁用按名导入
      stringify: false
    },
    // 设为 false 可以避免 Vite 清屏而错过在终端中打印某些关键信息
    clearScreen: true,
    // 控制台输出的级别
    logLevel: 'info',
  }
})
