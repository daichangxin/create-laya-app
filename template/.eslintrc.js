// 基于rect
module.exports = {
    extends: ['@shm-open/eslint-config-bundle/react'],
    rules: {
        '@typescript-eslint/explicit-function-return-type': 0,
        '@typescript-eslint/camelcase': 0,
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/explicit-module-boundary-types': 0,
        'class-methods-use-this': 0,
        quotes: 0,
        'no-underscore-dangle': 0,
        'no-param-reassign': 0,
        'no-plusplus': [
            2,
            {
                allowForLoopAfterthoughts: true,
            },
        ],
        'import/no-cycle': 0,
        'max-len': 0,
        'no-mixed-operators': 0,
        'no-bitwise': 0,
        'prefer-destructuring': 0,
        'dot-notation': 0,
        'no-new': 0,
        'no-case-declarations': 0,
        'no-use-before-define': 0,
        '@typescript-eslint/naming-convention': 0,
    },
    globals: {
        Laya: true,
        fgui: true,
        Config: true,
        c: true,
    },
};

// TIPS
// 下一行禁用检查
// eslint-disable-next-line

// 禁用整个文件
/* eslint-disable */
