import { defineConfig } from 'tsup';
import { readFileSync } from 'fs';

// 读取 package.json
const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'));

export default defineConfig({
  // 📥 入口配置
  entry: {
    index: 'src/index.ts',
    // 如果有多个入口，可以添加：
    // utils: 'src/utils/index.ts'
  },

  // 📤 输出格式 - 支持所有主流格式
  format: ['cjs', 'esm'],

  // 🔧 添加输出文件扩展名配置
  outExtension({ format }) {
    return {
      js: format === 'cjs' ? '.js' : '.mjs',
    };
  },

  // 🎯 目标环境 - 与 tsconfig 保持一致
  target: 'es2018',
  platform: 'neutral', // 同时支持 Node.js 和浏览器

  // 📝 TypeScript 声明文件
  dts: {
    resolve: true, // 解析第三方类型
    entry: './src/index.ts',
    compilerOptions: {
      // 覆盖一些不适合构建的选项
      incremental: false,
      composite: false,
    },
  },

  // 📦 打包配置
  splitting: false, // SDK 通常不需要代码分割
  clean: true, // 构建前清理输出目录

  // 🗺️ Source Map - 禁用以减少包大小
  sourcemap: false,

  // 🔍 代码优化
  minify: process.env.NODE_ENV === 'production',
  treeshake: {
    moduleSideEffects: false,
    propertyReadSideEffects: false,
    // 标记纯函数
    annotations: true,
  },

  // 📚 外部依赖 - 智能处理
  external: [
    // Node.js 内置模块
    /^node:/,
    'crypto',
    'fs',
    'path',
    'url',
    'http',
    'https',
    'stream',
    'util',
    'events',
    'buffer',
    // dependencies 中的包（如果有的话）
    ...Object.keys(pkg.dependencies || {}),
    // peerDependencies 中的包
    ...Object.keys(pkg.peerDependencies || {}),
  ],

  // 不外部化的依赖（需要打包进去的）
  noExternal: [
    // 例如：某些需要打包的小工具库
    // 'tiny-lib'
  ],

  // 🏷️ 全局替换
  define: {
    __VERSION__: JSON.stringify(pkg.version),
    __DEV__: JSON.stringify(process.env.NODE_ENV !== 'production'),
  },

  // 📁 输出目录
  outDir: 'dist',

  // ✅ 构建成功回调
  // onSuccess: 'npm run post-build', // 暂时注释，等添加 post-build 脚本后再启用

  // 🔧 esbuild 选项
  esbuildOptions(options) {
    // 保留类名（用于 instanceof 检查）
    options.keepNames = true;
    // 合法注释（版权声明等）
    options.legalComments = 'inline';
  },

  // 🚫 忽略文件
  ignoreWatch: ['**/node_modules/**', '**/dist/**', '**/.git/**'],
});
