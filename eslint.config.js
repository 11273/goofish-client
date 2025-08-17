import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      parser: parser,
      parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 2021,
        sourceType: 'module',
      },
      globals: {
        ...globals.browser, // 添加浏览器环境全局变量
        ...globals.node, // 添加 Node.js 环境全局变量
        ...globals.es2021, // 添加 ES2021 全局变量
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
    },
    rules: {
      ...typescript.configs.recommended.rules,
      ...typescript.configs['recommended-requiring-type-checking'].rules,

      '@typescript-eslint/no-require-imports': 'off', // 允许 require
      '@typescript-eslint/no-unsafe-assignment': 'off', // 允许 any 赋值

      '@typescript-eslint/explicit-function-return-type': 'warn',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/consistent-type-imports': 'error',
      'no-console': ['warn', { allow: ['warn', 'error', 'log'] }],
    },
  },
  // 为 examples 目录下的 CommonJS 文件添加特殊配置
  {
    files: ['examples/**/*.js'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'commonjs', // CommonJS 模块
      globals: {
        ...globals.node, // Node.js 环境全局变量
        ...globals.es2021, // ES2021 全局变量
      },
    },
    rules: {
      'no-console': 'off', // examples 中允许使用 console
      'no-undef': 'error', // 检查未定义变量
    },
  },
  {
    ignores: ['dist', 'node_modules', '*.d.ts'],
  },
];
