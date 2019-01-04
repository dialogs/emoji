/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 */

import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';

const config = {
  input: 'src/index.js',
  plugins: [
    json(),
    babel({
      babelrc: false,
      presets: [
        [
          '@dlghq/dialog',
          {
            flow: true,
            helpers: true,
            modules: false,
            runtime: false,
          },
        ],
      ],
    }),
  ],
  output: [
    { file: 'lib/emoji.js', format: 'cjs', sourcemap: true },
    { file: 'lib/emoji.es.js', format: 'es', sourcemap: true },
  ],
};

export default config;
