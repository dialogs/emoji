/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 */

import categories from './categories';
import { getEmojiByChar, getEmojiByName } from './database';
import { detectEmoji, detectNamedEmoji } from './detect';

export {
  categories,
  getEmojiByChar,
  getEmojiByName,
  detectEmoji,
  detectNamedEmoji
};
