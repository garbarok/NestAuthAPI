export default {
  'src/**/*.ts': ['eslint --fix --max-warnings 0'],
  '*.{md,json}': ['prettier --write'],
  '*.{js,mjs,cjs}': ['eslint --fix --no-warn-ignored'],
};
