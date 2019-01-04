/**
 * Copyright 2017 dialog LLC <info@dlg.im>
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

    return [char, emoji.sheet_x, emoji.sheet_y];
  });
}

const obsoleteNames = {};
data.forEach((emoji) => {
  if (emoji.obsoleted_by) {
    obsoleteNames[emoji.unified] = emoji.short_names;
  }
});

data.forEach((emoji) => {
  // skip emoji unsupported by apple
  if (!emoji.has_img_apple) {
    return;
  }

  if (emoji.obsoleted_by) {
    return;
  }

  const category = emoji.category.toLowerCase();

  // skip skin tones
  if (category === 'skin tones') {
    return;
  }

  if (!categories[category]) {
    categories[category] = [];
  }

  const char = unifiedToChar(emoji.unified);

  sortOrder[char] = parseInt(emoji.sort_order, 10);
  categories[category].push(char);

  emojis.push([
    char,
    emoji.sheet_x,
    emoji.sheet_y,
    [...emoji.short_names, ...(obsoleteNames[emoji.obsoletes] || [])],
    parseSkinVariations(emoji.skin_variations),
  ]);
});

Object.keys(categories).forEach((name) => {
  categories[name].sort((left, right) => sortOrder[left] - sortOrder[right]);
});

fs.writeFileSync(
  path.resolve(__dirname, '../src/emoji.json'),
  JSON.stringify({ emojis, categories }, null, '  '),
);
