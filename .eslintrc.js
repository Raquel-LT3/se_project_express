// .eslintrc.js

module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  // We include "prettier" last to override any conflicting Airbnb rules
  extends: ["eslint:recommended", "airbnb-base", "prettier"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "no-console": ["warn", { allow: ["error"] }], // Warn on log, allow error
    "no-underscore-dangle": ["error", { allow: ["_id"] }],
  },
};
