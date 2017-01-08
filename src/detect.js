/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import type { Emoji } from './database';
import EMOJI_PATTERN from './emojiPattern';
import { getEmojiByName, getEmojiByChar } from './database';

type EmojiRange = {
  emoji: Emoji,
  start: number,
  end: number
};

const NAMED_PATTERN = /:([a-z0-9+_-]+):(?::skin-tone-([23456]):)?/ig;
const NAMED_TONES = {
  '2': '🏻',
  '3': '🏼',
  '4': '🏽',
  '5': '🏾',
  '6': '🏿'
};

export function detectEmoji(text: string): EmojiRange[] {
  const result = [];

  text.replace(EMOJI_PATTERN, (char: string, start: number) => {
    const emoji = getEmojiByChar(char);
    if (emoji) {
      const end = start + char.length;

      result.push({
        emoji,
        start,
        end
      });
    }

    return char;
  });

  return result;
}

export function detectNamedEmoji(text: string): EmojiRange[] {
  const result = [];

  text.replace(NAMED_PATTERN, (match: string, name: string, tone: ?string, start: number) => {
    const emoji = getEmojiByName(name);
    if (emoji) {
      const end = start + match.length;

      if (tone) {
        const emojiWithTone = getEmojiByChar(emoji.char + NAMED_TONES[tone]);
        if (emojiWithTone) {
          result.push({
            start,
            end,
            emoji: emojiWithTone
          });
        } else {
          result.push({
            start,
            end,
            emoji
          });
        }
      } else {
        result.push({
          start,
          end,
          emoji
        });
      }
    }

    return match;
  });

  return result;
}
