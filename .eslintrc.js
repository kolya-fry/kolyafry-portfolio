module.exports = {
  root: false,
  env: {
    node: true
  },
  	// "extends": "airbnb/base",
	// "extends": "eslint:recommended",
	// "extends": "starndard",
  extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
  parserOptions: {
    parser: "babel-eslint"
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "indent": [1, "tab"], // Величина отступа 1 TAB
		// "linebreak-style": ["error", "windows"], // правильный перевод строки для Windows 'CRLF', для unix 'LF'
		"no-console": "off", // разрешить консоль
		"no-unused-vars": [0], // отключить проверку неиспользуемых переменных
		"space-before-blocks": 1, // отступ перед блоками
		"keyword-spacing": ["warn", { "after": true }], // отступ после ключевых слов
		"space-infix-ops": "warn", // пробелы между знаком равно
		"key-spacing": ["warn", { "afterColon": true }] //
  },
  overrides: [
    {
      files: [
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)"
      ],
      env: {
        jest: true
      }
    }
  ]
};
