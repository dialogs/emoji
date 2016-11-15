/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 */

const fs = require('fs');
const path = require('path');
const data = require('./emoji.json');

function packEmojiHas(emoji) {
  let bits = 0;
  if (emoji.has_img_apple) {
    bits |= 1;
  }

  if (emoji.has_img_google) {
    bits |= 2;
  }

  if (emoji.has_img_twitter) {
    bits |= 4;
  }

  if (emoji.has_img_emojione) {
    bits |= 8;
  }

  return bits;
}

const emojis = [];
const categories = {};

data.forEach((emoji) => {
  const unified = emoji.unified.toLowerCase();
  const char = unified
    .split('-')
    .map((code) => String.fromCodePoint(parseInt(unified, 16)))
    .join('');

  const category = emoji.category.toLowerCase();
  if (!categories[category]) {
    categories[category] = [];
  }

  categories[category].push(char);

  emojis.push([
    char,
    unified,
    emoji.short_names,
    emoji.sheet_x,
    emoji.sheet_y,
    packEmojiHas(emoji)
  ]);
});

fs.writeFileSync(
  path.resolve(__dirname, '../src/emoji.json'),
  JSON.stringify({ emojis, categories }, null, '  ')
);
