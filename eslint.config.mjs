import js from '@eslint/js';

import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import ts from 'typescript-eslint';

/** @type {import('eslint').Linter.Config<Linter.RulesRecord>[]} */
export default ts.config(
  js.configs.recommended,
  ...ts.configs.recommended,
  {
    plugins: {
      react: react,
      'react-hooks': reactHooks,
      'simple-import-sort': simpleImportSort,
      ts: ts.plugin
    },
    rules: {
      'prefer-const': 'error',
      'no-else-return': 'error',

      'no-console': 'warn',

      'simple-import-sort/exports': 'error',
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^@(([\\/.]?\\w)|assets|test-utils)'],
            ['^\\u0000'],
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
            ['^.+\\.s?css$']
          ]
        }
      ]
    },
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
        ...globals.es2022
      }
    }
  },
  {
    languageOptions: {
      parserOptions: {
        project: ['tsconfig.json']
      }
    },
    files: ['/src/**/*.ts', '/src/**/*.tsx']
  },
  {
    languageOptions: {
      parserOptions: react.configs.recommended.parserOptions
    },
    files: ['/src/**/*.js', '/src/**/*.jsx']
  },
  {
    ignores: ['node_modules', 'build', 'dist']
  }
);
