/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 */

import babel from 'rollup-plugin-babel';
import json from 'rollup-plugin-json';

const config = {
  entry: 'src/index.js',
  plugins: [
    json(),
    babel({
      babelrc: false,
      presets: [['@dlghq/dialog', { modules: false, helpers: true }]]
    })
  ],
  sourceMap: true,
  targets: [
    { dest: 'dist/emoji.js', format: 'cjs' },
    { dest: 'dist/emoji.es.js', format: 'es' }
  ]
};

export default config;
