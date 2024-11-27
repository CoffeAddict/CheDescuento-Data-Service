// @ts-check

import tseslint from 'typescript-eslint'
import stylisticTs from '@stylistic/eslint-plugin-ts'

export default tseslint.config(
    tseslint.configs.recommended,
    {
        ignores: ['dist/**/*'],
    },
    {
        plugins: {
            '@stylistic/ts': stylisticTs,
        },
        rules: {
            '@stylistic/ts/indent': ['error', 4],
            semi: ['error', 'never'],
            'comma-dangle': ['error', 'always-multiline'],
            quotes: ['error', 'single'],
        },
    },
)