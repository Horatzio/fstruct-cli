import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import shebang from 'rollup-plugin-add-shebang';
import { RollupOptions } from 'rollup';
import json from '@rollup/plugin-json';

const config: RollupOptions = {
    input: 'src/index.ts',
    output: {
      file: 'dist/fstruct.js',
      format: 'cjs',
    },
    plugins: [
      typescript(),
      commonjs(),
      nodeResolve(),
      shebang(),
      json(),
    ],
    external: [
      'fs',
      'fs-extra',
      'yaml',
      'path',
      'commander'
    ]
};

export default config;