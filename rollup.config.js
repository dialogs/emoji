/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 */

import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';

const config = {
  entry: 'src/index.js',
  plugins: [
    json(),
    babel({
      babelrc: false,
      presets: [['@dlghq/dialog', {
        flow: true,
        helpers: true,
        modules: false,
        runtime: false
      }]]
    })
  ],
  sourceMap: true,
  targets: [
    { dest: 'lib/emoji.js', format: 'cjs' },
    { dest: 'lib/emoji.es.js', format: 'es' }
  ]
};

export default config;
