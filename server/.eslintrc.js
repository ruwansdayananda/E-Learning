module.exports = {
  extends: "../.eslintrc.js",
  parserOptions: {
    project: './tsconfig.json',
    sourceType: 'module',
  },
  rules: {
    '@typescript-eslint/no-var-requires': 0,
  }
};
