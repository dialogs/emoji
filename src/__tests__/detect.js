/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 */

import { getEmojiByChar, detectEmoji, detectNamedEmoji } from '../index';

describe('detect', () => {
  it('should not detect regular text', () => {
    expect(detectEmoji('Hello, world!')).toEqual([]);
    expect(detectEmoji('Hello, :foo:!')).toEqual([]);
    expect(detectEmoji('Hello, :skin-tone-6:!')).toEqual([]);

    expect(detectNamedEmoji('Hello, world!')).toEqual([]);
    expect(detectNamedEmoji('Hello, :foo:!')).toEqual([]);
    expect(detectNamedEmoji('Hello, :skin-tone-6:!')).toEqual([]);
  });

  it('should detect emoji', () => {
    expect(detectEmoji('Hello, 😄!')).toEqual([
      { start: 7, end: 9, emoji: getEmojiByChar('😄') },
    ]);

    expect(detectNamedEmoji('Hello, :smile:!')).toEqual([
      { start: 7, end: 14, emoji: getEmojiByChar('😄') },
    ]);
  });

  it('should detect multiple emojis', () => {
    expect(detectEmoji('Hello, 😄! 🐶')).toEqual([
      { start: 7, end: 9, emoji: getEmojiByChar('😄') },
      { start: 11, end: 13, emoji: getEmojiByChar('🐶') },
    ]);

    expect(detectNamedEmoji('Hello, :smile:! :dog:')).toEqual([
      { start: 7, end: 14, emoji: getEmojiByChar('😄') },
      { start: 16, end: 21, emoji: getEmojiByChar('🐶') },
    ]);
  });

  it('should detect emoji with skin tone', () => {
    expect(detectEmoji('Hello, 👮🏿‍♂️!')).toEqual([
      { start: 7, end: 14, emoji: getEmojiByChar('👮🏿‍♂️') },
    ]);
  });

  it('should detect emoji with skin tone by name', () => {
    expect(detectNamedEmoji('Hello, :cop::skin-tone-6:!')).toEqual([
      { start: 7, end: 25, emoji: getEmojiByChar('👮🏿‍♂️') },
    ]);
  });

  it('should skip skin tone', () => {
    expect(detectNamedEmoji('Hello, :smile::skin-tone-6:!')).toEqual([
      { start: 7, end: 27, emoji: getEmojiByChar('😄') },
    ]);
  });

  it('should detect Unicode 9.0 emojis', () => {
    expect(detectNamedEmoji('Hello, :clown_face:!')).toEqual([
      { start: 7, end: 19, emoji: getEmojiByChar('🤡') },
    ]);

    expect(detectEmoji('Hello, 🤷🏼‍♂️!')).toEqual([
      { start: 7, end: 14, emoji: getEmojiByChar('🤷🏼‍♂️') },
    ]);
  });
});
