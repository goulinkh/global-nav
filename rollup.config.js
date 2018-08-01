import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import sass from 'rollup-plugin-sass';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import postcss from 'postcss';

import pkg from './package.json';

export default {
  input: 'src/index.js',
  output: {
    file: pkg.main,
    format: 'umd',
    name: 'index.js',
    sourcemap: true,
  },
  plugins: [
    babel({
      babelrc: false,
      exclude: ['node_modules/**', 'src/**/*.scss'],
      presets: [
        ['env', { modules: false }],
        'stage-0',
      ],
    }),
    commonjs(),
    resolve(),
    sass({
      insert: true,
      processor: css => postcss([autoprefixer, cssnano])
        .process(css)
        .then(result => result.css),
    }),
  ],
};
