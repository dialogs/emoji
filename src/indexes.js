/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 */

import { emojis } from './emoji.json';

export const FULL_EMOJI_CHAR = 0;
export const FULL_EMOJI_X = 1;
export const FULL_EMOJI_Y = 2;
export const FULL_EMOJI_NAMES = 3;
export const FULL_EMOJI_VARIATIONS = 4;

const VAR_EMOJI_CHAR = 0;
const VAR_EMOJI_X = 1;
const VAR_EMOJI_Y = 2;

const charIndex = Object.create(null);
const nameIndex = Object.create(null);

for (const raw of emojis) {
  const char = raw[FULL_EMOJI_CHAR];
  const names = raw[FULL_EMOJI_NAMES];
  const variations = raw[FULL_EMOJI_VARIATIONS];

  const emoji = {
    char,
    name: names[0],
    x: raw[FULL_EMOJI_X],
    y: raw[FULL_EMOJI_Y]
  };

  charIndex[char] = emoji;
  for (const name of names) {
    nameIndex[name] = emoji;
  }

  if (variations) {
    for (const variation of variations) {
      const variationChar = variation[VAR_EMOJI_CHAR];

      charIndex[variationChar] = {
        char: variationChar,
        name: names[0],
        x: variation[VAR_EMOJI_X],
        y: variation[VAR_EMOJI_Y]
      };
    }
  }
}

export {
  charIndex,
  nameIndex
};
