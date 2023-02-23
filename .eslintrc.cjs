module.exports = {
  env: {
    browser: true,
    es2021: true,
    // node: 1,
  },

  extends: [
    "plugin:vue/vue3-essential",
    "airbnb-base",
    // "@vue/prettier",
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["vue"],
  rules: {
    "linebreak-style": 0,

    // "linebreak-style": ["error", "unix"],
    "no-console": "error", // без console.log
    indent: ["error", 2, {}],
    "no-debugger": "error", // без debugger
    // конструкторы производных классов должны вызывать super().
    // Конструкторы не производных классов не должны вызывать super().
    "constructor-super": "off",
    "no-mixed-operators": [
      // Заключение сложных выражений в круглые скобки проясняет замысел разработчика
      "error",
      {
        groups: [
          ["+", "-", "*", "/", "%", "**"],
          ["&", "|", "^", "~", "<<", ">>", ">>>"],
          ["==", "!=", "===", "!==", ">", ">=", "<", "<="],
          ["&&", "||"],
          ["in", "instanceof"],
        ],
        allowSamePrecedence: true,
      },
    ],
    "import/extensions": "off", // обеспечить согласованное использование расширения файла в пути импорта
    // ESLint предпочитает экспорт по умолчанию импорт/предпочитает экспорт по умолчанию
    "import/prefer-default-export": "off",
    "no-unused-expressions": "error", // нет неиспользуемых выражений
    "prefer-destructuring": [
      "error",
      {
        // требуется деструктуризация массивов и/или объектов.
        array: true,
        object: true,
      },
      {
        enforceForRenamedProperties: false,
      },
    ],
    "no-bitwise": ["error", { allow: ["~"] }], // запрещает побитовые операторы.
    "no-unused-vars": ["error", { argsIgnorePattern: "^_" }], // запрещает неиспользуемые переменные.
    "max-len": ["error", { code: 200 }], // обеспечивает максимальную длину строки.
    "object-curly-newline": [
      "error",
      {
        ObjectExpression: { multiline: true, consistent: true },
        ObjectPattern: { multiline: true, consistent: true },
      },
    ], // применяет согласованные разрывы строк после открытия и перед закрытием фигурных скобок.
    // требует или запрещает пустую строку между членами класса.
    "lines-between-class-members": [
      "error",
      "always",
      { exceptAfterSingleLine: true },
    ],
    // /////////////////////////////////
    "no-plusplus": ["error", { allowForLoopAfterthoughts: true }],
    // отключает ошибки при импотре js файлов, когда с расширением и без выаодит ошибку
    // "import/extensions": [0, { "<js>": "always" }],
    "no-restricted-syntax": "off",
    "import/no-unresolved": "off", // костыль
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
    quotes: ["error", "double"],
    "comma-dangle": ["error", "always-multiline"],
    // "implicit-arrow-linebreak": ["error", "below"],
    "arrow-body-style": [
      "error",
      "as-needed",
      // { requireReturnForObjectLiteral: true }
    ],
    // // (!) Временное решение - в новом пакете гадло использовать обработчик
    // // "camelcase": {"properties": "never"},
    // "prettier/prettier": [
    //   "error",
    //   {
    //     endOfLine: "auto",
    //     semi: false,
    //     singleQuote: false,
    //   },
    // ],

    // *VUE*
    // "vue/require-default-prop": "on",
    "vue/attributes-order": [
      "error",
      {
        order: [
          "DEFINITION",
          "LIST_RENDERING",
          "CONDITIONALS",
          "RENDER_MODIFIERS",
          "GLOBAL",
          ["UNIQUE", "SLOT"],
          "TWO_WAY_BINDING",
          "OTHER_DIRECTIVES",
          "OTHER_ATTR",
          "EVENTS",
          "CONTENT",
        ],
        alphabetical: false,
      },
    ],
    // без следующего правила неверно устанавливает отступы атр
    "vue/max-attributes-per-line": [
      "error",
      {
        singleline: {
          max: 1,
        },
        multiline: {
          max: 1,
        },
      },
    ],
    "vue/html-indent": [
      "error",
      2,
      {
        attribute: 1,
        baseIndent: 1,
        closeBracket: 0,
        alignAttributesVertically: false,
        ignores: [],
      },
    ],
    "vue/html-self-closing": [
      "error",
      {
        html: {
          void: "never",
          normal: "always",
          component: "always",
        },
        svg: "always",
        math: "always",
      },
    ],
    "vue/component-name-in-template-casing": [
      "error",
      "PascalCase",
      {
        registeredComponentsOnly: true,
      },
    ],
    "vue/no-irregular-whitespace": [
      "error",
      {
        skipStrings: true,
        skipComments: false,
        skipRegExps: false,
        skipTemplates: false,
        skipHTMLAttributeValues: false,
        skipHTMLTextContents: false,
      },
    ],
    "vue/match-component-file-name": [
      "error",
      {
        extensions: ["vue"],
        shouldMatchCase: false,
      },
    ],
    "vue/component-definition-name-casing": ["error", "PascalCase"],
    "vue/no-dupe-keys": [
      "error",
      {
        groups: [],
      },
    ],
    "vue/order-in-components": [
      "error",
      {
        order: [
          "el",
          "name",
          "key",
          "parent",
          "functional",
          ["delimiters", "comments"],
          ["components", "directives", "filters"],
          "extends",
          "mixins",
          ["provide", "inject"],
          "ROUTER_GUARDS",
          "layout",
          "middleware",
          "validate",
          "scrollToTop",
          "transition",
          "loading",
          "inheritAttrs",
          "model",
          ["props", "propsData"],
          "emits",
          "setup",
          "asyncData",
          "data",
          "fetch",
          "head",
          "computed",
          "watch",
          "watchQuery",
          "LIFECYCLE_HOOKS",
          "methods",
          ["template", "render"],
          "renderError",
        ],
      },
    ],

    // *VUEX*
    // устранение ошибки во время записи в стор мутацией
    "no-param-reassign": [
      "error",
      {
        props: true,
        ignorePropertyModificationsFor: ["state"],
      },
    ],
  },
  // settings: {
  //   // должен работать для разрешения алиасов
  //   "import/resolver": {
  //     alias: {
  //       map: [
  //         ["@", "./src"],
  //       ],
  //       extensions: [".ts", ".js", ".jsx", ".json", ".vue"],
  //     },
  //   },
  // },
}
