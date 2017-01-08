/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 */

import { categories, getEmojiByChar, detectNamedEmoji } from '../index';

describe('categories', () => {
  it('ensure any emoji from any category will be resolved', () => {
    Object.keys(categories).forEach((name) => {
      categories[name].forEach((char) => {
        const emoji = getEmojiByChar(char);
        expect(emoji).not.toBe(null);
      });
    });
  });

  it('ensure any emoji from any category will be detected by name', () => {
    Object.keys(categories).forEach((name) => {
      categories[name].forEach((char) => {
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
