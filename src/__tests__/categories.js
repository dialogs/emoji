/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 */

import { categories, getEmojiByChar, detectEmoji, detectNamedEmoji } from '../index';

describe('categories', () => {
  it('ensure any emoji from any category will be resolved', () => {
    Object.keys(categories).forEach((category) => {
      categories[category].forEach((char) => {
        const emoji = getEmojiByChar(char);
        expect(emoji).not.toBe(null);
      });
    });
  });

  it('ensure any emoji from any category will be detected', () => {
    Object.keys(categories).forEach((category) => {
      categories[category].forEach((char) => {
        expect(
          detectEmoji(char)
        ).toEqual([
          { start: 0, end: char.length, emoji: getEmojiByChar(char) }
        ]);
      });
    });
  });


  it('ensure any emoji from any category will be detected by category', () => {
    Object.keys(categories).forEach((category) => {
      categories[category].forEach((char) => {
        const emoji = getEmojiByChar(char);

        expect(
          detectNamedEmoji(`:${emoji.name}:`)
        ).toEqual([
          { emoji, start: 0, end: emoji.name.length + 2 }
        ]);
      });
    });
  });
});
