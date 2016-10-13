/* eslint no-console: 0, no-sync: 0 */
/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 */

const fs = require('fs');
const path = require('path');
const jsdom = require('jsdom');

const url = 'http://unicode.org/emoji/charts/full-emoji-list.html';
const output = path.resolve(__dirname, '../src/emoji.json');

jsdom.env(url, [], (error, window) => {
  if (error) {
    throw error;
  }

  const rchars = Array.from(window.document.querySelectorAll('td.rchars'));

  let emojis = [];
  Array.from(rchars).forEach((rchar) => {
    const { cells } = rchar.parentNode;
    const codeNode = cells[1];
    const charNode = cells[2];
    const imageNode = cells[4];
    const nameNode = cells[15];
    const keywordNode = cells[17];

    const name = nameNode.innerHTML;
    const appleImage = imageNode.childNodes[0];
    if (!appleImage || appleImage.tagName !== 'IMG') {
      console.log('There is no Apple image for %s', name);
      return;
    }

    // const image = appleImage.src;
    const code = codeNode.childNodes[0].innerHTML.replace(/U\+/g, '');
    const char = charNode.innerHTML;
    const keywords = Array.from(keywordNode.childNodes)
      .filter((child) => child.tagName === 'A')
      .map((child) => child.innerHTML);

    emojis.push({
      code,
      char,
      name,
      // image,
      keywords
    });
  });

  const hasTone = new Set();
  emojis = emojis.filter((emoji) => {
    if (emoji.name.indexOf('skin tone') !== -1) {
      const [main] = emoji.code.split(' ');
      hasTone.add(main);
      return false;
    }

    return true;
  });

  emojis.forEach((emoji) => {
    if (hasTone.has(emoji.code)) {
      emoji.tones = true;
    }
  });

  fs.writeFileSync(output, JSON.stringify(emojis, null, '  '));
});
