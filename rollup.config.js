/*
 * Copyright 2020 dialog LLC <info@dlg.im>
 */

import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';

const banner = `/*
 * Copyright 2020 dialog LLC <info@dlg.im>
 * @flow strict
 */`;

const config = {
  entry: 'src/index.js',
  banner,
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
