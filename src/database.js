/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Emoji } from './types';
import { charIndex, nameIndex } from './indexes';
import { isAppleEmojiSupports } from './utils';

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
