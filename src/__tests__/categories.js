/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 */

import { categories, getEmojiByChar } from '../index';

describe('categories', () => {
  it('ensure any emoji from any category will be resolved', () => {
    Object.keys(categories).forEach((name) => {
      categories[name].forEach((char) => {
        const emoji = getEmojiByChar(char);
        expect(emoji).not.toBe(null);
      });
    });
  });
});
