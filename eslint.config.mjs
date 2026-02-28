import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import tailwind from 'eslint-plugin-tailwindcss';

const eslintConfig = defineConfig([
   ...nextVitals,
   ...nextTs,

   {
      plugins: {
         'simple-import-sort': simpleImportSort,
         tailwindcss: tailwind,
      },
      rules: {
         'simple-import-sort/imports': 'error',
         'simple-import-sort/exports': 'error',

         'tailwindcss/classnames-order': 'warn',
         'tailwindcss/no-contradicting-classname': 'error',
         'tailwindcss/no-duplicate-classname': 'error',
      },
   },

   globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
]);

export default eslintConfig;
