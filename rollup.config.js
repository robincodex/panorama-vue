import rollupTypescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import copy from 'rollup-plugin-copy';

module.exports = [
    {
        input: 'packages/renderer/src/index.ts',
        output: {
            dir: 'dist/@panorama-vue/renderer',
            sourcemap: false,
            format: 'es'
        },
        external: [
            '@vue/shared',
            '@panorama-vue/runtime-core',
            '@panorama-vue/reactivity'
        ],
        plugins: [
            rollupTypescript(require('./tsconfig.json').compilerOptions),
            commonjs({ extensions: ['.js', '.ts'] }),
            nodeResolve(),
            copy({
                targets: [
                    {
                        src: 'packages/renderer/package.json',
                        dest: 'dist/@panorama-vue/renderer'
                    }
                ]
            })
        ]
    },
    {
        input: 'packages/reactivity/src/index.ts',
        output: {
            dir: 'dist/@panorama-vue/reactivity',
            sourcemap: false,
            format: 'es'
        },
        external: ['@vue/shared'],
        plugins: [
            rollupTypescript(require('./tsconfig.json').compilerOptions),
            commonjs({ extensions: ['.js', '.ts'] }),
            nodeResolve(),
            copy({
                targets: [
                    {
                        src: 'packages/reactivity/package.json',
                        dest: 'dist/@panorama-vue/reactivity'
                    },
                    {
                        src: 'node_modules/@vue/reactivity/dist/reactivity.d.ts',
                        dest: 'dist/@panorama-vue/reactivity',
                        rename: 'index.d.ts'
                    }
                ]
            })
        ]
    },
    {
        input: 'packages/runtime-core/src/index.ts',
        output: {
            dir: 'dist/@panorama-vue/runtime-core',
            sourcemap: false,
            format: 'es'
        },
        external: ['@vue/shared', '@panorama-vue/reactivity'],
        plugins: [
            rollupTypescript(require('./tsconfig.json').compilerOptions),
            commonjs({ extensions: ['.js', '.ts'] }),
            nodeResolve(),
            copy({
                targets: [
                    {
                        src: 'packages/runtime-core/package.json',
                        dest: 'dist/@panorama-vue/runtime-core'
                    }
                ]
            })
        ]
    }
];
