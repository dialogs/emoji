/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 */

const fs = require('fs');
const path = require('path');
const data = require('./emoji.json');

const emojis = [];
const categories = {};
const sortOrder = {};

function unifiedToChar(unified) {
  return unified
          .toLowerCase()
          .split('-')
          .map((code) => String.fromCodePoint(parseInt(code, 16)))
          .join('');
}

function parseSkinVariations(variations) {
  if (!variations) {
    return null;
  }

  return Object.keys(variations).map((key) => {
    const emoji = variations[key];
    const char = unifiedToChar(emoji.unified);

    return [
      char,
      emoji.sheet_x,
      emoji.sheet_y
    ];
  });
}

data.forEach((emoji) => {
  if (!emoji.has_img_apple) {
    return;
  }

  const char = unifiedToChar(emoji.unified);

  const category = emoji.category.toLowerCase();
  if (!categories[category]) {
    categories[category] = [];
  }

  sortOrder[char] = parseInt(emoji.sort_order, 10);
  categories[category].push(char);

  emojis.push([
    char,
    emoji.sheet_x,
    emoji.sheet_y,
    emoji.short_names,
    parseSkinVariations(emoji.skin_variations)
  ]);
});

Object.keys(categories).forEach((name) => {
  categories[name].sort((left, right) => sortOrder[left] - sortOrder[right]);
});

fs.writeFileSync(
  path.resolve(__dirname, '../src/emoji.json'),
  JSON.stringify({ emojis, categories }, null, '  ')
);
