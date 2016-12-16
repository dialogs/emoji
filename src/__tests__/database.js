/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 */

import { getEmojiByChar, getEmojiByName } from '../index';

describe('database', () => {
  it('should return equal emoji by name or char', () => {
    const emojiByName = getEmojiByName('cop');
    const emojiByChar = getEmojiByChar(emojiByName.char);

    expect(emojiByName).toEqual(emojiByChar);
  });
});
