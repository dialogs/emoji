/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import { emojis } from './emoji.json';

type PackedEmoji = [string, string, string[], number, number, number];
type PackedIndex = { [key: string]: PackedEmoji };

export type Emoji = {
  char: string,
  name: ?string,
  x: number,
  y: number,
  hasApple: boolean,
  hasGoogle: boolean,
  hasTwitter: boolean,
  hasEmojione: boolean
};

const nameIndex: PackedIndex = Object.create(null);
const charIndex: PackedIndex = Object.create(null);

for (let i = 0; i < emojis.length; i++) {
  const emoji = emojis[i];
  const char = emoji[0];
  const names = emoji[2];

  charIndex[char] = emoji;
  for (let j = 0; j < names.length; j++) {
    nameIndex[names[j]] = emoji;
  }
}

function unpack(emoji: PackedEmoji): Emoji {
  const image = emoji[5];

  return {
    char: emoji[0],
    name: emoji[2][0],
    x: emoji[3],
    y: emoji[4],
    hasApple: Boolean(image & 1),
    hasGoogle: Boolean(image & 2),
    hasTwitter: Boolean(image & 4),
    hasEmojione: Boolean(image & 8)
  };
}

export function getEmojiByChar(char: string): ?Emoji {
  const emoji = charIndex[char];
  return emoji ? unpack(emoji) : null;
}

export function getEmojiByName(name: string): ?Emoji {
  const emoji = nameIndex[name];
  return emoji ? unpack(emoji) : null;
}
