/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import { emojis, categories } from './emoji.json';

const INDEX_CHAR = 0;
const INDEX_UNIFIED = 1;
const INDEX_NAMES = 2;
const INDEX_X = 3;
const INDEX_Y = 4;
const INDEX_IMAGE = 5;

export type Emoji = {
  char: string,
  name: string
};

const nameIndex = Object.create(null);
const charIndex = Object.create(null);

for (let i = 0; i < emojis; i++) {
  const emoji = emojis[i];
  const char = emoji[INDEX_CHAR];
  const names = emoji[INDEX_NAMES];

  charIndex[char] = emoji;
  for (let j = 0; j < names.length; j++) {
    nameIndex[names[j]] = emoji;
  }
}

export function getEmojiCategories(): { [category: string]: string[] } {
  return categories;
}

export function getEmojiByChar(char: string): ?Emoji {
  const emoji = charIndex[char];
  if (emoji) {
    const name = emoji[INDEX_NAMES][0];

    return { char, name };
  }

  return null;
}

export function getEmojiByName(name: string): ?Emoji {
  const emoji = nameIndex[name];
  if (emoji) {
    const char = emoji[INDEX_CHAR];

    return { char, name };
  }

  return null;
}
