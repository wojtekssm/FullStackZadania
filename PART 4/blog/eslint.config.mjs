import js from "@eslint/js"
import globals from "globals"
import stylisticJs from '@stylistic/eslint-plugin'
import { defineConfig } from "eslint/config"

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: {
      js,
      '@stylistic/js': stylisticJs,
    },
    extends: ["js/recommended"],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      '@stylistic/js/indent': ['error', 2],
      '@stylistic/js/linebreak-style': ['error', 'unix'],
      '@stylistic/js/quotes': ['error', 'single'],
      '@stylistic/js/semi': ['error', 'never'],
    }
  },

  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
    }
  }
])
