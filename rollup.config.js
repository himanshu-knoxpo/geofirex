import resolve from 'rollup-plugin-node-resolve';
import cjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import { plugin as analyze } from 'rollup-plugin-analyzer'
const sizes = require("rollup-plugin-sizes");
import pkg from './package.json'
import uglify from 'rollup-plugin-uglify';

const globals = {
    rxjs: 'rxjs',
    'rxjs/operators': 'rxjs.operators',
}
const external = ['firebase/app']

export default {
    input: './src/index.ts',
    // output: {
    //     file: 'dist/bundle.js',
    //     format: 'umd',
    //     sourcemap: true,
    //     extend: true,
    //     name: 'gfx',
    //     external: ['firebase']
    // },
    output: [{
            file: pkg.main,
            format: 'cjs',
            name: 'gfx',
        },
        {
            file: pkg.module,
            format: 'es',
            name: 'gfx',
            globals,
        }
    ],
    external,
    plugins: [
        typescript({
            typescript: require('typescript')
        }),
        resolve(),
        cjs(),
        sizes(),
        uglify()
    ]
};