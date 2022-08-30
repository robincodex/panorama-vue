import rollupTypescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import { join } from 'path';
import { nodeResolve } from '@rollup/plugin-node-resolve';

module.exports = [
    {
        input: 'src/index.ts',
        output: {
            file: 'dist/vue.js',
            sourcemap: false,
            format: 'cjs'
        },
        plugins: [
            rollupTypescript(require('./tsconfig.json').compilerOptions),
            commonjs({ extensions: ['.js', '.ts'] }),
            nodeResolve()
        ]
    }
];
