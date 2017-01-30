/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import { emojis } from './emoji.json';
import { FULL_EMOJI_CHAR } from './indexes';

function isDigit(char: string): boolean {
  return (/[0-9]|#/).test(char);
}

function escapeUTF8(text: string): string {
  let result = '';
  for (let i = 0; i < text.length; i++) {
    const char = text.charAt(i);
    if (char === '*') {
      result += '\\*';
    } else if (isDigit(char)) {
      result += char;
    } else {
      const code = text.charCodeAt(i);
      const hexadecimal = code.toString(16).toUpperCase();
      if (hexadecimal.length > 2) {
        result += '\\u' + hexadecimal;
      } else {
        result += '\\x' + hexadecimal;
      }
    }
  }

  return result;
}

const tones = ['🏻', '🏼', '🏽', '🏾', '🏿'];

const chars = emojis.map((raw) => {
  return escapeUTF8(raw[FULL_EMOJI_CHAR]);
}).sort((a, b) => {
  return b.length - a.length;
});

const pattern = new RegExp(`(?:${chars.join('|')})(?:${tones.join('|')})?`, 'g');

export default pattern;
