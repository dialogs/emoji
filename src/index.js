/*
 * Copyright 2020 dialog LLC <info@dlg.im>
 * @flow
 */

import categories from './categories';
import { getEmojiByChar, getEmojiByName, shouldUseImage } from './database';
import { detectEmoji, detectNamedEmoji } from './detect';

export {
  categories,
  getEmojiByChar,
  getEmojiByName,
  shouldUseImage,
  detectEmoji,
  detectNamedEmoji
};
