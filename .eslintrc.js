module.exports = {
    "extends": "eslint:recommended",
    "env": {
      "es6": true
    },
    "rules": {
      "indent": [2, 2, { "SwitchCase": 1 }],
      "semi": [2, "never"],
      "no-case-declarations": 0,
      "eol-last": 2,
      "no-cond-assign": 2,
      "no-constant-condition": 0,
      "no-console": ["error", { allow: ["warn", "error"] }]
    },
    "parser": "babel-eslint",
    "globals": {
      "console": true,
      "beforeEach": true,
      "it": true,
      "describe": true
    }
};
