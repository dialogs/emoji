/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Emoji } from './database';
import { pattern } from './indexes';
import { getEmojiByName, getEmojiByChar } from './database';

type EmojiRange = {
  emoji: Emoji,
  start: number,
  end: number
};

const NAMED_PATTERN = /:([a-z0-9+_-]+):(?::skin-tone-([23456]):)?/ig;

export function detectEmoji(text: string): EmojiRange[] {
  const result = [];

  text.replace(pattern, (char: string, start: number) => {
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

      if (tone && emoji.variations) {
        const emojiWithToneChar = emoji.variations[parseInt(tone, 10) - 2];
        const emojiWithTone = getEmojiByChar(emojiWithToneChar);

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
