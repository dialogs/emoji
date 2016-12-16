/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 */

import { emojis } from './emoji.json';
import { isAppleEmojiSupports } from './utils';

const FULL_EMOJI_CHAR = 0;
const FULL_EMOJI_X = 1;
const FULL_EMOJI_Y = 2;
const FULL_EMOJI_NAMES = 3;
const FULL_EMOJI_VARIATIONS = 4;

const VAR_EMOJI_CHAR = 0;
const VAR_EMOJI_X = 1;
const VAR_EMOJI_Y = 2;

const useImage = !isAppleEmojiSupports();

const nameIndex = Object.create(null);
const charIndex = Object.create(null);

for (let i = 0; i < emojis.length; i++) {
  const emoji = emojis[i];
  const char = emoji[FULL_EMOJI_CHAR];
  const names = emoji[FULL_EMOJI_NAMES];

  charIndex[char] = emoji;
  for (let j = 0; j < names.length; j++) {
    nameIndex[names[j]] = emoji;
  }
}

function unpack(emoji) {
  return {
    useImage,
    char: emoji[FULL_EMOJI_CHAR],
    name: emoji[FULL_EMOJI_NAMES][0],
    x: emoji[FULL_EMOJI_X],
    y: emoji[FULL_EMOJI_Y]
  };
}

export function getEmojiByChar(char) {
  const emoji = charIndex[char];
  return emoji ? unpack(emoji) : null;
}

export function getEmojiByName(name) {
  const emoji = nameIndex[name];
  return emoji ? unpack(emoji) : null;
}

export function getEmojiVariations(char) {
  const emoji = charIndex[char];
  if (emoji) {
    const variations = emoji[FULL_EMOJI_VARIATIONS];
    if (variations) {
      return variations.map((variation) => {
        return {
          char: variation[VAR_EMOJI_CHAR],
          x: variation[VAR_EMOJI_X],
          y: variation[VAR_EMOJI_Y]
        };
      });
    }
  }

  return [];
}
