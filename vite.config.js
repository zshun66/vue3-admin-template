import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import compressPlugin from 'vite-plugin-compression'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

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
      vue(),
      AutoImport({
        imports: [
          'vue',
          'vue-router',
        ],
        resolvers: [
          ElementPlusResolver(),
        ],
        dts: resolve(resolve(__dirname, 'typings'), 'auto-imports.d.ts'),
      }),
      Components({
        resolvers: [
          ElementPlusResolver(),
        ],
        dts: resolve(resolve(__dirname, 'typings'), 'components.d.ts'),
      }),
      VueSetupExtend(),
      compressPlugin({
        ext: '.gz',
        deleteOriginFile: false
      }),
      createSvgIconsPlugin({
        iconDirs: [resolve(__dirname, 'src/assets/icons')],
        symbolId: 'icon-[dir]-[name]'
      }),
    ],
    resolve: {
      // 路径别名
      alias: {
        '@': '/src',
      },
      // 导入时想要省略的扩展名列表
      extensions: ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json']
    },
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: [
            '@import "./src/styles/variable.scss";'
          ],
        }
      },
      // 在开发过程中是否启用 sourcemap
      devSourcemap: false,
    },
    // 开发服务器选项
    server: {
      host: '0.0.0.0',
      port: '8888',
      strictPort: true,
      open: false,
      proxy: {
        [env.VITE_APP_BASE_API]: {
          target: 'localhost',
          changeOrigin: true,
          rewrite: (path) => path.replace(new RegExp('^' + env.VITE_APP_BASE_API), '')
        }
      }
    },
    // 生产环境选项
    build: {
      target: 'modules',
      outDir: env.VITE_APP_OUTDIR,
      sourcemap: false,
      // 启用/禁用 brotli 压缩大小报告。压缩大型输出文件可能会很慢，因此禁用该功能可能会提高大型项目的构建性能
      brotliSize: true,
      // chunk 大小警告的限制（以 kbs 为单位）
      chunkSizeWarningLimit: 5000,
      // 小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求。设置为 0 可以完全禁用此项。（以 kbs 为单位）
      assetsInlineLimit: 4096,
      // 指定生成静态资源的存放路径（相对于 build.outDir）
      assetsDir: 'assets',
      // 自定义底层的 Rollup 打包配置
      rollupOptions: {
        // 打包资源拆分输出
        output: {
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
        }
      },
      // 混淆器，terser构建后文件体积更小 esbuild构建速度更快
      minify: 'terser',
      // 传递给 terser 的更多 minify 选项
      terserOptions: {
        // 压缩选项
        compress: {
          drop_console: false,
          pure_funcs: ['console.log', 'console.info'],
          drop_debugger: true
        }
      },
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
    define: {
      __VUE_I18N_FULL_INSTALL__: true,
      __VUE_I18N_LEGACY_API__: true,
      __INTLIFY_PROD_DEVTOOLS__: false
    }
  }
})
