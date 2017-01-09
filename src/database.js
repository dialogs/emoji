/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import { charIndex, nameIndex } from './indexes';
import { isAppleEmojiSupports } from './utils';

export type Emoji = {
  char: string,
  name: ?string,
  x: number,
  y: number
};

export function getEmojiByChar(char: string): ?Emoji {
  return charIndex[char];
}

export function getEmojiByName(name: string): ?Emoji {
  return nameIndex[name];
}

const _shouldUseImage = !isAppleEmojiSupports();

export function shouldUseImage(): boolean {
  return _shouldUseImage;
}
